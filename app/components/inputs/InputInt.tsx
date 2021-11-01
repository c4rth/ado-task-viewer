import { IRenderFunction, ITextFieldProps, TextField } from "@fluentui/react";
import React, { useCallback } from "react";
import { LabelInfo } from "../LabelInfo";
import { evaluateFieldAsInt, TaskInputProps } from "./TaskInput";

export const InputInt: React.FC<TaskInputProps> = (props): JSX.Element => {
    
    const _handleTextFieldChangeEvent = useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
            if (props.onChange) {
                props.onChange(props.adoInput.name, newValue);
            }
        },
        []
    );
    
    const _onRenderLabel: IRenderFunction<ITextFieldProps> = () => {
        return <LabelInfo label={props.adoInput.label} description={props.adoInput.helpMarkDown} required={props.adoInput.required} />;
    };

    return <TextField
        type="number"
        onRenderLabel={_onRenderLabel}
        defaultValue={props.adoInput.value?.toString()}
        onChange={_handleTextFieldChangeEvent}
        maxLength={evaluateFieldAsInt(props.adoInput.properties?.maxLength)} />; 

};