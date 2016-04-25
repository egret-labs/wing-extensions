import * as wing from 'wing';
import * as popup from './actions/popup';

export function activate(context: wing.ExtensionContext) {
	wing.commands.registerCommand('extension.formPopup', run);
}

export function deactivate() {
}

function run() {
	popup.show();
}