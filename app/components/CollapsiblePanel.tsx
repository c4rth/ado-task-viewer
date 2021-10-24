import { FontIcon, Icon, IIconStyles, IStackStyles, Stack, Text } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import React from "react";
import { Collapse } from "react-collapse";
import { Group } from "../../src/models/AzureDevOpsTask";

export interface ICollapsiblePanelProps {
    group: Group;
    children?: React.ReactNode;
}

export const CollapsiblePanel = (props: ICollapsiblePanelProps): JSX.Element => {

    const [isExpanded, { toggle: toggleIsExpanded }] = useBoolean(props.group.isExpanded !== undefined ? props.group.isExpanded : true);

    const headerStyles: Partial<IStackStyles> = {
        root: {
            cursor: "default", 
            padding: 10,
            selectors: {
                ':hover': {
                    backgroundColor: '#d3d3d3'
                },
            },
        }
    };

    return (
        <React.Fragment key={props.group?.displayName ?? "defaultGroup"}>
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center" onClick={toggleIsExpanded} styles={headerStyles} className="ms-Button-flexContainer flexContainer-128">
                <Text variant="xLarge">{props.group.displayName}</Text>
                <Icon iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'} />
            </Stack>
            <Collapse key={"collapse_" + props.group.name} isOpened={isExpanded}>
                {props.children}
            </Collapse>
        </React.Fragment>
    );
}