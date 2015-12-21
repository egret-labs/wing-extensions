/*
	EgretWing插件API定义文件，对应版本 2.5.0
*/

declare namespace wing {
	/**
	 * Egret Wing 的版本号
	 */
	export var version: string;
	
	/**
	 * 表示一行文本
	 */
	export interface TextLine {
        
		/**
		 * 从0开始的行数
		 *
		 * @readonly
		 */
		lineNumber: number;

		/**
		 * 去除换行符后的行文本内容
		 *
		 * @readonly
		 */
		text: string;

		/**
		 * 不包含换行符的行内容所在范围
		 *
		 * @readonly
		 */
		range: Range;

		/**
		 * 包含换行符的行内容所在范围
		 *
		 * @readonly
		 */
		rangeIncludingLineBreak: Range;

		/**
		 * 第一个非空字符的位置，非空字符包括\t。
		 *
		 * @readonly
		 */
		firstNonWhitespaceCharacterIndex: number;

		/**
		 * 该行是否仅包括非空, 当该值为true时，等效于
         * TextLine.firstNonWhitespaceCharacterIndex === TextLine.text.length
		 *
		 * @readonly
		 */
		isEmptyOrWhitespace: boolean;
	}
	
	/**
	 * 表示一个文档数据
	 */
	export interface Document {
		/**
		 * 关联文档的资源标识符，大多数文档都持有一个文件标示,表明它们代表了一个硬盘上的文件。
		 * 可是另一部分包含其他的标示，表明他们不是一个硬盘上的文件。
		 *
		 * @readonly
		 */
		uri: Uri;
		
		/**
		 * 关联资源在文件系统中的路径。
		 * 速记符号 [Document.uri.fsPath](#Document.uri.fsPath). 每个资源标识符具有唯一的该属性。
		 *
		 * @readonly
		 */
		fileName: string;
	}
	
	/**
	 * 表示一个文本文档数据，包含
	 * [lines](#TextLine) 和对应文件的相关信息
	 */
	export interface TextDocument extends Document {

		/**
		 * 该文本文档的语言id， 一般情况为该文档的扩展名。
		 *
		 * @readonly
		 */
		languageId: string;

		/**
		 * 该文本文档的版本号，每次文档内容改变版本将增加。
		 *
		 * @readonly
		 */
		version: number;

		/**
		 * 是否是被修改过，并且没有保存。
		 *
		 * @readonly
		 */
		isDirty: boolean;

		/**
		 * 保存对应的文件。
		 *
		 * @return A promise that will resolve to true when the file
		 * has been saved.
		 */
		save(): Thenable<boolean>;

		/**
		 * 文本文档的行数。
		 *
		 * @readonly
		 */
		lineCount: number;

		/**
		 * 返回指定行数的TextLine。
		 *
		 * @param line 在[0, lineCount)范围内的行数。
		 * @return 一个TextLine实例。
		 */
		lineAt(line: number): TextLine;

		/**
		 * 返回指定Position位置的TextLine。
         * 
         * 此方法会自动调整position为有效的Position。
		 *
		 * @see [TextDocument.lineAt](#TextDocument.lineAt)
		 * @param position 位置。
		 * @return 一个TextLine实例。
		 */
		lineAt(position: Position): TextLine;

		/**
         * 返回指定Position位置在文本文档中的偏移位置。
		 *
         * 此方法会自动调整position为有效的Position。
         * 
		 * @param position 位置。
		 * @return 从0开始的索引位置。
		 */
		offsetAt(position: Position): number;

		/**
         * 返回指定偏移位置对应的Position。
		 *
		 * @param offset 从0开始的索引位置。
		 * @return 一个Position实例。
		 */
		positionAt(offset: number): Position;

		/**
         * 返回指定Range范围对应的文本字符串。
         * 
         * 此方法会自动调整range为有效的Range对象。
		 *
		 * @param range 范围，如果不传入该参数，则获取所有的文本数据。
		 * @return 文本字符串。
		 */
		getText(range?: Range): string;

		/**
         * 返回指定Position位置单词的Range。
         * 
         * 此方法会自动调整position为有效的Position
		 *
		 * @param position 位置。
		 * @return 一个Range实例。
		 */
		getWordRangeAtPosition(position: Position): Range;

