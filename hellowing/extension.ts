import * as wing from 'wing';

export function activate() {
	console.log('Congratulations, your extension "HelloWing" is now active!');
	wing.commands.registerCommand('extension.helloWing', helloWing);
}

function helloWing() {
	wing.window.showInformationMessage('Hello Wing');
}