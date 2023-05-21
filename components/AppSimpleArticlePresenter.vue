<template>
  <v-card :height="height" :width="width">
    <v-card-text></v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'app-simple-article-presenter',
  props:{
    height: {
      type: String | Number,
      default: '340'
    },
    width: {
      type: String | Number,
      default: '100%'
    },
    //待展示的文章的列表
    articles:[]
  }
}
</script>

<style scoped>

</style>
