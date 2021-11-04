import { initializeIcons } from "@fluentui/react/lib/Icons";
import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import "./index.css";

initializeIcons();

ReactDOM.render(<App />, document.getElementById("root"));