import { IStackTokens, Label, Stack } from "@fluentui/react";
import React from "react";
import { AzureDevOpsTask, Group, Input } from "../../src/models/AzureDevOpsTask";
import InputBoolean from "./inputs/InputBoolean";
import InputConnectedService from "./inputs/InputConnectedService";
import InputInt from "./inputs/InputInt";
import InputMultiLine from "./inputs/InputMultiline";
import InputPickList from "./inputs/InputPickList";
import InputRadio from "./inputs/InputRadio";
import InputString from "./inputs/InputString";

interface InputsProps {
    adoTask: AzureDevOpsTask;
}

export default class InputsView extends React.Component<InputsProps> {
    constructor(props: any) {
        super(props);
        let adoTask = this.props.adoTask;
        this.state = { adoTask: adoTask };
    }

    private _renderInput(input: Input) {
        switch (input.type) {
            case 'boolean': return <InputBoolean input={input} />;
            case 'radio': return <InputRadio input={input} />;
            case 'multiLine': return <InputMultiLine input={input} />;
            case 'pickList': return <InputPickList input={input} />;
            case 'string': return <InputString input={input} />;
            case 'int': return <InputInt input={input} />;
            case input.type.match(/connectedService.+$/)?.input: return <InputConnectedService input={input} />;
            case 'filePath': return <InputString input={input} />;
            case 'secureFile': return <InputString input={input} />;
            case 'identities': return <InputString input={input} />;
            default:
                return <Label>Unknow type {input.type} for {input.name}</Label>;
        }
    }

    private _renderGroups(group: Group | undefined) {
        const inputs = this.props.adoTask.inputs?.filter(input => {
            return input.groupName === group?.name;
        });
        return (
            <>
                <h3>***{group?.displayName}***</h3>
                {inputs?.map((input: Input) => {
                    return this._renderInput(input);
                })}
            </>
        );
    }

    private static verticalGapStackTokens: IStackTokens = {
        childrenGap: 10,
        padding: 10,
    };

    render() {
        return (
            <Stack tokens={InputsView.verticalGapStackTokens}>
                {this._renderGroups(undefined)}
                {this.props.adoTask.groups?.map((group) => {
                    { return this._renderGroups(group); }
                })}
            </Stack>
        );
    }
}