import * as wing from 'wing';
import * as path from 'path';
import * as fs from 'fs';
let clipboard = require('copy-paste');

export function activate() {
    wing.commands.registerCommand("extension.copyIds", copyIds);
}

function copyIds() {
    let e = wing.window.activeTextEditor;
    if (!e) {
        return;
    }

    let fileName = e.document.fileName;
    let ext = path.extname(fileName);
    if (ext != '.exml') {
        return;
    }
    let content = e.document.getText();

    let result = findIds(content);

    if (result) {
        clipboard.copy(result, () => {
            wing.window.showInformationMessage("已成功解析exml中id,并复制对应的ts代码到剪切板,可使用粘贴操作到指定位置.");
        });
    } else {
        wing.window.showInformationMessage("exml中不存在id属性的节点.");
    }

}

function findIds(text: string): string {
    let lines = text.split(/[\r\n(\r\n)]/);
    let nss = findNameSpaces(lines.join(" "));
    let idexp = / id=\"(.*?)\"/ig;
    let result = "";
    let uimodule = is_eui(text) ? 'eui.' : 'egret.gui.';

    lines.forEach(line => {
        let temp = line.match(idexp);

        if (temp && temp.length > 0) {

            let classDefine = line.match(/<(.+?):(.+?) /);
            if (classDefine.length < 3) {
                return;
            }

            let classModule;
            if (classDefine[1] == "e") {
                classModule = uimodule;
            } else {
                classModule = nss[classDefine[1]];
                classModule = classModule.substring(0, classModule.length - 1);
            }
            let className = classDefine[2];

            let id = temp[0].replace(' id=', '').replace('"', '').replace('"', '');
            result += `public #1: ${classModule}#2;`.replace('#1', id).replace('#2', className) + '\n';
        }
    });

    return result;
}

function findNameSpaces(text: string): any {
    var map = {};
    var names = text.match(/xmlns:(.+?)="(.+?)"/g);
    names.forEach((name) => {
        var result = name.match(/xmlns:(.+?)="(.+?)"/);
        if (result.length == 3) {
            map[result[1]] = result[2];
        }
    });
    return map;
}

function is_eui(text: string): boolean {
    if (text.indexOf('xmlns:e="http://ns.egret.com/eui"') > 0) {
        return true;
    } else {
        return false;
    }
}
