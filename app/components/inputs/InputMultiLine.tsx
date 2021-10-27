import { IRenderFunction, ITextFieldProps, TextField } from "@fluentui/react";
import React from "react";
import { LabelInfo } from "../LabelInfo";
import { evaluateFieldAsInt, ITaskInputProps } from "./TaskInput";

export default function InputMultiLine(props: ITaskInputProps) {

    const _onRenderLabel: IRenderFunction<ITextFieldProps> = () => {
        return <LabelInfo key={"label_" + props.input.name} label={props.input.label} description={props.input.helpMarkDown} required={props.input.required} />;
    };

    return <TextField
        key={props.input.name}
        multiline
        rows={evaluateFieldAsInt(props.input.properties?.rows, 3)}
        resizable={props.input.properties?.resizable}
        maxLength={evaluateFieldAsInt(props.input.properties?.maxLength)}
        onRenderLabel={_onRenderLabel}
        defaultValue={props.input.defaultValue?.toString()} />;

}