		/**
         * 将一个Range转换成该文本文档有效的Range对象。
		 *
		 * @param range 一个Range实例。
		 * @return 传入的Range或者已经被调整过的Range。
		 */
		validateRange(range: Range): Range;

		/**
		 * 将一个Position转换成该文本文档有效的Position对象。
		 *
		 * @param position 一个position。
		 * @return 传入的Position或者已经被调整过的Position。
		 */
		validatePosition(position: Position): Position;
	}
	
    /**
     * 编辑器类型。
     */
	export enum EditorType {
        /**
         * 基本编辑器。在EgretWing的文档窗口中，每一个窗口页都是一个编辑器。
         */
		BaseEditor = 1,
        /**
         * 文本编辑器。比如ts编辑器，json编辑器。注意：exml编辑器不属于TextEditor，因为该编辑器
         * 不仅包含文本编辑视图，还包含一个设计视图。同理RES之类的json文件编辑也不是单纯的文本编辑器。
         */
		TextEditor = 3
	}
	
    /**
     * 编辑器。在EgretWing的文档窗口中，每一个窗口页都是一个编辑器。
     */
	export interface Editor {
		/**
		 * 关联到该编辑器的文档。这个文档将会和这个编辑器含有相同的生命周期。
		 */
		document: Document;
		
        /**
         * 判断是否是指定类型的编辑器。
         * @param type 编辑器类型，使用wing.EditorType中的常量。
         */
		isTypeOf(type: EditorType): boolean;
	}
	
	/**
	 * 文本编辑器。比如ts编辑器，json编辑器。注意：exml编辑器不属于TextEditor，因为该编辑器
     * 不仅包含文本编辑视图，还包含一个设计视图。同理RES之类的json文件编辑也不是单纯的文本编辑器。
	 */
	export interface TextEditor extends Editor {
		/**
		 * 该编辑器对应的文本文档。 这个文档将会和这个文本编辑器含有相同的生命周期。
		 */
		document: TextDocument;

		/**
		 * 该文本编辑器的选中数据。
		 */
		selection: Selection;

		/**
		 * [readonly] 编辑器的设置选项。
		 */
		options: TextEditorOptions;
		
		/**
		 * 对关联文档执行一个编辑操作。 使用callback回调函数获取一个文本编辑对象TextEditorEdit。
		 *
		 * @param callback 创建编辑操作的回调函数，包含一个文本编辑对象TextEditorEdit。
		 * @return 包含是否操作成功参数的Thenable对象。
		 */
		edit(callback: (editBuilder: TextEditorEdit) => void): Thenable<boolean>;
	}
	
	/**
     * 表示一个文本编辑操作对象。该对象定义了一系列的文本编辑操作方法来改变编辑器中的文本数据。
	 */
	export interface TextEditorEdit {
		/**
		 * 将指定范围的文本替换为一个新值。
		 *
		 * @param location 要替换的文本范围。
		 * @param value 新的文本内容。如果该字符串中包含换行符(\n \r\n)则会被替换成编辑器所对应的换行符。
		 */
		replace(location: Position | Range | Selection, value: string): void;

		/**
		 * 在指定位置插入文本。
		 *
		 * @param location 要插入的文本位置。
		 * @param value 新的文本内容。如果该字符串中包含换行符(\n \r\n)则会被替换成编辑器所对应的换行符。
		 */
		insert(location: Position, value: string): void;

		/**
		 * 删除指定范围或者选中范围的文本。
		 *
		 * @param location 需删除的文本范围。
		 */
		delete(location: Range | Selection): void;
	}
	
	/**
	 * 表示一个行和列位置。
	 */
	export class Position {

		/**
		 * 从0开始的行数。
		 * @readonly
		 */
		line: number;

		/**
		 * 从0开始的列数。
		 * @readonly
		 */
		character: number;

		/**
		 * @param 从0开始的行数。
		 * @param 从0开始的列数。
		 */
		constructor(line: number, character: number);

		/**
         * 该位置是否在指定位置之前。
		 *
		 * @param other 要比较的位置。
		 * @return 如果该位置在指定位置之前，则返回`true`，否则返回`false`。
		 */
		isBefore(other: Position): boolean;

		/**
		 * 该位置是否在指定位置之前或者与指定位置相同。
		 *
		 * @param other 要比较的位置。
		 * @return 如果该位置在指定位置之前或者与指定位置相同，则返回`true`，否则返回`false`。
		 */
		isBeforeOrEqual(other: Position): boolean;

