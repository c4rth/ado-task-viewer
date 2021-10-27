import { IStackTokens, Label, Stack } from "@fluentui/react";
import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { AzureDevOpsTask, Group, Input } from "../../src/models/AzureDevOpsTask";
import evaluate from "../evaluator/SimpleEvaluate";
import { CollapsiblePanel } from "./CollapsiblePanel";
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

interface IVisibility {
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

function initInputVisibilities(adoTask: AzureDevOpsTask, inputValues: Map<string, string>): Map<string, IVisibility> {
    const map = new Map<string, IVisibility>();
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

export default function InputsView(props: IInputsProps) {

    const [adoTask, setAdoTask] = useState(props.adoTask);
    const [inputValues, setInputValues] = useState(initInputValues(adoTask));
    const [visibilities, setInputVisibilities] = useState(initInputVisibilities(adoTask, inputValues));

    const updateInputValue = (key: string, value: string) => {
        setInputValues(inputValues.set(key, value));
        const newVisibilities = visibilities;
        newVisibilities.forEach((visibility, key) => {
            if (visibility.rule?.includes(key)) {
                visibility.isVisible = evaluate(inputValues, visibility.rule, { getValue });
                newVisibilities.set(key, visibility);
            }
        });
        setInputVisibilities(newVisibilities);
    };

    const handleChangeEvent = (e: React.FormEvent) => {
        console.log("handleChangeEvent " + e);
    };

    const _renderInput = (input: Input) => {
        switch (input.type) {
            case 'boolean': return <InputBoolean key={input.name} input={input} />;
            case 'radio': return <InputRadio key={input.name} input={input} />;
            case 'multiline':
            case 'multiLine': return <InputMultiLine key={input.name} input={input} />;
            case 'picklist':
            case 'pickList': return <InputPickList key={input.name} input={input} />;
            case 'string': return <InputString key={input.name} input={input} />;
            case 'int': return <InputInt key={input.name} input={input} />;
            case input.type.match(/connectedService.+$/)?.input: return <InputConnectedService key={input.name} input={input} />;
            case 'filepath':
            case 'filePath': return <InputString key={input.name} input={input} />;
            case 'securefile':
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
                    if (visibilities.get(input.name)?.isVisible) {
                        return _renderInput(input);
                    }
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
            <Collapse key="collapse_default" isOpened={true}>
                {_renderGroups(undefined)}
            </Collapse>
            {adoTask.groups?.map((group) => {
                return (
                    <CollapsiblePanel key={"collapsePanel_" + group.name} group={group}>
                        {_renderGroups(group)}
                    </CollapsiblePanel>
                );
            })}
        </Stack>
    );
}