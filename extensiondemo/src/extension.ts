import * as wing from 'wing';
import * as showMessage from './actions/showMessage';
import * as showPopup from './actions/showPopup';

export function activate(context: wing.ExtensionContext) {
	wing.commands.registerCommand('extension.demo', run);
}

export function deactivate() {
}

interface ActionQuickPickItem extends wing.QuickPickItem {
	action: () => void;
}

function run() {
	var items: ActionQuickPickItem[] = [];

	items.push({ label: "1.Show Message", description: "", action: showMessage.action });
	items.push({ label: "2.Show Popup", description: "", action: showPopup.action });

	wing.window.showQuickPick(items).then((item) => {
		if (item) {
			item.action();
		}
	});
}