// To parse this data:
//
//   import { Convert, AzureDevOpsTask } from "./file";
//
//   const AzureDevOpsTask = Convert.toAzureDevOpsTask(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface AzureDevOpsTask {
    schema?: string;
    author?: string;
    /**
     * Where the task appears in Azure DevOps. Use the 'Azure *' categories for Azure DevOps and
     * Azure DevOps Server 2019. Use the other categories for Team Foundation Server 2018 and
     * below.
     */
    category?: Category;
    dataSourceBindings?: DataSourceBinding[];
    /**
     * Allows you to define a list of demands that a build agent requires to run this build task.
     */
    demands?: string[];
    /**
     * Task is deprecated only when the latest version is marked as deprecated. Deprecated tasks
     * appear at the end of searches under a section that is collapsed by default.
     */
    deprecated?: boolean;
    /**
     * Detailed description of what your task does
     */
    description?: string;
    /**
     * Execution options for this task
     */
    execution?: Execution;
    /**
     * Descriptive name (spaces allowed). Must be <= 40 chars
     */
    friendlyName?: string;
    /**
     * Describes groups that task properties may be logically grouped by in the UI.
     */
    groups?: Group[];
    helpMarkDown?: string;
    helpUrl?: string;
    /**
     * A unique guid for this task
     */
    id?: string;
    inputs?: Input[];
    /**
     * This is how the task will be displayed within the build step list - you can use variable
     * values by using $(variablename)
     */
    instanceNameFormat?: string;
    messages?: { [key: string]: any };
    minimumAgentVersion?: string;
    /**
     * Name with no spaces
     */
    name?: string;
    /**
     * Describes output variables of task.
     */
    outputVariables?: OutputVariable[];
    /**
     * Execution options for this task (on Post-Job stage)
     */
    postjobexecution?: Postjobexecution;
    /**
     * Execution options for this task (on Pre-Job stage)
     */
    prejobexecution?: Prejobexecution;
    preview?: boolean | string;
    releaseNotes?: string;
    /**
     * Restrictions on tasks
     */
    restrictions?: Restrictions;
    runsOn?: RunsOn[];
    /**
     * Toggles showing the environment variable editor in the task editor UI. Allows passing
     * environment variables to script based tasks.
     */
    showEnvironmentVariables?: boolean;
    sourceDefinitions?: SourceDefinition[];
    /**
     * Always update this when you release your task, so that the agents utilize the latest code.
     */
    version?: Version;
    visibility?: Visibility[];
}

/**
 * Where the task appears in Azure DevOps. Use the 'Azure *' categories for Azure DevOps and
 * Azure DevOps Server 2019. Use the other categories for Team Foundation Server 2018 and
 * below.
 */
export enum Category {
    AzureArtifacts = "Azure Artifacts",
    AzureBoards = "Azure Boards",
    AzurePipelines = "Azure Pipelines",
    AzureRepos = "Azure Repos",
    AzureTestPlans = "Azure Test Plans",
    Build = "Build",
    Deploy = "Deploy",
    Package = "Package",
    Test = "Test",
    Utility = "Utility",
}

export interface DataSourceBinding {
    callbackContextTemplate?: string;
    callbackRequiredTemplate?: string;
    dataSourceName?: string;
    endpointId?: string;
    endpointUrl?: string;
    initialContextTemplate?: string;
    parameters?: { [key: string]: any };
    requestContent?: string;
    RequestVerb?: RequestVerb;
    resultSelector?: string;
    resultTemplate?: string;
    target?: string;
}

export enum RequestVerb {
    Delete = "DELETE",
    Get = "GET",
    Head = "HEAD",
    Options = "OPTIONS",
    Patch = "PATCH",
    Post = "POST",
    Put = "PUT",
    Trace = "TRACE",
}

/**
 * Execution options for this task
 */
export interface Execution {
    Node?: ExecutionObject;
    Node10?: ExecutionObject;
    PowerShell?: ExecutionObject;
    PowerShell3?: ExecutionObject;
    HttpRequest?: HttpRequestObject;
    Process?: ProcessObject;
}

export interface ExecutionObject {
    argumentFormat?: string;
    platforms?: Platform[];
    /**
     * The target file to be executed. You can use variables here in brackets e.g.
     * $(currentDirectory)ilename.ps1
     */
    target: string;
    workingDirectory?: string;
}

export interface ProcessObject {
    argumentFormat?: string;
    platforms?: string;
    target: string;
    workingDirectory?: string;
}

