import * as vscode from 'vscode';
import { AzDoTaskPanel } from './AzDoTaskPanel';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('ado-task-viewer.adoTask', (uri: vscode.Uri | undefined) => adoTask(uri, context)));
}

export function deactivate() { }

function adoTask(uri: vscode.Uri | undefined, context: vscode.ExtensionContext) {
	uri = uri || vscode.window.activeTextEditor?.document.uri;
	if (!uri) { return; }
	AzDoTaskPanel.render(uri, context.extensionPath);
}
