import { AdoInput } from "../models/AdoTask";

type OnChangeFunction = (key: string, value?: string | boolean | undefined) => void;

export interface TaskInputProps {
    adoInput: AdoInput;
    onChange?: OnChangeFunction | undefined;
}

export const evaluateFieldAsStringArray = (value: string | boolean | number | undefined): string[] => {
    if (value === undefined) {
        return [];
    }
    return value.toString().split(",");
};

export const evaluateFieldAsBoolean = (value: string | boolean | number | undefined, defaultValue: boolean = false): boolean => {
    if (value === undefined) { return defaultValue; }
    return value.toString().toLowerCase() === "true";
};

export const evaluateFieldAsInt = (value: string | undefined, defaultValue: number | undefined = undefined): number | undefined => {
    if (value === undefined) {
        return defaultValue;
    }
    return parseInt(value);
};