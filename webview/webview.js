var ipc = require('electron').ipcRenderer;
var path = require('path');
var fs = require('fs');

function showAlert() {
	alert('Hello WebView');
}

function nodeApiTest() {
	var packagePath = path.join(__dirname, 'package.json');
	alert(fs.readFileSync(packagePath, 'utf8'));
}

function openDevTools() {
	ipc.sendToHost('openDevTools');
}