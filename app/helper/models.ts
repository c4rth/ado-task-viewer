export interface IPredicate {
    inputName: string;
    condition: string;
    inputValue: string;
}

export interface IVisibilityRule {
    predicateRules: IPredicate[];
    operator: string;
}

export enum ControlType {
    None,
    QuickPick,
    InputBox
}

export interface StringMap<T> {
    [key: string]: T;
}