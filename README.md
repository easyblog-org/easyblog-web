# EasyBlog

<p align="center">
  <strong>一个基于 Nuxt 3 + TailwindCSS 的现代化静态博客系统</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-3.x-black?logo=nuxt.js" alt="Nuxt 3" />
  <img src="https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js" alt="Vue 3" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Pinia-State%20Management-F96854?logo=pinia" alt="Pinia" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel" alt="Vercel" />
  <img src="https://img.shields.io/badge/Redis-Upstash-DC382D?logo=redis" alt="Redis" />
</p>

---

## ✨ 项目简介

EasyBlog 是一款为后端工程师打造的轻量级博客系统，采用 **Nuxt 3 + TailwindCSS + Vercel ** 技术栈构建。支持 Markdown 文章编写、代码语法高亮、文章统计、暗色模式等功能，具备响应式设计，适配桌面端与移动端。

### 🎯 核心特性

| 特性 | 说明 |
|------|------|
| 📝 **Markdown 渲染** | 基于 `marked` 库实现完整的 Markdown 解析与渲染 |
| 🎨 **代码高亮** | 集成 `highlight.js`，支持多种编程语言语法高亮 |
| 🌙 **暗色模式** | 支持亮色/暗色主题切换，自动跟随系统偏好 |
| 📊 **文章统计** | 基于 Upstash Redis 的阅读数与点赞数持久化存储 |
| 🏷️ **分类标签** | 支持文章分类与多标签管理 |
| 📱 **响应式设计** | 移动端优先的 UI 设计，完美适配各种屏幕尺寸 |
| ⚡ **SSG/SSR** | 支持 Nuxt 3 的静态站点生成与服务端渲染 |
| 🔍 **SEO 优化** | 内置 Sitemap、语义化 HTML、Meta 标签优化 |

---

## 🛠️ 技术栈

### 前端框架

