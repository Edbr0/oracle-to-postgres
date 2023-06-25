export const isVSCode = location.protocol === 'vscode-webview:'
export const isLocalMode = isVSCode
export const staticPath = isVSCode ? window.staticURI : ''