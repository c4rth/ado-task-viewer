
import { IconButton, IIconProps, Label, Stack } from "@fluentui/react";
import { ITextFieldStyles } from "@fluentui/react/lib/components/TextField";
import { ThemeProvider } from "@fluentui/react/lib/utilities/ThemeProvider";
import React from "react";
import { AzureDevOpsTask, Convert } from "../../src/models/AzureDevOpsTask";
import { ReloadMessage } from '../../src/views/messages/messageTypes';
import './App.css';
import { InputsPanel } from "./InputsPanel";
import { convertToAdoTask } from "./models/AdoTask";
import Theme from "./Theme";
import { LabelInfo } from "./ui/LabelInfo";

interface IConfigProps {
  azureDevOpsTask: AzureDevOpsTask;
}

export const App: React.FC<IConfigProps> = (props): JSX.Element => {

  const titleStyle: Partial<ITextFieldStyles> = { root: { fontSize: "large", fontWeight: "600", marginLeft: 5 } };
  const iconRefreshProps: IIconProps = { iconName: 'Refresh' };

  const _onClickRefresh = () => {
    vscode.postMessage<ReloadMessage>({
      type: 'RELOAD',
    });
  };

  try {
    const json = JSON.stringify(props.azureDevOpsTask);
    Convert.toAzureDevOpsTask(json);
    return (
      <ThemeProvider theme={Theme.appTheme}>
        <div className="App">
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
            <LabelInfo label={props.azureDevOpsTask.friendlyName}
              description={props.azureDevOpsTask.description}
              styles={titleStyle} />
            <IconButton iconProps={iconRefreshProps} title="Refresh" ariaLabel="Refresh" onClick={_onClickRefresh} />
          </Stack>
          <div className="InputsPanel">
            <InputsPanel adoTask={convertToAdoTask(props.azureDevOpsTask)} />
          </div>
        </div>
      </ThemeProvider>
    );
  } catch (e) {
    console.error(e);
    return (
      <ThemeProvider theme={Theme.appTheme}>
        <div className="AppError">
          <h1>task.json is invalid</h1>
          {(e as TypeError).message}
        </div>
      </ThemeProvider>
    );
  }


};