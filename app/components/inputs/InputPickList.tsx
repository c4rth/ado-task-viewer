import { ComboBox, Dropdown, IComboBox, IComboBoxOption, IDropdownOption, IDropdownProps, IRenderFunction } from "@fluentui/react";
import React from "react";
import { LabelInfo } from "../LabelInfo";
import { evaluateFieldAsStringArray, evaluateFieldAsBoolean, TaskInputProps } from "./TaskInput";

export const InputPickList: React.FC<TaskInputProps> = (props): JSX.Element => {

    const _onRenderLabel: IRenderFunction<IDropdownProps> = () => {
        return <LabelInfo description={props.adoInput.helpMarkDown} label={props.adoInput.label} required={props.adoInput.required} />;
    };

    var options: IDropdownOption[] = [];
    for (const value in props.adoInput.options) {
        options.push({ key: value, text: props.adoInput.options[value] });
    }

    const _handleDropdownChangeEvent = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption | undefined, index?: number | undefined) => {
        if (props.onChange) {
            props.onChange(props.adoInput.name, option?.key.toString() ?? "");
        }
    };

    const _handleComboboxChangeEvent = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined, index?: number | undefined, value?: string | undefined) => {
        if (props.onChange) {
            props.onChange(props.adoInput.name, option?.key.toString() ?? "");
        }
    };

    if (evaluateFieldAsBoolean(props.adoInput.properties?.MultiSelectFlatList)) {
        return <Dropdown
            options={options}
            onRenderLabel={_onRenderLabel}
            defaultSelectedKeys={evaluateFieldAsStringArray(props.adoInput.value)}
            onChange={_handleDropdownChangeEvent}
            multiSelect />;
    } else if (evaluateFieldAsBoolean(props.adoInput.properties?.EditableOptions)) {
        return <>
            <LabelInfo label={props.adoInput.label} description={props.adoInput.helpMarkDown} required={props.adoInput.required} />
            <ComboBox
                allowFreeform
                options={options}
                defaultSelectedKey={props.adoInput.value?.toString()}
                onChange={_handleComboboxChangeEvent}
                useComboBoxAsMenuWidth />
        </>;
    } else {
        return <Dropdown
            options={options}
            onRenderLabel={_onRenderLabel}
            onChange={_handleDropdownChangeEvent}
            defaultSelectedKey={props.adoInput.value?.toString()} />;
    }

};