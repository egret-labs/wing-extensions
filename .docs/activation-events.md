# 激活事件(Activation Events) - package.json

EgretWing使用惰性加载的方式加载插件，当插件需要被激活时才会调用插件定义的 `activate` 方法。通过插件的 [`package.json`](/.docs/extension-manifest.md) 的 `activationEvents` 字段，提供一个上下文表示插件何时被激活。目前支持下列的激活事件：

* [`onCommand:${command}`](/.docs/activation-events.md#activationeventsoncommand)
* [`*`](/.docs/activation-events.md#activationevents)


## `activationEvents.onCommand`

当一个命令 `command` 被执行时将触发该事件， 例如:

```json
...
"activationEvents": [
	"onCommand:extension.sayHello"
]
...
```

## `activationEvents.*`

当EgretWing启动时将触发该事件， 例如:

```json
...
"activationEvents": [
	"*"
]
...
```
