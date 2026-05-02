---
title: 欢迎使用 EasyBlog
slug: welcome-to-easyblog
date: 2026-05-01
updated: 2026-05-01
category: 公告
tags:
  - EasyBlog
  - 博客
summary: 欢迎使用 EasyBlog 静态博客系统，本文介绍系统的基本功能和使用方式。
featured: true
---

## 欢迎使用 EasyBlog

EasyBlog 是一个基于 **Nuxt 2 + TailwindCSS** 的静态博客系统。

### 主要特性

- 文章数据存储在 GitHub 仓库中
- 通过 Webhook 触发自动构建和部署
- 支持 Markdown 格式编写文章
- 支持 Front Matter 元数据
- 集成 Umami 数据统计
- 使用 Vercel 部署

### 如何编写文章

在 `content/articles/` 目录下创建 `.md` 文件，使用以下格式：

```markdown
---
title: 文章标题
slug: article-slug
date: 2026-05-01
category: 分类名称
tags:
  - 标签1
  - 标签2
summary: 文章摘要
---

文章正文内容...
```

### 自动部署

每次向 GitHub 仓库推送更新后，Vercel 会通过 Deploy Hook 自动触发重新构建，生成最新的静态页面。
