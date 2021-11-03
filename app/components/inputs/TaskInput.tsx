import { AdoInput } from "../models/AdoTask";

type OnChangeFunction = (key: string, value?: string | undefined) => void;

export interface TaskInputProps {
    adoInput: AdoInput;
    onChange?: OnChangeFunction | undefined;
}

export const evaluateFieldAsStringArray = (field: string | undefined | boolean): string[] => {
    if (field === undefined) {
        return [];
    }
    return field.toString().split(",");
};

export const evaluateFieldAsBoolean = (field: string | undefined | boolean, defaultValue: boolean = false): boolean => {
    if (field === undefined) { return defaultValue; }
    return field.toString().toLowerCase() === "true";
};

export const evaluateFieldAsInt = (field: string | undefined, defaultValue: number | undefined = undefined): number | undefined => {
    if (field === undefined) {
        return defaultValue;
    }
    return parseInt(field);
};