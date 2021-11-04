TODO :
- Input :
    - alias
    - properties :        
        - x DisableManageLink
        - x IsSearchable
        - x PopulateDefaultValue
        - x isVariableOrNonNegativeNumber
        - x editorExtension
        - x EndpointFilterRule
    - init pickList / connected with value not in list (Editable)
    - Binding    
    - handle event change
        - connected service
        - picklist

- BashV3 : evaluate invisibleRule "x = y" where y is field and value.

DONE :
- refresh
- validate parsing
- Group :
    - isExpanded
    - not visible if empty
    - dynamic update of visibility

- Input :
    - dynamic update of visibility
    - visibleRule
    - properties
        - defaultValue
        - resizable
        - rows
        - MultiSelect
        - MultiSelectFlatList
        - maxLength
        - EditableOptions
    - int : number only
    - handle event change
        - Boolean
        - radio
        - int
        - multiline
        - string


    "$schema": "https://raw.githubusercontent.com/microsoft/azure-pipelines-task-lib/master/tasks.schema.json",
    
Schema : missing or errors
    execution - HttpRequest
    execution - HttpRequestChain
    execution - Process
    execution - HttpRequest
    inputs item - required : boolean and string
    inputs item - resizable : boolean and string
    inputs item - properties - EditableOptions,IsSearchable,IsVariableOrNonNegativeNumber,MultiSelect,MultiSelectFlatList,PopulateDefaultValue : "True", "False" + "true", "false"
    OutputVariables item : visibleRule
    version : major, minor and path : number and string
    dataSourceBindings - RequestVerb : uppercase + lowercase + pascalcase
    execution, (prejobexecution and postjobexecution ?): AgentPlugin + ServiceBus + ManualValidation
    preview : boolean and string
    inputs item - validation
    category : "Tool"
    satisfies
    inputs item - groupName / groupname
    inputs item - defaultValue : string, boolean + number
    inputs item - helpMarkDown / helpMarkdown

