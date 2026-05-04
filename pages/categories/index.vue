<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">文章分类</h1>
    <div v-if="categories.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-12">暂无分类</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="cat in categories" :key="cat.name" class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 hover:shadow-md hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200 cursor-pointer" @click="goCategory(cat.name)">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ cat.name }}</h3>
        <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">{{ cat.count }} 篇文章</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoriesPage',
  computed: {
    categories() {
      return this.$store ? this.$store.state.categories || [] : []
    },
  },
  methods: {
    goCategory(name) {
      this.$router.push({ path: '/', query: { category: name } })
    },
  },
}
</script>
