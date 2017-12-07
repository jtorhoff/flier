# Copyright (c) 2017 Juri Torhoff
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import collections
from copy import copy
import re
from typing import Dict, List, Optional, Tuple, Union
from jinja2 import Template


types = {
    "int": "TLInt",
    "long": "TLLong",
    "double": "TLDouble",
    "bytes": "TLBytes",
    "string": "TLString",
    "int128": "TLInt128",
    "int256": "TLInt256",
    "Vector": "TLVector",
    "Object": "TLObject",
}

base_types = copy(types)

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
    return "".join(
        item[0].lower() + item[1:] if first_lower and index == 0 else item[0].upper() + item[1:]
        for index, item in enumerate(name.split("_")))

def get_type(type: str) -> str:
    vector = re.search("^vector\<(.+)\>$", type)
    if vector:
        type = to_camel(vector.group(1).replace("%", ""), first_lower=False)
        return type + "[]"
    signature = type.replace(">", "").split("<")
    signature = [types[t] for t in signature]
    if (len(signature)) == 1:
        return signature[0]
    return signature

def get_combinator(decl: str) -> \
        Optional[Tuple[
            str,
            str,
            List[Dict[str, str]],
            str]]:
    combinator = re.search("^(.+)#([0-9a-f]+)\s*(.+)?\s=\s(.+);$", line)
    if not combinator:
        return None
    name = to_camel(combinator.group(1), first_lower=False)
    constructor = "0x" + combinator.group(2)
    args = [] # type: List[Dict[str, str]]
    if combinator.group(3):
        args = [
            {
                "name": to_camel(arg.split(":")[0]),
                "type": get_type(arg.split(":")[1]),
            }
            for arg in combinator.group(3).split(" ")]
    type = combinator.group(4)
    return name, constructor, args, type

def indent(text: str, depth: int=4) -> str:
    return "\n".join((" " * depth) + line for line in text.split("\n"))


with open("mtproto.tl", "r") as schema:
    schema_parts = schema.read().split("---functions---")
    schema_objects = schema_parts[0].strip()
    schema_functions = schema_parts[1].strip()

with open("TLType.jinja2", "r") as t_str:
    type_template = Template(t_str.read())

with open("TLObject.jinja2", "r") as t_str:
    template = Template(t_str.read())

with open("ConstructablesMap.jinja2") as t_cons:
    cons_template = Template(t_cons.read())

# Collect aggregate types
for line in schema_objects.split("\n"):
    if not line.strip():
        continue
    type = re.search("=\s(.+);$", line).group(1)
    if type in types.keys():
        if type not in base_types and type not in aggregate_types.keys():
            aggregate_types[type] = to_camel(type, first_lower=False) + "Type"
        continue
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

    if type in aggregate_types.keys():
        ts_type = aggregate_types[type]
        if ts_type in union_types:
            union_types[ts_type].append(name)
        else:
            union_types[ts_type] = [name]

# Collect functions
for line in schema_functions.split("\n"):
    if not line.strip():
        continue
    combinator = get_combinator(line)
    if not combinator:
        continue
    name, constructor, args, result_type = combinator
    result_type = aggregate_types[result_type] if result_type in aggregate_types.keys() else result_type
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
import { ByteStream } from "../../DataStructures/ByteStream";
import { HashMap } from "../../DataStructures/HashMap/HashMap";
import { TLFunction } from "../../TL/Interfaces/TLFunction";

import { TLObject } from "../../TL/Interfaces/TLObject";
import { deserializedObject } from "../../TL/TLObjectDeserializer";

import { TLBytes } from "../../TL/Types/TLBytes";
import { TLInt } from "../../TL/Types/TLInt";
import { TLInt128 } from "../../TL/Types/TLInt128";
import { TLInt256 } from "../../TL/Types/TLInt256";
import { TLLong } from "../../TL/Types/TLLong";
import { TLString } from "../../TL/Types/TLString";
import { TLVector } from "../../TL/Types/TLVector";

import { concat } from "../../Utils/BytesConcat";
"""

with open("MTProtoSchema.ts", "w") as mtproto:
    mtproto.write(imports)
    mtproto.write("\n")
    mtproto.write("export namespace MTProto {")
    mtproto.write("\n")
    mtproto.write("\n".join(indent(t) for t in ts_union_types))
    mtproto.write("\n\n")
    mtproto.write("\n\n".join(indent(o) for o in ts_objects))
    mtproto.write("\n\n")
    mtproto.write("\n\n".join(indent(f) for f in ts_functions))
    mtproto.write("\n\n")
    mtproto.write(indent(cons_template.render(constructables=constructables)))
    mtproto.write("\n")
    mtproto.write("} // namespace MTProto")