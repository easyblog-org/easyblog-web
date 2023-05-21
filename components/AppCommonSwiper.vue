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
        src: 'https://img10.360buyimg.com/ddimg/jfs/t1/157602/14/5070/254362/60101928Ec4c1b566/19d09acc0c8429fb.jpg',
      },
      {
        src: 'https://img0.baidu.com/it/u=1102563411,3149738677&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1675098000&t=79983869302123f8d4be47a3ad45ee3e'
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