		/**
         * 该位置是否在指定位置之后。
		 *
		 * @param other 要比较的位置。
		 * @return 如果该位置在指定位置之后，则返回`true`，否则返回`false`。
		 */
		isAfter(other: Position): boolean;

		/**
		 * 该位置是否在指定位置之后或者与指定位置相同。
		 *
		 * @param other 要比较的位置。
		 * @return 如果该位置在指定位置之后或者与指定位置相同，则返回`true`，否则返回`false`。
		 */
		isAfterOrEqual(other: Position): boolean;

		/**
		 * 该位置是否与指定位置相同。
		 *
		 * @param other 要比较的位置。
		 * @return 如果该位置与指定位置相同，则返回`true`，否则返回`false`。
		 */
		isEqual(other: Position): boolean;

		/**
		 * 与指定位置做比较。
		 *
		 * @param other 要比较的位置。
		 * @return 如果自身在指定位置之前则返回负数, 如果自身在指定位置之前则返回正数,如果相同返回0。
		 */
		compareTo(other: Position): number;

		/**
		 * 创建一个相对于自身的位置。
		 * @param lineDelta 行差值,默认为`0`。
		 * @param characterDelta 列差值默认为 `0`。
		 * @return 返回传入的行差值和字符位置差值与自身的和。
		 */
		translate(lineDelta?: number, characterDelta?: number): Position;

		/**
		 * 创建一个新的位置。
		 *
		 * @param line 用于作为行数, 默认为 [existing value](#Position.line)。
		 * @param character 用于作为列数, 默认为 [existing value](#Position.character)。
		 * @return 一个以传入或默认值为行数和列数的位置。
		 */
		with(line?: number, character?: number): Position;
	}

	/**
     * 表示两个一段文本范围。start位置在end位置之前或者相同。
	 */
	export class Range {

		/**
		 * 起始位置,小于或等于 [end](#Range.end)。
		 * @readonly
		 */
		start: Position;

		/**
		 * 结束位置,大于或等于 [start](#Range.start)。
		 * @readonly
		 */
		end: Position;

		/**
		 * 根据两个位置创建一个新范围。如果start位置在end位置之后，则将互换start和end参数。
		 *
		 * @param start 起始位置。
		 * @param end 结束位置。
		 */
		constructor(start: Position, end: Position);

		/**
		 * 根据两组行列位置创建一个新范围。如果start表示的行列位置在end表示的行列位置之后，则将互换start和end表示的位置。
		 *
		 * @param startLine 从0开始的行数。
		 * @param startCharacter 从0开始的列数。
		 * @param endLine 从0开始的行数。
		 * @param endCharacter 从0开始的列数。
		 */
		constructor(startLine: number, startCharacter: number, endLine: number, endCharacter: number);

		/**
		 * 如果起始位置和终点位置相同，则返回`true`，否则返回`false`。
		 */
		isEmpty: boolean;

		/**
		 * 如果起始位置行数和终点位置行数相同，则返回`true`，否则返回`false`。
		 */
		isSingleLine: boolean;

		/**
		 * 检查该范围是否包含指定位置或范围。
		 *
		 * @param positionOrRange 一个位置或范围。
		 * @return 如果该范围包含指定位置或范围，则返回`true`，否则返回`false`。
		 */
		contains(positionOrRange: Position | Range): boolean;

		/**
		 * 检查该范围是否与指定范围相同。
		 *
		 * @param other 要比较的范围。
		 * @return 如果该范围与指定范围相同，则返回`true`，否则返回`false`。
		 */
		isEqual(other: Range): boolean;

		/**
		 * 返回与指定范围交集。如果没有交集则返回 `undefined`。
		 *
		 * @param range 一个范围。
		 * @return 相交的范围。
		 */
		intersection(range: Range): Range;

		/**
		 * 返回与指定范围的合集。
		 *
		 * @param other 一个范围。
		 * @return 合集的范围。
		 */
		union(other: Range): Range;

		/**
		 * 创建一个新的范围。
		 *
		 * @param start 起点的位置。 默认值是 [current start](#Range.start)。
		 * @param end 终点的位置。 默认值是 [current end](#Range.end)。
		 * @return 一个新的范围，如果起点和指定与自身相同则返回自身。
		 */
		with(start?: Position, end?: Position): Range;
	}

