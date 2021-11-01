import { IStackTokens, Label, Stack } from "@fluentui/react";
import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { AzureDevOpsTask, Group, Input } from "../../src/models/AzureDevOpsTask";
import evaluate from "../evaluator/SimpleEvaluate";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { InputBoolean } from "./inputs/InputBoolean";
import { InputConnectedService } from "./inputs/InputConnectedService";
import { InputInt } from "./inputs/InputInt";
import { InputMultiLine } from "./inputs/InputMultiLine";
import { InputPickList } from "./inputs/InputPickList";
import { InputRadio } from "./inputs/InputRadio";
import { InputString } from "./inputs/InputString";

interface IInputsViewProps {
    adoTask: AzureDevOpsTask;
}

interface IFieldVisibility {
    isVisible: boolean;
    rule: string | undefined;
}

function initInputValues(adoTask: AzureDevOpsTask): Map<string, string> {
    const map = new Map<string, string>();
    adoTask.inputs?.forEach((input) => {
        map.set(input.name, input.defaultValue?.toString() ?? "");
    });
    return map;
}

const getValue = (context: object, expr: string) => {
    const values = context as Map<String, String>;
    // console.log("getValue : [" + expr + "] --> [" + (values.get(expr) ?? expr) + "]");
    return values.get(expr) ?? expr;
};

function initInputVisibilities(adoTask: AzureDevOpsTask, inputValues: Map<string, string>): Map<string, IFieldVisibility> {
    console.log("initInputVisibilities");
    const map = new Map<string, IFieldVisibility>();
    adoTask.inputs?.forEach((input) => {
        if (input.visibleRule) {
            // console.log("evaluate : [" + input.visibleRule + "]");
            const isVisible = evaluate(inputValues, input.visibleRule, { getValue });
            console.log("evaluate : [" + input.visibleRule + "] --> " + isVisible);
            map.set(input.name, { isVisible: isVisible, rule: input.visibleRule });
        } else {
            map.set(input.name, { isVisible: true, rule: undefined });
        }
    });
    return map;
}

export const InputsPanel: React.FC<IInputsViewProps> = (props): JSX.Element => {

    const [adoTask, setAdoTask] = useState(props.adoTask);
    const [inputValues, setInputValues] = useState(initInputValues(adoTask));
    const [visibilities, setInputVisibilities] = useState(initInputVisibilities(adoTask, inputValues));

    const updateInputValue = (key: string, value: string) => {
        console.log("updateInputValue : " + key + "=" + value);
        setInputValues(inputValues.set(key, value));

        // TODO : update input in adoTask or pass value in <InputXxx

        const newVisibilities = visibilities;
        newVisibilities.forEach((visibility, key) => {
            if (visibility.rule?.includes(key)) {
                visibility.isVisible = evaluate(inputValues, visibility.rule, { getValue });
                newVisibilities.set(key, visibility);
            }
        });
        setInputVisibilities(newVisibilities);
    };

    const handleChangeEvent = (key: string, value?: string | undefined) => {
        updateInputValue(key, value ?? "");
    };

    const _renderInput = (input: Input) => {
        switch (input.type) {
            case 'boolean': return <InputBoolean key={input.name} input={input} onChange={handleChangeEvent} />;
            case 'radio': return <InputRadio key={input.name} input={input} onChange={handleChangeEvent} />;
            case 'multiline':
            case 'multiLine': return <InputMultiLine key={input.name} input={input} onChange={handleChangeEvent} />;
            case 'picklist':
            case 'pickList': return <InputPickList key={input.name} input={input} onChange={handleChangeEvent} />;
            case 'string': return <InputString key={input.name} input={input} onChange={handleChangeEvent} />;
            case 'int': return <InputInt key={input.name} input={input} onChange={handleChangeEvent} />;
            case input.type.match(/connectedService.+$/)?.input: return <InputConnectedService key={input.name} input={input} onChange={handleChangeEvent} />;
            case 'filepath':
            case 'filePath': return <InputString key={input.name} input={input} onChange={handleChangeEvent} />;
            case 'securefile':
            case 'secureFile': return <InputString key={input.name} input={input} onChange={handleChangeEvent} />;
            case 'identities': return <InputString key={input.name} input={input} onChange={handleChangeEvent} />;
            default: return <Label key={input.name} >Unknow type {input.type} for {input.name}</Label>;
        }
    };

    const _renderInputs = (inputs: Array<Input> | undefined, visibilities: Map<string, IFieldVisibility>) => {
        return (
            <>
                {inputs?.map((input: Input) => {
                    if (visibilities.get(input.name)?.isVisible) {
                        return _renderInput(input);
                    }
                })}
            </>
        );
    };

    const _renderGroup = (group: Group | undefined, visibilities: Map<string, IFieldVisibility>, withHeader: boolean = false) => {
        const inputs = adoTask.inputs?.filter(input => {
            return input.groupName === group?.name;
        });
        if (inputs?.length === 0) {
            return (<></>);
        }
        if (withHeader && group) {
            return (
                <CollapsiblePanel group={group}>
                    {_renderInputs(inputs, visibilities)}
                </CollapsiblePanel>
            );
        }
        return (
            <Collapse isOpened={true}>
                {_renderInputs(inputs, visibilities)}
            </Collapse>
        );
    };

    const verticalGapStackTokens: IStackTokens = {
        childrenGap: 10,
        padding: 10,
    };

    return (
        <Stack tokens={verticalGapStackTokens}>
            {_renderGroup(undefined, visibilities)}
            {adoTask.groups?.map((group) => {
                return (
                    <React.Fragment key={"fragment_" + group.name}>
                        {_renderGroup(group, visibilities, true)}
                    </React.Fragment>
                );
            })}
        </Stack>
    );
};