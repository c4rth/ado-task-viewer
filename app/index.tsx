import * as React from "react";
import App from "./App";

import "./index.css";
import { AzureDevOpsTask } from "../src/models/AzureDevOpsTask";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import ReactDOM from "react-dom";

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