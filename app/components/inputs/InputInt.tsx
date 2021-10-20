import { IRenderFunction, ITextFieldProps, TextField } from "@fluentui/react";
import React from "react";
import LabelInfo from "./LabelInfo";
import { TaskInputProps } from "./TaskInput";


export default class InputInt extends React.Component<TaskInputProps> {

    constructor(props: any) {
        super(props);
        let input = this.props.input;
        this.state = { input: input };
    }

    private _onRenderLabel: IRenderFunction<ITextFieldProps> = (props) => {
        return <LabelInfo label={props?.label} description={this.props.input?.helpMarkDown}/>;
    };

    render() {
        return <TextField label={this.props.input.label} required={this.props.input.required} onRenderLabel={this._onRenderLabel} />;
    }

}