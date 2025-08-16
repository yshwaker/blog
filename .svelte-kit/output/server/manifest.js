export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["blog-images/.DS_Store","blog-images/a11y-clickable-area.png","blog-images/a11y-contrast.png","blog-images/a11y-text.png","blog-images/default-font-size-setting.png","blog-images/fiber-tree.png","blog-images/nav.png","blog-images/post-it.jpg","blog-images/vision-deficiencies-emulation.png","favicon.ico","vercel.svg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.SDtnEoEO.js","app":"_app/immutable/entry/app.Cem0HihY.js","imports":["_app/immutable/entry/start.SDtnEoEO.js","_app/immutable/chunks/scheduler.Bwf3gQP1.js","_app/immutable/chunks/singletons.C5jvMjXM.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/entry/app.Cem0HihY.js","_app/immutable/chunks/web.esm.FqSqbAbk.js","_app/immutable/chunks/scheduler.Bwf3gQP1.js","_app/immutable/chunks/index.BB1_hVuL.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/blog/[slug]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
