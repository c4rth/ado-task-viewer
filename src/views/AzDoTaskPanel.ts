import * as vscode from "vscode";
import * as path from "path";
import { ViewColumn } from "vscode";
import { AzureDevOpsTask } from "../models/AzureDevOpsTask";
import { Message } from "./messages/messageTypes";

export class AzDoTaskPanel {
    public static currentPanel: AzDoTaskPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];
    private readonly _extensionPath: string;
    private readonly _fileUri: vscode.Uri;

    private constructor(panel: vscode.WebviewPanel, fileUri: vscode.Uri, azureDevOpsTask: AzureDevOpsTask, json: string, extensionPath: string) {
        this._panel = panel;
        this._extensionPath = extensionPath;
        this._fileUri = fileUri;

        this._renderWebview(azureDevOpsTask, json);

        this._panel.webview.onDidReceiveMessage(
            function (message: Message) {
                if (message.type === 'RELOAD') {
                    if (AzDoTaskPanel.currentPanel) {
                        AzDoTaskPanel.render(AzDoTaskPanel.currentPanel._fileUri, AzDoTaskPanel.currentPanel._extensionPath);
                    }
                }
            },
            null,
            this._disposables
        );
        this._panel.onDidDispose(
            () => {
                this.dispose();
            },
            null,
            this._disposables
        );
    }

    public static render(fileUri: vscode.Uri, extensionPath: string) {
        vscode.workspace.openTextDocument(fileUri).then((document) => {
            const json = document.getText();
            const azureDevOpsTask: AzureDevOpsTask = JSON.parse(json);
            if (AzDoTaskPanel.currentPanel) {
                AzDoTaskPanel.currentPanel._renderWebview(azureDevOpsTask, json);
                AzDoTaskPanel.currentPanel._panel.reveal(ViewColumn.One);
                vscode.commands.executeCommand('workbench.action.webview.reloadWebviewAction');
            } else {
                const panel = vscode.window.createWebviewPanel("ado-task", azureDevOpsTask.name || "Undefined", vscode.ViewColumn.One, {
                    enableScripts: true,
                    localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'out', 'app'))],
                    retainContextWhenHidden: true
                });
                AzDoTaskPanel.currentPanel = new AzDoTaskPanel(panel, fileUri, azureDevOpsTask, json, extensionPath);
            }
        });
    }

    private _renderWebview(azureDevOpsTask: AzureDevOpsTask, json: string) {
        this._panel.title = azureDevOpsTask.name || "Undefined";
        this._panel.webview.html = this._getWebviewContent(json);
    }

    public dispose() {
        if (AzDoTaskPanel.currentPanel) {
            const adoTaskPanel = AzDoTaskPanel.currentPanel;
            AzDoTaskPanel.currentPanel = undefined;
            adoTaskPanel._panel.dispose();
            while (adoTaskPanel._disposables.length) {
                const disposable = adoTaskPanel._disposables.pop();
                if (disposable) {
                    disposable.dispose();
                }
            }
        }
    }

    private _getWebviewContent(json: string): string {
        const mainAppPath = path.join(this._extensionPath, 'out', 'app', 'bundle.js');
        const mainAppUri = vscode.Uri.file(mainAppPath).with({ scheme: "vscode-resource" });
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <div id="root"></div>
            <script>
                const vscode = acquireVsCodeApi();
                const azureDevOpsTask = ${json};
            </script>
            <script src="${mainAppUri}"></script>
        </body>
        </html>`;
    }
}