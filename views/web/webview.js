"use strict";
var path = require('path');
function showAlert() {
    alert('Hello WebView');
}
function nodeApiTest() {
    var packagePath = path.join(__dirname, '../package.json');
    alert(packagePath);
}
function openDevTools() {
    wing.webview.ipc.sendToHost('openDevTools');
}
