<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">免责声明</h1>
      <div class="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
        <p>本网站所提供的信息仅供参考，不构成任何建议。</p>
      </div>
    </div>
    <SimpleFooter />
  </div>
</template>

<script>
import Breadcrumb from '~/components/layout/Breadcrumb.vue'
export default {
  name: 'DisclaimerPage',
  components: { SimpleFooter },
}
</script>
