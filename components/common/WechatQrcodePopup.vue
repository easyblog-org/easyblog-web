<template>
  <div ref="popup" v-if="visible" class="wechat-popup-wrapper" style="display: none;">
    <div class="fixed inset-0 z-[9999] flex items-center justify-center" @click.self="close">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close"></div>
      <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mx-4 max-w-xs w-full z-10">
        <button
          @click="close"
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div class="text-center">
          <p class="text-lg font-semibold text-gray-900 dark:text-white mb-1">关注公众号</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">扫码获取更多精彩内容</p>

          <div class="bg-white p-3 rounded-xl inline-block shadow-inner">
            <img
              src="/gzh_qrcode_wx.jpg"
              alt="微信公众号二维码"
              class="w-48 h-48 object-contain"
            />
          </div>

          <p class="text-xs text-gray-400 dark:text-gray-500 mt-4">微信扫一扫关注</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WechatQrcodePopup',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.value
    }
  },
  watch: {
    value(val) {
      this.visible = val
      if (val) {
        this.$nextTick(() => this.moveToBody())
      } else {
        this.moveToSelf()
      }
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    moveToBody() {
      const el = this.$refs.popup
      if (el && el.parentNode !== document.body) {
        el.style.display = ''
        document.body.appendChild(el)
      }
    },
    moveToSelf() {
      const el = this.$refs.popup
      if (el && el.parentNode === document.body) {
        el.style.display = 'none'
        el.parentNode.removeChild(el)
      }
    }
  },
  mounted() {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && this.value) {
        this.close()
      }
    }
    window.addEventListener('keydown', handleEsc)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('keydown', handleEsc)
      this.moveToSelf()
    })
  }
}
</script>

<style scoped>
.wechat-popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
</style>
