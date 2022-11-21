const utils = require("./utils");
module.exports = {
  title: "my-bookmarks",
  base: "/my-bookmarks/",
  description: "我喜欢的收集",
  themeConfig: {
    nav: [
      {
        text: "首页",
        link: "/"
      },
      {
        text: "网站",
        link: "/website/"
      },
      {
        text: "库",
        link: "/repository/"
      },
      {
        text: "文章",
        link: "/article/"
      }
    ],
    sidebar: utils.inferSiderbars(),
    sidebarDepth: 3,
    displayAllHeaders: true,
    repo: "yanyue404/my-bookmarks",
    editLinks: true,
    docsDir: "docs",
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdated: "上次更新"
  }
};
