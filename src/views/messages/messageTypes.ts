export type MessageType = 'RELOAD';

export interface Message {
  type: MessageType;
  payload?: any;
}

export interface ReloadMessage extends Message {
  type: 'RELOAD';
}
