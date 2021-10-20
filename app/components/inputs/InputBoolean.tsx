import { Checkbox, ICheckboxProps, IRenderFunction } from "@fluentui/react";
import React from "react";
import LabelInfo from "./LabelInfo";
import { TaskInputProps } from "./TaskInput";


export default class InputBoolean extends React.Component<TaskInputProps> {

    constructor(props: any) {
        super(props);
        let input = this.props.input;
        this.state = { input: input };
    }

    private _onRenderLabel: IRenderFunction<ICheckboxProps> = (props) => {
        return <LabelInfo label={props?.label} description={this.props.input?.helpMarkDown} />;
    };

    render() {
        return <Checkbox label={this.props.input.label} required={this.props.input.required} onRenderLabel={this._onRenderLabel} />;
    }

}