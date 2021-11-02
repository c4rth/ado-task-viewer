import { AzureDevOpsTask, Group, Input } from "../../../src/models/AzureDevOpsTask";
import evaluate from "../../evaluator/SimpleEvaluate";

export interface AdoInput extends Input {
    isVisible: boolean;
    value?: boolean | string;
}

export interface AdoGroup extends Group {
    adoInputs: Map<string, AdoInput>
    isVisible: boolean;
}

export interface AdoTask {
    adoGroups: Map<string, AdoGroup>
    adoInputs: Map<string, AdoInput>
}

function getInputsOfGroup(azureDevOpsTask: AzureDevOpsTask, groupName?: string): Map<string, AdoInput> {
    const adoInputs = new Map<string, AdoInput>();
    azureDevOpsTask.inputs?.filter(input => {
        return input.groupName === groupName;
    }).forEach(input => {
        const adoInput: AdoInput = { ...input, isVisible: true, value: input.defaultValue };
        adoInputs.set(adoInput.name, adoInput);
    });
    return adoInputs;
}

const getValue = (context: object, expr: string) => (context as AdoTask).adoInputs.get(expr)?.value ?? expr;

export function updateVisibilities(adoTask : AdoTask) {
    [...adoTask.adoGroups.values()].map((adoGroup) => {
        if (adoGroup.visibleRule) {
            adoGroup.isVisible = evaluate(adoTask, adoGroup.visibleRule, { getValue });
            // console.log("evaluate group : [" + adoGroup.visibleRule + "] --> " + adoGroup.isVisible);
        }
        if (adoGroup.isVisible) {
            [...adoGroup.adoInputs.values()].map((adoInput) => {
                if (adoInput.visibleRule) {
                    adoInput.isVisible = evaluate(adoTask, adoInput.visibleRule, { getValue });
                    // console.log("evaluate input : [" + adoInput.visibleRule + "] --> " + adoInput.isVisible);
                }
            });
        }
    });
}

export function convertToAdoTask(azureDevOpsTask: AzureDevOpsTask): AdoTask {
    const adoGroups = new Map<string, AdoGroup>();
    var adoInputs = new Map<string, AdoInput>();
    // Default group
    const inputs = getInputsOfGroup(azureDevOpsTask, undefined);
    if (inputs && inputs.size > 0) {
        adoInputs = new Map([...adoInputs, ...inputs]);
        const adoGroup: AdoGroup = { displayName: "", isExpanded: true, name: "", visibleRule: undefined, adoInputs: inputs, isVisible: true };
        adoGroups.set(adoGroup.name, adoGroup);
    }
    // All groups
    azureDevOpsTask.groups?.forEach(group => {
        const inputs = getInputsOfGroup(azureDevOpsTask, group.name);
        if (inputs && inputs.size > 0) {
            adoInputs = new Map([...adoInputs, ...inputs]);
            const adoGroup: AdoGroup = { ...group, adoInputs: inputs, isVisible: true };
            adoGroups.set(group.name, adoGroup);
        }
    });
    const adoTask : AdoTask = { adoGroups: adoGroups, adoInputs: adoInputs };
    updateVisibilities(adoTask);
    return adoTask;
}