import { ComboBox, Dropdown, IComboBox, IComboBoxOption, IDropdownOption } from "@fluentui/react";
import React from "react";
import { DataSourceBinding, Options } from "../../../src/models/AzureDevOpsTask";
import { LabelInfo } from "../ui/LabelInfo";
import { evaluateFieldAsStringArray, evaluateFieldAsBoolean, TaskInputProps } from "./TaskInput";

interface PickListProps extends TaskInputProps {
    type: PickListType;
}

export enum PickListType {
    PickList,
    ServiceConnection
}

const ServiceConnectionOptions: IDropdownOption[] = [
    { key: 'connection-1', text: 'connection-1' },
    { key: 'connection-2', text: 'connection-2' },
    { key: 'connection-3', text: 'connection-3' }
];

export const InputPickList: React.FC<PickListProps> = (props): JSX.Element => {

    const _onRenderLabel = () => {
        return <LabelInfo
            label={props.adoInput.label}
            description={props.adoInput.helpMarkDown}
            required={evaluateFieldAsBoolean(props.adoInput.required)} />;
    };

    const _initOptions = (type: PickListType, initialValue: string | number | boolean, inputOptions: Options, dataSourceBinding: DataSourceBinding) => {
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
        } else if (type === PickListType.ServiceConnection) {
            options = ServiceConnectionOptions;
        }
        if (initialValue && typeof initialValue !== 'boolean') {
            if (options.filter((option) => option.key === initialValue).length === 0) {
                options.push({ key: initialValue, text: initialValue.toString() });
            }
        }
        return options;
    };
    
    const [options, setOptions] = React.useState(_initOptions(props.type, props.adoInput.value, props.adoInput.options, props.adoInput.dataSourceBinding));
    const [selectedKey, setSelectedKey] = React.useState<string | number>(props.adoInput.value?.toString());

    const _handleDropdownChangeEvent = React.useCallback(
        (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption | undefined, index?: number | undefined) => {
            if (props.onChange) {
                props.onChange(props.adoInput.name, option?.key.toString() ?? "");
            }
        },
        []);

    const _handleComboboxChangeEvent = React.useCallback(
        (event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined, index?: number | undefined, value?: string | undefined) => {
            let selected = option?.selected;
            if (!option && value) {
                selected = true;
                option = { key: value, text: value };
                setOptions(prevOptions => [...prevOptions, option!]);
            }

            if (option) {
                setSelectedKey(option.key);
            }
            if (props.onChange) {
                props.onChange(props.adoInput.name, value ?? option?.key.toString() ?? "");
            }
        }, []);

    if (evaluateFieldAsBoolean(props.adoInput.properties?.MultiSelectFlatList) || evaluateFieldAsBoolean(props.adoInput.properties?.MultiSelect)) {
        return <Dropdown
            options={options}
            onRenderLabel={_onRenderLabel}
            defaultSelectedKeys={evaluateFieldAsStringArray(props.adoInput.value)}
            onChange={_handleDropdownChangeEvent}
            multiSelect />;
    } else if (evaluateFieldAsBoolean(props.adoInput.properties?.EditableOptions) || props.type === PickListType.ServiceConnection) {
        return <>
            <LabelInfo
                label={props.adoInput.label}
                description={props.adoInput.helpMarkDown}
                required={evaluateFieldAsBoolean(props.adoInput.required)} />
            <ComboBox
                allowFreeform={true}
                autoComplete="off"
                options={options}
                selectedKey={selectedKey}
                onChange={_handleComboboxChangeEvent}
                useComboBoxAsMenuWidth />
        </>;
    } else {
        return <Dropdown
            options={options}
            onRenderLabel={_onRenderLabel}
            onChange={_handleDropdownChangeEvent}
            defaultSelectedKey={selectedKey} />;
    }

};