import { IRenderFunction, ITextFieldProps, TextField } from "@fluentui/react";
import React, { useCallback } from "react";
import { LabelInfo } from "../LabelInfo";
import { evaluateFieldAsInt, ITaskInputProps } from "./TaskInput";

export const InputString: React.FC<ITaskInputProps> = (props): JSX.Element => {

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
        onRenderLabel={_onRenderLabel}
        defaultValue={props.input.defaultValue?.toString()}
        onChange={_handleTextFieldChangeEvent}
        maxLength={evaluateFieldAsInt(props.input.properties?.maxLength)} />;
};