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
        src: 'https://qntemp4.json.cn/202101/eaf3c9ac796cf.png',
      },
      {
        src: 'http://image.easyblog.top/160768866799439db1527-8047-416d-805c-06f3a1221a17.jpeg'
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
