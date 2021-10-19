import React from "react";
import { AzureDevOpsTask, Group } from "../../src/models/AzureDevOpsTask";
import TaskInput from "./TaskInput";

interface InputsForGroupProps {
    adoTask: AzureDevOpsTask;
    group?: Group;
}

export default class InputsForGroup extends React.Component<InputsForGroupProps> {
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