
import collections
from copy import copy
import re
from typing import Dict, List, Optional, Tuple, Union, cast
from jinja2 import Template

layer = 57

types = {
    "int": "TLInt",
    "long": "TLLong",
    "double": "TLDouble",
    "bytes": "TLBytes",
    "string": "TLString",
    "Vector": "TLVector",
}

base_types = copy(types)

ignored_combinators = {
    "true": "3fedd339",
    "vector": "1cb5c415",
    "error": "c4b9f9bb",
    "null": "56730bcc",
}

ignored_types = [
    "True",
    "Vector t",
    "Error",
    "Null",
]

substitutions = {
    "public": "boolean",
    "private": "boolean",
}

aggregate_types = {} # type: Dict[str, str]
union_types = {} # type: Dict[str, List[str]]

constructables = []
ts_union_types = []
ts_objects = []
ts_functions = []

def to_camel(name: str, first_lower: bool=True) -> str:
    if "_" not in name and "." not in name:
        if first_lower:
            return name[0].lower() + name[1:]
        else:
            return name[0].upper() + name[1:]
    elif "." in name:
        return  ".".join(to_camel(n) if i == 0 else to_camel(n, False) for i, n in enumerate(name.split(".")))
    return "".join(
        item[0].lower() + item[1:] if first_lower and index == 0 else item[0].upper() + item[1:]
        for index, item in enumerate(name.split("_")))

def get_type(type: str) -> Union[str, Dict[str, Union[str, bool, Dict[str, str]]]]:
    if type == "!X" or type == "X":
        return "TLObject"
    if type == "#":
        return "#"
    if "?" in type:
        condition, type = type.split("?")
        condition_var, condition_const = condition.split(".")
        condition_const = 2 ** int(condition_const)
        return {
            "condition": {
                "var": condition_var,
                "const": condition_const,
            },
            "value": "boolean" if type == "true" else cast(str, get_type(type)),
            "cons": type != "true" and
                    cast(str, get_type(type)) not in base_types.values() and
                    isinstance(get_type(type), str),
        }
    signature = type.replace(">", "").split("<")
    signature = [aggregate_types[t] if t in aggregate_types.keys() else types[t] for t in signature]
    if (len(signature)) == 1:
        return signature[0]
    return signature

def get_combinator(decl: str) -> \
        Optional[Tuple[
            str,
            str,
            List[Dict[str, Union[str, bool, Dict]]],
            Optional[Union[str, Union[str, Dict]]]]]:
    combinator = re.search("^(.+)#([0-9a-f]+)\s*(.+)?\s=\s(.+);$", line)
    if not combinator:
        return None
    name = to_camel(combinator.group(1), first_lower=False)
    constructor = combinator.group(2)
    if constructor in ignored_combinators.values():
        return None
    constructor = "0x" + constructor
    args = [] # type: List[Dict[str, Union[str, bool, Dict]]]
    if combinator.group(3):
        for arg in combinator.group(3).split(" "):
            if arg == "{X:Type}":
                continue
            arg_name = to_camel(arg.split(":")[0])
            arg_type = get_type(arg.split(":")[1])
            arg_name = "is" + to_camel(arg_name, first_lower=False) \
                if isinstance(arg_type, dict) and \
                arg_name in substitutions.keys() and \
                arg_type["value"] == substitutions[arg_name] else arg_name
            args.append({
                "name": arg_name,
                "type": arg_type,
                "cons": False if isinstance(arg_type, dict) else
                        arg_type != "#" and
                        arg_type not in base_types.values() and
                        isinstance(arg_type, str),
            })
    type = get_type(combinator.group(4))
    return name, constructor, args, type

def indent(text: str, depth: int=4) -> str:
    return "\n".join((" " * depth) + line for line in text.split("\n"))


with open("schema.tl", "r") as schema:
    schema_parts = schema.read().split("---functions---")
    schema_objects = schema_parts[0].strip()
    schema_functions = schema_parts[1].strip()

with open("TLType.jinja2", "r") as t_str:
    type_template = Template(t_str.read())

with open("TLObject.jinja2", "r") as t_str:
    template = Template(t_str.read())
    template.globals["is_aggr"] = lambda t: t in aggregate_types.values()

with open("ConstructablesMap.jinja2") as t_cons:
    cons_template = Template(t_cons.read())

# Collect aggregate types
for line in schema_objects.split("\n"):
    if not line.strip():
        continue
    type = re.search("=\s(.+);$", line).group(1)
    if type in ignored_types:
        continue
    if type in types.keys() or type == "InputContact":
        if type not in base_types and type not in aggregate_types.keys():
            aggregate_types[type] = to_camel(type, first_lower=False) + "Type"
    else:
        ts_type = to_camel(type, first_lower=False)
        if type not in types.keys():
            types[type] = ts_type

# Collect objects
for line in schema_objects.split("\n"):
    if not line.strip():
        continue
    combinator = get_combinator(line)
    if not combinator:
        continue
    name, constructor, args, type = combinator
    obj = template.render(
        base_type="TLObject",
        name=name,
        constructor=constructor,
        args=args,
        is_func=False)
    ts_objects.append(obj)
    constructables.append(name)

    if type in aggregate_types.values():
        if type in union_types:
            union_types[type].append(name)
        else:
            union_types[type] = [name]

# Collect functions
for line in schema_functions.split("\n"):
    if not line.strip():
        continue
    combinator = get_combinator(line)
    if not combinator:
        continue
    name, constructor, args, result_type = combinator
    if isinstance(result_type, str) and result_type in aggregate_types.keys():
        result_type = aggregate_types[result_type]
    obj = template.render(
        base_type="TLFunction",
        name=name,
        constructor=constructor,
        args=args,
        is_func=True,
        result_type=result_type)
    ts_functions.append(obj)
    constructables.append(name)

# Render union types
for name, types in union_types.items():
    type = type_template.render(
        name=name,
        types=types)
    ts_union_types.append(type)


imports = """
import {HashMap} from "../../DataStructures/HashMap/HashMap";
import {ByteStream} from "../../DataStructures/ByteStream";

import {TLBytes} from "../../TL/Types/TLBytes";
import {TLInt} from "../../TL/Types/TLInt";
import {TLDouble} from "../../TL/Types/TLDouble";
import {TLLong} from "../../TL/Types/TLLong";
import {TLString} from "../../TL/Types/TLString";
import {TLVector} from "../../TL/Types/TLVector";

import {TLObject} from "../../TL/Interfaces/TLObject";
import {TLFunction} from "../../TL/Interfaces/TLFunction";

import {concat} from "../../Utils/BytesConcat";
import {deserializedObject} from "../../TL/TLObjectDeserializer";
"""

with open("APISchema.ts", "w") as mtproto:
    mtproto.write(imports)
    mtproto.write("\n")
    mtproto.write("export namespace API {")
    mtproto.write("\n")
    mtproto.write(indent("export const layer = {0};".format(layer)))
    mtproto.write("\n\n")
    mtproto.write("\n".join(indent(t) for t in ts_union_types))
    mtproto.write("\n\n")
    mtproto.write("\n\n".join(indent(o) for o in ts_objects))
    mtproto.write("\n\n")
    mtproto.write("\n\n".join(indent(f) for f in ts_functions))
    mtproto.write("\n\n")
    mtproto.write(indent(cons_template.render(constructables=constructables)))
    mtproto.write("\n")
    mtproto.write("} // namespace API")