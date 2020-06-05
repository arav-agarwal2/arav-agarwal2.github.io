const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-404-js": hot(preferDefault(require("/home/arav/arav-agarwal2.github.io/src/pages/404.js"))),
  "component---src-pages-index-tsx": hot(preferDefault(require("/home/arav/arav-agarwal2.github.io/src/pages/index.tsx"))),
  "component---src-templates-blog-post-js": hot(preferDefault(require("/home/arav/arav-agarwal2.github.io/src/templates/blog-post.js")))
}

