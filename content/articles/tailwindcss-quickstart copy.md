---
title: 目前最省最强用 Claude ops 4.5 + Gemini 3 Pro 的方案，30 块钱一年
slug: tailwindcss-quickstart-copy
date: 2026-04-28
category: 技术
tags:
  - TailwindCSS
  - CSS
  - 前端
summary: 一篇关于 TailwindCSS 的快速入门指南，介绍核心概念和常用工具类。
featured: true
---

## TailwindCSS 快速入门

TailwindCSS 是一个实用优先的 CSS 框架，它提供了大量的工具类，让你可以直接在 HTML 中构建自定义设计。

### 核心概念

TailwindCSS 的核心理念是**实用优先**（Utility-First），不同于 Bootstrap 等组件级框架，TailwindCSS 提供的是原子级的 CSS 类。

### 常用工具类

#### 布局

- `flex` / `grid` - 弹性布局 / 网格布局
- `items-center` - 垂直居中
- `justify-between` - 两端对齐
- `gap-4` - 间距

#### 间距

- `p-4` - 内边距
- `m-4` - 外边距
- `px-4` - 水平内边距
- `py-2` - 垂直内边距

#### 文字

- `text-lg` - 大号文字
- `font-bold` - 粗体
- `text-gray-600` - 灰色文字

### 响应式设计

TailwindCSS 使用移动优先的响应式设计：

- `sm:` - 640px 以上
- `md:` - 768px 以上
- `lg:` - 1024px 以上
- `xl:` - 1280px 以上

```html
<template>
  <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 h-16 border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-6xl mx-auto px-4 flex items-center justify-between h-full">
      <NuxtLink to="/" class="text-xl font-bold text-primary no-underline">EasyBlog</NuxtLink>

      <nav class="hidden md:flex items-center">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="mx-3 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline text-sm"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <div class="relative hidden sm:block">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        <button class="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" @click="toggleTheme" :title="isDark ? '切换浅色' : '切换深色'">
          <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        </button>

        <a href="https://github.com" target="_blank" rel="noopener" class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>

        <button class="md:hidden text-gray-600 dark:text-gray-400 p-1" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3">
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="block py-2.5 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline text-sm"
        @click.native="mobileMenuOpen = false"
      >
        {{ item.label }}
      </NuxtLink>
      <div class="mt-2 relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        { label: '分类', path: '/categories' },
        { label: '标签', path: '/tags' },
        { label: '专栏', path: '/collections' },
        { label: '关于', path: '/about' },
      ],
    }
  },
  mounted() {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.isDark = true
      document.documentElement.classList.add('dark')
    }
  },
  methods: {
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
  },
}
</script>

```
