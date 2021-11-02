import * as vscode from "vscode";
import * as path from "path";
import { ViewColumn } from "vscode";
import { AzureDevOpsTask, Convert } from "../models/AzureDevOpsTask";
import { CommonMessage, Message } from "./messages/messageTypes";

export class AzDoTaskPanel {
    public static currentPanel: AzDoTaskPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];
    private readonly _extensionPath: string;
    private readonly _fileUri: vscode.Uri;

    private constructor(panel: vscode.WebviewPanel, fileUri: vscode.Uri, adoTask: AzureDevOpsTask, extensionPath: string) {
        this._panel = panel;
        this._extensionPath = extensionPath;
        this._fileUri = fileUri;

        this._renderWebview(adoTask);

        this._panel.webview.onDidReceiveMessage(
            function (message: Message) {
                if (message.type === 'RELOAD') {
                    if (AzDoTaskPanel.currentPanel) {
                        AzDoTaskPanel.render(AzDoTaskPanel.currentPanel._fileUri, AzDoTaskPanel.currentPanel._extensionPath);
                    }
                } else if (message.type === 'COMMON') {
                    const text = (message as CommonMessage).payload;
                    vscode.window.showInformationMessage(`Received message from Webview: ${text}`);
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
            const adoTask: AzureDevOpsTask = JSON.parse(json);
            if (AzDoTaskPanel.currentPanel) {
                AzDoTaskPanel.currentPanel._renderWebview(adoTask);
                AzDoTaskPanel.currentPanel._panel.reveal(ViewColumn.One);
            } else {
                const panel = vscode.window.createWebviewPanel("ado-task", adoTask.name || "Undefined", vscode.ViewColumn.One, {
                    enableScripts: true,
                    localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'out', 'app'))],
                    retainContextWhenHidden: true
                });
                AzDoTaskPanel.currentPanel = new AzDoTaskPanel(panel, fileUri, adoTask, extensionPath);
            }
        });
    }

    private _renderWebview(adoTask: AzureDevOpsTask) {
        this._panel.title = adoTask.name || "Undefined";
        this._panel.webview.html = this._getWebviewContent(adoTask);
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

    private _getWebviewContent(adoTask: AzureDevOpsTask): string {
        const reactAppPath = path.join(this._extensionPath, 'out', 'app', 'bundle.js');
        const reactAppUri = vscode.Uri.file(reactAppPath).with({ scheme: "vscode-resource" });
        const configJson = JSON.stringify(adoTask);
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">            
            <script>
              window.acquireVsCodeApi = acquireVsCodeApi;
              window.initialData = ${configJson};
            </script>
        </head>
        <body>
            <div id="root"></div>
            <script>
                const vscode = acquireVsCodeApi();
            </script>
            <script src="${reactAppUri}"></script>
        </body>
        </html>`;
    }

    private _getNonce() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}