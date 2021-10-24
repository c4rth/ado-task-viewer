import { IStackTokens, Label, Stack } from "@fluentui/react";
import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { AzureDevOpsTask, Group, Input } from "../../src/models/AzureDevOpsTask";
import InputBoolean from "./inputs/InputBoolean";
import InputConnectedService from "./inputs/InputConnectedService";
import InputInt from "./inputs/InputInt";
import InputMultiLine from "./inputs/InputMultiline";
import InputPickList from "./inputs/InputPickList";
import InputRadio from "./inputs/InputRadio";
import InputString from "./inputs/InputString";

interface IInputsProps {
    adoTask: AzureDevOpsTask;
}

export default function InputsView(props: IInputsProps) {

    const [adoTask, setAdoTask] = useState(props.adoTask);
    const [inputs, setInputs] = useState(new Map<String, String>());

    const _renderInput = (input: Input) => {
        switch (input.type) {
            case 'boolean': return <InputBoolean key={input.name} input={input} />;
            case 'radio': return <InputRadio key={input.name} input={input} />;
            case 'multiLine': return <InputMultiLine key={input.name} input={input} />;
            case 'pickList': return <InputPickList key={input.name} input={input} />;
            case 'string': return <InputString key={input.name} input={input} />;
            case 'int': return <InputInt key={input.name} input={input} />;
            case input.type.match(/connectedService.+$/)?.input: return <InputConnectedService key={input.name} input={input} />;
            case 'filePath': return <InputString key={input.name} input={input} />;
            case 'secureFile': return <InputString key={input.name} input={input} />;
            case 'identities': return <InputString key={input.name} input={input} />;
            default: return <Label key={input.name} >Unknow type {input.type} for {input.name}</Label>;
        }
    };


    const _renderGroups = (group: Group | undefined) => {
        const inputs = adoTask.inputs?.filter(input => {
            return input.groupName === group?.name;
        });
        return (
            <>
                {inputs?.map((input: Input) => {
                    return _renderInput(input);
                })}
            </>
        );
    };

    const verticalGapStackTokens: IStackTokens = {
        childrenGap: 10,
        padding: 10,
    };

    return (
        <Stack tokens={verticalGapStackTokens}>
            {_renderGroups(undefined)}
            {adoTask.groups?.map((group) => {
                return (
                    <React.Fragment key={group?.displayName ?? "defaultGroup"}>
                        <h3>***{group.displayName} - [{group.isExpanded ? "true" : "false"}] ***</h3>
                        <Collapse key={"collapse" + group.name} isOpened={group.isExpanded !== undefined ? group.isExpanded : true}>
                            {_renderGroups(group)}
                        </Collapse>
                    </React.Fragment>
                );
            })}
        </Stack>
    );
}