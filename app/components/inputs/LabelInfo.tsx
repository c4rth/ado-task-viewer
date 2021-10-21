import { Callout, DefaultButton, IconButton, IStackStyles, IStackTokens, ITextFieldProps, Label, Stack } from "@fluentui/react";
import React from "react";
import { useBoolean, useId } from '@fluentui/react-hooks';

const stackTokens: IStackTokens = {
  childrenGap: 4,
  maxWidth: 300,
};

const labelCalloutStackStyles: Partial<IStackStyles> = { root: { padding: 10 } };

export const LabelInfo = (props: ITextFieldProps): JSX.Element => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const descriptionId: string = useId('description');
  const iconButtonId: string = useId('iconButton');

  return (
    <>
      <Stack horizontal verticalAlign="center" tokens={stackTokens}>
        <span id={props.id}>{props.label}</span>
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