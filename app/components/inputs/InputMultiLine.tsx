import { IRenderFunction, ITextFieldProps, TextField } from "@fluentui/react";
import React, { useCallback } from "react";
import { LabelInfo } from "../LabelInfo";
import { evaluateFieldAsInt, ITaskInputProps } from "./TaskInput";

export const InputMultiLine: React.FC<ITaskInputProps> = (props): JSX.Element => {

    const _handleTextFieldChangeEvent = useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
            if (props.onChange) {
                props.onChange(props.input.name, newValue);
            }
        },
        []
    );

    const _onRenderLabel: IRenderFunction<ITextFieldProps> = () => {
        return <LabelInfo label={props.input.label} description={props.input.helpMarkDown} required={props.input.required} />;
    };

    return <TextField
        multiline={true}
        rows={evaluateFieldAsInt(props.input.properties?.rows, 3)}
        resizable={props.input.properties?.resizable}
        maxLength={evaluateFieldAsInt(props.input.properties?.maxLength)}
        onRenderLabel={_onRenderLabel}
        onChange={_handleTextFieldChangeEvent}
        defaultValue={props.input.defaultValue?.toString()} />;

};