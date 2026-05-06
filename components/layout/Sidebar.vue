<template>
  <div class="space-y-4 lg:block">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">分类</h3>
      <div v-if="categories.length === 0" class="text-sm text-gray-400">暂无分类</div>
      <div v-else class="space-y-0.5">
        <NuxtLink
          :to="{ path: '/' }"
          :class="['jj-cat-item', { 'jj-cat-item--active': !activeCategory }]"
        >
          <svg class="w-4 h-4 jj-cat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <span>全部</span>
        </NuxtLink>
        <NuxtLink
          v-for="(cat, idx) in categories"
          :key="cat.name"
          :to="{ path: '/', query: { category: cat.name } }"
          :class="['jj-cat-item', { 'jj-cat-item--active': activeCategory === cat.name }]"
        >
          <span v-html="getCategoryIcon(idx)" class="jj-cat-icon-wrap"></span>
          <span>{{ cat.name }}</span>
          <span class="jj-cat-count">{{ cat.count }}</span>
        </NuxtLink>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">标签</h3>
      <div v-if="tags.length === 0" class="text-sm text-gray-400">暂无标签</div>
      <div v-else class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="tag in tags"
          :key="tag.name"
          :to="{ path: '/', query: { tag: tag.name } }"
          class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-primary/10 no-underline transition-colors"
        >
          {{ tag.name }}
        </NuxtLink>
      </div>
    </div>

    <div v-if="showCollection && collections && collections.length" class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">推荐专栏</h3>
      <div class="space-y-3">
        <div
          v-for="col in collections"
          :key="col.slug"
          class="border border-gray-100 dark:border-gray-800 rounded-lg p-3 hover:border-primary/30 dark:hover:border-primary/30 transition-colors"
        >
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white">{{ col.title }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ col.description }}</p>
          <div class="flex items-center justify-between mt-2">
            <span class="text-sm font-bold text-primary">{{ col.price }}</span>
            <button class="text-xs bg-primary text-white px-3 py-1 rounded-full hover:bg-primary-hover transition-colors" @click="handleSubscribe(col)">订阅</button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-gray-900 dark:text-white text-sm">关于作者</h3>
        <a
          href="https://www.xinxinnote.tech/about"
          target="_blank"
          rel="noopener"
          class="text-[11px] text-primary hover:text-primary-hover transition-colors no-underline whitespace-nowrap"
        >
          查看详情 →
        </a>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">后端工程师，AI 工程化探索者。保持好奇，耐心打磨。</p>
      <div class="flex items-center gap-3">
        <a href="https://github.com/easyblog-org/easyblog-web" target="_blank" rel="noopener" class="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-primary transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://juejin.cn" target="_blank" rel="noopener" class="text-gray-400 hover:text-primary dark:text-gray-500 dark:hover:text-primary transition-colors" title="掘金">
           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 1316 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7796" width="24" height="24"><path d="M643.181714 247.698286l154.916572-123.172572L643.181714 0.256 643.072 0l-154.660571 124.269714 154.660571 123.245715 0.109714 0.182857z m0 388.461714h0.109715l399.579428-315.245714-108.361143-87.04-291.218285 229.888h-0.146286l-0.109714 0.146285L351.817143 234.093714l-108.251429 87.04 399.433143 315.136 0.146286-0.146285z m-0.146285 215.552l0.146285-0.146286 534.893715-422.034285 108.397714 87.04-243.309714 192L643.145143 1024 10.422857 525.056 0 516.754286l108.251429-86.893715L643.035429 851.748571z" fill="currentColor" p-id="7797"></path></svg>
        </a>
        <button @click="showWechatQrcode = true" class="text-gray-400 hover:text-[#29AE66] dark:text-[#29AE66]dark:hover:text-[#29AE66] transition-colors cursor-pointer bg-transparent border-0 p-0" title="微信公众号">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zM14.033 13.3c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"/></svg>
        </button>

    <WechatQrcodePopup :value="showWechatQrcode" @input="showWechatQrcode = $event" />
      </div>
    </div>

    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">关于本站</h3>
      <nav class="flex flex-wrap gap-x-3 gap-y-1.5 mb-3">
        <NuxtLink to="/about" class="text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline">关于网站</NuxtLink>
        <NuxtLink to="/disclaimer" class="text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline">免责声明</NuxtLink>
        <NuxtLink to="/privacy" class="text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline">隐私协议</NuxtLink>
        <NuxtLink to="/service-protocol" class="text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline">用户协议</NuxtLink>
        <NuxtLink to="/sitemap" class="text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline">网站地图</NuxtLink>
      </nav>
      <p class="text-xs text-gray-400 dark:text-gray-600">&copy; {{ currentYear }} EasyBlog 版权所有 · Powered by Nuxt</p>
    </div>
  </div>
</template>

<script>
import WechatQrcodePopup from '@/components/common/WechatQrcodePopup.vue'

const CATEGORY_ICONS = [
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>',
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>',
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
]

export default {
  name: 'SidebarComponent',
  components: { WechatQrcodePopup },
  props: {
    categories: { type: Array, default: () => [] },
    tags: { type: Array, default: () => [] },
    collections: { type: Array, default: () => [] },
  },
  data() {
    return {
      showCollection: false,
      showWechatQrcode: false,
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
    activeCategory() {
      return this.$route.query.category || ''
    },
  },
  methods: {
    getCategoryIcon(idx) {
      return CATEGORY_ICONS[idx % CATEGORY_ICONS.length] || CATEGORY_ICONS[0]
    },
    handleSubscribe(col) {
      alert('订阅专栏：' + col.title + '（功能开发中）')
    },
  },
}
</script>

<style scoped>
.jj-cat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 14px;
  color: #555;
  text-decoration: none;
  transition: all 0.15s ease;
}

.dark .jj-cat-item {
  color: #aaa;
}

.jj-cat-item:hover {
  background-color: #f5f7fa;
  color: #1a1a1a;
}

.dark .jj-cat-item:hover {
  background-color: rgba(255,255,255,0.05);
  color: #e5e5e5;
}

.jj-cat-item--active {
  background-color: #e8f3ff;
  color: var(--color-primary, #1e80ff);
  font-weight: 600;
}

.dark .jj-cat-item--active {
  background-color: rgba(30,128,255,0.12);
}

.jj-cat-icon {
  flex-shrink: 0;
  opacity: 0.7;
}

.jj-cat-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.7;
}

.jj-cat-icon-wrap :deep(svg) {
  color: inherit;
}

.jj-cat-item--active .jj-cat-icon {
  opacity: 1;
}

.jj-cat-item--active .jj-cat-icon-wrap {
  opacity: 1;
}

.jj-cat-count {
  margin-left: auto;
  flex-shrink: 0;
  font-size: 12px;
  color: #bbb;
}
</style>
