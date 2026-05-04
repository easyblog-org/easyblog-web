<template>
  <nav v-if="headings.length > 0" class="space-y-1">
    <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">目录</h3>
    <ul class="space-y-1 text-sm">
      <li v-for="(h, i) in headings" :key="i">
        <a
          :href="'#' + h.id"
          :class="[
            'block no-underline transition-colors duration-200 hover:text-primary',
            h.level === 2 ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500 pl-3 text-xs',
            activeId === h.id ? 'text-primary font-medium border-l-2 border-primary pl-2' : 'border-l-2 border-transparent pl-2'
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
      _observer: null,
    }
  },
  watch: {
    headings: {
      handler() {
        this.$nextTick(() => this.setupObserver())
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => this.setupObserver())
  },
  beforeDestroy() {
    if (this._observer) this._observer.disconnect()
  },
  methods: {
    scrollTo(id) {
      const el = document.getElementById(id)
      if (el) {
        const offset = 80
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({ top, behavior: 'smooth' })
        this.activeId = id
      }
    },
    setupObserver() {
      if (this._observer) this._observer.disconnect()
      if (!this.headings.length || typeof IntersectionObserver === 'undefined') return
      const headingEls = []
      this.headings.forEach((h) => {
        const el = document.getElementById(h.id)
        if (el) headingEls.push(el)
      })
      if (!headingEls.length) return
      this._observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting)
          if (visible.length) {
            const sorted = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
            this.activeId = sorted[0].target.id
          }
        },
        { rootMargin: '-80px 0px -55% 0px', threshold: 0 }
      )
      headingEls.forEach((el) => this._observer.observe(el))
    },
  },
}
</script>
