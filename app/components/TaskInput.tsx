import React from "react";
import { Checkbox, ChoiceGroup, Dropdown, DropdownMenuItemType, FontIcon, FontSizes, FontWeights, IChoiceGroupOption, Icon, IconButton, IDropdownOption, IDropdownProps, IRenderFunction, ITextFieldProps, Label, PartialTheme, Stack, TextField, ThemeProvider } from "@fluentui/react";
import InputPickList from "./InputPickList";
import { Input } from "../../src/models/AzureDevOpsTask";

interface TaskInputProps {
    input: Input;
}

export default class TaskInput extends React.Component<TaskInputProps> {

    constructor(props: any) {
        super(props);
        let input = this.props.input;
        this.state = { input: input };
    }

    private renderBoolean() {
        return <Checkbox label={this.props.input.label} required={this.props.input.required} />;
    }

    private renderRadio() {
        const options: IChoiceGroupOption[] = [];
        for (const value in this.props.input.options) {
            console.log("renderPickList " + value);
            options.push({ key: value, text: this.props.input.options[value] });
        }
        return <ChoiceGroup defaultSelectedKey="" options={options} label={this.props.input.label} required={this.props.input.required} />;
    }

    private renderMultiLine() {
        return <TextField label={this.props.input.label} required={this.props.input.required} multiline rows={3} />;
    }

    private renderString() {
        return <TextField label={this.props.input.label} required={this.props.input.required} />;
    }

    private renderInt() {
        return <TextField label={this.props.input.label} required={this.props.input.required} />;
    }

    private renderConnectedService() {
        const options: IDropdownOption[] = [
            { key: 'dummyService1', text: 'sc-dummy-1' },
            { key: 'dummyService2', text: 'sc-dummy-2' },
            { key: 'dummyService3', text: 'sc-dummy-3' }
        ];
        return <Dropdown placeholder="" label={this.props.input.label} required={this.props.input.required} options={options} />;
    }

    private renderFilePath() {
        return <TextField label={this.props.input.label} required={this.props.input.required} />;
    }

    private renderSecureFile() {
        return <TextField label={this.props.input.label} required={this.props.input.required} />;
    }

    private renderIdentities() {
        return <TextField label={this.props.input.label} required={this.props.input.required} />;
    }

    private renderInput() {
        switch (this.props.input.type) {
            case 'boolean': return this.renderBoolean();
            case 'radio': return this.renderRadio();
            case 'multiLine': return this.renderMultiLine();
            case 'pickList': return <InputPickList input={this.props.input}/>;
            case 'string': return this.renderString();
            case 'int': return this.renderInt();
            case this.props.input.type.match(/connectedService.+$/)?.input: return this.renderConnectedService();
            case 'filePath': return this.renderFilePath();
            case 'secureFile': return this.renderSecureFile();
            case 'identities': return this.renderIdentities();
            default:
                return <Label>Unknow type {this.props.input.type} for {this.props.input.name}</Label>;
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.renderInput()}
            </React.Fragment>
        );
    }
}