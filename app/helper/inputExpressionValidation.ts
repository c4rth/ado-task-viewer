function isUrl(value: string): boolean {
    const regexp = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return regexp.test(value);
}

function isIpV4Address(value: string): boolean {
    const regexp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    return regexp.test(value);
}

function isEmail(value: string): boolean {
    const regexp = /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return regexp.test(value);
}

function isInRange(expression: string, value: string): boolean {
    const expr = expression.substring(9).slice(1, -1);
    const splitted = expr.split(",");
    const min = Number(splitted[1]);
    const max = Number(splitted[2]);
    const val = Number(value);
    return (min <= val) && (val <= max);
}

function isSha1(value: string): boolean {
    const regexp = /[a-fA-F0-9]{40}/;
    return regexp.test(value);
}

function isMatch(expression: string, value: string): boolean {
    const expr = expression.substring(7).slice(1, -1);
    const splitted = expr.match(/('.*?'|[^',\s]+)(?=\s*,|\s*$)/g);
    if (splitted === null || splitted.length < 3) {
        return false;
    }
    const rawRegex = splitted[1].slice(1, -1);
    const rawOptions = splitted[2].slice(1, -1).toLowerCase();
    const options = (rawOptions.includes("ignorecase") ? "i" : "") + (rawOptions.includes("multiline") ? "m" : "");
    
    const regex = new RegExp(rawRegex, options);
    return regex.test(value);
}

// https://github.com/Microsoft/azure-pipelines-tasks/blob/master/docs/taskinputvalidation.md
export function isExpressionValid(expression: string | undefined, value: string | undefined): boolean {
    if (!expression || expression.length === 0) {
        return true;
    }
    let result = false;
    try {
        if (expression.startsWith("isMatch(")) {
            result = (value) ? isMatch(expression, value) : false;
        } else if (expression.startsWith("isInRange(")) {
            result = (value) ? isInRange(expression, value) : false;
        } else if (expression.startsWith("isUrl(")) {
            result = (value) ? isUrl(value) : false;
        } else if (expression.startsWith("isIpV4Address(")) {
            result = (value) ? isIpV4Address(value) : false;
        } else if (expression.startsWith("isEmail(")) {
            result = (value) ? isEmail(value) : false;
        } else if (expression.startsWith("isSha1(")) {
            result = (value) ? isSha1(value) : false;
        } else if (expression.startsWith("length(")) {
            result = true; // TODO
        } else {
            result = false;
        }
    } catch (ex) {
        console.error(ex);
        return false;
    }
    return result;
}