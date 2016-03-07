import * as wing from 'wing';

export function action(): void {
	wing.window.showInformationMessage("This is an info message");
	wing.window.showErrorMessage("This is an error message");
	wing.window.showWarningMessage('This is a warn message');
	wing.window.showInformationMessage('This is a info message with callback', 'Show Again').then(value => {
		if (value == 'Show Again') {
			wing.window.showInformationMessage('Show Again');
		}
	});
}