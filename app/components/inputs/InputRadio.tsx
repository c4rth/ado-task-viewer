import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import React, { useCallback } from "react";
import { LabelInfo } from "../ui/LabelInfo";
import { evaluateFieldAsBoolean, TaskInputProps } from "./TaskInput";

export const InputRadio: React.FC<TaskInputProps> = (props): JSX.Element => {

    const labelId = useId('labelElement');

    const _handleRadioChangeEvent = useCallback(
        (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption | undefined) => {
            if (props.onChange) {
                props.onChange(props.adoInput.name, option?.key);
            }
        },
        []
    );

    const options: IChoiceGroupOption[] = [];
    for (const value in props.adoInput.options) {
        options.push({ key: value, text: props.adoInput.options[value] });
    }

    return (
        <>
            <LabelInfo
                id={labelId}
                label={props.adoInput.label}
                description={props.adoInput.helpMarkDown}
                required={evaluateFieldAsBoolean(props.adoInput.required)} />
            <ChoiceGroup
                options={options}
                ariaLabelledBy={labelId}
                onChange={_handleRadioChangeEvent}
                defaultSelectedKey={props.adoInput.value?.toString()} />
        </>
    );

};