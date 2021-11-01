import { ComboBox, IDropdownOption } from "@fluentui/react";
import React from "react";
import { LabelInfo } from "../LabelInfo";
import { evaluateFieldAsBoolean, TaskInputProps } from "./TaskInput";

export const InputConnectedService: React.FC<TaskInputProps> = (props): JSX.Element => {

    const options: IDropdownOption[] = [
        { key: 'dummyService1', text: 'sc-dummy-1' },
        { key: 'dummyService2', text: 'sc-dummy-2' },
        { key: 'dummyService3', text: 'sc-dummy-3' }
    ];

    return (
        <>
            <LabelInfo label={props.adoInput.label} description={props.adoInput.helpMarkDown} required={props.adoInput.required} />
            <ComboBox
                allowFreeform={evaluateFieldAsBoolean(props.adoInput.properties?.EditableOptions)}
                options={options}
                useComboBoxAsMenuWidth />
        </>
    );

};