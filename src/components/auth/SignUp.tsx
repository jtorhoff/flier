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
    phoneCode: string,
}

interface State {
    firstNameError?: string,
    lastNameError?: string,
    firstName: string,
    lastName: string,
    submitDisabled: boolean,
}

export class SignUp extends React.Component<Props, State> {
    private ref: HTMLElement;
    private firstNameInputRef: TextField;

    state: State = {
        firstName: "",
        lastName: "",
        submitDisabled: false,
    };

    submit(event: React.SyntheticEvent<any>) {
        event.preventDefault();

        tg.signUp(
            this.props.phoneNumber,
            this.props.phoneCodeHash,
            this.props.phoneCode,
            this.state.firstName,
            this.state.lastName).subscribe(
                auth => {
                    // TODO
                },
                (error: GenericError) => {
                    switch (error.type) {
                        case ErrorType.badRequest: {
                            switch (error.details) {
                                case "FIRSTNAME_INVALID":
                                    this.setState({
                                        firstNameError: "Invalid first name",
                                    });
                                    break;

                                case "LASTNAME_INVALID":
                                    this.setState({
                                        lastNameError: "Invalid last name",
                                    });
                                    break;
                            }
                        } break;

                        default:
                            this.setState({
                                lastNameError: `Unknown error occurred (${error.type}: ${error.details})`,
                            });
                    }
                });
    }

    onInput(event: React.SyntheticEvent<TextFieldProps>, field: "first" | "last") {
        event.preventDefault();

        if (field === "first") {
            this.setState({
                firstNameError: undefined,
                firstName: event.currentTarget.value as string,
            });
        } else {
            this.setState({
                lastNameError: undefined,
                lastName: event.currentTarget.value as string,
            });
        }
    }

    componentDidMount() {
        this.firstNameInputRef.focus();
    }

    componentDidUpdate(_: any, prevState: State) {
        if (!shallowEquals(this.state, prevState)) {
            this.props.didUpdateState(this.ref);
        }
    }

    render() {
        return (
            <div ref={ref => this.ref = ref}>
                <CardTitle title="Almost there"
                           subtitle="Please fill out your name so that your friends can recognize you, you can always change it later"/>
                <CardText>
                    <form onSubmit={e => this.submit(e)}>
                        <TextField floatingLabelText="First name"
                                   fullWidth={true}
                                   errorText={this.state.firstNameError}
                                   value={this.state.firstName}
                                   onChange={e => this.onInput(e, "first")}
                                   ref={input => this.firstNameInputRef = input}/>
                        <TextField floatingLabelText="Last name (optional)"
                                   fullWidth={true}
                                   errorText={this.state.lastNameError}
                                   value={this.state.lastName}
                                   onChange={e => this.onInput(e, "first")}/>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "30px auto 0"}}>
                            <RaisedButton label="Sign up"
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