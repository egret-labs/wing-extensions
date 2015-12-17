declare namespace wing {
	/**
	 * Egret Wing's version
	 */
	export var version: string;
	
	/**
	 * Represents a reference to a command. Provides a title which
	 * will be used to represent a command in the UI and, optionally,
	 * an array of arguments which will be passed to the command handler
	 * function when invoked.
	 */
	export interface Command {
		/**
		 * Title of the command, like `save`.
		 */
		title: string;

		/**
		 * The identifier of the actual command handler.
		 * @see [commands.registerCommand](#commands.registerCommand).
		 */
		command: string;

		/**
		 * Arguments that the command handler should be
		 * invoked with.
		 */
		arguments?: any[];
	}
	
	/**
	 * Represents a line of text, such as a line of source code.
	 *
	 * TextLine objects are __immutable__. When a [document](#TextDocument) changes,
	 * previously retrieved lines will not represent the latest state.
	 */
	export interface TextLine {

		/**
		 * The zero-based line number.
		 *
		 * @readonly
		 */
		lineNumber: number;

		/**
		 * The text of this line without the line separator characters.
		 *
		 * @readonly
		 */
		text: string;

		/**
		 * The range this line covers without the line separator characters.
		 *
		 * @readonly
		 */
		range: Range;

		/**
		 * The range this line covers with the line separator characters.
		 *
		 * @readonly
		 */
		rangeIncludingLineBreak: Range;

		/**
		 * The offset of the first character which is not a whitespace character as defined
		 * by `/\s/`.
		 *
		 * @readonly
		 */
		firstNonWhitespaceCharacterIndex: number;

		/**
		 * Whether this line is whitespace only, shorthand
		 * for [TextLine.firstNonWhitespaceCharacterIndex](#TextLine.firstNonWhitespaceCharacterIndex]) === [TextLine.text.length](#TextLine.text.length).
		 *
		 * @readonly
		 */
		isEmptyOrWhitespace: boolean;
	}
	
	/**
	 * Represents a document, such as a source file. Text documents have
	 * [lines](#TextLine) and knowledge about an underlying resource like a file.
	 */
	export interface Document {
		/**
		 * The associated URI for this document. Most documents have the __file__-scheme, indicating that they
		 * represent files on disk. However, some documents may have other schemes indicating that they are not
		 * available on disk.
		 *
		 * @readonly
		 */
		uri: Uri;
		
		/**
		 * The file system path of the associated resource. Shorthand
		 * notation for [Document.uri.fsPath](#Document.uri.fsPath). Independent of the uri scheme.
		 *
		 * @readonly
		 */
		fileName: string;
	}
	
	/**
	 * Represents a text document, such as a source file. Text documents have
	 * [lines](#TextLine) and knowledge about an underlying resource like a file.
	 */
	export interface TextDocument extends Document {

		/**
		 * Is this document representing an untitled file.
		 *
		 * @readonly
		 */
		isUntitled: boolean;

		/**
		 * The identifier of the language associated with this document.
		 *
		 * @readonly
		 */
		languageId: string;

		/**
		 * The version number of this document (it will strictly increase after each
		 * change, including undo/redo).
		 *
		 * @readonly
		 */
		version: number;

		/**
		 * true if there are unpersisted changes.
		 *
		 * @readonly
		 */
		isDirty: boolean;

		/**
		 * Save the underlying file.
		 *
		 * @return A promise that will resolve to true when the file
		 * has been saved.
		 */
		save(): Thenable<boolean>;

		/**
		 * The number of lines in this document.
		 *
		 * @readonly
		 */
		lineCount: number;

		/**
		 * Returns a text line denoted by the line number. Note
		 * that the returned object is *not* live and changes to the
		 * document are not reflected.
		 *
		 * @param line A line number in [0, lineCount).
		 * @return A [line](#TextLine).
		 */
		lineAt(line: number): TextLine;

		/**
		 * Returns a text line denoted by the position. Note
		 * that the returned object is *not* live and changes to the
		 * document are not reflected.
		 *
		 * The position will be [adjusted](#TextDocument.validatePosition).
		 *
		 * @see [TextDocument.lineAt](#TextDocument.lineAt)
		 * @param position A position.
		 * @return A [line](#TextLine).
		 */
		lineAt(position: Position): TextLine;

		/**
		 * Converts the position to a zero-based offset.
		 *
		 * The position will be [adjusted](#TextDocument.validatePosition).
		 *
		 * @param position A position.
		 * @return A valid zero-based offset.
		 */
		offsetAt(position: Position): number;

		/**
		 * Converts a zero-based offset to a position.
		 *
		 * @param offset A zero-based offset.
		 * @return A valid [position](#Position).
		 */
		positionAt(offset: number): Position;

		/**
		 * Get the text of this document. A substring can be retrieved by providing
		 * a range. The range will be [adjusted](#TextDocument.validateRange).
		 *
		 * @param range Include only the text included by the range.
		 * @return The text inside the provided range or the entire text.
		 */
		getText(range?: Range): string;

		/**
		 * Get a word-range at the given position. By default words are defined by
		 * common separators, like space, -, _, etc. In addition, per languge custom
		 * [word definitions](#LanguageConfiguration.wordPattern) can be defined.
		 *
		 * The position will be [adjusted](#TextDocument.validatePosition).
		 *
		 * @param position A position.
		 * @return A range spanning a word, or `undefined`.
		 */
		getWordRangeAtPosition(position: Position): Range;

		/**
		 * Ensure a range is completely contained in this document.
		 *
		 * @param range A range.
		 * @return The given range or a new, adjusted range.
		 */
		validateRange(range: Range): Range;

		/**
		 * Ensure a position is contained in the range of this document.
		 *
		 * @param position A position.
		 * @return The given position or a new, adjusted position.
		 */
		validatePosition(position: Position): Position;
	}
	
	export enum EditorType {
		BaseEditor = 1,
		TextEditor = 2
	}
	
	export interface Editor {
		/**
		 * The document associated with this text editor. The document will be the same for the entire lifetime of this text editor.
		 */
		document: Document;
		
		type:EditorType;
	}
	
	/**
	 * Represents an editor that is attached to a [document](#TextDocument).
	 */
	export interface TextEditor extends Editor {
		/**
		 * The document associated with this text editor. The document will be the same for the entire lifetime of this text editor.
		 */
		document: TextDocument;

		/**
		 * The primary selection on this text editor. Shorthand for `TextEditor.selections[0]`.
		 */
		selection: Selection;

		/**
		 * The selections in this text editor. The primary selection is always at index 0.
		 */
		selections: Selection[];

		/**
		 * [readonly] Text editor options.
		 */
		options: TextEditorOptions;
		
		/**
		 * Perform an edit on the document associated with this text editor.
		 *
		 * The given callback-function is invoked with an [edit-builder](#TextEditorEdit) which must
		 * be used to make edits. Note that the edit-builder is only valid while the
		 * callback executes.
		 *
		 * @param callback A function which can make edits using an [edit-builder](#TextEditorEdit).
		 * @return A promise that resolves with a value indicating if the edits could be applied.
		 */
		edit(callback: (editBuilder: TextEditorEdit) => void): Thenable<boolean>;
	}
	
	/**
	 * A complex edit that will be applied in one transaction on a TextEditor.
	 * This holds a description of the edits and if the edits are valid (i.e. no overlapping regions, document was not changed in the meantime, etc.)
	 * they can be applied on a [document](#Document) associated with a [text editor](#TextEditor).
	 *
	 */
	export interface TextEditorEdit {
		/**
		 * Replace a certain text region with a new value.
		 * You can use \r\n or \n in `value` and they will be normalized to the current [document](#Document).
		 *
		 * @param location The range this operation should remove.
		 * @param value The new text this operation should insert after removing `location`.
		 */
		replace(location: Position | Range | Selection, value: string): void;

		/**
		 * Insert text at a location.
		 * You can use \r\n or \n in `value` and they will be normalized to the current [document](#Document).
		 * Although the equivalent text edit can be made with [replace](#TextEditorEdit.replace), `insert` will produce a different resulting selection (it will get moved).
		 *
		 * @param location The position where the new text should be inserted.
		 * @param value The new text this operation should insert.
		 */
		insert(location: Position, value: string): void;

		/**
		 * Delete a certain text region.
		 *
		 * @param location The range this operation should remove.
		 */
		delete(location: Range | Selection): void;
	}
	
	/**
	 * Represents a line and character position, such as
	 * the position of the cursor.
	 *
	 * Position objects are __immutable__. Use the [with](#Position.with) or
	 * [translate](#Position.translate) methods to derive new positions
	 * from an existing position.
	 */
	export class Position {

		/**
		 * The zero-based line value.
		 * @readonly
		 */
		line: number;

		/**
		 * The zero-based character value.
		 * @readonly
		 */
		character: number;

		/**
		 * @param line A zero-based line value.
		 * @param character A zero-based character value.
		 */
		constructor(line: number, character: number);

		/**
		 * Check if `other` is before this position.
		 *
		 * @param other A position.
		 * @return `true` if position is on a smaller line
		 * or on the same line on a smaller character.
		 */
		isBefore(other: Position): boolean;

		/**
		 * Check if `other` is before or equal to this position.
		 *
		 * @param other A position.
		 * @return `true` if position is on a smaller line
		 * or on the same line on a smaller or equal character.
		 */
		isBeforeOrEqual(other: Position): boolean;

		/**
		 * Check if `other` is after this position.
		 *
		 * @param other A position.
		 * @return `true` if position is on a greater line
		 * or on the same line on a greater character.
		 */
		isAfter(other: Position): boolean;

		/**
		 * Check if `other` is after or equal to this position.
		 *
		 * @param other A position.
		 * @return `true` if position is on a greater line
		 * or on the same line on a greater or equal character.
		 */
		isAfterOrEqual(other: Position): boolean;

		/**
		 * Check if `other` equals this position.
		 *
		 * @param other A position.
		 * @return `true` if the line and character of the given position are equal to
		 * the line and character of this position.
		 */
		isEqual(other: Position): boolean;

		/**
		 * Compare this to `other`.
		 *
		 * @param other A position.
		 * @return A number smaller than zero if this position is before the given position,
		 * a number greater than zero if this position is after the given position, or zero when
		 * this and the given position are equal.
		 */
		compareTo(other: Position): number;

		/**
		 * Create a new position relative to this position.
		 *
		 * @param lineDelta Delta value for the line value, default is `0`.
		 * @param characterDelta Delta value for the character value, default is `0`.
		 * @return A position which line and character is the sum of the current line and
		 * character and the corresponding deltas.
		 */
		translate(lineDelta?: number, characterDelta?: number): Position;

		/**
		 * Create a new position derived from this position.
		 *
		 * @param line Value that should be used as line value, default is the [existing value](#Position.line)
		 * @param character Value that should be used as character value, default is the [existing value](#Position.character)
		 * @return A position where line and character are replaced by the given values.
		 */
		with(line?: number, character?: number): Position;
	}

	/**
	 * A range represents an ordered pair of two positions.
	 * It is guaranteed that [start](#Range.start).isBeforeOrEqual([end](#Range.end))
	 *
	 * Range objects are __immutable__. Use the [with](#Range.with),
	 * [intersection](#Range.intersection), or [union](#Range.union) methods
	 * to derive new ranges from an existing range.
	 */
	export class Range {

		/**
		 * The start position. It is before or equal to [end](#Range.end).
		 * @readonly
		 */
		start: Position;

		/**
		 * The end position. It is after or equal to [start](#Range.start).
		 * @readonly
		 */
		end: Position;

		/**
		 * Create a new range from two positions. If `start` is not
		 * before or equal to `end`, the values will be swapped.
		 *
		 * @param start A position.
		 * @param end A position.
		 */
		constructor(start: Position, end: Position);

		/**
		 * Create a new range from number coordinates. It is a shorter equivalent of
		 * using `new Range(new Position(startLine, startCharacter), new Position(endLine, endCharacter))`
		 *
		 * @param startLine A zero-based line value.
		 * @param startCharacter A zero-based character value.
		 * @param endLine A zero-based line value.
		 * @param endCharacter A zero-based character value.
		 */
		constructor(startLine: number, startCharacter: number, endLine: number, endCharacter: number);

		/**
		 * `true` iff `start` and `end` are equal.
		 */
		isEmpty: boolean;

		/**
		 * `true` iff `start.line` and `end.line` are equal.
		 */
		isSingleLine: boolean;

		/**
		 * Check if a position or a range is contained in this range.
		 *
		 * @param positionOrRange A position or a range.
		 * @return `true` iff the position or range is inside or equal
		 * to this range.
		 */
		contains(positionOrRange: Position | Range): boolean;

		/**
		 * Check if `other` equals this range.
		 *
		 * @param other A range.
		 * @return `true` when start and end are [equal](#Position.isEqual) to
		 * start and end of this range.
		 */
		isEqual(other: Range): boolean;

		/**
		 * Intersect `range` with this range and returns a new range or `undefined`
		 * if the ranges have no overlap.
		 *
		 * @param range A range.
		 * @return A range of the greater start and smaller end positions. Will
		 * return undefined when there is no overlap.
		 */
		intersection(range: Range): Range;

		/**
		 * Compute the union of `other` with this range.
		 *
		 * @param other A range.
		 * @return A range of smaller start position and the greater end position.
		 */
		union(other: Range): Range;

		/**
		 * Create a new range derived from this range.
		 *
		 * @param start A position that should be used as start. The default value is the [current start](#Range.start).
		 * @param end A position that should be used as end. The default value is the [current end](#Range.end).
		 * @return A range derived from this range with the given start and end position.
		 * If start and end are not different this range will be returned.
		 */
		with(start?: Position, end?: Position): Range;
	}

	/**
	 * Represents a text selection in an editor.
	 */
	export class Selection extends Range {

		/**
		 * The position at which the selection starts.
		 * This position might be before or after [active](#Selection.active).
		 */
		anchor: Position;

		/**
		 * The position of the cursor.
		 * This position might be before or after [anchor](#Selection.anchor).
		 */
		active: Position;

		/**
		 * Create a selection from two postions.
		 *
		 * @param anchor A position.
		 * @param active A position.
		 */
		constructor(anchor: Position, active: Position);

		/**
		 * Create a selection from four coordinates.
		 *
		 * @param anchorLine A zero-based line value.
		 * @param anchorCharacter A zero-based character value.
		 * @param activeLine A zero-based line value.
		 * @param activeCharacter A zero-based character value.
		 */
		constructor(anchorLine: number, anchorCharacter: number, activeLine: number, activeCharacter: number);

		/**
		 * A selection is reversed if [active](#Selection.active).isBefore([anchor](#Selection.anchor)).
		 */
		isReversed: boolean;
	}
	
	/**
	 * Represents an event describing the change in a [text editor's selections](#TextEditor.selections).
	 */
	export interface TextEditorSelectionChangeEvent {
		/**
		 * The [text editor](#TextEditor) for which the selections have changed.
		 */
		textEditor: TextEditor;
		/**
		 * The new value for the [text editor's selections](#TextEditor.selections).
		 */
		selections: Selection[];
	}

	/**
	 * Represents an event describing the change in a [text editor's options](#TextEditor.options).
	 */
	export interface TextEditorOptionsChangeEvent {
		/**
		 * The [text editor](#TextEditor) for which the options have changed.
		 */
		textEditor: TextEditor;
		/**
		 * The new value for the [text editor's options](#TextEditor.options).
		 */
		options: TextEditorOptions;
	}

	/**
	 * Represents a [text editor](#TextEditor)'s [options](#TextEditor.options).
	 */
	export interface TextEditorOptions {

		/**
		 * The size in spaces a tab takes. This is used for two purposes:
		 *  - the rendering width of a tab character;
		 *  - the number of spaces to insert when [insertSpaces](#TextEditorOptions.insertSpaces) is true.
		 */
		tabSize: number;

		/**
		 * When pressing Tab insert [n](#TextEditorOptions.tabSize) spaces.
		 */
		insertSpaces: boolean;
	}
	
	/**
	 * An event describing an individual change in the text of a [document](#TextDocument).
	 */
	export interface TextDocumentContentChangeEvent {
		/**
		 * The range that got replaced.
		 */
		range: Range;
		/**
		 * The length of the range that got replaced.
		 */
		rangeLength: number;
		/**
		 * The new text for the range.
		 */
		text: string;
	}

	/**
	 * An event describing a transactional [document](#TextDocument) change.
	 */
	export interface TextDocumentChangeEvent {

		/**
		 * The affected document.
		 */
		document: TextDocument;

		/**
		 * An array of content changes.
		 */
		contentChanges: TextDocumentContentChangeEvent[];
	}
	
	/**
	 * Namespace for dealing with the current workspace. A workspace is the representation
	 * of the folder that has been opened. There is no workspace when just a file but not a
	 * folder has been opened.
	 *
	 * The workspace offers support for [listening](#workspace.createFileSystemWatcher) to fs
	 * events and for [finding](#workspace#findFiles) files. Both perform well and run _outside_
	 * the editor-process so that they should be always used instead of nodejs-equivalents.
	 */
	export namespace workspace {
		/**
		 * All text documents currently known to the system.
		 *
		 * @readonly
		 */
		export let documents: Document[];
        
        export let activeProject: Project;
        
        export function saveAll(): Thenable<Boolean>;
		
		/**
		 * Opens the denoted document from disk. Will return early if the
		 * document is already open, otherwise the document is loaded and the
		 * [open document](#workspace.onDidOpenDocument)-event fires.
		 * The document to open is denoted by the [uri](#Uri). Two schemes are supported:
		 *
		 * file: A file on disk, will be rejected if the file does not exist or cannot be loaded, e.g. 'file:///Users/frodo/r.ini'.
		 * untitled: A new file that should be saved on disk, e.g. 'untitled:/Users/frodo/new.js'. The language will be derived from the file name.
		 *
		 * Uris with other schemes will make this method return a rejected promise.
		 *
		 * @param uri Identifies the resource to open.
		 * @return A promise that resolves to a [document](#Document).
		 */
		export function openDocument(uri: Uri): Thenable<Document>;

		/**
		 * A short-hand for `openDocument(Uri.file(fileName))`.
		 *
		 * @see [openDocument](#openDocument)
		 * @param fileName A name of a file on disk.
		 * @return A promise that resolves to a [document](#Document).
		 */
		export function openDocument(fileName: string): Thenable<Document>;
		
		export function getProjects(): Project[];
		
		export function getProject(name: string): Project;
		
		/**
		 * An event that is emitted when a [text document](#Document) is opened.
		 */
		export const onDidOpenDocument: Event<Document>;

		/**
		 * An event that is emitted when a [text document](#Document) is disposed.
		 */
		export const onDidCloseDocument: Event<Document>;

		/**
		 * An event that is emitted when a [text document](#Document) is changed.
		 */
		export const onDidChangeTextDocument: Event<TextDocumentChangeEvent>;

		/**
		 * An event that is emitted when a [text document](#Document) is saved to disk.
		 */
		export const onDidSaveDocument: Event<Document>;
        
        export const onDidAddProject: Event<Project>;
        export const onDidRemoveProject: Event<Project>;
        export const onDidChangeActiveProject: Event<Project>;
	}
	
	export interface Project {
		uri: Uri;
		
		name: string;
	
		path: string;
	
		asRelativePath(pathOrUri: string|Uri): string;
	}
	
	/**
	 * Represents a type which can release resources, such
	 * as event listening or a timer.
	 */
	export class Disposable {

		/**
		 * Combine many disposable-likes into one. Use this method
		 * when having objects with a dispose function which are not
		 * instances of Disposable.
		 *
		 * @param disposableLikes Objects that have at least a `dispose`-function member.
		 * @return Returns a new disposable which, upon dispose, will
		 * dispose all provided disposables.
		 */
		static from(...disposableLikes: { dispose: () => any }[]): Disposable;

		/**
		 * Creates a new Disposable calling the provided function
		 * on dispose.
		 * @param callOnDispose Function that disposes something.
		 */
		constructor(callOnDispose: Function);

		/**
		 * Dispose this object.
		 */
		dispose(): any;
	}
	
	/**
	 * Represents a typed event.
	 *
	 * A function that represents an event to which you subscribe by calling it with
	 * a listener function as argument.
	 *
	 * @sample `item.onDidChange(function(event) { console.log("Event happened: " + event); });`
	 */
	export interface Event<T> {

		/**
		 * A function that represents an event to which you subscribe by calling it with
		 * a listener function as argument.
		 *
		 * @param listener The listener function will be called when the event happens.
		 * @param thisArgs The `this`-argument which will be used when calling the event listener.
		 * @param disposables An array to which a [disposeable](#Disposable) will be added.
		 * @return A disposable which unsubscribes the event listener.
		 */
		(listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable;
	}
	
	/**
	 * Represents an item that can be selected from
	 * a list of items.
	 */
	export interface QuickPickItem {

		/**
		 * A label. Will be rendered prominent.
		 */
		label: string;

		/**
		 * A description. Will be rendered less prominent.
		 */
		description: string;
	}
	
	/**
	 * A text edit represents edits that should be applied
	 * to a document.
	 */
	export class TextEdit {

		/**
		 * Utility to create a replace edit.
		 *
		 * @param range A range.
		 * @param newText A string.
		 * @return A new text edit object.
		 */
		static replace(range: Range, newText: string): TextEdit;

		/**
		 * Utility to create an insert edit.
		 *
		 * @param position A position, will become an empty range.
		 * @param newText A string.
		 * @return A new text edit object.
		 */
		static insert(position: Position, newText: string): TextEdit;

		/**
		 * Utility to create a delete edit.
		 *
		 * @param range A range.
		 * @return A new text edit object.
		 */
		static delete(range: Range): TextEdit;

		/**
		 * The range this edit applies to.
		 */
		range: Range;

		/**
		 * The string this edit will insert.
		 */
		newText: string;

		/**
		 * Create a new TextEdit.
		 *
		 * @param range A range.
		 * @param newText A string.
		 */
		constructor(range: Range, newText: string);
	}
	
	/**
	 * A universal resource identifier representing either a file on disk
	 * or another resource, like untitled resources.
	 */
	export class Uri {

		/**
		 * Create an URI from a file system path. The [scheme](#Uri.scheme)
		 * will be `file`.
		 *
		 * @param path A file system or UNC path.
		 * @return A new Uri instance.
		 */
		static file(path: string): Uri;

		/**
		 * Create an URI from a string. Will throw if the given value is not
		 * valid.
		 *
		 * @param value The string value of an Uri.
		 * @return A new Uri instance.
		 */
		static parse(value: string): Uri;

		/**
		 * Scheme is the `http` part of `http://www.msft.com/some/path?query#fragment`.
		 * The part before the first colon.
		 */
		scheme: string;

		/**
		 * Authority is the `www.msft.com` part of `http://www.msft.com/some/path?query#fragment`.
		 * The part between the first double slashes and the next slash.
		 */
		authority: string;

		/**
		 * Path is the `/some/path` part of `http://www.msft.com/some/path?query#fragment`.
		 */
		path: string;

		/**
		 * Query is the `query` part of `http://www.msft.com/some/path?query#fragment`.
		 */
		query: string;

		/**
		 * Fragment is the `fragment` part of `http://www.msft.com/some/path?query#fragment`.
		 */
		fragment: string;

		/**
		 * The string representing the corresponding file system path of this URI.
		 *
		 * Will handle UNC paths and normalize windows drive letters to lower-case. Also
		 * uses the platform specific path separator. Will *not* validate the path for
		 * invalid characters and semantics. Will *not* look at the scheme of this URI.
		 */
		fsPath: string;

		/**
		 * Returns a canonical representation of this URI. The representation and normalization
		 * of a URI depends on the scheme.
		 *
		 * @returns A string that is the encoded version of this Uri.
		 */
		toString(): string;

		/**
		 * Returns a JSON representation of this Uri.
		 *
		 * @return An object.
		 */
		toJSON(): any;
	}
	
	/**
	 * Namespace for dealing with commands. In short, a command is a function with a
	 * unique identifier. The function is sometimes also called _command handler_.
	 *
	 * Commands can be added to the editor using the [registerCommand](#commands.registerCommand)
	 * and [registerTextEditorCommand](#commands.registerTextEditorCommand) functions. Commands
	 * can be executed [manually](#commands.executeCommand) or from a UI gesture. Those are:
	 *
	 * * palette - Use the `commands`-section in `package.json` to make a command show in
	 * the [command palette](https://code.visualstudio.com/docs/editor/codebasics#_command-palette).
	 * * keybinding - Use the `keybindings`-section in `package.json` to enable
	 * [keybindings](https://code.visualstudio.com/docs/customization/keybindings#_customizing-shortcuts)
	 * for your extension.
	 *
	 * Commands from other extensions and from the editor itself are accessible to an extension. However,
	 * when invoking an editor command not all argument types are supported.
	 *
	 * This is a sample that registers a command handler and adds an entry for that command to the palette. First
	 * register a command handler with the identfier `extension.sayHello`.
	 * ```javascript
	 * commands.registerCommand('extension.sayHello', () => {
	 * 		window.showInformationMessage('Hello World!');
	 * });
	 * ```
	 * Second, bind the command identfier to a title under which it will show in the palette (`package.json`).
	 * ```json
	 * {
	 * "contributes": {
	 * 		"commands": [{
	 * 		"command": "extension.sayHello",
	 * 		"title": "Hello World"
	 * 	}]
	 * }
	 * ```
	 */
	export namespace commands {

		/**
		 * Registers a command that can be invoked via a keyboard shortcut,
		 * a menu item, an action, or directly.
		 *
		 * Registering a command with an existing command identifier twice
		 * will cause an error.
		 *
		 * @param command A unique identifier for the command.
		 * @param callback A command handler function.
		 * @param thisArg The `this` context used when invoking the handler function.
		 * @return Disposable which unregisters this command on disposal.
		 */
		export function registerCommand(command: string, callback: (...args: any[]) => any, thisArg?: any): Disposable;

		/**
		 * Registers a text editor command that can be invoked via a keyboard shortcut,
		 * a menu item, an action, or directly.
		 *
		 * Text editor commands are different from ordinary [commands](#commands.registerCommand) as
		 * they only execute when there is an active editor when the command is called. Also, the
		 * command handler of an editor command has access to the active editor and to an
		 * [edit](#TextEditorEdit)-builder.
		 *
		 * @param command A unique identifier for the command.
		 * @param callback A command handler function with access to an [editor](#TextEditor) and an [edit](#TextEditorEdit).
		 * @param thisArg The `this` context used when invoking the handler function.
		 * @return Disposable which unregisters this command on disposal.
		 */
		// export function registerTextEditorCommand(command: string, callback: (textEditor: TextEditor, edit: TextEditorEdit) => void, thisArg?: any): Disposable;

		/**
		 * Executes the command denoted by the given command identifier.
		 *
		 * When executing an editor command not all types are allowed to
		 * be passed as arguments. Allowed are the primitive types `string`, `boolean`,
		 * `number`, `undefined`, and `null`, as well as classes defined in this API.
		 * There are no restrictions when executing commands that have been contributed
		 * by extensions.
		 *
		 * @param command Identifier of the command to execute.
		 * @param rest Parameters passed to the command function.
		 * @return A thenable that resolves to the returned value of the given command. `undefined` when
		 * the command handler function doesn't return anything.
		 */
		export function executeCommand<T>(command: string, ...rest: any[]): Thenable<T>;

		/**
		 * Retrieve the list of all available commands.
		 *
		 * @return Thenable that resolves to a list of command ids.
		 */
		export function getCommands(): Thenable<string[]>;
	}
	
	/**
	 * Namespace for dealing with the current window of the editor. That is visible
	 * and active editors, as well as, UI elements to show messages, selections, and
	 * asking for user input.
	 */
	export namespace window {

		/**
		 * The currently active editor or undefined. The active editor is the one
		 * that currently has focus or, when none has focus, the one that has changed
		 * input most recently.
		 */
		export let activeEditor: Editor;
		
		/**
		 * The currently visible editors or an empty array.
		 */
		export let visibleEditors: Editor[];
		
		/**
		 * An [event](#Event) which fires when the [active editor](#window.activeTextEditor)
		 * has changed.
		 */
		export const onDidChangeActiveEditor: Event<Editor>;

		/**
		 * An [event](#Event) which fires when the selection in an editor has changed.
		 */
		export const onDidChangeTextEditorSelection: Event<TextEditorSelectionChangeEvent>;
		
		/**
		 * Show the given document in a text editor. A [column](#ViewColumn) can be provided
		 * to control where the editor is being shown. Might change the [active editor](#window.activeTextEditor).
		 *
		 * @param document A text document to be shown.
		 * @param column A view column in which the editor should be shown. The default is the [one](#ViewColumn.One), other values
		 * are adjusted to be __Min(column, columnCount + 1)__.
		 * @return A promise that resolves to an [editor](#TextEditor).
		 */
		export function showDocument(document: Document): Thenable<Editor>;
		
		/**
		 * Shows a selection list.
		 *
		 * @param items An array of strings, or a promise that resolves to an array of strings.
		 * @return A promise that resolves to the selection or undefined.
		 */
		export function showQuickPick(items: string[] | Thenable<string[]>): Thenable<string>;

		/**
		 * Shows a selection list.
		 *
		 * @param items An array of items, or a promise that resolves to an array of items.
		 * @return A promise that resolves to the selected item or undefined.
		 */
		export function showQuickPick<T extends QuickPickItem>(items: T[] | Thenable<T[]>): Thenable<T>;
	}
}

declare module 'wing' {
	export = wing;
}


/**
 * Thenable is a common denominator between ES6 promises, Q, jquery.Deferred, WinJS.Promise,
 * and others. This API makes no assumption about what promise libary is being used which
 * enables reusing existing code without migrating to a specific promise implementation. Still,
 * we recommend the use of native promises which are available in VS Code.
 */
interface Thenable<R> {
	/**
	* Attaches callbacks for the resolution and/or rejection of the Promise.
	* @param onfulfilled The callback to execute when the Promise is resolved.
	* @param onrejected The callback to execute when the Promise is rejected.
	* @returns A Promise for the completion of which ever callback is executed.
	*/
	then<TResult>(onfulfilled?: (value: R) => TResult | Thenable<TResult>, onrejected?: (reason: any) => TResult | Thenable<TResult>): Thenable<TResult>;
	then<TResult>(onfulfilled?: (value: R) => TResult | Thenable<TResult>, onrejected?: (reason: any) => void): Thenable<TResult>;
}

// ---- ES6 promise ------------------------------------------------------

/**
 * Represents the completion of an asynchronous operation.
 */
interface Promise<T> extends Thenable<T> {
	/**
	* Attaches callbacks for the resolution and/or rejection of the Promise.
	* @param onfulfilled The callback to execute when the Promise is resolved.
	* @param onrejected The callback to execute when the Promise is rejected.
	* @returns A Promise for the completion of which ever callback is executed.
	*/
	then<TResult>(onfulfilled?: (value: T) => TResult | Thenable<TResult>, onrejected?: (reason: any) => TResult | Thenable<TResult>): Promise<TResult>;
	then<TResult>(onfulfilled?: (value: T) => TResult | Thenable<TResult>, onrejected?: (reason: any) => void): Promise<TResult>;

	/**
	 * Attaches a callback for only the rejection of the Promise.
	 * @param onrejected The callback to execute when the Promise is rejected.
	 * @returns A Promise for the completion of the callback.
	 */
	catch(onrejected?: (reason: any) => T | Thenable<T>): Promise<T>;

	// [Symbol.toStringTag]: string;
}

interface PromiseConstructor {
	// /**
	//   * A reference to the prototype.
	//   */
	// prototype: Promise<any>;

	/**
	 * Creates a new Promise.
	 * @param executor A callback used to initialize the promise. This callback is passed two arguments:
	 * a resolve callback used to resolve the promise with a value or the result of another promise,
	 * and a reject callback used to reject the promise with a provided reason or error.
	 */
	new <T>(executor: (resolve: (value?: T | Thenable<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

	/**
	 * Creates a Promise that is resolved with an array of results when all of the provided Promises
	 * resolve, or rejected when any Promise is rejected.
	 * @param values An array of Promises.
	 * @returns A new Promise.
	 */
	all<T>(values: Array<T | Thenable<T>>): Promise<T[]>;

	/**
	 * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
	 * or rejected.
	 * @param values An array of Promises.
	 * @returns A new Promise.
	 */
	race<T>(values: Array<T | Thenable<T>>): Promise<T>;

	/**
	 * Creates a new rejected promise for the provided reason.
	 * @param reason The reason the promise was rejected.
	 * @returns A new rejected Promise.
	 */
	reject(reason: any): Promise<void>;

	/**
	 * Creates a new rejected promise for the provided reason.
	 * @param reason The reason the promise was rejected.
	 * @returns A new rejected Promise.
	 */
	reject<T>(reason: any): Promise<T>;

	/**
	  * Creates a new resolved promise for the provided value.
	  * @param value A promise.
	  * @returns A promise whose internal state matches the provided promise.
	  */
	resolve<T>(value: T | Thenable<T>): Promise<T>;

	/**
	 * Creates a new resolved promise.
	 * @returns A resolved promise.
	 */
	resolve(): Promise<void>;

	// [Symbol.species]: Function;
}

declare var Promise: PromiseConstructor;