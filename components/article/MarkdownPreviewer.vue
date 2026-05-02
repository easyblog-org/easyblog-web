<template>
  <div ref="previewRef" class="w-full px-4 py-2"></div>
</template>

<script>
export default {
  name: 'MarkdownPreviewer',
  props: {
    content: { type: String, default: '' },
  },
  data() {
    return {
      vditorInstance: null,
    }
  },
  watch: {
    content() {
      this.renderPreview()
    },
  },
  mounted() {
    this.renderPreview()
  },
  beforeDestroy() {
    if (this.vditorInstance) {
      this.vditorInstance.destroy()
      this.vditorInstance = null
    }
  },
  methods: {
    async renderPreview() {
      if (!this.content || !this.$refs.previewRef) return
      try {
        const Vditor = (await import('vditor')).default
        await import('vditor/dist/method.min')
        this.$refs.previewRef.innerHTML = ''
        Vditor.preview.render(this.$refs.previewRef, this.content, {
          mode: 'light',
          hljs: { enable: true, lineNumber: true },
        })
        this.$emit('done')
      } catch (e) {
        this.$refs.previewRef.innerHTML = this.content
      }
    },
  },
}
</script>
