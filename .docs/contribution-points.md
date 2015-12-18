# 扩展点(Contribution Points) - package.json

扩展点允许开发者在wing中自定义一些扩展功能。 通过插件的 [`package.json`](/.docs/extension-manifest.md) 的 `contributes` 字段定义扩展点。目前支持下列扩展点


* [`commands`](/.docs/contribution-points.md#contributescommands)
* [`keybindings`](/.docs/contribution-points.md#contributeskeybindings)


## `contributes.commands`

自定义命令 `command` 。定义的命令可以在命令面板(Command Palette)中找到并执行。

>**Note:** 当命令通过快捷键或者命令面板被执行时, 将派发 [`activationEvent`](/.docs/activation-events.md) `onCommand:${command}`.

可使用下列字段：

名称 | 必需 | 类型 | 描述
---- |:--------:| ---- | ------
`command` | 是 | `string` | 表示命令的唯一id.
`title` | 是 | `string` | 表示命令的名称，此属性将显示在命令面板中.


### 例子

```json
...
"contributes": {
	"commands": [{
		"command": "extension.sayHello",
		"title": "Hello Wing"
	}]
}
...
```

![commands extension point example](/.docs/img/contribution-commands.png)


## `contributes.keybindings`

自定义快捷键 `keybinding`。可以自定义命令执行的按键绑定。

Contributing a key binding will cause the Default Keyboard Shortcuts to display your rule, and every UI representation of the command will now show the key binding you have added. And, of course, when the user presses the key combination the command will be invoked.

>**Note:** 可以快捷键定义不同操作系统平台的快捷键。

>**Note:** 当命令通过快捷键或者命令面板被执行时, 将派发 [`activationEvent`](/.doc/activation-events.md) `onCommand:${command}`.

可使用下列字段：

名称 | 必需 | 类型 | 描述
---- |:--------:| ---- | ------
`command` | 是 | `string` | 快捷键绑定的命令的id
`key` | 是 | `string` | 快捷键的按键组合，可以的按键的组合字符串参见 附录1 .
`win` |   | `string` | 在windows平台下的按键组合，如果用户在windows下，此属性将覆盖`key`字段指定的按键组合.
`mac` |   | `string` | 在mac平台下的按键组合，如果用户在mac下，此属性将覆盖`key`字段指定的按键组合.
`when` |   | `string` | 快捷键何时被触发的表达式，可用的属性值参见 附录2 .


### 附录1 `key`字段可用的按键组合字符串规则

按键规则一般由组合键 + 其他按键组成。 

组合按键表示如下：

操作系统 | 组合键
---- | ---------
MACOS X | `kbstyle(ctrl+)`, `kbstyle(shift+)`, `kbstyle(alt+)`, `kbstyle(cmd+)`
Windows | `kbstyle(ctrl+)`, `kbstyle(shift+)`, `kbstyle(alt+)`, `kbstyle(win+)`

>**Note:** 特殊的可以使用 `ctrlcmd` 表示windows下的`ctrl`, mac下的`cmd`


其他按键表示如下：

* `kbstyle(f1-f15)`, `kbstyle(a-z)`, `kbstyle(0-9)`
* ``kbstyle(`)``, `kbstyle(-)`, `kbstyle(=)`, `kbstyle([)`, `kbstyle(])`, `kbstyle(\)`, `kbstyle(;)`, `kbstyle(')`, `kbstyle(,)`, `kbstyle(.)`, `kbstyle(/)`
* `kbstyle(left)`, `kbstyle(up)`, `kbstyle(right)`, `kbstyle(down)`, `kbstyle(pageup)`, `kbstyle(pagedown)`, `kbstyle(end)`, `kbstyle(home)`
* `kbstyle(tab)`, `kbstyle(enter)`, `kbstyle(escape)`, `kbstyle(space)`, `kbstyle(backspace)`, `kbstyle(delete)`
* `kbstyle(pausebreak)`, `kbstyle(capslock)`, `kbstyle(insert)`


使用空格分割的按键序列，例如(ctrl+k ctrl+c)，表示先按ctrl+k，再按ctrl+c 才能触发该快捷键。

如果要使某一命令既可以按ctrl+k触发，又可以按ctrl+c触发，请定义两组keybinding，command相同，但是key字段不同。


### 附录2 `when`字段可用的字符串

`when`字段可以使用 `!`, `&&`, `==`, `!=` 等表达式限定条件。如

`!inDebugMode`  , `editorTextFocus && editorLangId == 'ts'` 都是可用的表达式。



* `editorFocus` 编辑器获得焦点时
* `editorTextFocus` 文本编辑器获得焦点时
* `multiPageEditorFocus` 多页编辑器获得焦点时，多页编辑器指包含多个视图的编辑器，例如exml编辑器，res编辑器等
* `designEditorFocus` 设计模式下编辑器获得焦点时
* `viewFocus` 面板获得焦点时，如包资源管理器，属性面板，动画面板等
* `editorLangId` 表示编辑器的语言id，`editorLangId` 通常对应编辑器对应文档的扩展名
* `inDebugMode` 表示启动调试时

更多字段请期待后续版本更新。

### 例子

定义命令 `"extension.sayHello"` 的windows下快捷键为 `kbstyle(Ctrl+F1)`，mac下快捷键为 `kbstyle(Cmd+Shift+F1)` :

```json
...
"contributes": {
	"keybindings": [{
		"command": "extension.sayHello",
		"key": "ctrl+f1",
		"mac": "cmd+shift+f1",
		"when": "editorTextFocus"
	}]
}
...
```

![keybindings extension point example](/.docs/img/contribution-keybindings.png)
