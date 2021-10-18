import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

import "./index.css";
import { AzureDevOpsTask } from "../src/models/AzureDevOpsTask";
import { initializeIcons } from "@fluentui/react/lib/Icons";

declare global {
  interface Window {
    acquireVsCodeApi(): any;
    initialData: AzureDevOpsTask;
  }
}

initializeIcons();

const vscode = window.acquireVsCodeApi();

ReactDOM.render(
  <App vscode={vscode} initialData={window.initialData} />,
  document.getElementById("root")
);