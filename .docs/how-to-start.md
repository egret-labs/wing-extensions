# EgretWing插件项目

EgretWing插件项目基于`NodeJS`，可以使用 `TypeScript` 语言编写。EgretWing提供一套 API 接口，允许开发者自定义部分EgretWing的功能，甚至添加没有的功能。

## 必要开发环境

- [EgretWing](http://www.egret.com/egretwing) 2.5.0 或 更高版本。
- [NodeJS](https://nodejs.org/en/) 4.2.4 或 更高版本。
- NPM 命令行工具， NodeJS的安装包中，带有 `npm` 命令行工具。

## 下载模板项目

从GitHub上获取 [wing-extensions](https://github.com/egret-labs/wing-extensions/archive/master.zip) 的下载链接。下载并解压，里面包含几个简单的插件，和相关教程文档。开发者可以选取一个模板稍做改动，导入到EgretWing中。

## 使用 EgretWing 开发插件项目


### 导入项目

下面以text-tools为例，说明导入项目：

在EgretWing中菜单栏找到 文件--导入--标准TypeScript项目，并选择text-tools所在的目录可导入到EgretWing中。


### 安装依赖包

如果插件项目需要依赖其他的 `nodejs` 模块，需要在项目的根目录下，执行

	npm install

安装依赖模块。


### 编译项目

使用默认快捷键 `Ctrl/Cmd + B` 可以编译项目。


## 插件目录结构说明

以上操作全部完成后，可以看到下面的目录结构。

```
.
├── .gitignore
├── images
│   └── icon.png	          		// 插件图标
├── node_modules          		// 依赖模块
│   ├── figlet  					
│   └── underscore.string 		
├── out                   		// js输出目录
│   ├── extension.js 					
│   └── extension.js.map
├── typings               		// .d.ts目录
│   ├── node.d.ts         		// Node.js APIs
│   └── wing.d.ts         		// Wing Extension APIs
├── extension.ts          		// ts源代码
├── package.json          		// 插件描述文件
├── README.md
├── tsconfig.json         		// ts编译配置
```

- `package.json` 是插件的描述文件， 详情参考： [extension-manifest.md](/.doc/extension-manifest.md) 

- `tsconfig.json` 是 `typescript` 的编译配置文件， 详情参考： [tsconfig.json](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json "tsconfig.json")

