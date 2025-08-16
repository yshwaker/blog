const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
async function getAllPosts() {
  const postModules = /* @__PURE__ */ Object.assign({ "./posts/a11y-note.mdx": () => import("./a11y-note.js"), "./posts/async-await-under-the-hood.mdx": () => import("./async-await-under-the-hood.js"), "./posts/better-back-button-using-react-router.mdx": () => import("./better-back-button-using-react-router.js"), "./posts/how-to-learn-shuangpin.mdx": () => import("./how-to-learn-shuangpin.js"), "./posts/implementing-promise.mdx": () => import("./implementing-promise.js"), "./posts/kmp-algorithm.mdx": () => import("./kmp-algorithm.js"), "./posts/react-fiber.mdx": () => import("./react-fiber.js"), "./posts/static-vs-extern-in-C.mdx": () => import("./static-vs-extern-in-C.js") });
  const posts = [];
  for (const path in postModules) {
    try {
      const mod = await postModules[path]();
      const slug = path.split("/").pop()?.replace(".mdx", "") || "";
      const frontmatter = mod.metadata;
      if (frontmatter && frontmatter.title && !frontmatter.draft) {
        posts.push({
          slug,
          title: frontmatter.title,
          date: new Date(frontmatter.date),
          updatedOn: frontmatter.updatedOn ? new Date(frontmatter.updatedOn) : void 0,
          summary: frontmatter.summary,
          draft: frontmatter.draft
        });
      }
    } catch (error) {
      console.error(`Error loading post from ${path}:`, error);
    }
  }
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}
async function getPost(slug) {
  try {
    const post = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./posts/a11y-note.mdx": () => import("./a11y-note.js"), "./posts/async-await-under-the-hood.mdx": () => import("./async-await-under-the-hood.js"), "./posts/better-back-button-using-react-router.mdx": () => import("./better-back-button-using-react-router.js"), "./posts/how-to-learn-shuangpin.mdx": () => import("./how-to-learn-shuangpin.js"), "./posts/implementing-promise.mdx": () => import("./implementing-promise.js"), "./posts/kmp-algorithm.mdx": () => import("./kmp-algorithm.js"), "./posts/react-fiber.mdx": () => import("./react-fiber.js"), "./posts/static-vs-extern-in-C.mdx": () => import("./static-vs-extern-in-C.js") }), `./posts/${slug}.mdx`, 3);
    const frontmatter = post.metadata;
    if (frontmatter && frontmatter.title && !frontmatter.draft) {
      return {
        slug,
        title: frontmatter.title,
        date: new Date(frontmatter.date),
        updatedOn: frontmatter.updatedOn ? new Date(frontmatter.updatedOn) : void 0,
        summary: frontmatter.summary,
        draft: frontmatter.draft,
        content: "",
        default: post.default
      };
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
  }
  return null;
}
export {
  getPost as a,
  getAllPosts as g
};
