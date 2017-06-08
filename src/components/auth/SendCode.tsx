import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";
import { TextField, RaisedButton } from "material-ui";
import { CardTitle, CardText } from "material-ui/Card";
import * as moment from "moment";
import * as React from "react";
import { API } from "../../tg/Codegen/API/APISchema";
import { GenericError, ErrorType } from "../../tg/Session/DataCenter";
import { tg } from "../App";
import { shallowEquals } from "./Auth";
import TextFieldProps = __MaterialUI.TextFieldProps;

interface Props {
    didUpdateState: Function,
    nextStep: Function,
}

interface State {
    error?: string,
    phoneNumber: string,
    submitDisabled: boolean,
}

export class SendCode extends React.Component<Props, State> {
    private ref: HTMLElement;
    private inputRef: TextField;

    private waitForTimeout: number;
    private floodWaitFor: number;

    state: State = {
        phoneNumber: "",
        submitDisabled: false,
    };

    setupWaitTimer(waitFor: number) {
        this.floodWaitFor = waitFor;
        const interval = () => {
            if (this.floodWaitFor <= 0) {
                clearTimeout(this.waitForTimeout);
                this.setState({
                    error: undefined,
                    submitDisabled: false,
                });
                return;
            }
            this.setState({
                error: `Too many attempts, try again in ${
                    moment.unix(this.floodWaitFor--).format("m:ss")}`,
            });
        };

        interval();
        this.waitForTimeout = setInterval(interval, 1000);
    }

    validate(number: string): boolean {
        let valid = false;
        let error: string | undefined = undefined;
        try {
            const phoneUtil = PhoneNumberUtil.getInstance();
            const phoneNumber = phoneUtil.parse(number);
            valid = phoneUtil.isValidNumber(phoneNumber);
        } catch (e) {
            valid = false;
        }

        if (!valid) {
            error = "Invalid phone number";
        }
        this.setState({
            error: error,
        });

        return valid;
    }

    submit(event: React.SyntheticEvent<any>) {
        event.preventDefault();

        if (!this.validate(this.state.phoneNumber)) {
            return;
        }

        this.setState({
            submitDisabled: true,
        });
        tg.sendCode(this.state.phoneNumber).subscribe(
            sentCode => {
                let codeType;
                if (sentCode.type instanceof API.auth.SentCodeTypeApp) {
                    codeType = "app";
                } else if (sentCode.type instanceof API.auth.SentCodeTypeSms) {
                    codeType = "sms";
                } else if (sentCode.type instanceof API.auth.SentCodeTypeCall) {
                    codeType = "call";
                } else {
                    throw new Error();
                }

                this.props.nextStep({
                    step: "enterCode",
                    phoneNumber: this.state.phoneNumber,
                    phoneCodeHash: sentCode.phoneCodeHash.string,
                    sentCodeType: codeType,
                    sentCodeLength: sentCode.type.length.value,
                });
            },
            (error: GenericError) => {
                switch (error.type) {
                    case ErrorType.badRequest: {
                        this.setState({
                            error: "Invalid phone number",
                            submitDisabled: false,
                        });
                    } break;

                    case ErrorType.flood: {
                        this.setupWaitTimer(error.waitFor!);
                    } break;

                    default: {
                        this.setState({
                            error: `Unknown error occurred (${error.type}: ${error.details})`,
                            submitDisabled: false,
                        });
                    } break;
                }
            });
    }

    onInput(event: React.SyntheticEvent<TextFieldProps>) {
        event.preventDefault();

        let phoneNumber = event.currentTarget.value as string;
        try {
            const phoneUtil = PhoneNumberUtil.getInstance();
            phoneNumber = phoneUtil.format(
                phoneUtil.parse(phoneNumber),
                PhoneNumberFormat.INTERNATIONAL);
        } catch (e) {
            // Ignore errors as we validate on submit
        }

        this.setState({
            phoneNumber: phoneNumber,
        });

        if (this.state.error) {
            this.validate(phoneNumber);
        }
    }

    componentDidMount() {
        this.inputRef.focus();
    }

    componentDidUpdate(_: any, prevState: State) {
        if (!shallowEquals(this.state, prevState)) {
            this.props.didUpdateState(this.ref);
        }
    }

    render() {
        return (
            <div ref={ref => this.ref = ref}>
                <CardTitle title="Sign in"
                           subtitle="Type in your phone number to proceed"/>
                <CardText>
                    <form onSubmit={e => this.submit(e)}>
                        <TextField floatingLabelText="Phone number"
                                   fullWidth={true}
                                   errorText={this.state.error}
                                   value={this.state.phoneNumber}
                                   onChange={e => this.onInput(e)}
                                   ref={input => this.inputRef = input}/>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "30px auto 0"}}>
                            <RaisedButton label="Send"
                                          primary={true}
                                          disabled={this.state.submitDisabled}
                                          onClick={e => this.submit(e)}/>
                        </div>
                    </form>
                </CardText>
            </div>
        );
    }
}