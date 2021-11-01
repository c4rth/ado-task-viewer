
import { ITextFieldStyles } from "@fluentui/react/lib/components/TextField";
import { ThemeProvider } from "@fluentui/react/lib/utilities/ThemeProvider";
import React, { useState } from "react";
import { AzureDevOpsTask } from "../src/models/AzureDevOpsTask";
import './App.css';
import { InputsPanel } from "./components/InputsPanel";
import { LabelInfo } from "./components/LabelInfo";
import Theme from "./Theme";

interface IConfigProps {
  vscode: any;
  initialData: AzureDevOpsTask;
}

export const App: React.FC<IConfigProps> = (props): JSX.Element => {

  const titleStyle: Partial<ITextFieldStyles> = { root: { fontSize: "large", fontWeight: "600", marginLeft: 5 } };

  const [adoTask, setAdoTask] = useState(props.initialData);

  return (
    <ThemeProvider theme={Theme.appTheme}>
      <div className="App">
        <LabelInfo label={adoTask.friendlyName}
          description={adoTask.description}
          styles={titleStyle} />
        <InputsPanel adoTask={adoTask} />
      </div>
    </ThemeProvider>
  );
};