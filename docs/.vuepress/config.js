const utils = require("./utils");
module.exports = {
  title: "my-bookmarks",
  base: "/my-bookmarks/",
  description: "我喜欢的收集",
  plugins: ["fulltext-search"],
  themeConfig: {
    nav: [
      {
        text: "首页",
        link: "/"
      },
      {
        text: "在线网站",
        link: "/website/"
      },
      {
        text: "前端库",
        link: "/repository/"
      },
      {
        text: "我的博客文章",
        link: "/articles/"
      },
      {
        text: "专题学习计划",
        link: "/topic/"
      }
    ],
    sidebar: utils.inferSiderbars(),
    sidebarDepth: 3,
    displayAllHeaders: true,
    editLinks: true,
    docsDir: "docs",
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdated: "上次更新",
    searchMaxSuggestions: 10
  }
};
