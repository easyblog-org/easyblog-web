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
          text: '关于网站',
          href: 'http://localhost:8080/#/about',
        }]"></app-common-bread-crumb-navigation>

    <v-container class="pr-0 pl-0 pt-0">
      <v-card class="pr-3 pl-3">
        <v-card-title>关于网站</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-left mb-10">
          <v-row justify="center" class="text-center">
           <v-col cols="4" class="text-center">
             <v-img :src="require('../assets/img/logo.png')"
             ></v-img>
           </v-col>
          </v-row>

          <p>
            EasyBlog 注册并建站于2019年8月，是以IT/互联网技术为主的在线教程类网站，经过站长几年以来的经营，成为广为人知的在线教程网站。
          </p>
          <p>
            网站主要为初学者提供IT/互联网入门的学习内容和日常技术资料查询服务，
            「 <a href="http://localhost:8081/tools">猛戳这里</a> 」查看所有教程。
            此外网站也提供多种在线快捷小工具，例如：在线Json工具、在线计算器、IP查询......
            「 <a href="http://localhost:8081/tools">猛戳这里</a> 」，总有一款工具能帮助到你！
          </p>
          <p>
            为了能更好的服务大家，本站中提供了大量的在线实例，通过实例，您可以更好地学习。
          </p>
          <p>
            本站致力于推广各种编程语言技术，所有资源是完全免费的，并且会根据当前互联网的变化实时更新本站内容。
          </p>
          <p>
            您可以把我们的教程当做电子书，或者在线文档，它们都划分好了章节，并配有完整目录，您可以按照顺序从头到尾学习。
          </p>
          <p>
            我们一直都在坚持的是：<strong>认认真真、一丝不苟、以工匠的精神来打磨每一套教程</strong>，让读者感受到作者的用心，以及默默投入的时间，由衷地心动和点赞。这样的教程是一件作品，而不是呆板的文字！
          </p>
          <p>
            同时对于我们网站及内容如有不足的地方，欢迎广大技术爱好者在本站留言提供意见、建议。
          </p>
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
  components: {
    AppSimpleFooter,
    AppCommonBreadCrumbNavigation,
    AppCommonBar
  }
}
</script>
<style scoped>
p {
  color: #333 !important;
  margin-bottom: 8px;
  line-height: 25px;
  letter-spacing: 0.3px;
}

a{
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
}
</style>
