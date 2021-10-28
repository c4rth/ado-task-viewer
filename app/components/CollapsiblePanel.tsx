import { Icon, IStackStyles, ITextFieldStyles, Label, Stack } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import React from "react";
import { Collapse } from "react-collapse";
import { Group } from "../../src/models/AzureDevOpsTask";
import { evaluateFieldAsBoolean } from "./inputs/TaskInput";

export interface ICollapsiblePanelProps {
    group: Group;
    children?: React.ReactNode;
}

export const CollapsiblePanel = (props: ICollapsiblePanelProps): JSX.Element => {

    const [isExpanded, { toggle: toggleIsExpanded }] = useBoolean(evaluateFieldAsBoolean(props.group.isExpanded, true));

    const headerStyles: Partial<IStackStyles> = {
        root: {
            cursor: "default",
            padding: 5,
            selectors: {
                ':hover': {
                    backgroundColor: '#f3f2f1'
                },
            },
        }
    };

    const titleStyle: Partial<ITextFieldStyles> = { root: { fontSize: "medium", fontWeight: "600" } };

    return (
        <React.Fragment key={props.group?.displayName ?? "defaultGroup"}>
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center" onClick={toggleIsExpanded} styles={headerStyles} className="ms-Button-flexContainer flexContainer-128">
                <Label styles={titleStyle}>{props.group.displayName}</Label>
                <Icon iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'} />
            </Stack>
            <Collapse key={"collapse_" + props.group.name} isOpened={isExpanded}>
                {props.children}
            </Collapse>
        </React.Fragment>
    );
}