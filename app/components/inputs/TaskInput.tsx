import { Input } from "../../../src/models/AzureDevOpsTask";

export interface ITaskInputProps {
    input: Input;
}

export const defaultValueAsString = (input: Input) => {
    return input.defaultValue?.toString();
};

export const defaultValuesAsString = (input: Input) => {
    if (!input.defaultValue) {
        return [];
    }
    return input.defaultValue?.toString().split(",");
};

export const defaultValueAsBoolean = (input: Input) => {
    return input.defaultValue?.toString().toLowerCase() === 'true';
};