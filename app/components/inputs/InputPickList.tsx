import { Dropdown, IDropdownOption, IDropdownProps, IRenderFunction } from "@fluentui/react";
import React from "react";
import { LabelInfo } from "../LabelInfo";
import { defaultValueAsString, ITaskInputProps } from "./TaskInput";


export default function InputPickList(props: ITaskInputProps) {

    const _onRenderLabel: IRenderFunction<IDropdownProps> = () => {
        return <LabelInfo key={"label_" + props.input.name} description={props.input.helpMarkDown} label={props.input.label} required={props.input.required}/>;
    };

    var options: IDropdownOption[] = [];
    for (const value in props.input.options) {
        options.push({ key: value, text: props.input.options[value] });
    }

    return <Dropdown key={props.input.name} placeholder=""  options={options} onRenderLabel={_onRenderLabel} defaultSelectedKey={defaultValueAsString(props.input)} />;

}