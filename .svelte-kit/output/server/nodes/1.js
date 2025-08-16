

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.BCsH-bak.js","_app/immutable/chunks/scheduler.Bwf3gQP1.js","_app/immutable/chunks/index.BB1_hVuL.js","_app/immutable/chunks/singletons.C5jvMjXM.js"];
export const stylesheets = [];
export const fonts = [];
