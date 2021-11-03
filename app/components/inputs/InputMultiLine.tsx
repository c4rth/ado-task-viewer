import { IRenderFunction, ITextFieldProps, TextField } from "@fluentui/react";
import React, { useCallback } from "react";
import { LabelInfo } from "../ui/LabelInfo";
import { evaluateFieldAsBoolean, evaluateFieldAsInt, TaskInputProps } from "./TaskInput";

export const InputMultiLine: React.FC<TaskInputProps> = (props): JSX.Element => {

    const _handleTextFieldChangeEvent = useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
            if (props.onChange) {
                props.onChange(props.adoInput.name, newValue);
            }
        },
        []
    );

    const _onRenderLabel: IRenderFunction<ITextFieldProps> = () => {
        return <LabelInfo
            label={props.adoInput.label}
            description={props.adoInput.helpMarkDown}
            required={evaluateFieldAsBoolean(props.adoInput.required)} />;
    };

    return <TextField
        multiline={true}
        rows={evaluateFieldAsInt(props.adoInput.properties?.rows, 3)}
        resizable={evaluateFieldAsBoolean(props.adoInput.properties?.resizable)}
        maxLength={evaluateFieldAsInt(props.adoInput.properties?.maxLength)}
        onRenderLabel={_onRenderLabel}
        onChange={_handleTextFieldChangeEvent}
        defaultValue={props.adoInput.value?.toString()} />;

};