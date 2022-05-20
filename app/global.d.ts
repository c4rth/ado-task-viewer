type Message = import('../src/views/messages/MessageTypes').Message;

type VSCode = {
  postMessage<T extends Message = Message>(message: T): void;
  getState(): any;
  setState(state: any): void;
};

declare const vscode: VSCode;

declare const azureDevOpsTaskJson: string;
