export const proxy = {
	"/dev/": {
		target: "http://165.227.151.90:8001",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/dev/, ""),
	},

	"/prod/": {
		// target: "https://show.cool-admin.com",
		target: "https://diancan.iberiamall.com",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/prod/, "/api"),
	},
};
