<template>
  <v-carousel
    cycle
    :interval="3000"
    :height="height"
    show-arrows-on-hover
    :style="{'height':computeHeight,'width':computeWidth}"
  >

    <v-carousel-item
      v-for="(item) in list"
      :key="item.code"
      :src="item.featured_image"
      link
      eager
      class="my-carousel-item"
    >
      <NuxtLink :to="item.url" style="text-decoration: none">
        <v-sheet
          height="100%"
          tile
          style="background: unset"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="my-carousel-item-title">
              {{ item.title }}
            </div>
          </v-row>
        </v-sheet>
      </NuxtLink>
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
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    computeWidth() {
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
    computeHeight() {
      return this.height + 'px'
    }
  }
}
</script>


<style scoped>
.skeleton-card {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.my-carousel-item-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, .5);
  font-size: 1.8rem;
  letter-spacing: 0.0073529412em !important;
  font-family: "Roboto", sans-serif !important;
  padding: 0 25px;
}
</style>
