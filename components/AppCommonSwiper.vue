<template>
  <v-sheet
    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
  >
    <v-skeleton-loader
      :loading="list===null"
      type="image"
    >
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
          <NuxtLink target="_blank" :to="item.url" style="text-decoration: none">
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
    </v-skeleton-loader>
  </v-sheet>
</template>

<script>

import {queryArticleList} from "@/api/article";
import {prepareArticleListAppendJumpPath} from "static/util";

export default {
  name: 'app-common-swiper',
  //Vuetify components provide a theme variable that is used to determine dark
  inject: {
    theme: {
      default: {isDark: false},
    },
  },
  props: {
    height: {
      type: String | Number,
      default: '350'
    },
    width: {
      type: String | Number,
      default: '100%'
    },
  },
  data() {
    return {
      list: null,
      params: {
        limit: 7,
        offset: 0,
        is_top: true,
        order_cause: 'create_time',
        order_dir: 'desc'
      },
    }
  },
  methods: {
    async loadArticles() {
      // 1. 查询文章列表
      queryArticleList(this.params).then(resp => {
        this.list = prepareArticleListAppendJumpPath(resp.data.data)
      })
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
    },
  },
  mounted() {
    this.loadArticles()
  },
}
</script>


<style lang="scss" scoped>
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

::v-deep .v-skeleton-loader__image {
  height: 340px;
  max-width: 566px;
}

@media only screen and (max-width: 600px) {
  ::v-deep .v-skeleton-loader__image {
    height: 210px !important;
  }
}
</style>