export interface HttpRequestObject {
    execute?: HttpRequestExecuteObject;
}

export interface HttpRequestExecuteObject {
    endpointId?: string;
    endpointUrl?: string;
    method?: string;
    body?: string;
    headers?: string;
    waitForCompletion?: string;
    expression?: string;
}

export enum Platform {
    Windows = "windows",
}

export interface Group {
    displayName: string;
    isExpanded?: boolean;
    name: string;
    /**
     * Allow's you to define a rule which dictates when the group will be visible to a user, for
     * example "variableName1 != \"\" && variableName2 = value || variableName3 NotEndsWith
     * value"
     */
    visibleRule?: string;
}

export interface Input {
    aliases?: string[];
    /**
     * The default value to apply to this input.
     */
    defaultValue?: boolean | string | number;
    /**
     * Setting this to the name of a group defined in 'groups' will place the input into that
     * group.
     */
    groupName?: string;
    /**
     * Help to be displayed when hovering over the help icon for the input. To display URLs use
     * the format [Text To Display](http://Url)
     */
    helpMarkDown?: string;
    /**
     * The text displayed to the user for the input label
     */
    label: string;
    /**
     * The variable name to use to store the user-supplied value
     */
    name: string;
    options?: Options;
    properties?: Properties;
    /**
     * Whether the input is a required field (default is false).
     */
    required?: boolean | string;
    /**
     * The type that dictates the control rendered to the user.
     */
    type: string;
    /**
     * Allow's you to define a rule which dictates when the input will be visible to a user, for
     * example "variableName1 != \"\" && variableName2 = value || variableName3 NotEndsWith
     * value"
     */
    visibleRule?: string;
}

/**
 * The default value to apply to this input.
 */
export type Resizable = boolean | string;

export interface Properties {
    DisableManageLink?: DisableManageLink;
    EditableOptions?: EditableOptions;
    editorExtension?: string;
    EndpointFilterRule?: string;
    IsSearchable?: IsSearchable;
    isVariableOrNonNegativeNumber?: IsVariableOrNonNegativeNumber;
    maxLength?: string;
    MultiSelect?: MultiSelect;
    MultiSelectFlatList?: MultiSelectFlatList;
    PopulateDefaultValue?: PopulateDefaultValue;
    resizable?: Resizable;
    rows?: string;
}

export enum DisableManageLink {
    False = "False",
    True = "True",
}

export enum EditableOptions {
    False = "False",
    True = "True",
}

export enum IsSearchable {
    False = "False",
    True = "True",
}

export enum MultiSelect {
    False = "False",
    True = "True",
}

export enum MultiSelectFlatList {
    False = "False",
    True = "True",
}

export enum PopulateDefaultValue {
    False = "False",
    True = "True",
}

export enum IsVariableOrNonNegativeNumber {
    False = "false",
    True = "true",
}

export interface Options {
    [key: string]: any
}

export interface OutputVariable {
    /**
     * Detailed description of the variable
     */
    description?: string;
    /**
     * The variable name
     */
    name: string;
    visibleRule?: string;
}

/**
 * Execution options for this task (on Post-Job stage)
 */
export interface Postjobexecution {
    Node?: ExecutionObject;
    Node10?: ExecutionObject;
    PowerShell?: ExecutionObject;
    PowerShell3?: ExecutionObject;
}

/**
 * Execution options for this task (on Pre-Job stage)
 */
export interface Prejobexecution {
    Node?: ExecutionObject;
    Node10?: ExecutionObject;
    PowerShell?: ExecutionObject;
    PowerShell3?: ExecutionObject;
}

/**
 * Restrictions on tasks
 */
export interface Restrictions {
    /**
     * Restrictions on available task commands
     */
    commands?: Commands;
    /**
     * Restrictions on which variables can be set via commands
     */
    settableVariables?: SettableVariables;
}

/**
 * Restrictions on available task commands
 */
export interface Commands {
    mode?: Mode;
}

export enum Mode {
    Any = "any",
    Restricted = "restricted",
}

/**
 * Restrictions on which variables can be set via commands
 */
export interface SettableVariables {
    allowed?: string[];
}

export enum RunsOn {
    Agent = "Agent",
    DeploymentGroup = "DeploymentGroup",
    MachineGroup = "MachineGroup",
    Server = "Server",
    ServerGate = "ServerGate",
}

