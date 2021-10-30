
import { ITextFieldStyles } from "@fluentui/react/lib/components/TextField";
import { ThemeProvider } from "@fluentui/react/lib/utilities/ThemeProvider";
import React from "react";
import { AzureDevOpsTask } from "../src/models/AzureDevOpsTask";
import './App.css';
import InputsView from "./components/InputsView";
import { LabelInfo } from "./components/LabelInfo";
import Theme from "./Theme";

interface IConfigProps {
  vscode: any;
  initialData: AzureDevOpsTask;
}

interface IConfigState {
  adoTask: AzureDevOpsTask;
}

export default class App extends React.Component<IConfigProps, IConfigState> {
  constructor(props: any) {
    super(props);

    let initialData = this.props.initialData;

    let oldState = this.props.vscode.getState();
    if (oldState) {
      this.state = oldState;
    } else {
      this.state = { adoTask: initialData };
    }
  }

  render() {

    const titleStyle: Partial<ITextFieldStyles> = { root: { fontSize: "large", fontWeight: "600", marginLeft: 5 } };

    return (
      <ThemeProvider theme={Theme.appTheme}>
        <div className="App">
          <LabelInfo key={"title_" + this.state.adoTask.name}
            label={this.state.adoTask.friendlyName}
            description={this.state.adoTask.description}
            styles={titleStyle} />
          <InputsView adoTask={this.state.adoTask} />
        </div>
      </ThemeProvider>
    );
  }

}