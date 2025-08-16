import * as universal from '../entries/pages/blog/_slug_/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/blog/[slug]/+page.ts";
export const imports = ["_app/immutable/nodes/3.BWCk_ITI.js","_app/immutable/chunks/dayjs.min.BMywoe3Y.js","_app/immutable/chunks/web.esm.FqSqbAbk.js","_app/immutable/chunks/control.CYgJF_JY.js"];
export const stylesheets = ["_app/immutable/assets/3.bDRZIAyZ.css"];
export const fonts = [];
