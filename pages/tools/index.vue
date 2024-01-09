<template>
  <v-app>
    <app-common-bar></app-common-bar>

    <!--面包屑导航-->
    <app-common-bread-crumb-navigation :items="[{
          text: '首页',
          href: '/',
        },
        {
          text: '联系我们',
          href: '/contact',
        }]"></app-common-bread-crumb-navigation>

    <v-container class="pr-0 pl-0 pt-0">
      <v-row style="min-height: 543px">
        <v-col>
          <v-card>
            <v-card-title class="pl-3">联系我们</v-card-title>
            <v-divider></v-divider>

            <div class="pl-3 pr-3">
              <v-card-subtitle class="my-subtitle">方式一：邮件与我们交流</v-card-subtitle>
              <v-card-text class="text-left mb-8 mt-4 ml-3 pb-2">
                <v-row>
                  <v-col cols="3">
                    <v-row>
                      EasyBlog客服
                    </v-row>
                    <v-row>
                      <v-chip
                        class="mt-3"
                        color="primary"
                        tag="a"
                        label
                      >
                        <v-icon left>
                          mdi-email
                        </v-icon>
                        easyblog_kefu.163.com
                      </v-chip>
                    </v-row>
                  </v-col>
                  <v-col cols="3">
                    <v-row>
                      举报
                    </v-row>
                    <v-row>
                      <v-chip
                        class="mt-3"
                        color="primary"
                        tag="a"
                        label
                      >
                        <v-icon left>
                          mdi-email
                        </v-icon>
                        easyblog_jb.163.com
                      </v-chip>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </div>

            <div class="pl-3 pr-3">
              <v-card-subtitle class="my-subtitle">方式二：在我们的互动社区留下你的声音</v-card-subtitle>
              <v-card-text class="text-left pb-15 mt-4 ml-3 pb-2">
                <v-row>
                  <v-col cols="3">
                    <v-row>
                      EasyBlog社区
                    </v-row>
                    <v-row>
                      <v-chip
                        class="mt-3"
                        color="primary"
                        tag="a"
                        href="/community"
                        label
                      >
                        <v-icon left>
                          mdi-fire
                        </v-icon>
                        community.easyblog.top
                      </v-chip>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-center">
        <app-simple-footer></app-simple-footer>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import AppCommonBar from '@/components/AppCommonBar'
import AppCommonBreadCrumbNavigation from '@/components/AppCommonBreadCrumbNavigation'
import AppSimpleFooter from '@/components/AppSimpleFooter'

export default {
  name: 'ContactUsView',
  components: {
    AppSimpleFooter,
    AppCommonBreadCrumbNavigation,
    AppCommonBar
  }
}
</script>

<style scoped>
.my-subtitle{
  font-size: 16px;
  color: #5fa207;
  font-weight: 600;
}
</style>