| 技术 | 版本 | 用途 |
|------|------|------|
| [Nuxt](https://nuxt.com/) | ^3.11.0 | Vue 3 全栈框架 |
| [Vue](https://vuejs.org/) | ^3.4.0 | 渐进式 JavaScript 框架 |
| [TailwindCSS](https://tailwindcss.com/) | ^3.4.19 | 原子化 CSS 框架 |
| [Pinia](https://pinia.vuejs.org/) | ^2.1.7 | Vue 状态管理库 |

### 功能库

| 技术 | 版本 | 用途 |
|------|------|------|
| [marked](https://github.com/markedjs/marked) | ^18.0.3 | Markdown 解析器 |
| [highlight.js](https://highlightjs.org/) | ^11.11.1 | 代码语法高亮 |
| [front-matter](https://github.com/jxson/front-matter) | ^4.0.2 | YAML Front Matter 解析 |
| [@nuxtjs/sitemap](https://sitemap.nuxtjs.org/) | ^5.1.0 | Sitemap 自动生成 |

### 后端 & 部署

| 技术 | 用途 |
|------|------|
| [Vercel](https://vercel.com/) | 生产环境部署与 CDN 加速 |
| [Redis (Upstash)](https://upstash.com/) | 文章统计数据持久化存储 |
| [GitHub Actions](https://github.com/features/actions) | CI/CD 自动化部署 |
| [Docker](https://www.docker.com/) | 容器化部署支持 |

---

## 📁 项目结构

```
easyblog-web/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions 自动部署配置
├── assets/
│   ├── css/
│   │   └── main.css                # 全局样式文件
│   └── img/                        # 静态图片资源
├── components/
│   ├── article/
│   │   ├── ArticleList.vue         # 文章列表组件
│   │   ├── AuthorCard.vue          # 作者信息卡片
│   │   ├── MarkdownPreviewer.vue   # Markdown 渲染组件
│   │   └── PostTOC.vue             # 文章目录导航
│   ├── common/
│   │   └── WechatQrcodePopup.vue   # 微信公众号二维码弹窗
│   └── layout/
│       ├── Breadcrumb.vue          # 面包屑导航
│       ├── Sidebar.vue             # 侧边栏（分类/标签）
│       ├── SimpleFooter.vue        # 页脚组件
│       └── TheHeader.vue           # 页头导航栏
├── content/
│   └── articles/                   # 📄 Markdown 文章存放目录
│       ├── welcome-to-easyblog.md
│       └── tailwindcss-quickstart.md
├── layouts/
│   ├── default.vue                 # 默认布局模板
│   └── error.vue                   # 错误页布局
├── pages/
│   ├── index.vue                   # 🏠 首页
│   ├── article/[slug].vue         # 📰 文章详情页（动态路由）
│   ├── about/index.vue            # ℹ️ 关于页面
│   ├── archive/index.vue          # 📚 文章归档
│   ├── sitemap/index.vue          # 🗺️ 网站地图
│   ├── collections/index.vue      # 📦 专题合集
│   ├── disclaimer/index.vue       # ⚠️ 免责声明
│   ├── privacy/index.vue          # 🔒 隐私政策
│   └── service-protocol/index.vue # 📋 服务协议
├── plugins/
│   ├── article-loader.js          # 文章数据加载插件
│   └── dateFormat.js              # 日期格式化插件
├── server/
│   └── api/
│       ├── articles.js            # 📡 文章列表 API
│       └── stats.js               # 📊 统计数据 API
├── store/
│   └── blog.js                    # Pinia 博客状态管理
├── utils/
│   ├── redis.js                   # Redis 操作工具
│   └── stats.js                   # 统计功能工具
├── scripts/
│   └── sync-content.js            # 文章同步脚本
├── public/                        # 公共静态资源
├── .env                           # 环境变量配置
├── nuxt.config.js                 # Nuxt 配置文件
├── vercel.json                    # Vercel 部署配置
├── tailwind.config.js             # TailwindCSS 配置
├── package.json                   # 项目依赖声明
├── Dockerfile                     # Docker 构建配置
└── README.md                      # 项目说明文档
```

---

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 20.0.0
- **npm**: >= 9.0.0 或 **yarn**: >= 1.22.0
- **Git**: 用于版本控制

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/easyblog-org/easyblog-web.git
cd easyblog-web

# 安装依赖
npm install
# 或使用 yarn
# yarn install
```

### 开发模式

```bash
# 启动开发服务器（默认端口 3001）
npm run dev

# 访问 http://localhost:3001
```

### 构建生产版本

```bash
# 生成静态站点（用于 Vercel 部署）
npm run generate

# 构建 SSR 应用
npm run build
npm run start
```

---

## 📝 文章编写指南

### 文章存放位置

所有 Markdown 文章存放在 `content/articles/` 目录下。

### 文章格式规范

每篇文章必须包含 YAML Front Matter 头部元数据：

```markdown
---
title: 文章标题
slug: article-slug              # URL 路径标识（可选，默认使用文件名）
date: 2026-05-07                # 发布日期（YYYY-MM-DD 格式）
updated: 2026-05-07             # 更新日期（可选）
category: 前端                  # 文章分类
tags:                          # 标签列表（可多个）
  - JavaScript
  - Vue
summary: 文章摘要描述             # 摘要（显示在列表页）
cover: /images/cover.jpg        # 封面图路径（可选）
featured: true                  # 是否设为精选文章（可选）
status: published               # 状态：published / draft
---

# 文章正文开始

这里使用标准 **Markdown** 语法编写内容。

## 代码示例

\`\`\`javascript
const hello = 'Hello, EasyBlog!'
console.log(hello)
\`\`\`
```

### Front Matter 字段说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `title` | String | ✅ | - | 文章标题 |
| `slug` | String | ❌ | 文件名 | URL 友好的唯一标识符 |
| `date` | String | ✅ | - | 发布日期（YYYY-MM-DD） |
| `updated` | String | ❌ | - | 最后更新日期 |
| `category` | String | ❌ | - | 文章所属分类 |
| `tags` | Array | ❌ | [] | 标签数组 |
| `summary` | String | ❌ | - | 文章摘要（建议 100 字以内） |
| `cover` | String | ❌ | - | 封面图片路径或 URL |
| `featured` | Boolean | ❌ | false | 是否为精选文章 |
| `status` | String | ❌ | published | `published`（发布）或 `draft`（草稿） |

---

## ⚙️ 配置说明

### 环境变量

在项目根目录创建 `.env` 文件（已包含在 `.gitignore` 中，不会被提交）：

```bash
# ===== Redis 统计功能配置 =====

# 是否启用 Redis 统计（true=启用，false=降级为 localStorage）
ENABLE_REDIS_STATS=true

# Upstash Redis REST API 地址
REDIS_URL=https://your-redis-instance.upstash.io

# Upstash Redis 认证 Token
REDIS_TOKEN=your-redis-token-here

# 阅读数防刷冷却时间（秒），同一 IP 同一文章在此时间内只计一次访问
STATS_VIEW_COOLDOWN=3600

# 点赞防重复有效期（秒），同一 IP 同一文章在此时间内只能点赞一次
STATS_LIKE_EXPIRE=3600

# Redis API 调试日志开关（true=开启详细日志，false=关闭日志输出）
ENABLE_REDIS_DEBUG=false
```

### Nuxt 配置

主要配置项位于 [nuxt.config.js](nuxt.config.js)：

```javascript
export default defineNuxtConfig({
  // 兼容日期
  compatibilityDate: '2024-11-01',
  
  // 运行时配置（从环境变量读取）
  runtimeConfig: {
    redisUrl: process.env.REDIS_URL,
    redisToken: process.env.REDIS_TOKEN,
    enableRedisStats: process.env.ENABLE_REDIS_STATS === 'true',
    // ...
  },
  
  // Nitro 预渲染配置
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
})
```

---

## 🌐 部署指南

### 方式一：Vercel 部署（推荐）

#### 1. 通过 GitHub 连接自动部署

1. Fork 本仓库到你的 GitHub 账号
2. 登录 [Vercel](https://vercel.com/)
3. 点击 "Import Project"，选择 Fork 的仓库
4. Vercel 会自动检测 Nuxt 项目并配置构建设置
5. 在 Environment Variables 中添加：
   - `ENABLE_REDIS_STATS`: `true`
   - `REDIS_URL`: 你的 Redis 地址
   - `REDIS_TOKEN`: 你的 Redis Token
6. 点击 "Deploy"

#### 2. 使用 GitHub Actions 自动部署

项目内置了 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)，需要配置以下 Secrets：

| Secret 名称 | 说明 | 获取方式 |
|-------------|------|----------|
| `VERCEL_TOKEN` | Vercel API Token | Vercel Dashboard → Settings → Tokens |
| `VERCEL_ORG_ID` | 组织 ID | Vercel Dashboard → Settings → General |
| `VERCEL_PROJECT_ID` | 项目 ID | Vercel Dashboard → Project → Settings → General |

配置完成后，每次推送到 `master` 分支会自动触发部署。

### 方式二：Docker 部署

```bash
# 构建镜像
docker build -t easyblog-web .

# 运行容器
docker run -d \
  --name easyblog \
  -p 3000:3000 \
  -e ENABLE_REDIS_STATS=true \
  -e REDIS_URL=your-redis-url \
  -e REDIS_TOKEN=your-redis-token \
  easyblog-web
```

### 方式三：本地部署

```bash
# 安装依赖
npm install

# 设置环境变量
cp .env.example .env
# 编辑 .env 填入实际配置

# 生成静态文件
npm run generate

# 使用任意静态文件服务器托管 output 目录
# 例如使用 serve:
npx serve .output/public
```

---

## 📊 统计功能说明

### 工作原理

EasyBlog 采用**双层架构**实现文章统计数据：

```
用户请求 → API (/api/stats) → Redis (主存储)
                              ↓ (不可用时)
                         localStorage (兜底)
```

### API 接口

| 接口 | 方法 | 参数 | 说明 |
|------|------|------|------|
| `/api/stats?action=batch` | GET | slugs | 批量获取文章统计 |
| `/api/stats?action=view` | GET | slug | 记录一次阅读 |
| `/api/stats?action=like` | GET | slug | 切换点赞状态 |
| `/api/stats?action=liked` | GET | slug | 查询是否已点赞 |

### 防刷机制

- **阅读数冷却**：同一 IP 同一文章在 `STATS_VIEW_COOLDOWN` 秒内只计一次访问（默认 1 小时）
- **点赞去重**：同一 IP 同一文章在 `STATS_LIKE_EXPIRE` 秒内只能点赞一次（默认 1 小时）

---

## 🎨 自定义主题

### 修改颜色方案

编辑 [tailwind.config.js](tailwind.config.js) 或在 CSS 中覆盖 CSS 变量：

```css
/* 主要颜色 */
--color-primary: #2563eb;
--color-primary-hover: #1d4ed8;

/* 背景色 */
--bg-page: #f8fafc;
--bg-card: #ffffff;

/* 文字颜色 */
--text-primary: #1e293b;
--text-secondary: #64748b;
```

### 添加新页面

1. 在 `pages/` 目录下创建新的 `.vue` 文件
2. Nuxt 3 会自动生成对应的路由
3. 使用 `layouts/default.vue` 作为布局模板

---

## 📋 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（热重载） |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产服务器 |
| `npm run generate` | 生成静态站点（SSG） |
| `npm run lint` | 运行 ESLint 和 Prettier 检查 |
| `npm run lintfix` | 自动修复 lint 问题 |

---

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 提交规范

本项目遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建/工具链变更

---

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

---

## 🔗 相关链接

- **GitHub 仓库**: https://github.com/easyblog-org/easyblog-web
- **在线演示**: （待补充）
- **问题反馈**: [GitHub Issues](https://github.com/easyblog-org/easyblog-web/issues)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/easyblog-org">EasyBlog Team</a>
</p>
