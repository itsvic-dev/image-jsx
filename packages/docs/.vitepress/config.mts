import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Image.JSX",
  description: "Create images with JSX.",
  base: "/image-jsx/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Get Started", link: "/getting-started" },
      { text: "API Reference", link: "/api" },
    ],

    sidebar: [
      {
        text: "Basics",
        items: [{ text: "Getting Started", link: "/getting-started" }],
      },
      {
        text: "API Reference",
        items: [
          { text: "image-jsx", link: "/api/main" },
          { text: "image-jsx/2d", link: "/api/2d" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/itsvic-dev/image-jsx" },
    ],
  },

  lastUpdated: true,
  cleanUrls: true,
});
