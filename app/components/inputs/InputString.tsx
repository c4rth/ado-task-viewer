import { IRenderFunction, ITextFieldProps, Label, TextField } from "@fluentui/react";
import React from "react";
import { LabelInfo } from "./LabelInfo";
import { ITaskInputProps } from "./TaskInput";


export default function InputString(props: ITaskInputProps) {

    const _onRenderLabel: IRenderFunction<ITextFieldProps> = () => {
        return <LabelInfo key={"label_" + props.input.name} label={props.input.label} description={props.input.helpMarkDown} required={props.input.required} />;
    };

    return (
        <TextField key={props.input.name} label={props.input.label} onRenderLabel={_onRenderLabel} />
    );

}