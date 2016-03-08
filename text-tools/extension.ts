import * as wing from 'wing';
import Window = wing.window;
import QuickPickItem = wing.QuickPickItem;
import Document = wing.TextDocument;
import Position = wing.Position;
import Range = wing.Range;
import Selection = wing.Selection;
import TextDocument = wing.TextDocument;
import TextEditor = wing.TextEditor;

var figlet = require('figlet');
import us = require('underscore.string');

export function activate() {
	console.log('Congratulations, your extension "TextTools" is now active!');
	wing.commands.registerCommand('extension.textFunctions', textFunctions);
}

// String Functions Helper//////////////////////////////
function toUpper(e: TextEditor, d: TextDocument, sel: Selection) {
	// itterate through the elections and convert all text to Upper
    e.edit(function(edit) {
        let txt: string = d.getText(new Range(sel.start, sel.end));
        edit.replace(sel, txt.toUpperCase());
    });
}

function toLower(e: TextEditor, d: TextDocument, sel: Selection) {
	// itterate through the elections and convert all text to Upper
    e.edit(function(edit) {
        let txt: string = d.getText(new Range(sel.start, sel.end));
        edit.replace(sel, txt.toLowerCase());
    });
}

// This function takes a callback function for the text formatting 'formatCB', 
// if there are any args pass an array as 'argsCB'
function processSelection(e: TextEditor, d: TextDocument, sel: Selection, formatCB, argsCB) {
	var replaceRange: Selection;
	e.edit(function(edit) {
		// itterate through the selections
        let txt: string = d.getText(new Range(sel.start, sel.end));
        if (argsCB.length > 0) {
            argsCB.splice(0, 0, txt);
            txt = formatCB.apply(this, argsCB);
        } else {
            txt = formatCB(txt);
        }
        
        //replace the txt in the current select and work our any range adjustments
        edit.replace(sel, txt);
        let startPos: Position = new Position(sel.start.line, sel.start.character);
        let endPos: Position = new Position(sel.start.line + txt.split(/\r\n|\r|\n/).length - 1, sel.start.character + txt.length);
        replaceRange = new Selection(startPos, endPos);
	});
	e.selection = replaceRange;
}

// Main menu /////////////////////////////////////
function textFunctions() {
	var items: QuickPickItem[] = [];

	items.push({ label: "toUpper", description: "Convert [aBc] to [ABC]" });
	items.push({ label: "toLower", description: "Convert [aBc] to [abc]" });
	items.push({ label: "swapCase", description: "Convert [aBc] to [AbC]" });
	items.push({ label: "Titleize", description: "Convert [hello world] to [Hello World]" });
	items.push({ label: "Clean String", description: "Convert [hello......world] to [hello world]" });
	items.push({ label: "Reverse", description: "Convert [hello world] to [world hello]" });
	items.push({ label: "Escape HTML", description: "Convert [<div>hello] to [&lt;div&gt;hello]" });
	items.push({ label: "UnEscape HTML", description: "Convert [&lt;div&gt;hello] to [<div>hello]" });
	items.push({ label: "ASCII Art", description: "Convert [hello] to ASCII Art" });

	Window.showQuickPick(items).then((selection) => {
		if (!selection) {
			return;
		}
		let e = Window.activeTextEditor;
        if (!e) {
            return;
        }
		let d = e.document;
		let sel = e.selection;

		switch (selection.label) {
			case "toUpper":
				toUpper(e, d, sel);
				break;
			case "toLower":
				toLower(e, d, sel);
				break;
			case "swapCase":
				processSelection(e, d, sel, us.swapCase, []);
				break;
			case "Titleize":
				processSelection(e, d, sel, us.titleize, []);
				break;
			case "Clean String":
				processSelection(e, d, sel, us.clean, []);
				break;
			case "Reverse":
				processSelection(e, d, sel, us.reverse, []);
				break;
			case "Escape HTML":
				processSelection(e, d, sel, us.escapeHTML, []);
				break;
			case "UnEscape HTML":
				processSelection(e, d, sel, us.unescapeHTML, []);
				break;
			case "ASCII Art":
				// build a full list of the fonts for the drop down
				items = [];
                figlet.fontsSync().forEach(function(font) {
					items.push({ label: font, description: "User the " + font + " font" });
				}, this);

				Window.showQuickPick(items).then(function(selection) {
                    if (!selection) {
                        return;
                    }
					processSelection(e, d, sel, figlet.textSync, [selection.label]);
				});
				break;
			default:
				console.log("hum this should not have happend - no selection")
				break;
		}
	});
}
