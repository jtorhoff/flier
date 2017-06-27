import { Card } from "material-ui/Card";
import * as React from "react";
import { CSSProperties } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { EnterCode } from "./EnterCode";
import { SendCode } from "./SendCode";
import { SignUp } from "./SignUp";
import { TwoStepVerification } from "./TwoStepVerification";

interface Props {

}

interface State {
    step: keyof typeof steps,
    phoneNumber?: string,
    phoneCodeHash?: string,
    sentCodeType?: string,
    sentCodeLength?: number,
    phoneCode?: string,
}

export class Auth extends React.Component<Props, State> {
    state: State = {
        step: "sendCode",
    };

    nextStep(step: State) {
        this.setState(step);
    }

    //noinspection JSMethodCanBeStatic
    childDidRender(el: HTMLElement) {
        if (el) {
            const container = document.getElementById("child-container");
            if (container instanceof HTMLElement) {
                container.style.maxHeight = el.clientHeight + "px";
            }
        }
    }

    render() {
        const StepComponent = steps[this.state.step];
        return (
            <div style={style}>
                <style type="text/css">{transitionStyle}</style>
                <Card>
                    <CSSTransitionGroup transitionName="transition"
                                        component="div"
                                        id="child-container"
                                        transitionEnterTimeout={250}
                                        transitionLeaveTimeout={250}>
                        <StepComponent key={this.state.step}
                                       ref={(ref: any) => ref && this.childDidRender(ref.ref)}
                                       didUpdateState={(el: any) => this.childDidRender(el)}
                                       nextStep={(s: any) => this.nextStep(s)}
                                       phoneNumber={this.state.phoneNumber}
                                       phoneCodeHash={this.state.phoneCodeHash}
                                       sentCodeType={this.state.sentCodeType}
                                       sentCodeLength={this.state.sentCodeLength}
                                       phoneCode={this.state.phoneCode}/>
                    </CSSTransitionGroup>
                </Card>
            </div>
        );
    }
}

export function shallowEquals<T>(lhs: T, rhs: T): boolean {
    for (let key in lhs) {
        //noinspection JSUnfilteredForInLoop
        if (!rhs.hasOwnProperty(key) || lhs[key] !== rhs[key]) {
            return false;
        }
    }

    return true;
}

const steps = {
    sendCode: SendCode,
    enterCode: EnterCode,
    signUp: SignUp,
    twoStep: TwoStepVerification,
};

const style: CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
};

const transitionStyle = `
#child-container {
    width: 400px;
    padding: 17px 0;
    display: flex;
    overflow: hidden;
    flex-grow: 0;
    flex-shrink: 0;
    transition: max-height 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
}

#child-container > div {
    width: 352px;
    margin: 0 auto;
    flex-direction: column;
    align-self: center;
    flex-shrink: 0;
    flex-grow: 0;
    overflow: hidden;
}

#child-container > div * {
    flex: none;
}

.transition-enter {
    order: 1;
    margin-left: 48px !important;
    transform: translateX(0);
    transition: transform 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
}

.transition-enter.transition-enter-active {
    transform: translateX(-400px)
}

.transition-leave {
    margin-left: 24px !important;
    transform: translateX(0);
    transition: transform 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
}

.transition-leave.transition-leave-active {
    transform: translateX(-400px);
}
`;