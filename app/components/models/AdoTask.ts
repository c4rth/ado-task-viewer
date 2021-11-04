import { AzureDevOpsTask, DataSourceBinding, Group, Input } from "../../../src/models/AzureDevOpsTask";
import { IVisibilityRule } from "../../helper/models";
import { VisibilityHelper } from "../../helper/VisibilityHelper";

export interface AdoInput extends Input {
    isVisible: boolean
    value?: boolean | string | number | undefined
    visibilityRule?: IVisibilityRule
    dataSourceBinding?: DataSourceBinding
}

export interface AdoGroup extends Group {
    adoInputs: Map<string, AdoInput>
    isVisible: boolean
    visibilityRule?: IVisibilityRule
}

export interface AdoTask {
    adoGroups: Map<string, AdoGroup>
    adoInputs: Map<string, AdoInput>
}

function _getInputsOfGroup(azureDevOpsTask: AzureDevOpsTask, groupName?: string): Map<string, AdoInput> {
    const adoInputs = new Map<string, AdoInput>();
    azureDevOpsTask.inputs?.filter(input => {
        return input.groupName === groupName;
    }).forEach(input => {
        const bindings = azureDevOpsTask.dataSourceBindings?.filter((binding) =>  binding.target === input.name);
        const adoInput: AdoInput = { ...input, isVisible: true, value: input.defaultValue, dataSourceBinding: bindings ? bindings[0] : null };
        adoInputs.set(adoInput.name, adoInput);
    });
    return adoInputs;
}

export function updateVisibilities(adoTask: AdoTask) {
    [...adoTask.adoGroups.values()].map((adoGroup) => {
        if (adoGroup.visibilityRule) {
            adoGroup.isVisible = VisibilityHelper.evaluateVisibility(adoGroup.visibilityRule, adoTask.adoInputs);
            //console.log("evaluate group '" + adoGroup.name + "': [" + adoGroup.visibleRule + "] --> " + adoGroup.isVisible);
        }
        if (adoGroup.isVisible) {
            [...adoGroup.adoInputs.values()].map((adoInput) => {
                if (adoInput.visibilityRule) {
                    adoInput.isVisible = VisibilityHelper.evaluateVisibility(adoInput.visibilityRule, adoTask.adoInputs);
                    //console.log("evaluate input '" + adoInput.name + "': [" + adoInput.visibleRule + "] --> " + adoInput.isVisible);
                }
            });
        }
    });
}

function _parseVisibleRules(adoTask: AdoTask) {
    [...adoTask.adoGroups.values()].map((adoGroup) => {
        if (adoGroup.visibleRule) {
            adoGroup.visibilityRule = VisibilityHelper.parseVisibleRule(adoGroup.visibleRule);
        }
        [...adoGroup.adoInputs.values()].map((adoInput) => {
            if (adoInput.visibleRule) {
                adoInput.visibilityRule = VisibilityHelper.parseVisibleRule(adoInput.visibleRule);
            }
        });
    });
}

export function convertToAdoTask(azureDevOpsTask: AzureDevOpsTask): AdoTask {
    const adoGroups = new Map<string, AdoGroup>();
    var adoInputs = new Map<string, AdoInput>();
    // Default group
    const inputs = _getInputsOfGroup(azureDevOpsTask, undefined);
    if (inputs && inputs.size > 0) {
        adoInputs = new Map([...adoInputs, ...inputs]);
        const adoGroup: AdoGroup = { displayName: "", isExpanded: true, name: "", visibleRule: undefined, adoInputs: inputs, isVisible: true };
        adoGroups.set(adoGroup.name, adoGroup);
    }
    // All groups
    azureDevOpsTask.groups?.forEach(group => {
        const inputs = _getInputsOfGroup(azureDevOpsTask, group.name);
        if (inputs && inputs.size > 0) {
            adoInputs = new Map([...adoInputs, ...inputs]);
            const adoGroup: AdoGroup = { ...group, adoInputs: inputs, isVisible: true };
            adoGroups.set(group.name, adoGroup);
        }
    });
    const adoTask: AdoTask = { adoGroups: adoGroups, adoInputs: adoInputs };
    _parseVisibleRules(adoTask);
    updateVisibilities(adoTask);
    return adoTask;
}