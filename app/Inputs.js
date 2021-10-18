"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("@fluentui/react");
class Inputs extends react_1.default.Component {
    constructor(props) {
        super(props);
        let adoTask = this.props.adoTask;
        this.state = { adoTask: adoTask };
    }
    render() {
        return (<react_1.default.Fragment>
                <InputsForGroup adoTask={this.props.adoTask} group={undefined}/>
                {this.props.adoTask.groups?.map((group) => {
                return (<InputsForGroup adoTask={this.props.adoTask} group={group}/>);
            })}
            </react_1.default.Fragment>);
    }
}
exports.default = Inputs;
class InputsForGroup extends react_1.default.Component {
    constructor(props) {
        super(props);
        let adoTask = this.props.adoTask;
        let group = this.props.group;
        this.state = { adoTask: adoTask, group: group };
    }
    render() {
        const inputs = this.props.adoTask.inputs?.filter(input => {
            return input.groupName === this.props.group?.name;
        });
        return (<react_1.default.Fragment>
                <h3>**{this.props.group?.displayName}**</h3>
                {inputs?.map((input) => {
                return (<TaskInput input={input}/>);
            })}
            </react_1.default.Fragment>);
    }
}
class TaskInput extends react_1.default.Component {
    constructor(props) {
        super(props);
        let input = this.props.input;
        this.state = { input: input };
    }
    renderBoolean() {
        return <react_2.Checkbox label={this.props.input.label} required={this.props.input.required}/>;
    }
    renderRadio() {
        const options = [];
        for (const value in this.props.input.options) {
            console.log("renderPickList " + value);
            options.push({ key: value, text: this.props.input.options[value] });
        }
        return <react_2.ChoiceGroup defaultSelectedKey="" options={options} label={this.props.input.label} required={this.props.input.required}/>;
    }
    renderMultiLine() {
        return <react_2.TextField label={this.props.input.label} required={this.props.input.required} multiline rows={3}/>;
    }
    renderPickList() {
        var options = [];
        for (const value in this.props.input.options) {
            console.log("renderPickList " + value);
            options.push({ key: value, text: this.props.input.options[value] });
        }
        return <react_2.Dropdown placeholder="" label={this.props.input.label} required={this.props.input.required} options={options}/>;
    }
    renderString() {
        return <react_2.TextField label={this.props.input.label} required={this.props.input.required}/>;
    }
    renderInt() {
        return <react_2.TextField label={this.props.input.label} required={this.props.input.required}/>;
    }
    renderConnectedService() {
        const options = [
            { key: 'dummyService1', text: 'sc-dummy-1' },
            { key: 'dummyService2', text: 'sc-dummy-2' },
            { key: 'dummyService3', text: 'sc-dummy-3' }
        ];
        return <react_2.Dropdown placeholder="" label={this.props.input.label} required={this.props.input.required} options={options}/>;
    }
    renderInput() {
        switch (this.props.input.type) {
            case 'boolean': return this.renderBoolean();
            case 'radio': return this.renderRadio();
            case 'multiLine': return this.renderMultiLine();
            case 'pickList': return this.renderPickList();
            case 'string': return this.renderString();
            case 'int': return this.renderInt();
            case this.props.input.type.match(/connectedService.+$/)?.input: return this.renderConnectedService();
            default:
                return <react_2.Label>Unknow type {this.props.input.type} for {this.props.input.name}</react_2.Label>;
        }
    }
    render() {
        return (<react_1.default.Fragment>
                {this.renderInput()}
            </react_1.default.Fragment>);
    }
}
//# sourceMappingURL=Inputs.js.map