import { Callout, IconButton, IStackStyles, Label, Stack } from "@fluentui/react";
import React from "react";
import { useBoolean, useId } from '@fluentui/react-hooks';

export interface LabelInfoProps {
    label: string | undefined;
    description: string | undefined;
}

export interface LabelInfoState {
    isCalloutVisible: boolean;
}

export default class LabelInfo extends React.Component<LabelInfoProps, LabelInfoState> {

    static readonly labelCalloutStackStyles: Partial<IStackStyles> = { root: { padding: 20 } };

    state: LabelInfoState = {
        isCalloutVisible: false,
    };

    private _toggleIsCalloutVisible() {
        console.log("click");
        this.setState({ isCalloutVisible: !this.state.isCalloutVisible });
    }

    render() {
        console.log("LabelInfo");
        return (
            <>
                <Stack horizontal verticalAlign="center">
                    <Label>{this.props.label}</Label>
                    <IconButton
                        iconProps={{ iconName: 'Info' }}
                        title="Info"
                        ariaLabel="Info"
                        styles={{ root: { marginBottom: -3 } }}
                        onClick={this._toggleIsCalloutVisible}
                    />
                </Stack>
                {this.state.isCalloutVisible && (
                    <Callout
                        // target={'#' + iconButtonId}
                        setInitialFocus
                        onDismiss={this._toggleIsCalloutVisible}
                        role="alertdialog">
                        <Stack horizontalAlign="start" styles={LabelInfo.labelCalloutStackStyles}>
                            <span>{this.props.description}</span>
                        </Stack>
                    </Callout>)
                }
            </>
        );
    }
}


/*

const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
const iconButtonId: string = useId('iconButton');
const descriptionId: string = useId('description');


    {isCalloutVisible && (
    <Callout
        target={'#' + iconButtonId}
        setInitialFocus
        onDismiss={toggleIsCalloutVisible}
        ariaDescribedBy={descriptionId}
        role="alertdialog">
        <Stack horizontalAlign="start" styles={LabelInfo.labelCalloutStackStyles}>
            <span id={descriptionId}>The custom label includes an IconButton that displays this Callout on click.</span>
        </Stack>
    </Callout>
)
}
*/