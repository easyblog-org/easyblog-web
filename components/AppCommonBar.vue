<template>
  <div>
    <transition name="fade">
      <div class="top-bar" v-show="show">
        <v-app-bar
          app
          color="white"
          elevation="1"
          flat
        >
          <v-container class="py-0 fill-height" ref="barRef">

            <div>
              <a href="/" class="bar-title"><h1>EasyBlog</h1></a>
            </div>


            <div class="menu-item-container">
              <v-btn
                v-for="link in links"
                :key="link"
                text
                class="menu-item"
              >
                {{ link }}
              </v-btn>
            </div>

            <v-spacer></v-spacer>

            <v-responsive max-width="400" :width="searchInputDynamicWidth">
              <v-text-field
                v-model="query_key"
                class="search-input"
                ref="searchInputRef"
                dense
                flat
                solo
                hide-details
                :background-color="'#f2f2f2'"
                clearable
                :color="'black'"
                :placeholder="query_placeholder"
                append-icon="mdi-magnify"
                @click:append="search"
                @keypress.enter="search"
              ></v-text-field>
            </v-responsive>

            <v-spacer></v-spacer>

            <!--登录/头像按钮-->
            <div class="bar-login-box">
              <div class="bar-avatar" v-if="loginStatus">
                <v-menu
                  class="bar-avatar-menu"
                  rounded="lg"
                  offset-y
                  :allow-overflow="true"
                  :min-width="280"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-avatar
                      color="grey darken-1"
                      size="40"
                      v-on="on"
                      v-bind="attrs"
                    >
                      <img
                        :src="loggedUserInfo.user_current_images.header_img_url"
                        alt="avatar"/>
                    </v-avatar>
                  </template>

                  <v-list class="bar-avatar-menu-box">
                    <v-list-item class="pb-0 pt-3 pr-0 pl-2">
                      <v-row>
                        <NuxtLink to="/user-home">
                          <v-col cols="3" class="pr-0">
                            <v-avatar
                              color="grey darken-1"
                              size="48"
                            >
                              <img
                                :src="loggedUserInfo.user_current_images.header_img_url"
                                alt="avatar"/>
                            </v-avatar>
                          </v-col>
                        </NuxtLink>
                        <v-col class="pl-1" col="9">
                          <NuxtLink to="/user-home" style="text-decoration: unset !important;">
                            <div class="bar-avatar-user-info">{{ loggedUserInfo.nick_name }}</div>
                          </NuxtLink>
                          <div class="bar-avatar-level-info">
                            <span>等级:</span>
                            <span>{{ loggedUserInfo.level }}</span>
                          </div>
                        </v-col>
                      </v-row>
                    </v-list-item>
                    <v-list-item class="pb-2 pt-3 pr-0 pl-2">
                      <v-row>
                        <v-col cols="4" class="bar-avatar-menu-article-info pb-0 pt-0 pr-0 pl-0">
                          <v-row class="justify-center align-center font-weight-bold">
                            999
                          </v-row>
                          <v-row class="justify-center align-center">
                            关注
                          </v-row>
                        </v-col>
                        <v-col cols="4" class="bar-avatar-menu-article-info pb-0 pt-0 pr-0 pl-0">
                          <v-row class="justify-center align-center font-weight-bold">
                            10
                          </v-row>
                          <v-row class="justify-center align-center">
                            点赞
                          </v-row>
                        </v-col>
                        <v-col cols="4" class="bar-avatar-menu-article-info pb-0 pt-0 pr-0 pl-0">
                          <v-row class="justify-center align-center font-weight-bold">
                            100
                          </v-row>
                          <v-row class="justify-center align-center">
                            收藏
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item class="bar-avatar-menu-item pb-0 pt-1 pr-0 pl-2">
                      <NuxtLink to="/user-home" tag="div" style="width: 100%">
                        <v-list-item-title>
                          <v-icon
                            left
                            small
                          >
                            mdi-account
                          </v-icon>
                          我的主页
                        </v-list-item-title>
                      </NuxtLink>
                      <v-icon right small>mdi-chevron-right</v-icon>
                    </v-list-item>
                    <v-list-item class="bar-avatar-menu-item pb-1 pt-0 pr-0 pl-2">
                      <NuxtLink to="/user-home" tag="div" style="width: 100%">
                        <v-list-item-title>
                          <v-icon
                            left
                            small
                          >
                            mdi-cog
                          </v-icon>
                          账号设置
                        </v-list-item-title>
                      </NuxtLink>
                      <v-icon right small>mdi-chevron-right</v-icon>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item class="bar-avatar-menu-item pb-0 pt-1 pr-0 pl-2"
                                 @click="logout">
                      <v-list-item-title>
                        <v-icon
                          left
                          small
                        >
                          mdi-logout
                        </v-icon>
                        退出登录
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <div class="bar-login-btn" v-else>
                <v-btn
                  class="ma-2"
                  outlined
                  color="indigo"
                  @click="handleLoginOpen"
                >
                  登录 | 注册
                </v-btn>
              </div>
            </div>
          </v-container>
        </v-app-bar>
      </div>
    </transition>

    <app-common-login-box ref="loginBoxRef" :showDialog="showLoginDialog"
                          @close="handleLoginDialogClose"
                          @refresh="handleSChangeLoginStatus"></app-common-login-box>
  </div>
