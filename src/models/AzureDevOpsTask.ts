// To parse this data:
//
//   import { Convert, AzureDevOpsTask } from "./file";
//
//   const azureDevOpsTask = Convert.toAzureDevOpsTask(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
/* eslint-disable */
export interface AzureDevOpsTask {
    $schema?: string;
    author?:  string;
    /**
     * Where the task appears in Azure DevOps. Use the 'Azure *' categories for Azure DevOps and
     * Azure DevOps Server 2019. Use the other categories for Team Foundation Server 2018 and
     * below.
     */
    category?:           Category;
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
    groups?:       Group[];
    helpMarkDown?: string;
    helpUrl?:      string;
    /**
     * A unique guid for this task
     */
    id?:     string;
    inputs?: Input[];
    /**
     * This is how the task will be displayed within the build step list - you can use variable
     * values by using $(variablename)
     */
    instanceNameFormat?:  string;
    messages?:            { [key: string]: any };
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
    preview?:         boolean;
    releaseNotes?:    string;
    /**
     * Restrictions on tasks
     */
    restrictions?: Restrictions;
    runsOn?:       RunsOn[];
    /**
     * Toggles showing the environment variable editor in the task editor UI. Allows passing
     * environment variables to script based tasks.
     */
    showEnvironmentVariables?: boolean;
    sourceDefinitions?:        SourceDefinition[];
    /**
     * Always update this when you release your task, so that the agents utilize the latest code.
     */
    version?:    Version;
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
    callbackContextTemplate?:  string;
    callbackRequiredTemplate?: string;
    dataSourceName?:           string;
    endpointId?:               string;
    endpointUrl?:              string;
    initialContextTemplate?:   string;
    parameters?:               { [key: string]: any };
    requestContent?:           string;
    RequestVerb?:              RequestVerb;
    resultSelector?:           string;
    resultTemplate?:           string;
    target?:                   string;
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
    Node?:        ExecutionObject;
    Node10?:      ExecutionObject;
    PowerShell?:  ExecutionObject;
    PowerShell3?: ExecutionObject;
}

export interface ExecutionObject {
    argumentFormat?: string;
    platforms?:      Platform[];
    /**
     * The target file to be executed. You can use variables here in brackets e.g.
     * $(currentDirectory)ilename.ps1
     */
    target:            string;
    workingDirectory?: string;
}

export enum Platform {
    Windows = "windows",
}

export interface Group {
    displayName: string;
    isExpanded?: boolean;
    name:        string;
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
    defaultValue?: boolean | string;
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
    name:        string;
    options?:    { [key: string]: any };
    properties?: Properties;
    /**
     * Whether the input is a required field (default is false).
     */
    required?: boolean;
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

export interface Properties {
    DisableManageLink?:             DisableManageLink;
    EditableOptions?:               EditableOptions;
    editorExtension?:               string;
    EndpointFilterRule?:            string;
    IsSearchable?:                  IsSearchable;
    isVariableOrNonNegativeNumber?: IsVariableOrNonNegativeNumber;
    maxLength?:                     string;
    MultiSelect?:                   MultiSelect;
    MultiSelectFlatList?:           MultiSelectFlatList;
    PopulateDefaultValue?:          PopulateDefaultValue;
    resizable?:                     boolean;
    rows?:                          string;
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

export interface OutputVariable {
    /**
     * Detailed description of the variable
     */
    description?: string;
    /**
     * The variable name
     */
    name: string;
}

/**
 * Execution options for this task (on Post-Job stage)
 */
export interface Postjobexecution {
    Node?:        ExecutionObject;
    Node10?:      ExecutionObject;
    PowerShell?:  ExecutionObject;
    PowerShell3?: ExecutionObject;
}

/**
 * Execution options for this task (on Pre-Job stage)
 */
export interface Prejobexecution {
    Node?:        ExecutionObject;
    Node10?:      ExecutionObject;
    PowerShell?:  ExecutionObject;
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
    authKey?:     string;
    endpoint?:    string;
    keySelector?: string;
    selector?:    string;
    target?:      string;
}

/**
 * Always update this when you release your task, so that the agents utilize the latest code.
 */
export interface Version {
    Major: number;
    Minor: number;
    Patch: number;
}

export enum Visibility {
    Build = "Build",
    Release = "Release",
}
/* eslint-enable */