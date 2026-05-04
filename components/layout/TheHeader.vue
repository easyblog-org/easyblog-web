<template>
  <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-[var(--color-divider)]">
    <div class="max-w-6xl mx-auto px-4 flex items-center justify-between h-14 lg:h-16">
      <NuxtLink to="/" class="text-xl font-bold no-underline" style="color: var(--color-primary)">EasyBlog</NuxtLink>

      <nav class="hidden md:flex items-center">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'mx-3 text-sm no-underline transition-colors',
            isActive(item.path)
              ? 'text-primary font-medium relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-primary after:w-full'
              : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
          ]"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3 lg:gap-4">
        <div class="relative hidden sm:block">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索文章..."
            class="w-[200px] focus:w-[260px] transition-all duration-300 rounded-full bg-gray-100 dark:bg-gray-800 pl-10 pr-4 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            @keyup.enter="handleSearch"
          />
        </div>

        <button
          class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer select-none"
          style="min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center;"
          @click.prevent.stop="toggleTheme()"
          :title="isDark ? '切换浅色' : '切换深色'"
        >
          <svg v-if="isDark" class="w-[22px] h-[22px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          <svg v-else class="w-[22px] h-[22px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        </button>

        <a href="https://github.com/LoverITer" target="_blank" rel="noopener" class="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-blacktransition-colors cursor-pointer" style="min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center;">
          <svg class="w-[22px] h-[22px] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>

        <button
          class="lg:hidden text-gray-600 dark:text-gray-400 p-2 cursor-pointer select-none inline-flex"
          style="min-width: 44px; min-height: 44px; align-items: center; justify-content: center;"
          @click.prevent.stop="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="md:hidden bg-white dark:bg-gray-900 border-t border-[var(--color-divider)] px-4 py-3">
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'block py-2.5 text-sm no-underline transition-colors',
          isActive(item.path)
            ? 'text-primary font-medium'
            : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
        ]"
        @click.native="mobileMenuOpen = false"
      >
        {{ item.label }}
      </NuxtLink>
      <div class="mt-2 relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索文章..."
          class="w-full rounded-full bg-gray-100 dark:bg-gray-800 pl-10 pr-4 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          @keyup.enter="handleSearch"
        />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      searchQuery: '',
      mobileMenuOpen: false,
      isDark: false,
      navItems: [
        { label: '首页', path: '/' },
         { label: '归档', path: '/archive' },
        { label: '专栏', path: '/collections' },
        { label: '关于', path: '/about' },
      ],
    }
  },
  mounted() {
    this.initTheme()
  },
  methods: {
    initTheme() {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        this.isDark = true
        document.documentElement.classList.add('dark')
      } else {
        this.isDark = false
        document.documentElement.classList.remove('dark')
      }
    },
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ path: '/', query: { q: this.searchQuery.trim() } })
        this.mobileMenuOpen = false
      }
    },
    toggleTheme() {
      this.isDark = !this.isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    },
    isActive(path) {
      if (path === '/') return this.$route.path === '/'
      return this.$route.path.startsWith(path)
    },
  },
}
</script>