export interface SourceDefinition {
    authKey?: string;
    endpoint?: string;
    keySelector?: string;
    selector?: string;
    target?: string;
}

/**
 * Always update this when you release your task, so that the agents utilize the latest code.
 */
export interface Version {
    Major: number | string;
    Minor: number | string;
    Patch: number | string;
}

export enum Visibility {
    Build = "Build",
    Release = "Release",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toAzureDevOpsTask(json: string): AzureDevOpsTask {
        return cast(JSON.parse(json), r("AzureDevOpsTask"));
    }

    public static AzureDevOpsTaskToJson(value: AzureDevOpsTask): string {
        return JSON.stringify(uncast(value, r("AzureDevOpsTask")), null, 2);
    }

    public static validateAzureDevOpsTask(value: AzureDevOpsTask) {
        cast(value, r("AzureDevOpsTask"));
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw TypeError(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw TypeError(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) { return val; }
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) { }
        }
        return invalidValue(typs, val, key);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) { return val; }
        return invalidValue(cases, val, key);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) {
            return invalidValue("array", val, key);
        }
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val, key);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val, key);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") { return val; }
    if (typ === null) {
        if (val === null) { return val; }
        return invalidValue(typ, val, key);
    }
    if (typ === false) {
        return invalidValue(typ, val, key);
    }
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) { return transformEnum(typ, val); }
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val, key);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") { return transformDate(val); }
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "AzureDevOpsTask": o([
        { json: "$schema", js: "schema", typ: u(undefined, "") },
        { json: "author", js: "author", typ: u(undefined, "") },
        { json: "category", js: "category", typ: u(undefined, r("Category")) },
        { json: "dataSourceBindings", js: "dataSourceBindings", typ: u(undefined, a(r("DataSourceBinding"))) },
        { json: "demands", js: "demands", typ: u(undefined, a("")) },
        { json: "deprecated", js: "deprecated", typ: u(undefined, true) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "execution", js: "execution", typ: u(undefined, r("Execution")) },
        { json: "friendlyName", js: "friendlyName", typ: u(undefined, "") },
        { json: "groups", js: "groups", typ: u(undefined, a(r("Group"))) },
        { json: "helpMarkDown", js: "helpMarkDown", typ: u(undefined, "") },
        { json: "helpUrl", js: "helpURL", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "inputs", js: "inputs", typ: u(undefined, a(r("Input"))) },
        { json: "instanceNameFormat", js: "instanceNameFormat", typ: u(undefined, "") },
        { json: "messages", js: "messages", typ: u(undefined, m("any")) },
        { json: "minimumAgentVersion", js: "minimumAgentVersion", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "outputVariables", js: "outputVariables", typ: u(undefined, a(r("OutputVariable"))) },
        { json: "OutputVariables", js: "outputVariables", typ: u(undefined, a(r("OutputVariable"))) },
        { json: "postjobexecution", js: "postjobexecution", typ: u(undefined, r("Postjobexecution")) },
        { json: "prejobexecution", js: "prejobexecution", typ: u(undefined, r("Prejobexecution")) },
        { json: "preview", js: "preview", typ: u(undefined, u(true, "")) },
        { json: "releaseNotes", js: "releaseNotes", typ: u(undefined, "") },
        { json: "restrictions", js: "restrictions", typ: u(undefined, r("Restrictions")) },
        { json: "runsOn", js: "runsOn", typ: u(undefined, a(r("RunsOn"))) },
        { json: "showEnvironmentVariables", js: "showEnvironmentVariables", typ: u(undefined, true) },
        { json: "sourceDefinitions", js: "sourceDefinitions", typ: u(undefined, a(r("SourceDefinition"))) },
        { json: "version", js: "version", typ: u(undefined, r("Version")) },
        { json: "visibility", js: "visibility", typ: u(undefined, a(r("Visibility"))) },
    ], false),
    "DataSourceBinding": o([
        { json: "callbackContextTemplate", js: "callbackContextTemplate", typ: u(undefined, "") },
        { json: "callbackRequiredTemplate", js: "callbackRequiredTemplate", typ: u(undefined, "") },
        { json: "dataSourceName", js: "dataSourceName", typ: u(undefined, "") },
        { json: "endpointId", js: "endpointID", typ: u(undefined, "") },
        { json: "endpointUrl", js: "endpointURL", typ: u(undefined, "") },
        { json: "initialContextTemplate", js: "initialContextTemplate", typ: u(undefined, "") },
        { json: "parameters", js: "parameters", typ: u(undefined, m("any")) },
        { json: "requestContent", js: "requestContent", typ: u(undefined, "") },
        { json: "RequestVerb", js: "requestVerb", typ: u(undefined, r("RequestVerb")) },
        { json: "resultSelector", js: "resultSelector", typ: u(undefined, "") },
        { json: "resultTemplate", js: "resultTemplate", typ: u(undefined, "") },
        { json: "target", js: "target", typ: u(undefined, "") },
    ], false),
    "Execution": o([
        { json: "Node", js: "node", typ: u(undefined, r("ExecutionObject")) },
        { json: "Node10", js: "node10", typ: u(undefined, r("ExecutionObject")) },
        { json: "PowerShell", js: "powerShell", typ: u(undefined, r("ExecutionObject")) },
        { json: "PowerShell3", js: "powerShell3", typ: u(undefined, r("ExecutionObject")) },
        { json: "HttpRequest", js: "httpRequest", typ: u(undefined, r("HttpRequestObject")) },
        { json: "Process", js: "process", typ: u(undefined, r("ProcessObject")) },
    ], false),
    "ExecutionObject": o([
        { json: "argumentFormat", js: "argumentFormat", typ: u(undefined, "") },
        { json: "platforms", js: "platforms", typ: u(undefined, a(r("Platform"))) },
        { json: "target", js: "target", typ: "" },
        { json: "workingDirectory", js: "workingDirectory", typ: u(undefined, "") },
    ], "any"),
    "HttpRequestObject": o([
        { json: "execute", js: "execute", typ: u(undefined, r("HttpRequestExecuteObject")) },
    ], "any"),
    "HttpRequestExecuteObject": o([
        { json: "endpointId", js: "argumentFormat", typ: u(undefined, "") },
        { json: "endpointUrl", js: "argumentFormat", typ: u(undefined, "") },
        { json: "method", js: "argumentFormat", typ: u(undefined, "") },
        { json: "body", js: "argumentFormat", typ: u(undefined, "") },
        { json: "headers", js: "argumentFormat", typ: u(undefined, "") },
        { json: "waitForCompletion", js: "argumentFormat", typ: u(undefined, "") },
        { json: "expression", js: "argumentFormat", typ: u(undefined, "") },
    ], "any"),
    "ProcessObject": o([
        { json: "argumentFormat", js: "argumentFormat", typ: u(undefined, "") },
        { json: "platforms", js: "platforms", typ: u(undefined, a(r("Platform"))) },
        { json: "modifyEnvironment", js: "target", typ: u(undefined, "") },
        { json: "workingDirectory", js: "workingDirectory", typ: u(undefined, "") },
    ], "any"),
    "Group": o([
        { json: "displayName", js: "displayName", typ: "" },
        { json: "isExpanded", js: "isExpanded", typ: u(undefined, true) },
        { json: "name", js: "name", typ: "" },
        { json: "visibleRule", js: "visibleRule", typ: u(undefined, "") },
    ], false),
    "Input": o([
        { json: "aliases", js: "aliases", typ: u(undefined, a("")) },
        { json: "defaultValue", js: "defaultValue", typ: u(undefined, u(3.14, u(true, ""))) },
        { json: "groupName", js: "groupName", typ: u(undefined, "") },
        { json: "helpMarkDown", js: "helpMarkDown", typ: u(undefined, "") },
        { json: "label", js: "label", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "options", js: "options", typ: u(undefined, m("any")) },
        { json: "properties", js: "properties", typ: u(undefined, r("Properties")) },
        { json: "required", js: "required", typ: u(undefined, u(true, "")) },
        { json: "type", js: "type", typ: "" },
        { json: "visibleRule", js: "visibleRule", typ: u(undefined, "") },
    ], false),
    "Properties": o([
        { json: "DisableManageLink", js: "disableManageLink", typ: u(undefined, r("DisableManageLink")) },
        { json: "EditableOptions", js: "editableOptions", typ: u(undefined, r("EditableOptions")) },
        { json: "editorExtension", js: "editorExtension", typ: u(undefined, "") },
        { json: "EndpointFilterRule", js: "endpointFilterRule", typ: u(undefined, "") },
        { json: "IsSearchable", js: "isSearchable", typ: u(undefined, r("IsSearchable")) },
        { json: "isVariableOrNonNegativeNumber", js: "isVariableOrNonNegativeNumber", typ: u(undefined, r("IsVariableOrNonNegativeNumber")) },
        { json: "maxLength", js: "maxLength", typ: u(undefined, "") },
        { json: "MultiSelect", js: "multiSelect", typ: u(undefined, r("MultiSelect")) },
        { json: "MultiSelectFlatList", js: "multiSelectFlatList", typ: u(undefined, r("MultiSelectFlatList")) },
        { json: "PopulateDefaultValue", js: "populateDefaultValue", typ: u(undefined, r("PopulateDefaultValue")) },
        { json: "resizable", js: "resizable", typ: u(undefined, u(true, "")) },
        { json: "rows", js: "rows", typ: u(undefined, "") },
    ], "any"),
    "OutputVariable": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "name", js: "name", typ: "" },
        { json: "visibleRule", js: "visibleRule", typ: u(undefined, "") },
    ], false),
    "Postjobexecution": o([
        { json: "Node", js: "node", typ: u(undefined, r("ExecutionObject")) },
        { json: "Node10", js: "node10", typ: u(undefined, r("ExecutionObject")) },
        { json: "PowerShell", js: "powerShell", typ: u(undefined, r("ExecutionObject")) },
        { json: "PowerShell3", js: "powerShell3", typ: u(undefined, r("ExecutionObject")) },
    ], false),
    "Prejobexecution": o([
        { json: "Node", js: "node", typ: u(undefined, r("ExecutionObject")) },
        { json: "Node10", js: "node10", typ: u(undefined, r("ExecutionObject")) },
        { json: "PowerShell", js: "powerShell", typ: u(undefined, r("ExecutionObject")) },
        { json: "PowerShell3", js: "powerShell3", typ: u(undefined, r("ExecutionObject")) },
    ], false),
    "Restrictions": o([
        { json: "commands", js: "commands", typ: u(undefined, r("Commands")) },
        { json: "settableVariables", js: "settableVariables", typ: u(undefined, r("SettableVariables")) },
    ], false),
    "Commands": o([
        { json: "mode", js: "mode", typ: u(undefined, r("Mode")) },
    ], false),
    "SettableVariables": o([
        { json: "allowed", js: "allowed", typ: u(undefined, a("")) },
    ], false),
    "SourceDefinition": o([
        { json: "authKey", js: "authKey", typ: u(undefined, "") },
        { json: "endpoint", js: "endpoint", typ: u(undefined, "") },
        { json: "keySelector", js: "keySelector", typ: u(undefined, "") },
        { json: "selector", js: "selector", typ: u(undefined, "") },
        { json: "target", js: "target", typ: u(undefined, "") },
    ], false),
    "Version": o([
        { json: "Major", js: "major", typ: u(3.14, "") },
        { json: "Minor", js: "minor", typ: u(3.14, "") },
        { json: "Patch", js: "patch", typ: u(3.14, "") },
    ], false),
    "Category": [
        "Azure Artifacts",
        "Azure Boards",
        "Azure Pipelines",
        "Azure Repos",
        "Azure Test Plans",
        "Build",
        "Deploy",
        "Package",
        "Test",
        "Utility",
    ],
    "RequestVerb": [
        "DELETE",
        "GET",
        "HEAD",
        "OPTIONS",
        "PATCH",
        "POST",
        "PUT",
        "TRACE",
        "delete",
        "get",
        "head",
        "options",
        "patch",
        "post",
        "put",
        "trace",
        "Delete",
        "Get",
        "Head",
        "Options",
        "Patch",
        "Post",
        "Put",
        "Trace",
    ],
    "Platform": [
        "windows",
    ],
    "DisableManageLink": [
        "False",
        "True",
        "false",
        "true",
    ],
    "EditableOptions": [
        "False",
        "True",
        "false",
        "true",
    ],
    "IsSearchable": [
        "False",
        "True",
        "false",
        "true",
    ],
    "IsVariableOrNonNegativeNumber": [
        "False",
        "True",
        "false",
        "true",
    ],
    "MultiSelect": [
        "False",
        "True",
        "false",
        "true",
    ],
    "MultiSelectFlatList": [
        "False",
        "True",
        "false",
        "true",
    ],
    "PopulateDefaultValue": [
        "False",
        "True",
        "false",
        "true",
    ],
    "Mode": [
        "any",
        "restricted",
    ],
    "RunsOn": [
        "Agent",
        "DeploymentGroup",
        "MachineGroup",
        "Server",
        "ServerGate",
    ],
    "Visibility": [
        "Build",
        "Release",
    ],
};
