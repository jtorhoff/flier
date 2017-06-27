import { RaisedButton, TextField } from "material-ui";
import { CardTitle, CardText } from "material-ui/Card";
import * as React from "react";
import { API } from "../../tg/Codegen/API/APISchema";
import { ErrorType } from "../../tg/Session/DataCenter";
import { tg } from "../App";
import { shallowEquals } from "./Auth";
import TextFieldProps = __MaterialUI.TextFieldProps;

interface Props {
    didUpdateState: Function,
}

interface State {
    error?: string,
    password: string,
    submitDisabled: boolean,
    passwordHint: string,
}

export class TwoStepVerification extends React.Component<Props, State> {
    private ref: HTMLElement;
    private inputRef: TextField;

    state: State = {
        password: "",
        submitDisabled: false,
        passwordHint: "",
    };

    constructor(props: Props) {
        super(props);

        tg.getPassword().subscribe(
            pass => {
                if (pass instanceof API.account.Password) {
                    this.setState({
                        passwordHint: pass.hint.string,
                    })
                }
            });
    }

    submit(event: React.SyntheticEvent<any>) {
        event.preventDefault();

        this.setState({
            submitDisabled: true,
        });
        tg.checkPassword(this.state.password).subscribe({
            error: (error) => {
                switch (error.type) {
                    case ErrorType.badRequest: {
                        switch (error.details) {
                            case "PASSWORD_HASH_INVALID":
                                this.setState({
                                    error: "Password doesn't match",
                                    submitDisabled: false,
                                });
                                return;
                        }
                    }
                        break;
                }
                this.setState({
                    error: `Unknown error occurred (${error.type}: ${error.details})`,
                    submitDisabled: false,
                });
            }
        });
    }

    onInput(event: React.SyntheticEvent<TextFieldProps>) {
        event.preventDefault();

        this.setState({
            error: undefined,
            password: event.currentTarget.value as string,
        });
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
            <div ref={ref => this.ref = ref!}>
                <CardTitle title="Two-step verification"
                           subtitle="You've enabled two-step verification for your account, please enter your password below"/>
                <CardText>
                    <form onSubmit={e => this.submit(e)} autoComplete="off">
                        <TextField floatingLabelText="Password"
                                   type="password"
                                   hintText={this.state.passwordHint}
                                   fullWidth={true}
                                   errorText={this.state.error}
                                   value={this.state.password}
                                   onChange={e => this.onInput(e)}
                                   ref={input => this.inputRef = input!}/>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "30px auto 0"
                        }}>
                            <RaisedButton label="Submit"
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