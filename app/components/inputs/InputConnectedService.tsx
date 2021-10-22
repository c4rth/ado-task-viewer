import { Dropdown, IDropdownOption, IDropdownProps, IRenderFunction } from "@fluentui/react";
import React from "react";
import { LabelInfo } from "./LabelInfo";
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
        <Dropdown key={props.input.name} placeholder="" options={options} onRenderLabel={_onRenderLabel} />
    );

}