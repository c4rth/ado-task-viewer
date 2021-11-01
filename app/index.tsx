import { initializeIcons } from "@fluentui/react/lib/Icons";
import * as React from "react";
import ReactDOM from "react-dom";
import { AzureDevOpsTask } from "../src/models/AzureDevOpsTask";
import { App } from "./App";
import "./index.css";

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