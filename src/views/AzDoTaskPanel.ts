import * as vscode from "vscode";
import * as path from "path";
import { ViewColumn } from "vscode";
import { AzureDevOpsTask } from "../models/AzureDevOpsTask";
import { Message } from "./messages/MessageTypes";

export class AzDoTaskPanel {
    public static currentPanel: AzDoTaskPanel | undefined;
    public readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];
    public readonly _extensionUri: vscode.Uri;
    public readonly _fileUri: vscode.Uri;

    private constructor(panel: vscode.WebviewPanel, fileUri: vscode.Uri, fileContent: string, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._extensionUri = extensionUri;
        this._fileUri = fileUri;

        this._renderWebview(fileContent);

        this._panel.webview.onDidReceiveMessage(
            (message) => {
                this._handleMessage(message);
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

    public static render(fileUri: vscode.Uri, extensionUri: vscode.Uri) {
        vscode.workspace.openTextDocument(fileUri).then((document) => {
            const fileContent = document.getText();
            if (AzDoTaskPanel.currentPanel) {
                AzDoTaskPanel.currentPanel._renderWebview(fileContent);
                AzDoTaskPanel.currentPanel._panel.reveal(ViewColumn.One);
                vscode.commands.executeCommand('workbench.action.webview.reloadWebviewAction');
            } else {
                const panel = vscode.window.createWebviewPanel("ado-task", "Loading...", vscode.ViewColumn.One, {
                    enableScripts: true,
                    //localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'out', 'app'))],
                    retainContextWhenHidden: true
                });
                AzDoTaskPanel.currentPanel = new AzDoTaskPanel(panel, fileUri, fileContent, extensionUri);
            }
        });
    }

    private _handleMessage(message: any): any {
        if (message.type === 'RELOAD') {
            if (AzDoTaskPanel.currentPanel) {
                AzDoTaskPanel.render(AzDoTaskPanel.currentPanel._fileUri, AzDoTaskPanel.currentPanel._extensionUri);
            }
        } else if (message.type === 'OPENURL') {
            vscode.env.openExternal(vscode.Uri.parse(message.payload));
        } else if (message.type === 'SETTITLE') {
            if (AzDoTaskPanel.currentPanel) {
                AzDoTaskPanel.currentPanel._panel.title = message.payload;
            }
        }
    }

    private _renderWebview(json: string) {
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

    private _getWebviewContent(fileContent: string): string {
        const mainAppUri = this._panel.webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'out', 'app', 'bundle.js'));
        const fileContentString = JSON.stringify(fileContent);
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
                const azureDevOpsTaskJson = ${fileContentString};
            </script>
            <script src="${mainAppUri}"></script>
        </body>
        </html>`;
    }
}