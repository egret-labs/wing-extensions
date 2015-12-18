# 插件描述文件 - package.json

每一个插件扩展都必须在插件的根目录存放一个`package.json`作为插件项目描述文件。

## 字段定义

名称 | 必需 | 类型 | 描述
---- |:--------:| ---- | ------
`name` | 是 | `string` | 插件扩展的名称, 全部是小写字母，并且不能有空格.
`version` | 是 | `string` | 参考[Semver](http://semver.org/lang/zh-CN/). 例如: `2.5.0`
`publisher` | 是 | `string` | 发布者名称
`engines` | 是 | `object` | 包含`wing`字段的对象， 定义所需环境的版本。例如 `^2.5.0` 表示需要2.5.0或者更高版本.
`displayName` | | `string`| 插件显示的名称.
`description` | | `string` | 插件的描述文本.
`icon` | | `string` | 插件使用的图标，大小为 128*128.
`categories` | | `string[]` | 插件的分类，常用分类有: `[Languages, Text, Debuggers, Other]`.
[`contributes`](/.docs/contribution-points.md) | | `object` | 插件扩展点的描述对象，详见 [contributions](/.docs/contribution-points.md).
[`activationEvents`](/.docs/activation-events.md) | | `string[]` | 插件激活事件的描述数组，详见 [activation events](/.docs/activation-events.md).
`keywords` | | `string[]` | 插件的关键词，准确的关键词有助于更好的找到插件.
`dependencies` | | `object` | 插件依赖的 `Node.js` 库. 参见 [npm's `dependencies`](https://docs.npmjs.com/files/package.json#dependencies).
`devDependencies` | | `object` | 插件开发环境下依赖的 `Node.js` 库. 例如，如果插件使用TypeScript编写，则开发环境需要依赖 `typescript`. 参见 [npm's `devDependencies`](https://docs.npmjs.com/files/package.json#devdependencies).
`extensionDependencies` | | `string[]` | 插件依赖的其他插件的id. 插件id为 `${publisher}.${name}`. 例如: `egret.text-tools`.
`isAMD` | | `boolean` | 插件的加载方式是否为 `AMD` 方式， 否则为 `CommonJS`. 默认为: `false` 即使用 `CommonJS` 加载方式.
`scripts` | | `object` | 详见 [npm's `scripts`](https://docs.npmjs.com/misc/scripts)

## 例子

	{
		"name": "TextTools",
		"description": "Text replacement functions e.g. change case, reverse and ASCII Art.",
		"version": "0.2.0",
		"publisher": "egret",
		"categories":[
			"Other"
		],
		"icon": "images/TextToolsIcon.png",
		"bugs": {
			"url": "https://github.com/egret-labs/wing-extensions/issues"
		},
		"homepage": "https://github.com/egret-labs/wing-extensions/blob/master/README.md",
		"repository": {
			"type": "git",
			"url": "https://github.com/egret-labs/wing-extensions.git"
		},
		"activationEvents": [
			"onCommand:extension.textFunctions"
		],
		"engines": {
			"wing": "^2.5.0"
		},
		"main": "./out/extension",
		"contributes": {
			"commands": [
				{
					"command": "extension.textFunctions",
					"title": "Text Functions",
					"description": "Text functions on selections"
				}
			],
			"keybindings": [
				{
					"command": "extension.textFunctions",
					"key": "Alt+T"
				}
			]
		},
		"scripts": {
			"compile": "tsc -watch"
		},
		"dependencies": {
			"underscore.string": "^3.2.2",
			"figlet": "^1.1.1"
		},
		"devDependencies": {
		}
	}