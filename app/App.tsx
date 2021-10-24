import { ChoiceGroup, Dropdown, FontSizes, FontWeights, getTheme, IChoiceGroupOption, IDropdownOption, ITextFieldStyles, Label, PartialTheme, TextField, ThemeProvider } from "@fluentui/react";
import * as React from "react";
import { AzureDevOpsTask } from "../src/models/AzureDevOpsTask";
import './App.css';
import { LabelInfo } from "./components/LabelInfo";
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

    const titleStyle: Partial<ITextFieldStyles> = { root: { fontSize: "xx-large", marginLeft: 5 } };

    return (
      <ThemeProvider theme={Theme.appTheme}>
        <div className="App">
          <LabelInfo key={"title_" + this.state.adoTask.name}
            label={this.state.adoTask.friendlyName}
            description={this.state.adoTask.helpMarkDown}
            styles={titleStyle} />
          <InputsView adoTask={this.state.adoTask} />
        </div>
      </ThemeProvider>
    );
  }

}