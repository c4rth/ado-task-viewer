import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupOptionProps, IChoiceGroupProps, IRenderFunction } from "@fluentui/react";
import React from "react";
import LabelInfo from "./LabelInfo";
import { TaskInputProps } from "./TaskInput";


export default class InputRadio extends React.Component<TaskInputProps> {

    constructor(props: any) {
        super(props);
        let input = this.props.input;
        this.state = { input: input };
    }

    private _onRenderLabel: IRenderFunction<IChoiceGroupProps > = (props) => {
        return <LabelInfo label={props?.label} description={this.props.input?.helpMarkDown}/>;
    };

    render() {
        const options: IChoiceGroupOption[] = [];
        for (const value in this.props.input.options) {
            console.log("InputRadio " + value);
            options.push({ key: value, text: this.props.input.options[value] });
        }
        // return <ChoiceGroup defaultSelectedKey="" options={options} label={this.props.input.label} required={this.props.input.required} onRenderLabel={this._onRenderLabel}/>;
        return <ChoiceGroup defaultSelectedKey="" options={options} label={this.props.input.label} required={this.props.input.required} />;
    }

}