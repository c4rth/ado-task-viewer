import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupOptionProps, IChoiceGroupProps, IRenderFunction } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import React from "react";
import { LabelInfo } from "../LabelInfo";
import { defaultValueAsString, ITaskInputProps } from "./TaskInput";

export default function InputRadio(props: ITaskInputProps) {

    const labelId = useId('labelElement');

    const options: IChoiceGroupOption[] = [];
    for (const value in props.input.options) {
        options.push({ key: value, text: props.input.options[value] });
    }

    return (
        <>
            <LabelInfo id={labelId} key={"label_" + props.input.name} label={props.input.label} description={props.input.helpMarkDown} required={props.input.required} />
            <ChoiceGroup key={props.input.name} options={options} ariaLabelledBy={labelId} defaultSelectedKey={defaultValueAsString(props.input)} />
        </>
    );


}