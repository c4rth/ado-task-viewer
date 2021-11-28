import { Checkbox, ICheckboxStyles, ITextFieldStyles } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import React from "react";
import { LabelInfo } from "../ui/LabelInfo";
import { evaluateFieldAsBoolean, TaskInputProps } from "./TaskInput";

const labelStyle: Partial<ITextFieldStyles> = { root: { fontSize: 14, fontWeight: 400, marginLeft: 5 } };
const checkboxStyle: Partial<ICheckboxStyles> = { label: { marginTop: 5 }, checkbox: { marginLeft: 8 } };

export const InputBoolean: React.FC<TaskInputProps> = (props): JSX.Element => {

    const [checkboxValue, { toggle: toggleCheckbox }] = useBoolean(evaluateFieldAsBoolean(props.adoInput.value));

    const _handleCheckboxChangeEvent = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked?: boolean | undefined) => {
        toggleCheckbox();
        if (props.onChange) {
            props.onChange(props.adoInput.name, !checkboxValue);
        }
    };

    const _onRenderLabel = () => {
        return <LabelInfo
            label={props.adoInput.label}
            description={props.adoInput.helpMarkDown}
            required={evaluateFieldAsBoolean(props.adoInput.required)}
            styles={labelStyle}
            onClick={_handleCheckboxChangeEvent} />;
    };

    return (
        <Checkbox
            onRenderLabel={_onRenderLabel}
            checked={checkboxValue}
            onChange={_handleCheckboxChangeEvent}
            styles={checkboxStyle} />
    );

};