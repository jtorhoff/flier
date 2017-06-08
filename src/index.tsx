import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";
import injectTapEventPlugin = require("react-tap-event-plugin");

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);