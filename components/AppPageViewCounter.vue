<template>
  <div style="display: none"></div>
</template>

<script>
export default {
  name: 'AppPageViewCounter',
  data: () => ({}),
  mounted() {
    // 请求服务器，访问量加1
    this.$emit('pageView')
  }
}
</script>
<style scoped lang="scss">

</style>
