import { IStackTokens, Label, Stack } from "@fluentui/react";
import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { InputBoolean } from "./inputs/InputBoolean";
import { InputConnectedService } from "./inputs/InputConnectedService";
import { InputInt } from "./inputs/InputInt";
import { InputMultiLine } from "./inputs/InputMultiLine";
import { InputPickList } from "./inputs/InputPickList";
import { InputRadio } from "./inputs/InputRadio";
import { InputString } from "./inputs/InputString";
import { AdoGroup, AdoInput, AdoTask, updateVisibilities } from "./models/AdoTask";

interface IInputsViewProps {
    adoTask: AdoTask;
}

export const InputsPanel: React.FC<IInputsViewProps> = (props): JSX.Element => {

    const [adoTask, setAdoTask] = useState(props.adoTask);

    const handleChangeEvent = (inputName: string, value?: string | undefined) => {
        const newAdoTask = {...adoTask};
        console.log("updateInputValue : " + inputName + "=" + value);
        const adoInput = newAdoTask.adoInputs.get(inputName);
        if (adoInput) {
            adoInput.value = value;            
            updateVisibilities(newAdoTask);
        }
        setAdoTask(newAdoTask);
    };

    const _renderInput = (adoInput: AdoInput) => {
        switch (adoInput.type) {
            case 'boolean': return <InputBoolean key={adoInput.name} adoInput={adoInput} onChange={handleChangeEvent} />;
            case 'radio': return <InputRadio key={adoInput.name} adoInput={adoInput} onChange={handleChangeEvent} />;
            case 'multiline':
            case 'multiLine': return <InputMultiLine key={adoInput.name} adoInput={adoInput} onChange={handleChangeEvent} />;
            case 'picklist':
            case 'pickList': return <InputPickList key={adoInput.name} adoInput={adoInput} onChange={handleChangeEvent} />;
            case 'string': return <InputString key={adoInput.name} adoInput={adoInput} onChange={handleChangeEvent} />;
            case 'int': return <InputInt key={adoInput.name} adoInput={adoInput} onChange={handleChangeEvent} />;
            case 'filepath':
            case 'filePath': return <InputString key={adoInput.name} adoInput={adoInput} onChange={handleChangeEvent} />;
            case 'securefile':
            case 'secureFile': return <InputString key={adoInput.name} adoInput={adoInput} onChange={handleChangeEvent} />;
            case 'identities': return <InputString key={adoInput.name} adoInput={adoInput} onChange={handleChangeEvent} />;
            case adoInput.type.match(/connectedService.+$/)?.input: return <InputConnectedService key={adoInput.name} adoInput={adoInput} onChange={handleChangeEvent} />;
            default: return <Label key={adoInput.name}>Unknow type {adoInput.type} for {adoInput.name}</Label>;
        }
    };

    const _renderInputs = (adoInputs: Map<string, AdoInput>) => {
        return (
            <>
                {[...adoInputs.values()].map((adoInput: AdoInput) => {
                    if (adoInput.isVisible) {
                        return _renderInput(adoInput);
                    }
                })}
            </>
        );
    };

    const _renderGroup = (adoGroup: AdoGroup) => {
        if (adoGroup.adoInputs.size === 0 || !adoGroup.isVisible) {
            return (<></>);
        }
        if (adoGroup.name.length === 0) {
            return (
                <Collapse isOpened={true}>
                    {_renderInputs(adoGroup.adoInputs)}
                </Collapse>
            );
        }
        return (
            <CollapsiblePanel group={adoGroup}>
                {_renderInputs(adoGroup.adoInputs)}
            </CollapsiblePanel>
        );
    };

    const verticalGapStackTokens: IStackTokens = {
        childrenGap: 10,
        padding: 10,
    };

    return (
        <Stack tokens={verticalGapStackTokens}>
            {[...adoTask.adoGroups.values()].map((group) => {
                return (
                    <React.Fragment key={"fragment_" + group.name}>
                        {_renderGroup(group)}
                    </React.Fragment>
                );
            })}
        </Stack>
    );
};