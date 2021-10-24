import { IRenderFunction, ITextFieldProps, TextField } from "@fluentui/react";
import React from "react";
import { EditableOptions } from "../../../src/models/AzureDevOpsTask";
import { LabelInfo } from "../LabelInfo";
import { defaultValueAsString, ITaskInputProps } from "./TaskInput";

export default function InputMultiLine(props: ITaskInputProps) {

    const _onRenderLabel: IRenderFunction<ITextFieldProps> = () => {
        return <LabelInfo key={"label_" + props.input.name} label={props.input.label} description={props.input.helpMarkDown} required={props.input.required} />;
    };

    return <TextField
        key={props.input.name}
        multiline
        rows={props.input.properties?.rows ? parseInt(props.input.properties?.rows) : 3}
        resizable={props.input.properties?.resizable}
        maxLength={props.input.properties?.maxLength ? parseInt(props.input.properties?.maxLength) : undefined}
        onRenderLabel={_onRenderLabel}
        defaultValue={defaultValueAsString(props.input)} />;

}