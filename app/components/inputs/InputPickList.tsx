import { Dropdown, IDropdownOption, IDropdownProps, IRenderFunction } from "@fluentui/react";
import React from "react";
import { EditableOptions, MultiSelect, MultiSelectFlatList } from "../../../src/models/AzureDevOpsTask";
import { LabelInfo } from "../LabelInfo";
import { defaultValueAsString, defaultValuesAsString, ITaskInputProps } from "./TaskInput";


export default function InputPickList(props: ITaskInputProps) {

    const _onRenderLabel: IRenderFunction<IDropdownProps> = () => {
        return <LabelInfo key={"label_" + props.input.name} description={props.input.helpMarkDown} label={props.input.label} required={props.input.required} />;
    };

    var options: IDropdownOption[] = [];
    for (const value in props.input.options) {
        options.push({ key: value, text: props.input.options[value] });
    }


    if (props.input.properties?.MultiSelectFlatList && props.input.properties?.MultiSelectFlatList === MultiSelectFlatList.True) {
        return <Dropdown
            key={props.input.name}
            options={options}
            onRenderLabel={_onRenderLabel}
            defaultSelectedKeys={defaultValuesAsString(props.input)}
            multiSelect />;
    } else {
        return <Dropdown
            key={props.input.name}
            options={options}
            onRenderLabel={_onRenderLabel}
            defaultSelectedKey={defaultValueAsString(props.input)} />;
    }

}