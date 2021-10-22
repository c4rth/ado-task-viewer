import { Checkbox, ICheckboxProps, IRenderFunction } from "@fluentui/react";
import React from "react";
import { LabelInfo } from "./LabelInfo";
import { ITaskInputProps } from "./TaskInput";


export default function InputBoolean(props :ITaskInputProps) {

    const _onRenderLabel: IRenderFunction<ICheckboxProps> = () => {
        return <LabelInfo key={"label_" + props.input.name} label={props.input.label} description={props.input.helpMarkDown} required={props.input.required} />;
    };

    return (<Checkbox key={props.input.name} onRenderLabel={_onRenderLabel} />);

}