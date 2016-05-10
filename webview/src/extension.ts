import * as wing from 'wing';
import * as path from 'path';

export function activate(context: wing.ExtensionContext) {
	let html = wing.Uri.file(path.join(context.extensionPath, 'web/index.html'));

	wing.window.webviews.forEach(webview => {
		webviewAdded(webview);
	});

	wing.window.onDidCreateWebView((webview) => {
		webviewAdded(webview);
	});

	wing.window.onDidDeleteWebView((webview) => {
		webviewRemoved(webview);
	});

	wing.commands.registerCommand('extension.previewWebView', () => {
		previewWebView(html);
	});
	wing.commands.registerCommand('extension.showWebViewPopup', () => {
		showWebViewPopup(html);
	});
}

function webviewAdded(webview: wing.WebView) {
	webview.addEventListener('ipc-message', (message) => {
		wing.window.showInformationMessage('Message From WebView: ' + message.channel, ...message.args);
		webview.send('pong');
	});
}

function webviewRemoved(webview: wing.WebView) {
}

function previewWebView(html: wing.Uri) {
	wing.complexCommands.previewWebView(html, 'WebViewTest');
}

function showWebViewPopup(html: wing.Uri) {
	wing.window.showPopup<wing.IWebViewOptions>(wing.PopupType.WebView, {
		uri: html
	}, {
		position: wing.PopupPosition.MIDDLE,
		width: 600,
		height: 400,
		title: '测试',
		movable: true,
		closeButton: true,
		modal: true
	});
}