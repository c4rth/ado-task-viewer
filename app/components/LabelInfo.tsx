import { Callout, IconButton, ILabelProps, IStackStyles, IStackTokens, ITextFieldProps, Label, Stack } from "@fluentui/react";
import { useBoolean, useId } from '@fluentui/react-hooks';
import React from "react";

const stackTokens: IStackTokens = {
  maxWidth: 359,
};

const labelCalloutStackStyles: Partial<IStackStyles> = { root: { padding: 10 } };

export interface ILabelInfoProps extends ILabelProps {
  label: string | undefined;
  description: string | undefined;
}

export const LabelInfo = (props: ILabelInfoProps): JSX.Element => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const descriptionId: string = useId('description');
  const iconButtonId: string = useId('iconButton');

  return (
    <>
      <Stack horizontal verticalAlign="center">
        <Label id={props.id} required={props.required} className={props.className} styles={props.styles} onClick={props.onClick}>{props.label}</Label>
        <IconButton
          id={iconButtonId}
          iconProps={{ iconName: 'Info' }}
          title="Info"
          onClick={toggleIsCalloutVisible}
        />
      </Stack>
      {isCalloutVisible && (
        <Callout
          target={'#' + iconButtonId}
          setInitialFocus
          onDismiss={toggleIsCalloutVisible}
          ariaDescribedBy={descriptionId}
          role="alertdialog" >
          <Stack tokens={stackTokens} horizontalAlign="start" styles={labelCalloutStackStyles}>
            <span id={descriptionId}>{props.description}</span>
          </Stack>
        </Callout>
      )}
    </>
  );
};


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