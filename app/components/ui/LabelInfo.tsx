import { Callout, IconButton, ILabelProps, IStackStyles, IStackTokens, Label, Stack } from "@fluentui/react";
import { useBoolean, useId } from "@fluentui/react-hooks";
import React, { ReactElement, SyntheticEvent } from "react";
import ReactMarkdown from "react-markdown";
import { OpenUrlMessage } from "../../../src/views/messages/MessageTypes";

const stackTokens: IStackTokens = {
  maxWidth: 359,
};

const labelCalloutStackStyles: Partial<IStackStyles> = { root: { paddingLeft: 7, paddingRight: 7 } };

export interface LabelInfoProps extends ILabelProps {
  label: string | undefined;
  description: string | undefined;
}

export const LabelInfo = (props: LabelInfoProps): JSX.Element => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const descriptionId: string = useId("description");
  const iconButtonId: string = useId("iconButton");

  function clickLink(event: SyntheticEvent) {
    event.preventDefault();
    const anchor = event.target as HTMLAnchorElement;
    vscode.postMessage<OpenUrlMessage>({ type: "OPENURL", payload: anchor.href });
    toggleIsCalloutVisible();
  }

  function renderLink(node: any, linkProps: any): ReactElement {
    return <a onClick={clickLink} {...linkProps} />;
  }

  return (
    <>
      <Stack horizontal verticalAlign="center">
        <Label id={props.id} required={props.required} className={props.className} styles={props.styles} onClick={props.onClick}>{props.label}</Label>
        {props.description?.length > 0 && (
          <IconButton
            id={iconButtonId}
            iconProps={{ iconName: "Info" }}
            title="Info"
            onClick={toggleIsCalloutVisible}
          />
        )}
      </Stack>
      {isCalloutVisible && (
        <Callout
          target={"#" + iconButtonId}
          setInitialFocus
          onDismiss={toggleIsCalloutVisible}
          ariaDescribedBy={descriptionId}
          role="alertdialog" >
          <Stack tokens={stackTokens} horizontalAlign="start" styles={labelCalloutStackStyles}>
            <span id={descriptionId}>
              <ReactMarkdown components={{
                a: ({ node, ...props }) => renderLink(node, props)
              }}>{props.description}</ReactMarkdown>
            </span>
          </Stack>
        </Callout>
      )}
    </>
  );
};