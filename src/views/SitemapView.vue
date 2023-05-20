<template>
  <div>
    <!--顶部标题栏-->
    <app-common-bar></app-common-bar>

    <!--面包屑导航-->
    <app-common-bread-crumb-navigation :items="[{
          text: '首页',
          href: 'http://localhost:8080/',
        },
        {
          text: '网站地图',
          href: 'http://localhost:8080/#/sitemap',
        }]"></app-common-bread-crumb-navigation>

    <v-container class="pr-0 pl-0 pt-0">
      <v-card>
        <v-card-title>网站地图</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-left mb-10">
          <v-timeline dense>
            <v-timeline-item small v-for="item in items" :key="item.id" class="my-timeline-item">
              <v-row>
                <v-col cols="2" class="pr-0">
                  {{ item.create_time }}
                </v-col>
                <v-col class="pl-0">
                  <a>
                    <span>{{ item.title }}</span>
                  </a>
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>


          <div class="text-center">
            <v-row justify="center" class="pt-2 pb-2">
              <v-pagination
                v-model="curr_page_no"
                class="my-4"
                :length="getPageLengthByArticleSize"
              ></v-pagination>
            </v-row>
          </div>

        </v-card-text>
      </v-card>

      <div class="text-center">
        <app-simple-footer></app-simple-footer>
      </div>
    </v-container>
  </div>
</template>

<script>
import AppCommonBar from '@/components/AppCommonBar'
import AppCommonBreadCrumbNavigation from '@/components/AppCommonBreadCrumbNavigation'
import { PAGE_SIZE } from '@/assets/global.js'
import AppSimpleFooter from '@/components/AppSimpleFooter'

export default {
  name: 'SitemapView',
  components: {
    AppSimpleFooter,
    AppCommonBreadCrumbNavigation,
    AppCommonBar
  },
  data: () => ({
    // 所有文章数据
    items: [],
    // 当前页号
    curr_page_no: 1
  }),
  methods: {
    loadAllArticleSortedByCreateTime () {
      this.items.push({
        id: '19002',
        title: 'Spring教程：事物详解（三）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['Spring教程', 'Java', '源码系列'],
        author: 'Frank.HUANG',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '19003',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['Spring教程', 'Java', '源码系列'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '19004',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['Spring教程', '源码系列'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '19005',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['Spring教程', '源码系列'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '19006',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['Spring教程', 'Java', '源码系列'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '19007',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['Spring教程', 'Java', '源码系列'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '19008',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: [],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '19009',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['Redis教程', '高并发实战'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '19010',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['Nginx', '高并发实战'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '19011',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['SpringBoot教程'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '19011242',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['SpringBoot教程'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '190115756746',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['SpringBoot教程'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '19011575',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['SpringBoot教程'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '190115885',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['SpringBoot教程'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '190113123',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['SpringBoot教程'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '1901124274734',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['SpringBoot教程'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '190113523',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['SpringBoot教程'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '19011656',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['SpringBoot教程'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
      this.items.push({
        id: '19011532',
        title: 'Spring教程：事物详解（四）声明式事务源码详解',
        first_img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        category: ['SpringBoot教程'],
        author: 'Si.Li',
        content: '使用idea提交代码的时候可能会遇到想要忽略的文件夹出现在提交列表中的情况。以.idea目录举例。假如之前没将.idea目录添加到.gitignore文件中，提交代码的时候又把.idea目录提交上去了',
        create_time: '2022-04-10 14:24:39',
        avatar: 'https://image.easyblog.top/FtgWkqU5ESuyt8eDu180qubIopHU'
      })
    }
  },
  created () {
    this.loadAllArticleSortedByCreateTime()
  },
  computed: {
    getPageLengthByArticleSize () {
      return Math.ceil(this.items.length / PAGE_SIZE.TEN_ITEMS)
    }
  }
}
</script>

<style scoped>
.my-timeline-item{

}
.my-timeline-item a{
  color: #333;
}
.my-timeline-item a:hover{
  color: #1976d2 ;
  text-decoration: #1976d2;
}
</style>
