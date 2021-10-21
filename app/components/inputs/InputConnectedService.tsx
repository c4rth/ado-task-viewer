import { Dropdown, IDropdownOption, IDropdownProps, IRenderFunction } from "@fluentui/react";
import React from "react";
import { LabelInfo } from "./LabelInfo";
import { TaskInputProps } from "./TaskInput";


export default class InputConnectedService extends React.Component<TaskInputProps> {

    constructor(props: any) {
        super(props);
        let input = this.props.input;
        this.state = { input: input };
    }

    private _onRenderLabel: IRenderFunction<IDropdownProps> = (props) => {
        return <LabelInfo key={"label_" + this.props.input.name} label={props?.label} description={this.props.input?.helpMarkDown}/>;
    };

    render() {
        const options: IDropdownOption[] = [
            { key: 'dummyService1', text: 'sc-dummy-1' },
            { key: 'dummyService2', text: 'sc-dummy-2' },
            { key: 'dummyService3', text: 'sc-dummy-3' }
        ];
        return <Dropdown key={this.props.input.name} placeholder="" label={this.props.input.label} required={this.props.input.required} options={options} onRenderLabel={this._onRenderLabel} />;
    }

}