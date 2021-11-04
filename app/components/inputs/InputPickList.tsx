import { ComboBox, Dropdown, IComboBox, IComboBoxOption, IDropdownOption } from "@fluentui/react";
import React from "react";
import { DataSourceBinding, Options } from "../../../src/models/AzureDevOpsTask";
import { LabelInfo } from "../ui/LabelInfo";
import { evaluateFieldAsStringArray, evaluateFieldAsBoolean, TaskInputProps } from "./TaskInput";

export const InputPickList: React.FC<TaskInputProps> = (props): JSX.Element => {

    const _onRenderLabel = () => {
        return <LabelInfo
            label={props.adoInput.label}
            description={props.adoInput.helpMarkDown}
            required={evaluateFieldAsBoolean(props.adoInput.required)} />;
    };

    const _initOptions = (initialValue: string | number | boolean, inputOptions: Options, dataSourceBinding: DataSourceBinding) => {
        var options: IDropdownOption[] = [];
        if (inputOptions) {
            for (const value in inputOptions) {
                options.push({ key: value, text: inputOptions[value] });
            }
        } else if (dataSourceBinding) {
            for (let index = 0; index < 3; index++) {
                let value = "binding-" + (dataSourceBinding.target ?? "target") + "-" + index;
                options.push({ key: value, text: value });
            }
        }
        if (initialValue && typeof initialValue !== 'boolean') {
            if (options.filter((option) => option.key === initialValue).length === 0) {
                options.push({ key: initialValue, text: initialValue.toString() });
            }
        }
        return options;
    };

    const _handleDropdownChangeEvent = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption | undefined, index?: number | undefined) => {
        if (props.onChange) {
            props.onChange(props.adoInput.name, option?.key.toString() ?? "");
        }
    };

    const _handleComboboxChangeEvent = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined, index?: number | undefined, value?: string | undefined) => {
        if (props.onChange) {
            props.onChange(props.adoInput.name, option?.key.toString() ?? "");
        }
    };

    if (evaluateFieldAsBoolean(props.adoInput.properties?.multiSelectFlatList) || evaluateFieldAsBoolean(props.adoInput.properties?.multiSelect)) {
        return <Dropdown
            options={_initOptions(props.adoInput.value, props.adoInput.options, props.adoInput.dataSourceBinding)}
            onRenderLabel={_onRenderLabel}
            defaultSelectedKeys={evaluateFieldAsStringArray(props.adoInput.value)}
            onChange={_handleDropdownChangeEvent}
            multiSelect />;
    } else if (evaluateFieldAsBoolean(props.adoInput.properties?.editableOptions)) {
        return <>
            <LabelInfo
                label={props.adoInput.label}
                description={props.adoInput.helpMarkDown}
                required={evaluateFieldAsBoolean(props.adoInput.required)} />;
            <ComboBox
                allowFreeform
                options={_initOptions(props.adoInput.value, props.adoInput.options, props.adoInput.dataSourceBinding)}
                defaultSelectedKey={props.adoInput.value?.toString()}
                onChange={_handleComboboxChangeEvent}
                useComboBoxAsMenuWidth />
        </>;
    } else {
        return <Dropdown
            options={_initOptions(props.adoInput.value, props.adoInput.options, props.adoInput.dataSourceBinding)}
            onRenderLabel={_onRenderLabel}
            onChange={_handleDropdownChangeEvent}
            defaultSelectedKey={props.adoInput.value?.toString()} />;
    }

};