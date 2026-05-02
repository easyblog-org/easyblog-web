<template>
  <nav v-if="headings.length > 0" class="space-y-1">
    <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">目录</h3>
    <ul class="space-y-1 text-sm">
      <li v-for="(h, i) in headings" :key="i">
        <a
          :href="'#' + h.id"
          :class="[
            'block no-underline transition-colors duration-150 hover:text-primary',
            h.level === 2 ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500 pl-3 text-xs',
            activeId === h.id ? 'text-primary font-medium' : ''
          ]"
          @click.prevent="scrollTo(h.id)"
        >
          {{ h.text }}
        </a>
      </li>
    </ul>
  </nav>
  <div v-else>
    <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">目录</h3>
    <p class="text-sm text-gray-400 dark:text-gray-500">暂无目录</p>
  </div>
</template>

<script>
export default {
  name: 'PostTOC',
  props: {
    headings: { type: Array, default: () => [] },
  },
  data() {
    return {
      activeId: '',
    }
  },
  mounted() {
    this.observeHeadings()
  },
  beforeDestroy() {
    if (this._observer) this._observer.disconnect()
  },
  methods: {
    scrollTo(id) {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        this.activeId = id
      }
    },
    observeHeadings() {
      if (typeof IntersectionObserver === 'undefined') return
      this._observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.activeId = entry.target.id
            }
          })
        },
        { rootMargin: '-80px 0px -60% 0px' }
      )
      this.headings.forEach((h) => {
        const el = document.getElementById(h.id)
        if (el) this._observer.observe(el)
      })
    },
  },
}
</script>
