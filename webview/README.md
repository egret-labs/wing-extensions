# webview

WebView是一个自定义的DOM标签，类似于iframe，只不过运行在单独的进程。
使用插件API创建WebView能增加插件的交互能力。

目前主要提供两种方式创建一个WebView。

### wing.complexCommands.previewWebView

创建一个使用WebView作为内容的编辑器。


### wing.window.showPopup

传入参数 `PopupType.WebView` 将显示一个WebView的弹出面板。

以上两种方式都需要传入一个 `wing.Uri` 表示 WebView 要打开的HTML页面。

由于WebView运行在单独的进程，所以运行在WebView中的JavaScript代码与插件项目不在一个环境。
本Demo中的web文件夹中存放运行在webview中的代码，如果包含ts需要单独编译。

插件进程可以通过 `wing.window.webviews` ， `wing.window.onDidCreateWebView` ， `wing.window.onDidDeleteWebView`
获取当前打开的 `wing.WebView`。 `wing.WebView` 提供了与WebView进程通讯的接口。

WebView中能够使用的API与插件进程中不同。

 - 不支持使用 `wing.d.ts` 中定义的所有API。
 - 支持所有 `node.d.ts` 中定义的所有API。
 - 支持 `electron.d.ts` 中渲染进程中定义的部分API。
 - 支持 `dom.d.ts` 中定义的所有浏览器中的API。
 - 内置 `wing` 命名空间，如： `wing.webview.ipc` 提供 `ipc` 通讯相关的接口。
