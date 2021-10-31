import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import React, { useCallback } from "react";
import { LabelInfo } from "../LabelInfo";
import { ITaskInputProps } from "./TaskInput";

export default function InputRadio(props: ITaskInputProps) {

    const labelId = useId('labelElement');

    const _handleRadioChangeEvent = useCallback(
        (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption | undefined) => {
            if (props.onChange) {
                props.onChange(props.input.name, option?.key);
            }
        },
        []
    );

    const options: IChoiceGroupOption[] = [];
    for (const value in props.input.options) {
        options.push({ key: value, text: props.input.options[value] });
    }

    return (
        <>
            <LabelInfo id={labelId} key={"label_" + props.input.name} label={props.input.label} description={props.input.helpMarkDown} required={props.input.required} />
            <ChoiceGroup
                key={props.input.name}
                options={options}
                ariaLabelledBy={labelId}
                onChange={_handleRadioChangeEvent}
                defaultSelectedKey={props.input.defaultValue?.toString()} />
        </>
    );


}