	/**
	 * 文本选中范围数据。
	 */
	export class Selection extends Range {

		/**
		 * 选中的起始位置。
		 * 这个位置可能在 [active](#Selection.active)之前或之后。
		 */
		anchor: Position;

		/**
		 * 光标的位置。
		 * 这个位置可能在[anchor](#Selection.anchor)之前或之后。
		 */
		active: Position;

		/**
		 * 创建一个选中范围数据。
		 *
		 * @param anchor 选中的起始位置。
		 * @param active 选中的终止位置。
		 */
		constructor(anchor: Position, active: Position);

		/**
		 * 创建一个选中范围数据。
		 *
		 * @param anchorLine 选中的起始行索引，从0开始。
		 * @param anchorCharacter 选中的起始列索引，从0开始。
		 * @param activeLine 选中的结束行索引，从0开始。
		 * @param activeCharacter 选中的结束列索引，从0开始。
		 */
		constructor(anchorLine: number, anchorCharacter: number, activeLine: number, activeCharacter: number);

		/**
         * 是否是反向选择。等效于[active](#Selection.active).isBefore([anchor](#Selection.anchor))。
		 */
		isReversed: boolean;
	}
	
	/**
	 * 描述[text editor's selections](#TextEditor.selections)改变的事件。
	 */
	export interface TextEditorSelectionChangeEvent {
		/**
		 * 选中数据改变的源 [text editor](#TextEditor) 。
		 */
		textEditor: TextEditor;
		/**
		 * 新的 [text editor's selections](#TextEditor.selections) 数据。
		 */
		selections: Selection[];
	}

	/**
	 * 描述[text editor's options](#TextEditor.options)改变的事件。
	 */
	export interface TextEditorOptionsChangeEvent {
		/**
		 * 选项数据改变的源 [text editor](#TextEditor)。
		 */
		textEditor: TextEditor;
		/**
		 * 新的 [text editor's options](#TextEditor.options) 数据。
		 */
		options: TextEditorOptions;
	}

	/**
	 * 表示 [text editor](#TextEditor)的 [options](#TextEditor.options)。
	 */
	export interface TextEditorOptions {

		/**
		 * 表示一个缩进占用的空间。这用来表示2个目的：
		 *  - 一个缩进的宽度;
		 *  - 当 [insertSpaces](#TextEditorOptions.insertSpaces) 为true时，一个缩进代表的空格数目。
		 */
		tabSize: number;

		/**
		 * 输入缩进时替换为 [n](#TextEditorOptions.tabSize) 个空格。
		 */
		insertSpaces: boolean;
	}
	
	/**
	 * 描述 [document](#TextDocument) 中文本改变的事件。
	 */
	export interface TextDocumentContentChangeEvent {
		/**
		 * 被替换的文本范围。
		 */
		range: Range;
		/**
		 * 范围内被替换的长度
		 */
		rangeLength: number;
		/**
		 * 被替换后范围内的新文本
		 */
		text: string;
	}

	/**
	 * 描述 [document](#TextDocument) 改变事件。
	 */
	export interface TextDocumentChangeEvent {

		/**
		 * 受影响的文本文档。
		 */
		document: TextDocument;

		/**
		 * 文本内容改变事件的数组。
		 */
		contentChanges: TextDocumentContentChangeEvent[];
	}
	
	/**
	 * 工作空间。
	 */
	export namespace workspace {
		/**
		 * 当前系统所记录的所有文档。
		 *
		 * @readonly
		 */
		export let documents: Document[];
        
        /**
         * 当前激活的项目。
         */
        export let activeProject: Project;
        
        /**
         * 保存所有未保存的文档。
         */
        export function saveAll(): Thenable<Boolean>;
		
		/**
         * 打开指定uri的一个文档数据。如果该位置的文档已经被打开，则什么也不做。
         * 如果打开成功则会抛出[open document](#workspace.onDidOpenDocument)-event。
		 * 
		 * 通过 [uri](#Uri) 打开指定的文档. 目前只支持打开 `schemes` 为 file 的文档资源。
		 *
		 * file: 在硬盘中的文件, 如果文件不存在或者权限不足会读取失败,比如 'file:///Users/frodo/r.ini'。
		 *
		 * @param uri 需打开的资源的标识符。
		 * @return 包含打开的文档数据的Thenable对象。
		 */
		export function openDocument(uri: Uri): Thenable<Document>;

