import { TextField } from "@fluentui/react";
import React, { useCallback, useState } from "react";
import { isExpressionValid } from "../../helper/inputExpressionValidation";
import { LabelInfo } from "../ui/LabelInfo";
import { evaluateFieldAsBoolean, evaluateFieldAsInt, TaskInputProps } from "./TaskInput";

export const InputInt: React.FC<TaskInputProps> = (props): JSX.Element => {

    const [errorMessage, setErrorMessage] = useState<string>(undefined);
    const expression = props.adoInput.validation?.expression;
    const expressionMessage = props.adoInput.validation?.message;

    const _handleTextFieldChangeEvent = useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
            if (props.onChange) {
                props.onChange(props.adoInput.name, newValue);
            }
            if (expression) {
                setErrorMessage(isExpressionValid(expression, newValue) ? undefined : expressionMessage);
            }
        },
        []
    );

    const _onRenderLabel = () => {
        return <LabelInfo
            label={props.adoInput.label}
            description={props.adoInput.helpMarkDown}
            required={evaluateFieldAsBoolean(props.adoInput.required)} />;
    };

    return <TextField
        type="number"
        onRenderLabel={_onRenderLabel}
        defaultValue={props.adoInput.value?.toString()}
        onChange={_handleTextFieldChangeEvent}
        maxLength={evaluateFieldAsInt(props.adoInput.properties?.maxLength)}
        errorMessage={errorMessage} />;

};