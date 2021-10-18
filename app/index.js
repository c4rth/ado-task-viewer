"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const App_1 = require("./App");
require("./index.css");
const Icons_1 = require("@fluentui/react/lib/Icons");
(0, Icons_1.initializeIcons)();
const vscode = window.acquireVsCodeApi();
ReactDOM.render(<App_1.default vscode={vscode} initialData={window.initialData}/>, document.getElementById("root"));
//# sourceMappingURL=index.js.map