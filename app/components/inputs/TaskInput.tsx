import { Input } from "../../../src/models/AzureDevOpsTask";

type OnChangeFunction = (key?: string | undefined, value?: string | undefined) => void;

export interface ITaskInputProps {
    input: Input;
    onChange?: OnChangeFunction | undefined;
}

export const evaluateFieldAsStringArray = (field: string | undefined | boolean): string[] => {
    if (!field) {
        return [];
    }
    return field.toString().split(",");
};

export const evaluateFieldAsBoolean = (field: string | undefined | boolean, defaultValue: boolean = false): boolean => {
    if (!field) { return defaultValue; }
    return field.toString().toLowerCase() === "true";
};

export const evaluateFieldAsInt = (field: string | undefined, defaultValue: number | undefined = undefined): number | undefined => {
    if (field) {
        return parseInt(field);
    }
    return defaultValue;
};