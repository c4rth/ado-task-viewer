import { ComboBox, IDropdownOption, IDropdownProps, IRenderFunction } from "@fluentui/react";
import React from "react";
import { LabelInfo } from "../LabelInfo";
import { evaluateFieldAsBoolean, ITaskInputProps } from "./TaskInput";

export const InputConnectedService: React.FC<ITaskInputProps> = (props): JSX.Element => {

    const options: IDropdownOption[] = [
        { key: 'dummyService1', text: 'sc-dummy-1' },
        { key: 'dummyService2', text: 'sc-dummy-2' },
        { key: 'dummyService3', text: 'sc-dummy-3' }
    ];

    return (
        <>
            <LabelInfo label={props.input.label} description={props.input.helpMarkDown} required={props.input.required} />
            <ComboBox
                allowFreeform={evaluateFieldAsBoolean(props.input.properties?.EditableOptions)}
                options={options}
                useComboBoxAsMenuWidth />
        </>
    );

};