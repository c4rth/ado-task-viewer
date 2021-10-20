import { Dropdown, IDropdownOption, IDropdownProps, IRenderFunction } from "@fluentui/react";
import React from "react";
import LabelInfo from "./LabelInfo";
import { TaskInputProps } from "./TaskInput";


export default class InputPickList extends React.Component<TaskInputProps> {

    constructor(props: any) {
        super(props);
        let input = this.props.input;
        this.state = { input: input };
    }

    private _onRenderLabelDropDown: IRenderFunction<IDropdownProps> = (props) => {
        return <LabelInfo label={props?.label} description={this.props.input?.helpMarkDown}/>;
    };

    render() {
        var options: IDropdownOption[] = [];
        for (const value in this.props.input.options) {
            console.log("InputPickList " + value);
            options.push({ key: value, text: this.props.input.options[value] });
        }
        return <Dropdown placeholder="" label={this.props.input.label} required={this.props.input.required} options={options} onRenderLabel={this._onRenderLabelDropDown} />;
    }

}