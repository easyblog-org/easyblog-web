<template>
  <v-app>
    <div class="home light-grey-bg" ref="contentRef">
      <!--顶部标题栏-->
      <app-common-bar :show="showAppbar"></app-common-bar>

      <!--主页面-->
      <v-main style="padding: 30px 0 0 !important;">
        <v-container>
          <!--轮播图-->
          <v-row>
            <!--left side-->
            <v-col :cols="lboxCol" class="lbox">
              <v-sheet rounded="lg" style="background: unset">
                <v-row>
                  <v-col :cols="lboxMainSwiperCol" class="swiper">
                    <!--自定义轮播图-->
                    <app-common-swiper :height="340"/>
                  </v-col>
                  <v-col :cols="lboxSideSwiperCol" class="swiper-side">
                    <!--自定义轮播图侧边显示-->
                    <v-row v-for="item in swiper_article_side_list" :key="item.code">
                      <v-col cols="12">
                        <v-hover v-slot="{ hover }">
                          <v-card
                            :elevation="hover ? 12 : 0"
                            :class="{ 'on-hover': hover }"
                            class="head-line"
                          >
                            <NuxtLink :to="item.url" style="text-decoration: none;color: unset">
                              <v-img
                                :src="item.featured_image"
                                class="white--text align-end transition-swing"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                height="158px"
                              >

                                <v-card-title style="font-size: 14px">{{
                                    item.title
                                  }}
                                </v-card-title>
                              </v-img>
                            </NuxtLink>
                          </v-card>
                        </v-hover>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <!--内容-->
                <app-common-article-list/>
              </v-sheet>
            </v-col>
            <!--right side-->
            <v-col :cols="rboxCol" class="rbox" ref="rightSideRef">
              <!--热搜-->
              <app-common-hot-search-list
                title="文章热榜"
                :params="{
                  limit: 20,
                  offset: 0,
                  order_cause: 'page_views',
                  order_dir: 'desc'
                }"
              ></app-common-hot-search-list>
              <div class="pa-3"></div>
              <!--广告区-->
              <app-side-bar-ad></app-side-bar-ad>
              <div class="pa-3"></div>
              <!--热搜-->
              <app-common-hot-search-list
                title="7x24小时头条"
                :params="{
                  limit: 20,
                  offset: 0,
                  create_time_begin:new Date().getTime()-7 * 24 * 3600 * 1000,
                  order_cause: 'page_views',
                  order_dir: 'desc'
                }"
              ></app-common-hot-search-list>
              <div class="pa-3"></div>
              <!--友情链接-->
              <app-common-friend-linker></app-common-friend-linker>
              <div class="pa-3"></div>
              <!--footer-->
              <app-common-footer></app-common-footer>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script lang="js">
import {queryArticleList} from "@/api/article";
import {prepareArticleListAppendJumpPath} from "static/util";

export default {
  name: 'HomeView',
  computed: {
    //动态计算css
    lboxCol() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 12
        case 'sm':
          return 12
        case 'md':
          return 9
        case 'lg':
          return 9
        case 'xl':
          return 9
      }
    },

    rboxCol() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 0
        case 'sm':
          return 0
        case 'md':
          return 3
        case 'lg':
          return 3
        case 'xl':
          return 3
      }
    },

    lboxMainSwiperCol() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 12
        case 'sm':
          return 12
        case 'md':
          return 7
        case 'lg':
          return 8
        case 'xl':
          return 8
      }
    },

    lboxSideSwiperCol() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 0
        case 'sm':
          return 0
        case 'md':
          return 5
        case 'lg':
          return 4
        case 'xl':
          return 4
      }
    },
  },
  data: () => ({
    //轮播图中间显示的文章或教程
    swiper_article_side_list: [],
    showAppbar: true
  }),
  methods: {
    // 控制滑动到一定高度之后固定右侧侧边栏
    addScrollsListener() {
      const rightSide = this.$refs.rightSideRef
      if (!rightSide) {
        return;
      }

      const headerTop = 1335
      window.onscroll = () => {
        if (document.documentElement.scrollTop > headerTop) {
          this.showAppbar = false;
          let rightPos = null
          //296.25
          let rightPosWidth = null
          console.log("window.innerWidth=" + window.innerWidth)
          switch (this.$vuetify.breakpoint.name) {
            case 'md':
              rightPos = window.innerWidth * 0.12
              rightPosWidth = window.innerWidth * 0.2057
              break;
            case 'lg':
              rightPos = window.innerWidth * 0.09
              rightPosWidth = window.innerWidth * 0.2057
              break;
            case 'xl':
              rightPos = window.innerWidth * 0.09
              rightPosWidth = window.innerWidth * 0.2057
              break;
          }

          if (rightPos && rightPosWidth) {
            rightSide.style.position = 'fixed'
            rightSide.style.right = rightPos + 'px'
            rightSide.style.top = 'auto'
            rightSide.style.bottom = '0px'
            rightSide.style.width = rightPosWidth + 'px'
          }
        } else {
          this.showAppbar = true
          rightSide.style.position = 'static'
        }
      }
    },
    async loadArticles() {
      // 1. 查询轮播图文章
      queryArticleList({
        limit: 2,
        offset: 5,
        is_top: true,
        order_cause: 'create_time',
        order_dir: 'desc'
      }).then(resp => {
        this.swiper_article_side_list = prepareArticleListAppendJumpPath(resp.data.data)
      })
    },
  },
  mounted() {
    this.loadArticles()
    this.addScrollsListener()
  },
}
</script>
<style scoped>
.v-main {
  padding: unset !important;
}

.main-content-title {
  border-bottom: #e4e3e3 1px solid;
  margin: 15px;
}

.head-line {
  transition: all 0.6s;
  cursor: pointer;
  border-radius: unset;
}

.lbox {
}

.rbox {
}
</style>
