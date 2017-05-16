import * as React from "react";
import {RSAPublicKey} from "../tg/RSA/RSAPublicKey";
import {Session} from "../tg/Session/Session";
import {AuthKeyGenerator} from "../tg/Session/AuthKeyGenerator";
import {RSAPublicKeyStore} from "../tg/RSA/RSAPublicKeyStore";

export interface AppProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class App extends React.Component<AppProps, undefined> {
    render() {
        let key = "-----BEGIN RSA PUBLIC KEY-----" +
        "MIIBCgKCAQEAwVACPi9w23mF3tBkdZz+zwrzKOaaQdr01vAbU4E1pvkfj4sqDsm6" +
        "lyDONS789sVoD/xCS9Y0hkkC3gtL1tSfTlgCMOOul9lcixlEKzwKENj1Yz/s7daS" +
        "an9tqw3bfUV/nqgbhGX81v/+7RFAEd+RwFnK7a+XYl9sluzHRyVVaTTveB2GazTw" +
        "Efzk2DWgkBluml8OREmvfraX3bkHZJTKX4EQSjBbbdJ2ZXIsRrYOXfaA+xayEGB+" +
        "8hdlLmAjbCVfaigxX0CDqWeR1yFL9kwd9P0NsZRPsmoqVwMbMu7mStFai6aIhc3n" +
        "Slv8kg9qv1m6XHVQY3PnEw+QQtqSIXklHwIDAQAB" +
        "-----END RSA PUBLIC KEY-----";

        let keyStore = new RSAPublicKeyStore();
        keyStore.addKey(RSAPublicKey.fromString(key));
        let session = new Session("149.154.167.51:80");
        let keyGenerator = new AuthKeyGenerator(session, keyStore);

        keyGenerator.generate();

        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}