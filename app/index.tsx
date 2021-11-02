import { initializeIcons } from "@fluentui/react/lib/Icons";
import * as React from "react";
import ReactDOM from "react-dom";
import { AzureDevOpsTask } from "../src/models/AzureDevOpsTask";
import { App } from "./components/App";
import "./index.css";

declare global {
  interface Window {
    initialData: AzureDevOpsTask;
  }
}

initializeIcons();

ReactDOM.render(
  <App azureDevOpsTask={window.initialData} />,
  document.getElementById("root")
);