import { Input } from "../../../src/models/AzureDevOpsTask";

export interface ITaskInputProps {
    input: Input;
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