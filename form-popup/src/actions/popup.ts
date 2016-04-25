import * as wing from 'wing';
import {PopupType, Store, IStoreMap, IStoreSchema, IStoreSchemaMap, IFormOptions} from 'wing';

export function show(): void {
	wing.window.showPopup<IFormOptions>(PopupType.Form, new Store(properties, scheme), {
		title: '表单例子'
	}).then((result) => {
		result && wing.window.showInformationMessage(JSON.stringify(result.getProperties(true)));
	});
}

const scheme: IStoreSchemaMap = {
	checkbox: {
		type: 'boolean',
		title: '复选框',
		description: '不带默认值的复选框'
	},
	checkbox2: {
		type: 'boolean',
		title: '复选框2',
		default: true,
		description: '默认值为true的复选框'
	},
	inputbox: {
		type: 'string',
		title: '输入框',
		description: '文本输入框'
	},
	inputbox2: {
		type: 'string',
		title: '输入框2',
		default: 'Hello EgretWing',
		description: '带默认值的输入框'
	},
	inputbox3: {
		type: 'string',
		title: '密码输入框',
		description: '带密码的输入框',
		displayAsPassword: true
	},
	inputboxNumber: {
		type: 'number',
		title: '数字输入框',
		description: '值为数字类型的输入框'
	},
	inputboxInterger: {
		type: 'integer',
		title: '整数输入框',
		description: '值为整数类型的输入框'
	},
	inputboxInterger2: {
		type: 'integer',
		title: '整数输入框2',
		description: '限制最小最大值的输入框',
		minimum: 10,
		maximum: 100
	},
	select: {
		type: 'string',
		title: '下拉框',
		default: 'one',
		enum: ['one', 'two', 'three'],
		description: '选择下拉框'
	},
	nest: {
		type: 'object',
		title: '嵌套的多级表单',
		properties: {
			nestCheckbox: {
				type: 'boolean',
				title: '复选框'
			},
			nestInputbox: {
				type: 'string',
				title: '输入框'
			},
			nestSelect: {
				type: 'string',
				default: 'one',
				enum: ['one', 'two', 'three'],
				title: '下拉框'
			}
		},
		displayOrder: 1
	}
}

const properties = {
	inputbox: 'Initial Value'
}