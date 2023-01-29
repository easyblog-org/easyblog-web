<template>
  <v-carousel
    cycle
    :interval="3000"
    :height="height"
    show-arrows-on-hover
    :style="{'height':computeHeight,'width':computeWidth}"
  >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      link
      eager
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script>

export default {
  name: 'app-common-swiper',
  props: {
    height: {
      type: String | Number,
      default: '350'
    },
    width: {
      type: String | Number,
      default: '100%'
    }
  },
  data: () => ({
    items: [
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      },
      {
        src: 'https://7n.w3cschool.cn/attachments/knowledge/202108/93852.png',
      },
      {
        src: 'http://image.easyblog.top/1635135654148e7c3eb50-c424-40ac-8d47-5027a3901f16.jpeg',
      },
      {
        src: 'http://image.easyblog.top/16078345961712141a9b7-c9d7-4e6d-89c0-3df304d6097a.jpeg'
      }
    ],
  }),
  computed: {
    computeWidth () {
      if (this.width instanceof Number) {
        return this.width + 'px'
      } else if (this.width instanceof String) {
        if (this.width.indexOf('px') !== -1 || this.width.indexOf('%') !== -1) {
          return this.width
        } else {
          return this.width + 'px'
        }
      }
    },
    computeHeight () {
      return this.height + 'px'
    }
  }
}
</script>


<style scoped>

</style>
