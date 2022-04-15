<template>
  <div class="home light-grey-bg">
    <!--顶部标题栏-->
    <app-common-bar></app-common-bar>

    <!--主页面-->
    <v-main>
      <v-container>
        <!--轮播图-->
        <v-row>
          <v-col cols="9">
            <v-sheet rounded="lg" style="background: unset">
              <v-row>
                <v-col cols="8">
                  <!--自定义轮播图-->
                  <app-common-swiper :height="340"></app-common-swiper>
                </v-col>
                <v-col cols="4">
                  <!--自定义轮播图侧边显示-->
                  <v-row v-for="item in swiper_side_show_list" :key="item.id">
                    <v-col cols="12">
                      <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 12 : 0"
                                :class="{ 'on-hover': hover }" class="head-line">
                          <v-img
                            :src="item.img"
                            class="white--text align-end transition-swing"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="158px"
                          >
                            <v-card-title v-text="item.title" style="font-size: 14px"></v-card-title>
                          </v-img>
                        </v-card>
                      </v-hover>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <!--内容-->
              <app-common-article-list :list="newest_article_list"></app-common-article-list>
            </v-sheet>
          </v-col>
          <v-col cols="3">
            <!--热搜-->
            <app-common-hot-search-list title="7x24小时头条"></app-common-hot-search-list>
            <div class="pa-3"></div>
            <!--广告区-->
            <app-side-bar-ad></app-side-bar-ad>
            <div class="pa-3"></div>
            <!--热搜-->
            <app-common-hot-search-list title="文章热榜"></app-common-hot-search-list>
            <div class="pa-3"></div>
            <!--footer-->
            <app-common-footer></app-common-footer>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>

import AppCommonBar from '@/components/AppCommonBar'
import AppCommonFooter from '@/components/AppCommonFooter'
import AppCommonSwiper from '@/components/AppCommonSwiper'
import ArticleFocusList from '@/components/home/ArticleFocusList'
import ArticleRecommendList from '@/components/home/ArticleRecommendList'
import ArticleConsultingList from '@/components/home/ArticleConsultingList'
import ArticleHotSearchList from '@/components/home/ArticleHotSearchList'
import AppCommonHotSearchList from '@/components/AppCommonHotSearchList'
import AppSimpleLoginBox from '@/components/AppSimpleLoginBox'
import AppCommonArticleList from '@/components/AppCommonArticleList'
import AppSideBarAd from '@/components/ads/AppSideBarAd'
import AppSimpleArticlePresenter from '@/components/AppSimpleArticlePresenter'

export default {
  name: 'HomeView',
  components: {
    AppSimpleArticlePresenter,
    AppSideBarAd,
    AppCommonArticleList,
    AppSimpleLoginBox,
    AppCommonHotSearchList,
    ArticleHotSearchList,
    ArticleConsultingList,
    ArticleRecommendList,
    ArticleFocusList,
    AppCommonFooter,
    AppCommonSwiper,
    AppCommonBar
  },
  data: () => ({
    //轮播图显示的文章或教程...
    swiper_show_list: [],
    //轮播图中间显示的文章或教程
    swiper_side_show_list: [],
    //最新文章列表
    newest_article_list: [],
    //热搜文章或教程 给 热搜榜提供数据
    hot_search_list: [],
    //文章热榜 给文章热搜提供数据
    hot_click_list: []
  }),
  methods: {
    loadArticles () {
      this.newest_article_list.push({
        id: '19002',
        title: 'Spring教程：事物详解（三）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category:['Spring教程','Java','源码系列'],
        author:'Frank.HUANG',
        content:'使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time:'2022-04-10 14:24:39',
        avatar:'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.newest_article_list.push({
        id: '19003',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category:['Spring教程','Java','源码系列'],
        author:'Si.Li',
        content:'使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time:'2022-04-10 14:24:39',
        avatar:'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.newest_article_list.push({
        id: '19004',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category:['Spring教程','源码系列'],
        author:'Si.Li',
        content:'使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time:'2022-04-10 14:24:39',
        avatar:'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.newest_article_list.push({
        id: '19005',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category:['Spring教程','源码系列'],
        author:'Si.Li',
        content:'使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time:'2022-04-10 14:24:39',
        avatar:'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.newest_article_list.push({
        id: '19006',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category:['Spring教程','Java','源码系列'],
        author:'Si.Li',
        content:'使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time:'2022-04-10 14:24:39',
        avatar:'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.newest_article_list.push({
        id: '19007',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category:['Spring教程','Java','源码系列'],
        author:'Si.Li',
        content:'使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time:'2022-04-10 14:24:39',
        avatar:'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.newest_article_list.push({
        id: '19008',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category:[],
        author:'Si.Li',
        content:'使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time:'2022-04-10 14:24:39',
        avatar:'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.newest_article_list.push({
        id: '19009',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category:['Redis教程','高并发实战'],
        author:'Si.Li',
        content:'使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time:'2022-04-10 14:24:39',
        avatar:'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.newest_article_list.push({
        id: '19010',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category:['Nginx','高并发实战'],
        author:'Si.Li',
        content:'使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time:'2022-04-10 14:24:39',
        avatar:'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.newest_article_list.push({
        id: '19011',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category:['SpringBoot教程'],
        author:'Si.Li',
        content:'使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time:'2022-04-10 14:24:39',
        avatar:'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.swiper_side_show_list.push({
        id: '19012',
        title: 'Spring教程：事物详解（三）声明式事务源码详解',
        img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
      })
      this.swiper_side_show_list.push({
        id: '19013',
        title: 'Spring教程：事物详解（一）声明式事务源码详解',
        img: 'http://image.easyblog.top/1635311617387129984c4-7fce-4bda-a339-834746081298.jpeg'
      })
    }
  },
  created () {
    this.loadArticles()
  }
}
</script>
<style scoped>
.main-content-title {
  border-bottom: #e4e3e3 1px solid;
  margin: 15px;
}

.head-line {
  transition: all .6s;
  cursor: pointer;
  border-radius: unset;
}

</style>
