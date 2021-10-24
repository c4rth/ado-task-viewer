import { ComboBox, Dropdown, IDropdownOption, IDropdownProps, IRenderFunction } from "@fluentui/react";
import React from "react";
import { EditableOptions } from "../../../src/models/AzureDevOpsTask";
import { LabelInfo } from "../LabelInfo";
import { ITaskInputProps } from "./TaskInput";


export default function InputConnectedService(props: ITaskInputProps) {

    const _onRenderLabel: IRenderFunction<IDropdownProps> = () => {
        return <LabelInfo key={"label_" + props.input.name} label={props.input.label} required={props.input.required} description={props.input.helpMarkDown} />;
    };

    const options: IDropdownOption[] = [
        { key: 'dummyService1', text: 'sc-dummy-1' },
        { key: 'dummyService2', text: 'sc-dummy-2' },
        { key: 'dummyService3', text: 'sc-dummy-3' }
    ];

    return (
        <>
            <LabelInfo key={"label_" + props.input.name} label={props.input.label} description={props.input.helpMarkDown} required={props.input.required} />
            <ComboBox
                key={props.input.name}
                allowFreeform={props.input.properties?.EditableOptions !== undefined || props.input.properties?.EditableOptions === EditableOptions.False}
                options={options}
                useComboBoxAsMenuWidth />
        </>
    );

}