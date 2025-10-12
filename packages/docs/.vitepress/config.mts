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
    ],

    sidebar: [
      {
        text: "Basics",
        items: [{ text: "Getting Started", link: "/getting-started" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/itsvic-dev/image-jsx" },
    ],
  },

  lastUpdated: true,
  cleanUrls: true,
});
