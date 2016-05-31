import * as wing from 'wing';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: wing.ExtensionContext) {
	wing.template.registerTemplateFileProvider('extension.ts-file', {
		label: '新建 TypeScript 文件',
		filename: 'NewFile.ts',
		provideSimpleTemplateFile: provideTSFile
	});

	wing.template.registerTemplateFileProvider('extension.ts-class', {
		label: '新建 TypeScript 类',
		provideTemplateFile: provideTSClass
	});

	wing.template.registerTemplateProjectProvider('extension.testProject', {
		label: 'NodeJS 项目',
		detail: '创建一个基本node.js项目',
		provideTemplateProject: provideNodejsProject
	});
}

export function deactivate() {
}

function provideTSFile(context: wing.SimpleTemplateFileContext, token: wing.CancellationToken): Thenable<string> {
	return Promise.resolve(`// TypeScript file`);
}

function getTSClassContent(className: string, moduleName: string): string {
	let content: string;

	if (moduleName) {
		content = `module ${moduleName} {
	export class ${className} {
		public constructor() {
		} 
	}\n}`
	} else {
		content = `class ${className} {
	public constructor() {
	}\n}`;
	}
	return content;
}

function provideTSClass(context: wing.TemplateFileContext, token: wing.CancellationToken): Thenable<wing.ITemplateFile> {
	let asClassStore = new wing.Store(null, {
		className: {
			type: 'string',
			title: '类名',
			required: true
		},
		moduleName: {
			type: 'string',
			title: '模块名'
		}
	});

	return wing.window.showPopup<wing.IFormOptions>(wing.PopupType.Form, asClassStore, {
		title: '新建 TypeScript 类'
	}).then(store => {
		if (!store) {
			return null;
		}
		let className = store.getValue('className');
		return {
			filename: className + '.ts',
			content: getTSClassContent(className, store.getValue('moduleName'))
		};
	});
}

function nfcall(fn: Function, ...args: any[]): Promise<any> {
	return new Promise((c, e) => fn(...args, (err, result) => err ? e(err) : c(result)));
}

function provideNodejsProject(context: wing.TemplateProjectContext, token: wing.CancellationToken): Thenable<wing.ITemplateProject> {
	let project = new wing.Store(null, {
		name: {
			type: 'string',
			title: '项目名称',
			required: true
		},
		dir: {
			type: 'string',
			title: '项目路径',
			required: true,
			displayOrder: 1
		},
		version: {
			type: 'string',
			title: '版本',
			default: '0.0.1',
			required: true,
			displayOrder: 2
		},
		license: {
			type: 'string',
			title: '许可协议',
			enum: ['MIT', 'ISC', 'BSD', 'GPL'],
			default: 'MIT',
			displayOrder: 3
		}
	});

	return wing.window.showPopup<wing.IFormOptions>(wing.PopupType.Form, project, {
		title: '创建 NodeJS 项目'
	}).then(store => {
		if (!store) {
			return null;
		}

		let projectName = store.getValue('name');
		let projectDir = store.getValue('dir');
		let projectPath = path.join(projectDir, projectName);

		let packageObject = store.getProperties(true);
		delete packageObject['dir'];

		let packageJSON = JSON.stringify(packageObject, null, 2);

		context.channel.clear();
		context.channel.show();

		return nfcall(fs.mkdir, projectPath).then(() => {
			context.channel.appendLine('正在创建 package.json');
			return nfcall(fs.writeFile, path.join(projectPath, 'package.json'), packageJSON);
		}).then(() => {
			context.channel.appendLine('正在创建 index.js');
			return nfcall(fs.writeFile, path.join(projectPath, 'index.js'), '');
		}).then(() => {
			context.channel.appendLine('项目创建成功');
			return { path: projectPath };
		}, err => {
			context.channel.appendLine('项目创建失败:' + err.message);
			return null;
		});
	});
}