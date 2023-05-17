import { defaultTheme } from "vuepress";
export default {
  title: "my-bookmarks",
  base: "/my-bookmarks/",
  description: "我喜欢的收集",
  theme: defaultTheme({
    navbar: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "在线网站",
        link: "/website/",
      },
      {
        text: "前端库",
        link: "/repository/",
      },
      {
        text: "我的博客文章",
        link: "https://yanyue404.github.io/blog/",
      },
    ],
    sidebar: "auto",
    sidebarDepth: 3,
    displayAllHeaders: true,
    editLinks: true,
    docsDir: "docs",
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdated: "上次更新",
    searchMaxSuggestions: 10,
    repo: "https://github.com/yanyue404/fe-attitude",
    repoLabel: "前往 Github！",
  }),
  plugins: [
    [
      "@vuepress/plugin-search",
      {
        locales: { placeholder: "Search" },
        isSearchable: (page) => page.path !== "/", // 排除首页
      },
    ],
  ],
};
