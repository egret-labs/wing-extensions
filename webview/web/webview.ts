import electron = require('electron');
import path = require('path');
import fs = require('fs');

function showAlert() {
	alert('Hello WebView');
}

function nodeApiTest() {
	var packagePath = path.join(__dirname, '../package.json');
	alert(fs.readFileSync(packagePath, 'utf8'));
}

function openDevTools() {
	wing.webview.ipc.sendToHost('openDevTools');
}

function sendToExtension() {
	wing.webview.ipc.sendToExtensionHost('ping', '1', '2');
}

function closeWebView() {
	wing.webview.ipc.close();
}

wing.webview.ipc.on('pong', function (event) {
	alert('Message From Extension: pong');
});