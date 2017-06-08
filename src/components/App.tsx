import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";
import "normalize.css";
import * as React from "react";
import { AppConfig } from "../tg/AppConfig";
import { TG } from "../tg/TG";
import { Auth } from "./auth/Auth";
import { Main } from "./Main";

interface Props {

}

interface State {
    authorized: boolean;
}

export class App extends React.Component<Props, State> {
    state = {
        authorized: false,
    };

    render() {
        let Component = this.state.authorized ? Main : Auth;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Component/>
            </MuiThemeProvider>
        );
    }
}

const muiTheme = getMuiTheme({
    // Grabbed from medium.com styles, 'cause it looks tight
    fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Open Sans",
        "Helvetica Neue",
        "sans-serif"].join(","),
    palette: {
        primary1Color: "rgba(61, 129, 161, 1)",
    },
});

const appConfig = new AppConfig(
    17622,
    "4c8d4f23ccabc463551f8594e7ec6355",
    [
        `-----BEGIN RSA PUBLIC KEY-----
        MIIBCgKCAQEAwVACPi9w23mF3tBkdZz+zwrzKOaaQdr01vAbU4E1pvkfj4sqDsm6
        lyDONS789sVoD/xCS9Y0hkkC3gtL1tSfTlgCMOOul9lcixlEKzwKENj1Yz/s7daS
        an9tqw3bfUV/nqgbhGX81v/+7RFAEd+RwFnK7a+XYl9sluzHRyVVaTTveB2GazTw
        Efzk2DWgkBluml8OREmvfraX3bkHZJTKX4EQSjBbbdJ2ZXIsRrYOXfaA+xayEGB+
        8hdlLmAjbCVfaigxX0CDqWeR1yFL9kwd9P0NsZRPsmoqVwMbMu7mStFai6aIhc3n
        Slv8kg9qv1m6XHVQY3PnEw+QQtqSIXklHwIDAQAB
        -----END RSA PUBLIC KEY-----`,
    ],
    "149.154.167.51:443",
);

export const tg = new TG(appConfig);