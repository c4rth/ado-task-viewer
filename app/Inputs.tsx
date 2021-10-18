import React from "react";
import { Checkbox, ChoiceGroup, Dropdown, DropdownMenuItemType, FontIcon, FontSizes, FontWeights, IChoiceGroupOption, Icon, IDropdownOption, Label, PartialTheme, TextField, ThemeProvider } from "@fluentui/react";
import { AzureDevOpsTask, Group, Input } from "../src/models/AzureDevOpsTask";

interface InputsProps {
    adoTask: AzureDevOpsTask;
}

export default class Inputs extends React.Component<InputsProps> {
    constructor(props: any) {
        super(props);
        let adoTask = this.props.adoTask;
        this.state = { adoTask: adoTask };
    }

    render() {
        return (
            <React.Fragment>
                <InputsForGroup adoTask={this.props.adoTask} group={undefined} />
                {this.props.adoTask.groups?.map((group) => {
                    return (<InputsForGroup adoTask={this.props.adoTask} group={group} />);
                })}
            </React.Fragment>
        );
    }
}

interface InputsForGroupProps {
    adoTask: AzureDevOpsTask;
    group?: Group;
}

class InputsForGroup extends React.Component<InputsForGroupProps> {
    constructor(props: any) {
        super(props);
        let adoTask = this.props.adoTask;
        let group = this.props.group;
        this.state = { adoTask: adoTask, group: group };
    }

    render() {
        const inputs = this.props.adoTask.inputs?.filter(input => {
            return input.groupName === this.props.group?.name;
        });
        return (
            <React.Fragment>
                <h3>***{this.props.group?.displayName}***</h3>
                {inputs?.map((input) => {
                    return (<TaskInput input={input} />);
                })}
            </React.Fragment>
        );
    }
}

interface TaskInputProps {
    input: Input;
}

class TaskInput extends React.Component<TaskInputProps> {
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
            options.push( { key: value, text: this.props.input.options[value] });
        }
        return <ChoiceGroup defaultSelectedKey="" options={options} label={this.props.input.label} required={this.props.input.required} />;
    }

    private renderMultiLine() {
        return <TextField label={this.props.input.label} required={this.props.input.required} multiline rows={3} />;
    }

    private renderPickList() {
        var options: IDropdownOption[] = [];
        for (const value in this.props.input.options) {
            console.log("renderPickList " + value);
            options.push( { key: value, text: this.props.input.options[value] });
        }
        return <Dropdown placeholder="" label={this.props.input.label} required={this.props.input.required} options={options} />;
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

    private renderInput() {
        switch (this.props.input.type) {
            case 'boolean': return this.renderBoolean();
            case 'radio': return this.renderRadio();
            case 'multiLine': return this.renderMultiLine();
            case 'pickList': return this.renderPickList();
            case 'string': return this.renderString();
            case 'int': return this.renderInt();
            case this.props.input.type.match(/connectedService.+$/)?.input: return this.renderConnectedService();
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