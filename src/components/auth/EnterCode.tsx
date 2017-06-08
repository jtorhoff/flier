import { TextField, RaisedButton } from "material-ui";
import { CardTitle, CardText } from "material-ui/Card";
import * as React from "react";
import { GenericError, ErrorType } from "../../tg/Session/DataCenter";
import { tg } from "../App";
import { shallowEquals } from "./Auth";
import TextFieldProps = __MaterialUI.TextFieldProps;

interface Props {
    didUpdateState: Function,
    nextStep: Function,
    phoneNumber: string,
    phoneCodeHash: string,
    sentCodeType: "app" | "sms" | "call",
    sentCodeLength: number,
}

interface State {
    error?: string,
    code: string,
    submitDisabled: boolean,
}

export class EnterCode extends React.Component<Props, State> {
    private ref: HTMLElement;
    private inputRef: TextField;

    state: State = {
        code: "",
        submitDisabled: false,
    };

    submit(event?: React.SyntheticEvent<any>) {
        if (event) {
            event.preventDefault();
        }

        if (this.state.code.length !== this.props.sentCodeLength) {
            this.setState({
                error: "Invalid code",
            });
            return;
        }

        this.setState({
            submitDisabled: true,
        });
        tg.signIn(
            this.props.phoneNumber,
            this.props.phoneCodeHash,
            this.state.code).subscribe(
                auth => {
                    // TODO
                },
                (error: GenericError) => {
                    let err: string | undefined;
                    switch (error.type) {
                        case ErrorType.badRequest: {
                            switch (error.details) {
                                case "PHONE_CODE_EXPIRED":
                                    err = "Activation code expired";
                                    break;
                                case "PHONE_CODE_INVALID":
                                    err = "Invalid code";
                                    break;
                                case "PHONE_NUMBER_UNOCCUPIED":
                                    this.props.nextStep({
                                        step: "signUp",
                                        phoneCode: this.state.code,
                                    });
                                    return;
                            }
                        } break;

                        case ErrorType.unauthorized: {
                            switch (error.details) {
                                case "SESSION_PASSWORD_NEEDED":
                                    this.props.nextStep({
                                        step: "twoStep",
                                    });
                                    return;
                            }
                        } break;
                    }
                    if (!err) {
                        err = `Unknown error occurred (${error.type}: ${error.details})`;
                    }
                    this.setState({
                        error: err,
                        submitDisabled: false,
                    });
                });
    }

    onInput(event: React.SyntheticEvent<TextFieldProps>) {
        event.preventDefault();

        this.setState({
            error: undefined,
            code: event.currentTarget.value as string,
        });
    }

    componentDidMount() {
        this.inputRef.focus();
    }

    componentDidUpdate(_: any, prevState: State) {
        if (!shallowEquals(this.state, prevState)) {
            this.props.didUpdateState(this.ref);
        }

        if (this.state.code.length === this.props.sentCodeLength &&
            this.state.code !== prevState.code) {
            this.submit();
        }
    }

    render() {
        let subtitle: any[];
        switch (this.props.sentCodeType) {
            case "app":
                subtitle = [
                    "We've sent a ",
                    <strong>Telegram message</strong>,
                    " with an activation code to ",
                    <strong style={{whiteSpace: "nowrap"}}>{this.props.phoneNumber}</strong>,
                    ", please enter it below",
                ];
                break;
            case "sms":
                subtitle = [
                    "We've sent an ",
                    <strong>SMS</strong>,
                    " with an activation code to ",
                    <strong style={{whiteSpace: "nowrap"}}>{this.props.phoneNumber}</strong>,
                    ", please enter it below",
                ];
                break;
            case "call":
                subtitle = [
                    "We'll call ",
                    <strong style={{whiteSpace: "nowrap"}}>{this.props.phoneNumber}</strong>,
                    ", please enter the code that you'll hear below",
                ];
                break;
            default:
                throw new Error();
        }

        return (
            <div ref={ref => this.ref = ref}>
                <CardTitle subtitle={subtitle.map((value, key) => <span key={key}>{value}</span>)}/>
                <CardText>
                    <form onSubmit={e => this.submit(e)}>
                        <TextField floatingLabelText="Verification code"
                                   fullWidth={true}
                                   errorText={this.state.error}
                                   value={this.state.code}
                                   onChange={e => this.onInput(e)}
                                   ref={input => this.inputRef = input}/>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "30px auto 0"}}>
                            <RaisedButton label="Verify"
                                          type="submit"
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