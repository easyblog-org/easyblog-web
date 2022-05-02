<template>
  <div>
    <!--顶部标题栏-->
    <app-common-bar></app-common-bar>

    <!--面包屑导航-->
    <app-common-bread-crumb-navigation :items="[{
          text: '首页',
          href: 'http://localhost:8081/',
        },
        {
          text: '关于网站',
          href: 'http://localhost:8081/#/about',
        }]"></app-common-bread-crumb-navigation>

    <v-container class="pr-0 pl-0 pt-0">
      <v-card>
        <v-card-title>关于网站</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-left mb-10">
          EasyBlog 作为IT行业知名站点，基于全球互联网向广大网民提供在各种在线IT技术分享以及周边服务。该网站创建于2019年，是为了提供优质的在线解析格式化工具而创建。一直不间断运营至今，积累了大量固定用户。
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
import AppSimpleFooter from '@/components/AppSimpleFooter'
export default {
  components: { AppSimpleFooter, AppCommonBreadCrumbNavigation, AppCommonBar }
}
</script>
