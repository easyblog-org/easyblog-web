<template>
  <PageContainer>
    <div class="mb-12">
      <div class="text-sm text-gray-400 dark:text-gray-500 mb-3 font-mono">
        最后更新 · {{ lastUpdated }}
      </div>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
        关于这个网站
      </h1>
      <p class="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
        Nuxt3 + TailwindCSS + Vercel + Redis —— 一个后端工程师的全栈实践。
      </p>
    </div>

    <section class="mb-10">
      <h2 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white border-l-4 border-primary pl-4 mb-4">
        缘起：为什么不直接用现成的？
      </h2>
      <div class="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
        <p>
          市面上不缺好用的博客框架，Hexo 快，Hugo 更快，WordPress 功能丰富。
          但我最终还是选择从零开始搭一套 —— 并不是因为现成的不好，而是想在这个过程里把 Nuxt 3
          的全栈能力、Tailwind 的样式系统、Redis 持久化存储、Git 驱动的部署串起来完整跑一遍。
        </p>
        <p>
          这篇博客就是这套流程的产物，也是我持续迭代的一个技术练兵场。
          从最初的 Nuxt 2 到全面迁移至 Nuxt 3，每一次重构都是对现代前端工程化的深入理解。
        </p>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white border-l-4 border-primary pl-4 mb-4">
        技术选型
      </h2>
      <div class="space-y-6">
        <div>
          <h3 class="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
            Nuxt 3 · 全栈框架
          </h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
            基于 Vue 3 的现代化全栈框架，采用 Composition API 和 &lt;script setup&gt; 语法。
            服务端渲染（SSR）与静态生成（SSG）灵活切换，内置文件路由系统，
            使用 Pinia 替代 Vuex 进行状态管理。Nuxt 3 对 Node.js 20+ 的完美支持，
            让部署在 Vercel 上更加顺畅。
          </p>
        </div>
        <div>
          <h3 class="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
            TailwindCSS · 样式系统
          </h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
            不用再为类名纠结，直接在模板上组合实用类。暗色模式通过 Tailwind 的
            <code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">dark:</code>
            变体实现，配合系统主题跟随，日间和夜间的阅读体验都还说得过去。
          </p>
        </div>
        <div>
          <h3 class="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
            Marked + Highlight.js · 内容渲染
          </h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
            使用 Marked 解析 Markdown 内容，配合 Highlight.js 实现代码高亮。
            自定义代码块样式，支持语言标签、行号显示、一键复制等功能，
            打造接近掘金风格的阅读体验。
          </p>
        </div>
        <div>
          <h3 class="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
            GitHub + Vercel · 自动部署
          </h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
            代码托管在 GitHub 组织仓库 easyblog-org/easyblog-web，每次 push 到 main 分支，
            Webhook 触发 Vercel 重新构建，大约 20 秒后新版就能上线。
            整个过程不用手动传文件，也不用操心服务器运维。
          </p>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white border-l-4 border-primary pl-4 mb-4">
        暗色模式 · 一点点实现细节
      </h2>
      <div class="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3 text-sm md:text-base">
        <p>
          Tailwind 内置的 dark 变体已经解决了大半问题。剩下的主要是全局背景切换，以及需要自定义几处深色主题下的容器阴影。
          通过在 HTML 根元素上动态添加/移除 <code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">dark</code> 类名来实现主题切换。
        </p>
        <pre class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-xs md:text-sm font-mono"><code>&lt;!-- 日间模式 --&gt;
&lt;div class="bg-white"&gt;&lt;/div&gt;

&lt;!-- 手动触发暗色模式 --&gt;
&lt;div class="dark:bg-gray-900"&gt;&lt;/div&gt;

&lt;!-- 跟随系统主题 --&gt;
&lt;script&gt;
if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
  document.documentElement.classList.add('dark')
}
&lt;/script&gt;</code></pre>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          完整代码可以在 GitHub 仓库看到，这里只贴最核心的一小段示意。
        </p>
      </div>
    </section>

    <section class="mb-10 pb-8 border-b border-gray-100 dark:border-gray-800">
      <h2 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white border-l-4 border-primary pl-4 mb-4">
        关于我
      </h2>
      <div class="flex items-start gap-4 flex-wrap sm:flex-nowrap">
        <div class="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden">
          <img src="https://www.xinxinnote.tech/images/my.webp" alt="Frank" class="w-full h-full object-cover" />
        </div>
        <div>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-2 text-sm md:text-base">
            后端工程师 & AI 工程化探索者。日常写 Java 和 Python，对干净、克制的设计有执念。
            相信好的工具能让开发者更专注于创造本身。
          </p>
          <a
            href="https://www.xinxinnote.tech/about"
            class="inline-flex items-center text-primary hover:underline text-sm"
            target="_blank"
            rel="noopener"
          >
            完整履历和个人介绍 →
          </a>
        </div>
      </div>
    </section>

    <div class="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
      <div class="flex gap-4">
        <a href="https://github.com/easyblog-org/easyblog-web" target="_blank" rel="noopener" class="hover:text-gray-700 dark:hover:text-gray-300">GitHub 仓库</a>
        <span class="text-gray-300 dark:text-gray-600">·</span>
        <span class="relative group cursor-default select-none">
          RSS 订阅
          <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 text-xs text-gray-50 bg-gray-700 dark:bg-gray-300 dark:text-gray-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">即将上线，敬请期待</span>
        </span>
      </div>
      <div class="flex items-center gap-2">
        <span class="inline-block w-2 h-2 rounded-full bg-green-500"></span>
        <span>Vercel 构建状态：正常</span>
      </div>
    </div>
  </PageContainer>
</template>

<script setup>
import PageContainer from '~/components/common/PageContainer.vue'

const now = new Date()
const lastUpdated = `${now.getFullYear()} 年 ${now.getMonth() + 1} 月`

useHead({
  title: '关于这个网站 | EasyBlog',
  meta: [
    { name: 'description', content: 'EasyBlog 背后的技术选型与设计思考——Nuxt3、TailwindCSS、Redis、Vercel 自动部署。' },
  ],
})
</script>

<style scoped>
code {
  font-family: 'Fira Code', 'Cascadia Code', monospace;
}
</style>
