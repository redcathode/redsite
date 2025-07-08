import { defineConfig } from "astro/config";
import remarkMath from "remark-math";

import mdx from "@astrojs/mdx";
import rehypeMathJaxSvg from "rehype-mathjax/svg";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: true,
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathJaxSvg],
  },
  site: "https://redcatho.de",
});
