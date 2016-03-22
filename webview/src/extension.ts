import * as wing from 'wing';
import * as path from 'path';

export function activate(context: wing.ExtensionContext) {
	wing.commands.registerCommand('extension.showWebView', () => {
		run(context);
	});
}

function run(context: wing.ExtensionContext) {
	let html = path.join(context.extensionPath, 'index.html');
	wing.complexCommands.previewWebView(wing.Uri.file(html), 'WebViewTest');
}