import * as wing from 'wing';

export function activate(context: wing.ExtensionContext) {
	console.log('Congratulations, your extension "HelloWing" is now active!');
	wing.commands.registerCommand('extension.helloWing', helloWing);
}

export function deactivate() {
}

function helloWing() {
	wing.window.showInformationMessage('Hello Wing');
}