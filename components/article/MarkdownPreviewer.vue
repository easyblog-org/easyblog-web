<template>
  <div ref="previewRef" class="markdown-body w-full"></div>
</template>

<script>
export default {
  name: 'MarkdownPreviewer',
  props: {
    content: { type: String, default: '' },
  },
  watch: {
    content() {
      this.renderPreview()
    },
  },
  mounted() {
    this.renderPreview()
  },
  methods: {
    async renderPreview() {
      if (!this.content || !this.$refs.previewRef) return
      try {
        const Vditor = (await import('vditor')).default
        const html = await Vditor.md2html(this.content, {
          mode: { render: 'light' },
          hljs: { enable: true, lineNumber: true },
        })
        this.$refs.previewRef.innerHTML = html
        this.$emit('done')
      } catch (e) {
        console.error('[MarkdownPreviewer] render error:', e)
        if (this.$refs.previewRef) {
          const div = document.createElement('div')
          div.textContent = this.content
          this.$refs.previewRef.innerHTML = '<pre class="text-sm text-gray-500 whitespace-pre-wrap p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">' + div.innerHTML + '</pre>'
        }
      }
    },
  },
}
</script>
