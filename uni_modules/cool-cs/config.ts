import { config, type ModuleConfig } from "/@/cool";

export default (): ModuleConfig => {
	return {
		description: "客服聊天模块",
		options: {
			url: config.host + "/cs",
		},
		demo: {
			label: "CS 客服聊天",
			path: "/uni_modules/cool-cs/pages/chat",
		},
	};
};
