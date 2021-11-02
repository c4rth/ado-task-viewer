import { ComboBox, IComboBox, IComboBoxOption, IDropdownOption } from "@fluentui/react";
import React from "react";
import { LabelInfo } from "../ui/LabelInfo";
import { evaluateFieldAsBoolean, TaskInputProps } from "./TaskInput";

const INITIAL_OPTIONS: IDropdownOption[] = [
    { key: 'sc-dummy-1', text: 'sc-dummy-1' },
    { key: 'sc-dummy-2', text: 'sc-dummy-2' },
    { key: 'sc-dummy-3', text: 'sc-dummy-3' }
];

export const InputConnectedService: React.FC<TaskInputProps> = (props): JSX.Element => {

    const allowFreeform = evaluateFieldAsBoolean(props.adoInput.properties?.editableOptions);
    const [options, setOptions] = React.useState(INITIAL_OPTIONS);
    const [selectedKey, setSelectedKey] = React.useState<string | number | undefined>(props.adoInput.defaultValue?.toString());

    const _handleComboboxChangeEvent = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined, index?: number | undefined, value?: string | undefined) => {
        console.log("_handleComboboxChangeEvent");
        let key = option?.key;
        console.log("_handleComboboxChangeEvent: key = " + key);
        console.log("_handleComboboxChangeEvent: value = " + value);
        if (allowFreeform && !option && value) {
            key = value;
            console.log("_handleComboboxChangeEvent: new key = " + key);
            setOptions(prevOptions => [...prevOptions, { key: key!, text: value }]);
        }
        setSelectedKey(key);
        if (props.onChange) {
            props.onChange(props.adoInput.name, value?.toString() ?? "");
        }
    };

    return (
        <>
            <LabelInfo label={props.adoInput.label} description={props.adoInput.helpMarkDown} required={props.adoInput.required} />
            <ComboBox
                allowFreeform={true}
                selectedKey={selectedKey}
                options={options}
                onChange={_handleComboboxChangeEvent}
                useComboBoxAsMenuWidth />
        </>
    );

};