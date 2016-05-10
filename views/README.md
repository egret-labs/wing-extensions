## 扩展点 contributes.views (版本>=3.0.6)

在特定视图注册一个`webview`面板。提供`url`的可以是插件中内置的文件，或者一个远程的url。目前支持在右侧栏`utility`注册面板。

可使用下列字段：

名称 | 必需 | 类型 | 描述
---- |:--------:| ---- | ------
`type` | 是 | `string` | 面板的类型.目前仅支持 `utility`
`id` | 是 | `string` | 面板的唯一id.
`title` | 是 | `string` | 面板显示的名称.
`url` | 是 | `string` | `webview` 对应的url链接或者 `html` 路径.
`order` | 否 | `number` | 面板在当前Part中的显示顺序。
`icon` | 否 | `string` | 面板选项卡上要显示的图标.

### 例子

```json
"contributes": {
    "views": [{
		"type": "utility",
        "id": "test",
        "title": "测试",
        "icon": "images/icon.svg",
        "url": "./web/index.html"
	}]
} 
```