		/**
		 * 打开指定文件路径的一个文档数据。
		 *
		 * @param fileName 文件的路径。
		 * @return 包含打开的文档数据的Thenable对象。
		 */
		export function openDocument(fileName: string): Thenable<Document>;
		
        /**
         * 获取所有项目。
         */
		export function getProjects(): Project[];
		
        /**
         * 获取指定名称的项目。
         */
		export function getProject(name: string): Project;
		
		/**
		 * 当 [text document](#Document) 被打开时，抛出一个的对应事件。
		 */
		export const onDidOpenDocument: Event<Document>;

		/**
		 * 当 [text document](#Document) 被销毁时，抛出一个的对应事件。
		 */
		export const onDidCloseDocument: Event<Document>;

		/**
		 * 当 [text document](#Document) 改变时，抛出一个的对应事件。
		 */
		export const onDidChangeTextDocument: Event<TextDocumentChangeEvent>;

		/**
		 * 当 [text document](#Document) 被保存到硬盘时，抛出一个的对应事件。
		 */
		export const onDidSaveDocument: Event<Document>;
        
        /**
         * 当添加了一个项目时，抛出该事件。
         */
        export const onDidAddProject: Event<Project>;
        /**
         * 当删除了一个项目时，抛出该事件。
         */
        export const onDidRemoveProject: Event<Project>;
        /**
         * 当前激活项目改变时，抛出该事件。
         */
        export const onDidChangeActiveProject: Event<Project>;
	}
	
    /**
     * 表示一个项目。
     */
	export interface Project {
        /**
         * 项目的的Uri。
         */
		uri: Uri;
		
        /**
         * 项目名称。
         */
		name: string;
        
        /**
         * 项目路径。
         */
		path: string;
        
        /**
         * 将指定路径转换相对于项目的相对路径。
         */
		asRelativePath(pathOrUri: string|Uri): string;
	}
	
	/**
	 * 代表一类可以被销毁的资源, 比如事件监听和计时器。
	 */
	export class Disposable {

		/**
		 * 将多个类 Disposable 合并为一个。
		 * 这个方法主要用于含有dispose方法的非Disposable对象。
		 *
		 * @param 含有`dispose`方法的类 Disposable 对象。
		 * @return 返回一个新创建的Disposable对象，使用dispose会释放所有已提供的资源。
		 */
		static from(...disposableLikes: { dispose: () => any }[]): Disposable;

		/**
		 * 创建一个调用提供的销毁函数的Disposable对象。
		 * @param callOnDispose 销毁函数。
		 */
		constructor(callOnDispose: Function);

		/**
		 * 销毁这个对象。
		 */
		dispose(): any;
	}
	
	/**
	 * 表示一类事件。
	 * 
	 * 需传入你所需监听的事件作为参数的监听函数。
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
	 * 表示可以在列表中选择的呈现项。
	 */
	export interface QuickPickItem {

		/**
		 * 显示项的标签名称。
		 */
		label: string;

		/**
		 * 显示项的文本描述。
		 */
		description: string;
	}
	
	/**
	 * 表示用于文档的文本操作。
	 */
	export class TextEdit {

		/**
		 * 创建一个替换操作。
		 *
		 * @param range 替换范围。
		 * @param newText 替换后的内容。
		 * @return 一个新的文本操作对象。
		 */
		static replace(range: Range, newText: string): TextEdit;

		/**
		 * 创建一个插入操作。
		 *
		 * @param position 插入的位置。
		 * @param newText 插入的内容。
		 * @return 一个新的文本操作对象。
		 */
		static insert(position: Position, newText: string): TextEdit;

		/**
		 * 创建一个删除操作。
		 *
		 * @param range 需删除的文本范围。
		 * @return 一个新的文本操作对象。
		 */
		static delete(range: Range): TextEdit;

		/**
		 * 这个编辑操作作用的文本范围。
		 */
		range: Range;

		/**
		 * 将要添加的新文本。
		 */
		newText: string;

		/**
		 * 创建一个新的文本操作。
		 *
		 * @param range 文本操作范围。
		 * @param newText 字符串。
		 */
		constructor(range: Range, newText: string);
	}
	
	/**
     * 
	 * 一种表示磁盘上的文件的通用资源标识符或其他资源，如命名的资源。
	 */
	export class Uri {

