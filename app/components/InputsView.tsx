import React from "react";
import { AzureDevOpsTask } from "../../src/models/AzureDevOpsTask";
import InputsForGroup from "./InputsForGroup";

interface InputsProps {
    adoTask: AzureDevOpsTask;
}

export default class InputsView extends React.Component<InputsProps> {
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