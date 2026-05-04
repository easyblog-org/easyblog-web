<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div :class="['relative about-hero p-8 md:p-12 text-center overflow-hidden', { 'about-fade-in': loaded }]" style="transition-delay: 0ms">
        <div class="absolute top-0 right-0 w-48 h-48 bg-white/25 rounded-full -translate-y-1/2 translate-x-1/4 hero-shape"></div>
        <div class="absolute bottom-0 left-0 w-40 h-40 bg-white/15 rounded-full translate-y-1/2 -translate-x-1/4 hero-shape"></div>
        <div class="absolute top-1/2 right-10 w-2.5 h-24 bg-white/35 rounded-full -translate-y-1/2 rotate-12 hero-shape"></div>
        <div class="absolute top-8 left-14 w-20 h-2.5 bg-white/28 rounded-full rotate-[-20deg] hero-shape"></div>
        <div class="absolute bottom-10 right-1/4 w-3 h-16 bg-white/22 rounded-full rotate-[25deg] hero-shape"></div>
        <div class="absolute top-1/3 left-6 w-28 h-2 bg-white/18 rounded-full rotate-[15deg] hero-shape"></div>
        <div class="relative z-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm mb-4 about-logo about-scale-in ring-1 ring-white/20" :style="{ transitionDelay: '100ms' }">
            <span class="text-2xl font-bold text-white">E</span>
          </div>
          <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">EasyBlog</h1>
          <p class="text-sm text-white/70">一个轻量、优雅的静态博客系统</p>
        </div>
      </div>

      <div class="p-6 md:p-8">
        <div :class="['grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 about-features', { 'about-stagger-in': loaded }]">
          <div class="group p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 transition-colors" :style="{ transitionDelay: '200ms' }">
            <div class="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1">轻量快速</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">基于 Nuxt 2，SSG 静态生成，秒级加载</p>
          </div>

          <div class="group p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 transition-colors" :style="{ transitionDelay: '280ms' }">
            <div class="w-9 h-9 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Markdown 写作</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">专注内容创作，无需关心样式细节</p>
          </div>

          <div class="group p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 transition-colors" :style="{ transitionDelay: '360ms' }">
            <div class="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1">自动部署</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">GitHub + Webhook + Vercel，推送即发布</p>
          </div>

          <div class="group p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 transition-colors" :style="{ transitionDelay: '440ms' }">
            <div class="w-9 h-9 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.9 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
            </div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1">暗色模式</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">TailwindCSS 驱动，护眼舒适阅读体验</p>
          </div>
        </div>

        <div :class="['border-t border-gray-100 dark:border-gray-800 pt-8 about-author', { 'about-slide-up': loaded }]" style="transition-delay: 520ms">
          <div class="flex items-start gap-4">
            <a
              href="https://www.xinxinnote.tech/about"
              target="_blank"
              rel="noopener"
              class="flex-shrink-0 group"
              title="访问个人主页"
            >
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 flex items-center justify-center ring-2 ring-transparent group-hover:ring-primary/30 transition-all overflow-hidden">
                <img src="https://www.xinxinnote.tech/images/my.webp" alt="Frank" class="w-full h-full object-cover" />
              </div>
            </a>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="font-semibold text-gray-900 dark:text-white text-sm">黄三金 (Frank)</h3>
                <span class="text-xs text-gray-400 dark:text-gray-500">后端工程师 & AI 工程化探索者</span>
                <a
                  href="https://www.xinxinnote.tech/about"
                  target="_blank"
                  rel="noopener"
                  class="ml-auto inline-flex items-center gap-1 text-xs text-primary hover:text-primary-hover transition-colors no-underline"
                >
                  查看详情
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">保持好奇，耐心打磨。好的代码和好的红烧肉一样，火候到了自然香。</p>
              <div class="flex flex-wrap gap-1.5">
                <span class="text-[11px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">Java</span>
                <span class="text-[11px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">Spring</span>
                <span class="text-[11px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">Python</span>
                <span class="text-[11px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">Docker</span>
                <span class="text-[11px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">AIGC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      loaded: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.loaded = true
      }, 60)
    })
  },
}
</script>

<style scoped>
.about-fade-in {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.about-scale-in {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.about-stagger-in > * {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.about-slide-up {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.about-hero {
  background: linear-gradient(135deg, #4f7cff 0%, #2d5af5 100%);
  position: relative;
}

.dark .about-hero {
  background: linear-gradient(135deg, #3a6cf0 0%, #1e4fe4 100%);
}

.hero-shape {
  pointer-events: none;
}

.about-hero .hero-shape:nth-child(1) { animation: shape-float-1 10s ease-in-out infinite; }
.about-hero .hero-shape:nth-child(2) { animation: shape-float-2 12s ease-in-out infinite; }
.about-hero .hero-shape:nth-child(3) { animation: shape-float-3 8s ease-in-out infinite; }
.about-hero .hero-shape:nth-child(4) { animation: shape-float-4 14s ease-in-out infinite; }
.about-hero .hero-shape:nth-child(5) { animation: shape-float-5 11s ease-in-out infinite; }
.about-hero .hero-shape:nth-child(6) { animation: shape-float-6 9s ease-in-out infinite; }

@keyframes shape-float-1 {
  0%, 100% { transform: translateY(-50%) translateX(25%) scale(1); opacity: 0.25; }
  50% { transform: translateY(-40%) translateX(30%) scale(1.08); opacity: 0.35; }
}
@keyframes shape-float-2 {
  0%, 100% { transform: translateY(50%) translateX(-25%) scale(1); opacity: 0.15; }
  50% { transform: translateY(60%) translateX(-20%) scale(1.12); opacity: 0.22; }
}
@keyframes shape-float-3 {
  0%, 100% { transform: translateY(-50%) rotate(12deg); opacity: 0.35; }
  50% { transform: translateY(-55%) rotate(18deg); opacity: 0.48; }
}
@keyframes shape-float-4 {
  0%, 100% { transform: rotate(-20deg); opacity: 0.28; }
  50% { transform: rotate(-14deg) translateX(8px); opacity: 0.38; }
}
@keyframes shape-float-5 {
  0%, 100% { transform: rotate(25deg) translateY(0); opacity: 0.22; }
  50% { transform: rotate(32deg) translateY(-10px); opacity: 0.32; }
}
@keyframes shape-float-6 {
  0%, 100% { transform: rotate(15deg); opacity: 0.18; }
  50% { transform: rotate(10deg) translateX(12px); opacity: 0.26; }
}

.about-hero:not(.about-fade-in) {
  opacity: 0;
  transform: translateY(16px);
}

.about-logo:not(.about-scale-in) {
  opacity: 0;
  transform: scale(0.85);
}

.about-features:not(.about-stagger-in) > * {
  opacity: 0;
  transform: translateY(20px);
}

.about-author:not(.about-slide-up) {
  opacity: 0;
  transform: translateY(24px);
}
</style>