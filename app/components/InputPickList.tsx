import { Dropdown, IconButton, IDropdownOption, IDropdownProps, IRenderFunction, Label, Stack } from "@fluentui/react";
import React from "react";
import { Input } from "../../src/models/AzureDevOpsTask";

interface InputPickListProps {
    input: Input;
}

export default class InputPickList extends React.Component<InputPickListProps> {

    constructor(props: any) {
        super(props);
        let input = this.props.input;
        this.state = { input: input };
    }
    
    private _onRenderLabelDropDown: IRenderFunction<IDropdownProps> = (props) => {
        return (
            <Stack horizontal verticalAlign="center">
                <Label>{props?.label}</Label>
                <IconButton
                    iconProps={{ iconName: 'Info' }}
                    title="Info"
                    ariaLabel="Info"
                    styles={{ root: { marginBottom: -3 } }}
                />
            </Stack>
        );
    };
    
    private renderPickList() {
        var options: IDropdownOption[] = [];
        for (const value in this.props.input.options) {
            console.log("renderPickList " + value);
            options.push({ key: value, text: this.props.input.options[value] });
        }
        return <Dropdown placeholder="" label={this.props.input.label} required={this.props.input.required} options={options} onRenderLabel={this._onRenderLabelDropDown} />;
    }

}