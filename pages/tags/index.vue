<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">文章标签</h1>
    <div v-if="tags.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-12">暂无标签</div>
    <div class="flex flex-wrap gap-3">
      <span
        v-for="tag in tags"
        :key="tag.name"
        class="inline-block px-4 py-2 rounded-full text-sm cursor-pointer hover:opacity-80 transition-opacity"
        :style="{ backgroundColor: getTagColor(tag.count), color: '#fff' }"
        @click="goTag(tag.name)"
      >
        {{ tag.name }} ({{ tag.count }})
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagsPage',
  computed: {
    tags() {
      return this.$store ? this.$store.state.tags || [] : []
    },
  },
  methods: {
    getTagColor(count) {
      if (count >= 10) return '#1e80ff'
      if (count >= 5) return '#409eff'
      if (count >= 3) return '#79bbff'
      return '#a0cfff'
    },
    goTag(name) {
      this.$router.push({ path: '/', query: { tag: name } })
    },
  },
}
</script>
