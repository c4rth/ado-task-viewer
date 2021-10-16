import * as vscode from 'vscode';
import { ADOTaskPanel } from './ADOTaskPanel';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('ccoe-vsc-extension.adoTask', (uri: vscode.Uri | undefined) => adoTask(uri, context)));

	console.log("activate");
}

export function deactivate() { }

function adoTask(uri: vscode.Uri | undefined, context: vscode.ExtensionContext) {
	uri = uri || vscode.window.activeTextEditor?.document.uri;
	if (!uri) { return; }
	console.log("open : " + uri);
	ADOTaskPanel.render(uri, context.extensionPath);
}