</template>

<script>
import {LOCAL_STORAGE_KEY} from "static/global";


export default {
  name: 'app-common-bar',
  data: () => ({
    links: [
      '编程入门教程',
      '编程实战',
      '编程题库',
      '开源项目',
      '在线工具'
    ],
    search_input_width: 310,
    query_key: '',
    query_placeholder: '搜索',
    hot_query_key: [
      'SpringBoot实战项目',
      'SpringCloud全家桶从入门到入土',
      'Java高级教程',
      'C语言从入门到入土',
      'Vue+ElementUI后台管理项目实战',
      '计算年毕业设计'
    ],
    searchInputDynamicWidth: 20,
    loginStatus: false,
    showLoginDialog: false,
    loggedUserInfo: null
  }),
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    //搜索
    search() {
      if (this.query_key === null || undefined === this.query_key || this.query_key === '') {
        console.log('搜索key为空')
        return
      }
      console.log('搜索：' + this.query_key)
    },
    pollingHotQueryKey() {
      setTimeout(function () {
        this.query_placeholder = "Vue+ElementUI后台管理项目实战"
      }, 1000)
    },
    handleLoginOpen() {
      this.showLoginDialog = true
    },
    handleLoginDialogClose(val) {
      this.showLoginDialog = val
    },
    handleSChangeLoginStatus(data) {
      //检查用户是否处于登录状态，处于登录状态返回true,否者放回false
      this.loginStatus = localStorage.getItem(LOCAL_STORAGE_KEY.LOGIN_USER) !== null &&
        localStorage.getItem(LOCAL_STORAGE_KEY.LOGIN_USER) !== undefined;
      this.loggedUserInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.LOGIN_USER))
    },
    logout() {
      // 调用子组件退出登录方法进行退出操作
      this.$refs.loginBoxRef.logout()
    },
  },
  created() {
    this.pollingHotQueryKey()
  },
  mounted() {
    //搜索框宽度
    this.searchInputDynamicWidth = document.body.clientWidth * (1 / 6);
    this.handleSChangeLoginStatus()
  },
}
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease; /* 设置过渡属性和持续时间 */
}

.fade-enter,
.fade-leave-to {
  opacity: 0; /* 设置初始状态和结束状态的透明度 */
  transform: translateY(300px);
}

.menu-item-container {
  margin-left: 15px;
}

.menu-item {
  height: 56px !important;
  border-radius: unset !important;
}

.menu-item:hover {
  color: #16499d;
}

.container {
  padding-left: 0 !important;
}

.search-input {
  font-size: 14px !important;
  min-width: 310px;
}

.bar-login-box {
  width: 40px;
}

.bar-avatar-menu-box {
  padding: 10px;
}

.bar-avatar-menu-item {
  cursor: pointer;
}

.bar-avatar-menu-item:hover {
  background-color: #f2f3f5;
  width: 100%;
}

.bar-avatar-user-info {
  word-break: break-all;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  color: #252933;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  margin: 2px 0;
}

.bar-avatar-level-info {
  display: inline-block;
  color: #252933;
  font-size: 13px;
  line-height: 18px;
}

.bar-avatar {
  cursor: pointer;
}


.bar-avatar-menu {

}
</style>
