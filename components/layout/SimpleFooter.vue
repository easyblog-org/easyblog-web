<template>
  <div class="text-center my-6 lg:my-0 lg:mt-auto lg:py-5">
    <p class="text-sm text-gray-500 dark:text-gray-500">
      &copy;{{ currentYear }} EasyBlog 版权所有. Powered by Nuxt.
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
