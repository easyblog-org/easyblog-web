<template>
  <div class="home">
    <!--顶部标题栏-->
    <AppCommonBar></AppCommonBar>

    <!--主页面-->
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="8">
            <v-sheet
              rounded="lg"
            >
              <!--自定义滑动窗口-->
              <CustomSwiper :height="340"></CustomSwiper>
            </v-sheet>
          </v-col>
          <v-col cols="4">
            <!--热搜-->
            <HotSearchBox></HotSearchBox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="9">
            <v-card>
              <v-card-text>car text</v-card-text>
            </v-card>
          </v-col>
          <!--侧边栏-->
          <v-col cols="3">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      List Item {{ n }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      List Item {{ n }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <AppCommonFooter/>
  </div>
</template>

<script>

import AppCommonBar from '@/components/AppCommonBar'
import AppCommonFooter from '@/components/AppHomeFooter'
import CustomSwiper from '@/components/CustomSwiper'
import HotSerachBox from '@/components/HotSearchBox'
import HotSearchBox from '@/components/HotSearchBox'

export default {
  name: 'HomeView',
  components: {
    HotSearchBox,
    CustomSwiper,
    AppCommonFooter,
    AppCommonBar
  },
}
</script>
<style scoped>

</style>
