<template>
  <footer class="lg:bg-white dark:lg:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
    <div class="max-w-6xl mx-auto px-4">
      <div class="lg:hidden space-y-6">
        <nav class="flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <NuxtLink to="/" class="hover:text-primary dark:hover:text-primary transition-colors no-underline">首页</NuxtLink>
          <NuxtLink to="/archive" class="hover:text-primary dark:hover:text-primary transition-colors no-underline">作品</NuxtLink>
          <NuxtLink to="/about" class="hover:text-primary dark:hover:text-primary transition-colors no-underline">关于我</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-primary dark:hover:text-primary transition-colors no-underline">联系我</NuxtLink>
        </nav>

        <div class="flex justify-center gap-5">
          <a href="https://github.com" target="_blank" rel="noopener" class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors" aria-label="GitHub">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <button class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors" aria-label="微信" @click="handleWechat">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 3.97c-3.807 0-6.891 2.784-6.891 6.218 0 3.434 3.084 6.218 6.891 6.218.686 0 1.346-.098 1.967-.277a.66.66 0 01.549.075l1.47.86a.25.25 0 00.13.041.228.228 0 00.224-.229c0-.055-.021-.109-.037-.161l-.3-1.146a.456.456 0 01.165-.515C23.028 19.074 24 17.23 24 15.179c0-3.434-3.084-6.218-6.891-6.218h-.171zm-2.57 3.636c.502 0 .909.414.909.924a.917.917 0 01-.909.924.917.917 0 01-.909-.924c0-.51.407-.924.91-.924zm5.14 0c.502 0 .909.414.909.924a.917.917 0 01-.909.924.917.917 0 01-.909-.924c0-.51.407-.924.91-.924z"/></svg>
          </button>
          <a href="https://www.xinxinnote.tech" target="_blank" rel="noopener" class="inline-flex items-center gap-1 px-3 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium no-underline group" aria-label="Frank / dev">
            <span class="font-semibold text-gray-800 dark:text-white">Frank</span>
            <span class="text-primary">/</span>
            <span class="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">dev</span>
          </a>
        </div>

        <p class="text-center text-xs text-gray-400 dark:text-gray-600">&copy;{{ currentYear }} EasyBlog (Frank/dev)</p>
      </div>

      <div class="hidden lg:block">
        <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
          <NuxtLink to="/about" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline border-r border-gray-300 dark:border-gray-700 pr-4 last:border-r-0 last:pr-0">关于网站</NuxtLink>
          <NuxtLink to="/disclaimer" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline border-r border-gray-300 dark:border-gray-700 pr-4 last:border-r-0 last:pr-0">免责声明</NuxtLink>
          <NuxtLink to="/privacy" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline border-r border-gray-300 dark:border-gray-700 pr-4 last:border-r-0 last:pr-0">隐私协议</NuxtLink>
          <NuxtLink to="/service-protocol" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline border-r border-gray-300 dark:border-gray-700 pr-4 last:border-r-0 last:pr-0">用户协议</NuxtLink>
          <NuxtLink to="/sitemap" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline">网站地图</NuxtLink>
        </div>

        <div class="flex justify-center gap-8 mb-6">
          <div class="text-center">
            <img src="@/assets/img/QR-wechat.jpg" alt="微信" class="w-24 h-24 rounded" />
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">联系开发者</p>
          </div>
          <div class="text-center">
            <img src="@/assets/img/QR-public-account.jpg" alt="公众号" class="w-24 h-24 rounded" />
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">关注公众号</p>
          </div>
        </div>

        <div class="text-center text-xs text-gray-400 dark:text-gray-600 space-y-1">
          <div class="flex flex-wrap justify-center gap-x-3">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="hover:text-primary transition-colors no-underline text-gray-400 dark:text-gray-600">ICP备案号</a>
            <NuxtLink to="/disclaimer" class="hover:text-primary transition-colors no-underline text-gray-400 dark:text-gray-600">免责声明</NuxtLink>
          </div>
          <p>&copy;2019-{{ currentYear }} EasyBlog 版权所有</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
  methods: {
    handleWechat() {
      alert('微信号：your_wechat_id（请替换为实际微信号）')
    },
  },
}
</script>
