import electron = require('electron');
import path = require('path');
import fs = require('fs');

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