<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">网站地图</h1>
      <div class="space-y-2">
        <NuxtLink to="/" class="block text-primary hover:underline no-underline">首页</NuxtLink>
        <NuxtLink to="/archive" class="block text-primary hover:underline no-underline">文章归档</NuxtLink>
        <NuxtLink to="/categories" class="block text-primary hover:underline no-underline">分类</NuxtLink>
        <NuxtLink to="/tags" class="block text-primary hover:underline no-underline">标签</NuxtLink>
        <NuxtLink to="/collections" class="block text-primary hover:underline no-underline">专栏</NuxtLink>
        <NuxtLink to="/about" class="block text-primary hover:underline no-underline">关于</NuxtLink>
        <NuxtLink to="/disclaimer" class="block text-primary hover:underline no-underline">免责声明</NuxtLink>
        <NuxtLink to="/privacy" class="block text-primary hover:underline no-underline">隐私协议</NuxtLink>
        <NuxtLink to="/service-protocol" class="block text-primary hover:underline no-underline">服务协议</NuxtLink>
      </div>
    </div>
    <SimpleFooter />
  </div>
</template>

<script>
import SimpleFooter from '~/components/layout/SimpleFooter.vue'

export default {
  name: 'SitemapPage',
  components: { SimpleFooter },
}
</script>
