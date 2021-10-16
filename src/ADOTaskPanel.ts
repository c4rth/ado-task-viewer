import * as vscode from "vscode";
import { getUri } from "./utilities/getUri";
import * as path from "path";
import { AzureDevOpsTask } from "./models/AzureDevOpsTask";

export class ADOTaskPanel {
    private readonly _panel: vscode.WebviewPanel;
    private readonly _adoTask: AzureDevOpsTask;
    private _disposables: vscode.Disposable[] = [];
    private readonly _extensionPath: string;

    private constructor(panel: vscode.WebviewPanel, adoTask: AzureDevOpsTask, extensionPath: string) {
        this._panel = panel;
        this._adoTask = adoTask;
        this._panel.onDidDispose(this.dispose, null, this._disposables);
        this._extensionPath = extensionPath;
        this._panel.webview.html = this._getWebviewContent(adoTask);
    }

    public static render(fileUri: vscode.Uri, extensionPath: string) {
        vscode.workspace.openTextDocument(fileUri).then((document) => {
            const json = document.getText();
            const adoTask: AzureDevOpsTask = JSON.parse(json);
            const panel = vscode.window.createWebviewPanel("ado-task", adoTask.name || "Undefined", vscode.ViewColumn.One, {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'out', 'app'))],
            });
            new ADOTaskPanel(panel, adoTask, extensionPath);
        });
    }

    public dispose() {
        console.log("ADOTaskPanel dispose");
        this._panel.dispose();

        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }

    private _getWebviewContent(adoTask: AzureDevOpsTask) {
		// Local path to main script run in the webview
		const reactAppPath = path.join(this._extensionPath, 'out', 'app', 'bundle.js');
		const reactAppUri = vscode.Uri.file(reactAppPath).with({ scheme: "vscode-resource" });
        const configJson = JSON.stringify(adoTask);
		return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Config View</title>
            <meta http-equiv="Content-Security-Policy"
                        content="default-src 'none';
                                 img-src https:;
                                 script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;
                                 style-src vscode-resource: 'unsafe-inline';">
            <script>
              window.acquireVsCodeApi = acquireVsCodeApi;
              window.initialData = ${configJson};
            </script>
        </head>
        <body>
            <div id="root"></div>
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