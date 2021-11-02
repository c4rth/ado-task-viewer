type Message = import('../src/models/messageTypes').Message;

type VSCode = {
  postMessage<T extends Message = Message>(message: T): void;
  getState(): any;
  setState(state: any): void;
};

declare const vscode: VSCode;

declare const apiUserGender: string;
