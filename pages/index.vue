<template>
  <v-app>
    <div class="home light-grey-bg" ref="contentRef">
      <!--顶部标题栏-->
      <app-common-bar :show="showAppbar"></app-common-bar>

      <!--主页面-->
      <v-main>
        <v-container>
          <!--轮播图-->
          <v-row>
            <!--left side-->
            <v-col cols="9" class="lbox">
              <v-sheet rounded="lg" style="background: unset">
                <v-row>
                  <v-col cols="8">
                    <!--自定义轮播图-->
                    <app-common-swiper :height="340"/>
                  </v-col>
                  <v-col cols="4">
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
            <v-col cols="3" class="rbox" ref="rightSideRef">
              <!--热搜-->
              <app-common-hot-search-list
                title="7x24小时头条"
              ></app-common-hot-search-list>
              <div class="pa-3"></div>
              <!--广告区-->
              <app-side-bar-ad></app-side-bar-ad>
              <div class="pa-3"></div>
              <!--热搜-->
              <app-common-hot-search-list
                title="文章热榜"
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
  data: () => ({
    //轮播图中间显示的文章或教程
    swiper_article_side_list: [],
    //热搜文章或教程 给 热搜榜提供数据
    hot_search_list: [],
    //文章热榜 给文章热搜提供数据
    hot_click_list: [],
    showAppbar: true
  }),
  methods: {
    // 控制滑动到一定高度之后固定右侧侧边栏
    scrolls() {
      const rightSide = this.$refs.rightSideRef
      const headerTop = 1330
      window.onscroll = () => {
        if (document.documentElement.scrollTop > headerTop) {
          this.showAppbar = false;
          const contentRef = this.$refs.contentRef
          const rightPos = (contentRef.offsetWidth / 12) * (11 / 12) * 0.954
          rightSide.style.position = 'fixed'
          rightSide.style.right = rightPos + 'px'
          rightSide.style.bottom = '0px'
          rightSide.style.width = '296.25px'
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
