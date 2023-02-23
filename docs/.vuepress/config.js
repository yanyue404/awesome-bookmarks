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
      },
      {
        text: "个人博客",
        link: "https://yanyue404.github.io/blog/#/"
      },
      {
        text: "前端知识体系",
        link: "https://yanyue404.github.io/fe-attitude"
      },
      {
        text: "王明道文集精选",
        link: "https://yanyue404.github.io/mingdao/"
      }
    ],
    sidebar: utils.inferSiderbars(),
    sidebarDepth: 3,
    displayAllHeaders: true,
    editLinks: true,
    docsDir: "docs",
    editLinkText: "在 GitHub 上编辑此页",
    repo: "yanyue404/my-bookmarks",
    lastUpdated: "上次更新"
  }
};
