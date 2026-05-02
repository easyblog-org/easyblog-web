<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <Breadcrumb :items="[{ text: '首页', href: '/' }, { text: '服务协议' }]" />
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">服务协议</h1>
      <div class="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
        <p>使用本网站即表示您同意以下服务协议。</p>
      </div>
    </div>
    <SimpleFooter />
  </div>
</template>

<script>
import Breadcrumb from '~/components/layout/Breadcrumb.vue'
import SimpleFooter from '~/components/layout/SimpleFooter.vue'

export default {
  name: 'ServiceProtocolPage',
  components: { Breadcrumb, SimpleFooter },
}
</script>
