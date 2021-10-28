import { Checkbox, ICheckboxProps, ICheckboxStyles, IRenderFunction, ITextFieldStyles } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import React from "react";
import { LabelInfo } from "../LabelInfo";
import { evaluateFieldAsBoolean, ITaskInputProps } from "./TaskInput";


export default function InputBoolean(props: ITaskInputProps) {

    const [checkboxValue, { toggle: toggleCheckbox }]  = useBoolean(evaluateFieldAsBoolean(props.input.defaultValue));
    const labelStyle: Partial<ITextFieldStyles> = { root: { fontSize: 14, fontWeight: 400, marginLeft: 5 } };

    const _onRenderLabel: IRenderFunction<ICheckboxProps> = () => {
        return <LabelInfo
            key={"label_" + props.input.name}
            label={props.input.label}
            description={props.input.helpMarkDown}
            required={props.input.required}
            styles={labelStyle}
            onClick={toggleCheckbox} />;
    };

    const checkboxStyle: Partial<ICheckboxStyles> = { label: { marginTop: 5 }, checkbox: { marginRight: 5 } };

    return (
        <Checkbox
            key={props.input.name}
            onRenderLabel={_onRenderLabel}
            checked={checkboxValue}
            onChange={toggleCheckbox}
            styles={checkboxStyle} />
    );

}