		/**
         * 通过文件系统的路径字符串创建一个Uri对象。创建的Uri的scheme属性为`file`。
		 *
		 * @param path 文件系统中文件(夹)的路径。
		 * @return 一个Uri实例。
		 */
		static file(path: string): Uri;

		/**
         * 通过字符串创建一个Uri对象。
		 *
		 * @param value Uri的字符串值。
		 * @return 一个新的Uri实现。
		 */
		static parse(value: string): Uri;

		/**
		 * `http://www.msft.com/some/path?query#fragment` 的`http` 部分。
		 * 在第一个冒号之前的部分。
		 */
		scheme: string;

		/**
		 * `http://www.msft.com/some/path?query#fragment` 的 `www.msft.com` 部分。
		 * 在第一个双斜杠和下一个斜杠之间的部分。
		 */
		authority: string;

		/**
		 * `http://www.msft.com/some/path?query#fragment` 的 `/some/path` 部分。
		 */
		path: string;

		/**
		 * `http://www.msft.com/some/path?query#fragment` 的 `query`部分。
		 */
		query: string;

		/**
		 * `http://www.msft.com/some/path?query#fragment` 的 `fragment`部分。
		 */
		fragment: string;

		/**
		 * 这个URI对于在文件系统中的路径。
		 * 
		 * 将使用UNC路径并将系统盘符转换为小写。同时根据平台选择路径分隔符。
		 * *不会*验证路径的语法或描述是否正确。*不会*寻找这个URI的scheme。
		 */
		fsPath: string;

		/**
         * Uri的字符串表示形式。
		 *
		 * @returns Uri解码的字符串。
		 */
		toString(): string;

		/**
         * Uri的JSON表示形式。
		 *
		 * @return JSON对象。
		 */
		toJSON(): any;
	}
	
	export namespace commands {

		/**
         * 注册一个命令。
		 * 
         * 如果指定的命令id已经存在一个对应的注册方法,则会引发一个异常。
		 *
		 * @param command 命令的唯一标示。
		 * @param callback 命令执行的回调方法。
		 * @param thisArg 回调方法中的'this'对象。
		 * @return Disposable 用于注销一个命令后销毁资源。
		 */
		export function registerCommand(command: string, callback: (...args: any[]) => any, thisArg?: any): Disposable;
        
        /**
         * 注册一个文本编辑器命令。
         * 
         * 与(#commands.registerCommand)方法不同，仅当有激活的编辑器时，该命令才会被执行。
		 *
		 * @param command 命令的唯一标示。
		 * @param callback 命令执行的回调方法。
		 * @param thisArg 回调方法中的'this'对象。
		 * @return Disposable 用于注销一个命令后销毁资源。
		 */
		export function registerTextEditorCommand(command: string, callback: (textEditor: TextEditor, edit: TextEditorEdit) => void, thisArg?: any): Disposable;

		/**
         * 执行指定id的命令。
         * 
         * 命令的参数只允许 `string`, `boolean`, `number`, `undefined`, and `null` 这几个类型。
		 *
		 * @param command 命令的唯一标示。
		 * @param rest 传递给回调方法的参数。
		 * @return 对应给定命令返回值的许诺。
		 *  如果这个命令的逻辑函数没有任何返回则返回`undefined`。
		 */
		export function executeCommand<T>(command: string, ...rest: any[]): Thenable<T>;

		/**
         * 获取所有可用命令的列表。
		 *
		 * @return 包含所有命令id的Thenable对象。
		 */
		export function getCommands(): Thenable<string[]>;
	}
	
	/**
     * 当前窗口的命名空间。
	 */
	export namespace window {

		/**
         * 获取当前激活的编辑器。
		 */
		export let activeEditor: Editor;
		
		/**
         * 当前可见的编辑器，如果没有则为空数组。
		 */
		export let visibleEditors: Editor[];
		
		/**
         * 当前激活的编辑器(#window.activeTextEditor)改变时派发。
		 */
		export const onDidChangeActiveEditor: Event<Editor>;

		/**
         * 文本编辑器的选中项改变时派发。
		 */
		export const onDidChangeTextEditorSelection: Event<TextEditorSelectionChangeEvent>;
		
		/**
         * 显示指定文档的编辑器,此操作可能会改变激活的编辑器(#window.activeTextEditor)。
		 *
		 * @param document 要显示的文档。
		 * @return A promise that resolves to an [editor](#Editor)。
		 */
		export function showDocument(document: Document): Thenable<Editor>;
		
