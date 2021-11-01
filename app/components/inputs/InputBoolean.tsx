import { Checkbox, ICheckboxProps, ICheckboxStyles, IRenderFunction, ITextFieldStyles } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import React, { useCallback } from "react";
import { LabelInfo } from "../LabelInfo";
import { evaluateFieldAsBoolean, ITaskInputProps } from "./TaskInput";


export const InputBoolean: React.FC<ITaskInputProps> = (props): JSX.Element => {

    const [checkboxValue, { toggle: toggleCheckbox }] = useBoolean(evaluateFieldAsBoolean(props.input.defaultValue));
    const labelStyle: Partial<ITextFieldStyles> = { root: { fontSize: 14, fontWeight: 400, marginLeft: 5 } };

    const _handleCheckboxChangeEvent = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked?: boolean | undefined) => {
        toggleCheckbox();
        if (props.onChange) {
            props.onChange(props.input.name, (!checkboxValue).toString());
        }
    };

    const _onRenderLabel: IRenderFunction<ICheckboxProps> = () => {
        return <LabelInfo
            label={props.input.label}
            description={props.input.helpMarkDown}
            required={props.input.required}
            styles={labelStyle}
            onClick={_handleCheckboxChangeEvent} />;
    };

    const checkboxStyle: Partial<ICheckboxStyles> = { label: { marginTop: 5 }, checkbox: { marginRight: 5 } };

    return (
        <Checkbox
            onRenderLabel={_onRenderLabel}
            checked={checkboxValue}
            onChange={_handleCheckboxChangeEvent}
            styles={checkboxStyle} />
    );

};