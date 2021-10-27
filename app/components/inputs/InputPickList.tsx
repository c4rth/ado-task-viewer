import { ComboBox, Dropdown, IDropdownOption, IDropdownProps, IRenderFunction } from "@fluentui/react";
import React from "react";
import { LabelInfo } from "../LabelInfo";
import { evaluateFieldAsStringArray, evaluateFieldAsBoolean, ITaskInputProps } from "./TaskInput";

export default function InputPickList(props: ITaskInputProps) {

    const _onRenderLabel: IRenderFunction<IDropdownProps> = () => {
        return <LabelInfo key={"label_" + props.input.name} description={props.input.helpMarkDown} label={props.input.label} required={props.input.required} />;
    };

    var options: IDropdownOption[] = [];
    for (const value in props.input.options) {
        options.push({ key: value, text: props.input.options[value] });
    }

    if (evaluateFieldAsBoolean(props.input.properties?.MultiSelectFlatList)) {
        return <Dropdown
            key={props.input.name}
            options={options}
            onRenderLabel={_onRenderLabel}
            defaultSelectedKeys={evaluateFieldAsStringArray(props.input.defaultValue)}
            multiSelect />;
    } else if (evaluateFieldAsBoolean(props.input.properties?.EditableOptions)) {
        return <>
            <LabelInfo key={"label_" + props.input.name} label={props.input.label} description={props.input.helpMarkDown} required={props.input.required} />
            <ComboBox
                key={props.input.name}
                allowFreeform
                options={options}
                defaultSelectedKey={props.input.defaultValue?.toString()}
                useComboBoxAsMenuWidth />
        </>;
    } else {
        return <Dropdown
            key={props.input.name}
            options={options}
            onRenderLabel={_onRenderLabel}
            defaultSelectedKey={props.input.defaultValue?.toString()} />;
    }

}