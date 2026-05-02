<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <Breadcrumb :items="[{ text: '首页', href: '/' }, { text: '关于' }]" />
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">关于网站</h1>
      <div class="text-center mb-6">
        <img src="@/assets/img/logo.png" alt="EasyBlog" class="w-32 mx-auto" />
      </div>
      <div class="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
        <p>EasyBlog 是一个基于 Nuxt 2 + TailwindCSS 的静态博客系统。</p>
        <p>文章数据存储在 GitHub 仓库中，通过 Webhook 触发自动构建和部署。</p>
      </div>
    </div>
    <SimpleFooter />
  </div>
</template>

<script>
import Breadcrumb from '~/components/layout/Breadcrumb.vue'
import SimpleFooter from '~/components/layout/SimpleFooter.vue'

export default {
  name: 'AboutPage',
  components: { Breadcrumb, SimpleFooter },
}
</script>