		/**
         * 显示一个选择列表的窗口。
		 *
		 * @param items An array of strings, or a promise that resolves to an array of strings.
		 * @return A promise that resolves to the selection or undefined.
		 */
		export function showQuickPick(items: string[] | Thenable<string[]>): Thenable<string>;

		/**
		 * 显示一个选择列表的窗口。
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
 * Thenable 是一个类似 ES6 promises, Q, jquery.Deferred, WinJS.Promise,
 * 以及其他的实现类。 任何可以重复使用的promise库都能够在该类中使用。
 * 当然,我们推荐在vscode中使用原生的promise。
 */
interface Thenable<R> {
	/**
	* 链接成功和/或失败的回调函数到这个promise
	* @param onfulfilled 正确完成时的回调函数。
	* @param onrejected 遇到错误时的回调函数。
	* @returns 取决于具体执行了哪一个回调函数。
	*/
	then<TResult>(onfulfilled?: (value: R) => TResult | Thenable<TResult>, onrejected?: (reason: any) => TResult | Thenable<TResult>): Thenable<TResult>;
	then<TResult>(onfulfilled?: (value: R) => TResult | Thenable<TResult>, onrejected?: (reason: any) => void): Thenable<TResult>;
}

// ---- ES6 promise ------------------------------------------------------

/**
 * 代表一个异步操作的完成情况
 */
interface Promise<T> extends Thenable<T> {
	/**
	* 链接成功和/或失败的回调函数到这个promise
	* @param onfulfilled 正确完成时的回调函数。
	* @param onrejected 遇到错误时的回调函数。
	* @returns 取决于具体执行了哪一个回调函数。
	*/
	then<TResult>(onfulfilled?: (value: T) => TResult | Thenable<TResult>, onrejected?: (reason: any) => TResult | Thenable<TResult>): Promise<TResult>;
	then<TResult>(onfulfilled?: (value: T) => TResult | Thenable<TResult>, onrejected?: (reason: any) => void): Promise<TResult>;

	/**
	 * 仅为这个Promise的onrejected方法添加一个回调函数。
	 * @param onrejected 当这个Promise执行onrejected时的回调函数
	 * @returns 这个回调对应的Promise
	 */
	catch(onrejected?: (reason: any) => T | Thenable<T>): Promise<T>;

	// [Symbol.toStringTag]: string;
}

interface PromiseConstructor {

	/**
	 * 创建一个Promise。
	 * @param executor 用于初始化这个Promise的回调函数。这个回调函数含有2个参数:
	 * resolve回调函数用于接收一个值或上一个Promise的结果。
	 * reject回调函数用于接收错误信息或错误原因。
	 */
	new <T>(executor: (resolve: (value?: T | Thenable<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

	/**
	 * 创建一个Promise，若其中的所有Promise项全部执行resolve，则执行resolve，
	 * 否则执行 rejected。
	 * @param values 一组Promise。
	 * @returns 一个新的Promise。
	 */
	all<T>(values: Array<T | Thenable<T>>): Promise<T[]>;

	/**
	 * 创建一个Promise，传入的Promise总若任何一个执行了reject或resolve，则执行
	 * 该对应的reject或resolve.
	 * @param values 一组Promise。
	 * @returns 一个新的Promise。
	 */
	race<T>(values: Array<T | Thenable<T>>): Promise<T>;

	/**
	 * 创建一个仅包含reject方法的Promise。
	 * @param reason 调用reject时传入的参数。
	 * @returns 一个仅包含reject方法的Promise。
	 */
	reject(reason: any): Promise<void>;

	/**
	 * 创建一个仅包含reject方法的Promise。
	 * @param reason 调用reject时传入的参数。
	 * @returns 一个仅包含reject方法的Promise。
	 */
	reject<T>(reason: any): Promise<T>;

	/**
	  * 创建一个仅包含resolve方法的Promise。
	  * @param value 一个Promise。
	  * @returns A promise whose internal state matches the provided promise.
	  */
	resolve<T>(value: T | Thenable<T>): Promise<T>;

	/**
	 * 创建一个仅包含resolve方法的Promise。
	 * @returns 一个仅包含resolve方法的Promise。
	 */
	resolve(): Promise<void>;

	// [Symbol.species]: Function;
}

declare var Promise: PromiseConstructor;