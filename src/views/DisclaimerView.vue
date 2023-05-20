<template>
  <div>
    <app-common-bar></app-common-bar>

    <!--面包屑导航-->
    <app-common-bread-crumb-navigation :items="[{
          text: '首页',
          href: 'http://localhost:8080/',
        },
        {
          text: '版权与免责声明',
          href: 'http://localhost:8080/#/disclaimer',
        }]"></app-common-bread-crumb-navigation>

    <v-container class="pr-0 pl-0 pt-0">
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="pl-5">版权与免责声明</v-card-title>
            <v-divider></v-divider>

            <div class="pl-5 pr-5">
              <v-card-subtitle class="my-subtitle">版权信息</v-card-subtitle>
              <v-card-text class="text-left mb-0 pb-2">
                <p>EasyBlog（www.easyblog.top）刊载的所有内容，包括文字、图片、音频、视频、软件、程序、以及网页版式设计等均在网上搜集。</p>

                <p>EasyBlog提供的内容仅用于个人学习、研究或欣赏。我们不保证内容的正确性。通过使用本站内容随之而来的风险与本站无关。</p>

                <p>访问者可将本网站提供的内容或服务用于个人学习、研究或欣赏，以及其他非商业性或非盈利性用途，但同时应遵守著作权法及其他相关法律的规定，不得侵犯本网站及相关权利人的合法权利。</p>

                <p>本网站内容原作者如不愿意在本网站刊登内容，请及时通知本站，我们会在核实后立即删除。</p>

                <p class="mb-1">本网站的内容来源有（包括但不限于）:</p>
                <ul class="content-source-list">
                  <li>
                    <a href="https://www.w3schools.com/default.asp" target="_blank">W3Schools Online Web Tutorials</a>
                  </li>
                  <li>
                    <a href="https://www.csdn.net/" target="_blank">CSDN 博客</a>
                  </li>
                  <li>
                    <a href="https://www.cnblogs.com/" target="_blank">博客园</a>
                  </li>
                  <li>
                    各语言对应的官方文档:
                    <a href="https://docs.python.org/2.7/" target="_blank">Python2.7</a>、
                    <a href="https://docs.python.org/3/" target="_blank"> Python 3</a>、
                    <a href="https://docs.python.org/3/" target="_blank"> Java </a>、
                    <a href="https://golang.org/doc/" target="_blank"> Go </a>、
                    <a href="https://www.swift.org/documentation/" target="_blank"> Swift </a>、
                    <a href="https://www.ruby-lang.org/en/documentation/" target="_blank"> Ruby </a>
                    等</li>
                  <li> 其他网络资源及本站工作人员编写测试</li>
                </ul>
              </v-card-text>
            </div>

            <div class="pl-5 pr-5">
              <v-card-subtitle class="my-subtitle pt-2">版权声明</v-card-subtitle>
              <v-card-text class="text-left">
                <p>任何网站都可以链接到EasyBlog的任何页面。</p>

                <p>如果您需要对少量内容进行引用，请务必在引用该内容的页面添加指向被引用页面的链接。</p>
              </v-card-text>
            </div>

            <div class="pl-5 pr-5">
              <v-card-subtitle class="my-subtitle pt-2">风险声明</v-card-subtitle>
              <v-card-text class="text-left mb-5">
                <p>
                  EasyBlog不提供任何形式的保证。所有与使用本站相关的直接风险均由用户承担。EasyBlog提供的所有代码均为实例，并不对性能、适用性、适销性或/及其他方面提供任何保证。
                </p>
                <p>
                  EasyBlog的内容可能包含不准确性或错误。EasyBlog不对本网站及其内容的准确性进行保证。如果您发现本站点及其内容包含错误，请联系我们以便这些错误得到及时的更正：easyblog_kefu@163.com
                </p>
              </v-card-text>
            </div>

          </v-card>
        </v-col>
      </v-row>

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
  name: 'DisclaimerView',
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

.my-subtitle {
  font-weight: 600;
  font-size: 16px;
  color: #333 !important;
}

.content-source-list {
  list-style: none;
  padding-left: 0;
}

.content-source-list li {
  line-height: 36px;
  color: #333 !important;
  padding: 0 0 0 1.5em;
  margin: 0 0 0.5em 0.5em;
  background-image: url(../assets/img/bullet.png);
  background-repeat: no-repeat;
  background-position: left 14px;
}

.content-source-list a {
  color: #1B5E20;
  text-decoration: none;
}

.content-source-list a:hover {
  color: #060060;
}
</style>
