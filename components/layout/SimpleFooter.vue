<template>
  <div class="text-center my-6">
    <p class="text-sm text-gray-500 dark:text-gray-500">
      &copy;2019-{{ currentYear }} EasyBlog 版权所有
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="ml-2 hover:text-primary transition-colors no-underline text-gray-500 dark:text-gray-500">ICP备案号</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'SimpleFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
}
</script>
