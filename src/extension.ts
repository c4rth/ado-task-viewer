import * as vscode from 'vscode';
import { AzDoTaskPanel } from './views/AzDoTaskPanel';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('ado-task-viewer.viewTask', (uri: vscode.Uri | undefined) => viewTask(uri, context)));
}

export function deactivate() { }

function viewTask(uri: vscode.Uri | undefined, context: vscode.ExtensionContext) {
	uri = uri || vscode.window.activeTextEditor?.document.uri;
	if (!uri) { return; }
	AzDoTaskPanel.render(uri, context.extensionPath);
}
