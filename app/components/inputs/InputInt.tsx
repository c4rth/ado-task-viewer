import { IRenderFunction, ITextFieldProps, TextField } from "@fluentui/react";
import React from "react";
import { LabelInfo } from "../LabelInfo";
import { ITaskInputProps } from "./TaskInput";

export default function InputInt(props: ITaskInputProps) {

    const _onRenderLabel: IRenderFunction<ITextFieldProps> = () => {
        return <LabelInfo key={"label_" + props.input.name} label={props.input.label} description={props.input.helpMarkDown} required={props.input.required} />;
    };

    return <TextField
        key={props.input.name}
        onRenderLabel={_onRenderLabel}
        defaultValue={props.input.defaultValue?.toString()}
        maxLength={props.input.properties?.maxLength ? parseInt(props.input.properties?.maxLength) : undefined} />; 

}