import * as React from "react";
import * as ReactDOM from "react-dom";
import Config from "./config";

import "./index.css";
import { AzureDevOpsTask } from "../src/models/AzureDevOpsTask";

declare global {
  interface Window {
    acquireVsCodeApi(): any;
    initialData: AzureDevOpsTask;
  }
}

const vscode = window.acquireVsCodeApi();

ReactDOM.render(
  <Config vscode={vscode} initialData={window.initialData} />,
  document.getElementById("root")
);