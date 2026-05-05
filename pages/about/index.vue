<template>
  <div class="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
    <div class="flex-1 w-full max-w-3xl mx-auto px-6 py-12">

      <div :class="['about-fade-in mb-12', { 'is-loaded': loaded }]" style="transition-delay: 0ms">
        <div class="text-sm text-neutral-500 dark:text-neutral-400 mb-3 font-mono">
          最后更新 · {{ lastUpdated }}
        </div>
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
          关于这个网站
        </h1>
        <p class="text-neutral-600 dark:text-neutral-300 mt-3 leading-relaxed">
          Nuxt2 + TailwindCSS + Vercel —— 一个后端工程师的全栈实践。
        </p>
      </div>

      <section :class="['about-fade-in mb-12', { 'is-loaded': loaded }]" style="transition-delay: 80ms">
        <h2 class="text-xl font-semibold text-neutral-900 dark:text-white border-l-4 border-amber-500 pl-4 mb-4">
          缘起：为什么不直接用现成的？
        </h2>
        <div class="space-y-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <p>
            市面上不缺好用的博客框架，Hexo 快，Hugo 更快，WordPress 功能丰富。
            但我最终还是选择从零开始搭一套 —— 并不是因为现成的不好，而是想在这个过程里把 Nuxt
            的静态生成、Tailwind 的样式系统、Git 驱动的部署串起来完整跑一遍。
          </p>
          <p>
            这篇博客就是这套流程的产物，也是我持续迭代的一个技术练兵场。
          </p>
        </div>
      </section>

      <section :class="['about-fade-in mb-12', { 'is-loaded': loaded }]" style="transition-delay: 160ms">
        <h2 class="text-xl font-semibold text-neutral-900 dark:text-white border-l-4 border-amber-500 pl-4 mb-4">
          技术选型
        </h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">
              Nuxt2 · 静态生成（SSG）
            </h3>
            <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              构建时预渲染 HTML，直接部署静态文件，不需要 Node 服务端。
              选择 Nuxt2 而非 Nuxt3，是因为 2 的生态目前更稳定，相关插件和踩坑经验足够丰富。
            </p>
          </div>
          <div>
            <h3 class="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">
              TailwindCSS · 样式系统
            </h3>
            <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              不用再为类名纠结，直接在模板上组合实用类。暗色模式通过 Tailwind 的
              <code class="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm">dark:</code>
              变体实现，配合系统主题跟随，日间和夜间的阅读体验都还说得过去。
            </p>
          </div>
          <div>
            <h3 class="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">
              GitHub + Vercel · 自动部署
            </h3>
            <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              代码全在 GitHub 上托管，每次 push 到 main 分支，Webhook 触发 Vercel 重新构建，
              大约 20 秒后新版就能上线。整个过程不用手动传文件，也不用操心服务器运维。
            </p>
          </div>
        </div>
      </section>

      <section :class="['about-fade-in mb-12', { 'is-loaded': loaded }]" style="transition-delay: 240ms">
        <h2 class="text-xl font-semibold text-neutral-900 dark:text-white border-l-4 border-amber-500 pl-4 mb-4">
          暗色模式 · 一点点实现细节
        </h2>
        <div class="text-neutral-600 dark:text-neutral-300 leading-relaxed space-y-3">
          <p>
            Tailwind 内置的 dark 变体已经解决了大半问题。剩下的主要是全局背景切换，以及需要自定义几处深色主题下的容器阴影。
          </p>
          <pre class="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>&lt;!-- 日间模式 --&gt;
&lt;div class="bg-white"&gt;&lt;/div&gt;

&lt;!-- 手动触发暗色模式 --&gt;
&lt;div class="dark:bg-neutral-900"&gt;&lt;/div&gt;</code></pre>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">
            完整代码可以在 GitHub 仓库看到，这里只贴最核心的一小段示意。
          </p>
        </div>
      </section>

      <section :class="['about-fade-in mb-12 pb-8 border-b border-neutral-200 dark:border-neutral-800', { 'is-loaded': loaded }]" style="transition-delay: 320ms">
        <h2 class="text-xl font-semibold text-neutral-900 dark:text-white border-l-4 border-amber-500 pl-4 mb-4">
          关于我
        </h2>
        <div class="flex items-start gap-4 flex-wrap sm:flex-nowrap">
          <div class="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0 overflow-hidden">
            <img src="https://www.xinxinnote.tech/images/my.webp" alt="Frank" class="w-full h-full object-cover" />
          </div>
          <div>
            <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
              后端工程师 & AI 工程化探索者。日常写 Java 和 Python，对干净、克制的设计有执念。
            </p>
            <a
              href="https://www.xinxinnote.tech/about"
              class="inline-flex items-center text-amber-600 dark:text-amber-400 hover:underline text-sm"
              target="_blank"
              rel="noopener"
            >
              完整履历和个人介绍 →
            </a>
          </div>
        </div>
      </section>

      <div :class="['about-fade-in flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-500 dark:text-neutral-400', { 'is-loaded': loaded }]" style="transition-delay: 400ms">
        <div class="flex gap-4">
          <a href="https://github.com/LoverITer" target="_blank" rel="noopener" class="hover:text-neutral-700 dark:hover:text-neutral-300">GitHub 仓库</a>
          <span class="text-neutral-300 dark:text-neutral-600">·</span>
          <span class="relative group cursor-default select-none">
            RSS 订阅
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 text-xs text-neutral-50 bg-neutral-700 dark:bg-neutral-300 dark:text-neutral-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">即将上线，敬请期待</span>
          </span>
        </div>
        <div class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-green-500"></span>
          <span>Vercel 构建状态：正常</span>
        </div>
      </div>

    </div>
    <SimpleFooter />
  </div>
</template>

<script>
import SimpleFooter from '~/components/layout/SimpleFooter.vue'

export default {
  name: 'AboutPage',
  components: { SimpleFooter },
  data() {
    return {
      loaded: false,
      lastUpdated: '',
    }
  },
  mounted() {
    const now = new Date()
    this.lastUpdated = `${now.getFullYear()} 年 ${now.getMonth() + 1} 月`
    this.$nextTick(() => {
      setTimeout(() => {
        this.loaded = true
      }, 60)
    })
  },
  head() {
    return {
      title: '关于这个网站 | EasyBlog',
      meta: [
        { hid: 'description', name: 'description', content: 'EasyBlog 背后的技术选型与设计思考——Nuxt2、TailwindCSS、Vercel 自动部署。' },
      ],
    }
  },
}
</script>

<style scoped>
code {
  font-family: 'Fira Code', 'Cascadia Code', monospace;
}

.about-fade-in {
  opacity: 0;
  transform: translateX(24px);
  transition: opacity 0.35s ease-out, transform 0.35s ease-out;
}

.about-fade-in.is-loaded {
  opacity: 1;
  transform: translateX(0);
}
</style>
