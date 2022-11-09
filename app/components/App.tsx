import { IconButton, IIconProps, Label, Stack, ITextFieldStyles, ThemeProvider } from "@fluentui/react";
import React from "react";
import { Convert } from "../../src/models/AzureDevOpsTask";
import { ReloadMessage, SetTitleMessage } from '../../src/views/messages/MessageTypes';
import './App.css';
import { InputsPanel } from "./InputsPanel";
import { convertToAdoTask } from "./models/AdoTask";
import ThemeHelpers from "./theme/ThemeHelper";
import { LabelInfo } from "./ui/LabelInfo";
var jsonlint = require("jsonlint-mod");

export const App: React.FC = (): JSX.Element => {

  const titleStyle: Partial<ITextFieldStyles> = { root: { fontSize: "large", fontWeight: "600", marginLeft: 5 } };
  const titleErrorStyle: Partial<ITextFieldStyles> = { root: { fontSize: "large", fontWeight: "600", marginLeft: 5, color: "red" } };
  const iconRefreshProps: IIconProps = { iconName: 'Refresh' };

  const _onClickRefresh = () => {
    vscode.postMessage<ReloadMessage>({
      type: 'RELOAD',
    });
  };

  try {
    const azureDevOpsTask = jsonlint.parse(azureDevOpsTaskJson);
    vscode.postMessage<SetTitleMessage>({
      type: 'SETTITLE',
      payload: azureDevOpsTask.name
    });
    Convert.validateAzureDevOpsTask(azureDevOpsTask);
    return (
      <ThemeProvider theme={ThemeHelpers.getAdaptedTheme()}>
        <div className="App">
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
            <LabelInfo label={azureDevOpsTask.friendlyName}
              description={azureDevOpsTask.description}
              styles={titleStyle} />
            <IconButton iconProps={iconRefreshProps} title="Refresh" ariaLabel="Refresh" onClick={_onClickRefresh} />
          </Stack>
          <div className="InputsPanel">
            <InputsPanel adoTask={convertToAdoTask(azureDevOpsTask)} />
          </div>
        </div>
      </ThemeProvider>
    );
  } catch (e) {
    console.error(e);
    return (
      <ThemeProvider theme={ThemeHelpers.getAdaptedTheme()}>
        <div className="npm">
          <Stack horizontal verticalAlign="center">
            <Label styles={titleErrorStyle}>task.json is invalid</Label>
            <IconButton iconProps={iconRefreshProps} title="Refresh" ariaLabel="Refresh" onClick={_onClickRefresh} />
          </Stack>
          {(e as TypeError).message}
        </div>
      </ThemeProvider>
    );
  }


};