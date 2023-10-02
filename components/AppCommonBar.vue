<template>
  <div>
    <transition name="fade">
      <div>
        <div class="top-bar" v-show="show">
          <v-app-bar
            app
            color="white"
            :elevation="elevation"
            flat
          >
            <v-container class="py-0 fill-height top-bar-container-inner" ref="barRef">

              <div class="bar-title-box">
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

              <v-responsive class="search-input-box" max-width="400">
                <v-text-field
                  v-model="query_key"
                  class="search-input rounded-pill"
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

            <v-container class="py-0 fill-height m-top-bar-container-inner" ref="mobileBarRef">
              <div class="m-bar-avatar-menu">
                <v-btn class="v-app-bar__nav-icon v-btn--icon  m-bar-avatar-menu-item"
                       elevation="0"
                       @click.stop="handleMobileMenuNavClick">
                  <span class="v-btn__content"><span aria-hidden="true" class="v-icon notranslate theme--dark"><svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true"
                    class="v-icon__svg"><path
                    d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path></svg></span></span>
                </v-btn>
              </div>

              <div class="bar-title-box">
                <a href="/" class="bar-title"><h1>EasyBlog</h1></a>
              </div>

              <v-navigation-drawer
                v-model="drawer"
                absolute
                :height="screenHeight"
                temporary
              >
                <v-list-item v-if="loginStatus">
                  <v-list-item-avatar>
                    <v-img :src="loggedUserInfo.user_current_images.header_img_url"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="bar-avatar-user-info">{{ loggedUserInfo.nick_name }}</v-list-item-title>
                    <v-list-item-title>
                      <div class="bar-avatar-level-info">
                        <span>等级:</span>
                        <span>{{ loggedUserInfo.level }}</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="!loginStatus">
                  <v-list-item-avatar>
                    <svg t="1696166049161" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="1598" width="200" height="200">
                      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#4E565F"
                            p-id="1599"></path>
                      <path
                        d="M512 537.6c-84.832 0-153.6-68.768-153.6-153.6S427.168 230.4 512 230.4 665.6 299.168 665.6 384 596.832 537.6 512 537.6z m-290.696 262.944C261.44 677.616 377.04 588.8 513.384 588.8c135.568 0 250.624 87.816 291.392 209.664-74.36 75.984-178.056 123.136-292.768 123.136-113.656 0-216.504-46.296-290.704-121.056z"
                        fill="#FFFFFF" p-id="1600"></path>
                    </svg>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="bar-avatar-user-info">登录/注册</v-list-item-title>
                    <v-list-item-title>
                      <div class="bar-welcome-login-info">
                        <span>登录后享受更多权益</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item link>
                    <v-list-item-icon>
                      <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>我的主页</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item link>
                    <v-list-item-icon>
                      <v-icon>mdi-cog</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>账号设置</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="loginStatus" link @click="logout">
                    <v-list-item-icon>
                      <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>退出登录</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>

            </v-container>
          </v-app-bar>
        </div>
        <!--小屏菜单-->
        <v-tabs class="m-menu-item-container"
                center-active
                optional
                height="35px"
        >
          <v-tab
            v-for="link in links"
            :key="link"
            class="m-menu-item"
          >
            {{ link }}
          </v-tab>
        </v-tabs>
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
  computed: {
    elevation() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 0
        case 'sm':
          return 0
        case 'md':
          return 1
        case 'lg':
          return 1
        case 'xl':
          return 1
      }
    },
  },
  data: () => ({
    links: [
      '入门教程',
      '编程实战',
      '编程题库',
      '开源项目',
      '在线工具'
    ],
    // 初始高度为0
    screenHeight: 0,
    drawer: null,
    items: [
      {title: '我的主页', icon: 'mdi-view-dashboard'},
      {title: 'About', icon: 'mdi-forum'},
    ],
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
    init() {
      this.pollingHotQueryKey()
      this.handleWindowResize()
      this.handleSChangeLoginStatus();
    },
    handleWindowResize() {
      // 在组件挂载后，使用window.innerHeight获取屏幕高度
      this.screenHeight = window.innerHeight;
    },
    handleMobileMenuNavClick() {
      this.drawer = !this.drawer
    }
  },
  mounted() {
    this.init()

    // 监听窗口大小变化，以动态更新屏幕高度
    window.addEventListener('resize', this.handleWindowResize);
  },
  beforeDestroy() {
    // 在组件销毁前，移除监听器以避免内存泄漏
    window.removeEventListener('resize', this.handleWindowResize);
  },
}
</script>

<style lang="scss" scoped>

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

.bar-welcome-login-info {
  display: inline-block;
  color: #8a919f;
  font-size: 11px;
  line-height: 18px;
}

.bar-avatar {
  cursor: pointer;
}


::v-deep .v-overlay {
  height: 2000px !important;
  align-items: center;
  border-radius: inherit;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), z-index 1ms;
}
</style>
