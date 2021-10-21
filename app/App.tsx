import { ChoiceGroup, Dropdown, FontSizes, FontWeights, IChoiceGroupOption, IDropdownOption, Label, PartialTheme, TextField, ThemeProvider } from "@fluentui/react";
import * as React from "react";
import { AzureDevOpsTask } from "../src/models/AzureDevOpsTask";
import './App.css';
import InputsView from "./components/InputsView";
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
    return (
      <ThemeProvider theme={Theme.appTheme}>
        <div className="App">
          <h1>{this.state.adoTask.friendlyName}</h1>
          <InputsView adoTask={this.state.adoTask} />
        </div>
      </ThemeProvider>
    );
  }

}