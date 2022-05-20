export type MessageType = 'RELOAD' | 'OPENURL' | 'SETTITLE';

export interface Message {
  type: MessageType;
  payload?: any;
}

export interface ReloadMessage extends Message {
  type: 'RELOAD';
}

export interface OpenUrlMessage extends Message {
  type: 'OPENURL';
  payload: any;
}

export interface SetTitleMessage extends Message {
  type: 'SETTITLE';
  payload: string;
}