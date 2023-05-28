<template>
  <div class="top-bar">
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
        <div>
          <div class="bar-avatar" v-if="loginStatus">
            <v-avatar
              class="mr-10"
              color="grey darken-1"
              size="35"
            ></v-avatar>
          </div>
          <div class="bar-login-btn" v-else>
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
            >
              <NuxtLink to="/login" tag="span">登录 | 注册</NuxtLink>
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import {SYSTEM_CONSTANTS} from "static/global";


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
    loginStatus: false
  }),
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
    handleScroll() {
      this.scrollPosition = window.scrollY;
      this.showAppBar = !this.shouldHideAppBar;
    },
  },
  created() {
    this.pollingHotQueryKey()
  },
  mounted() {
    //搜索框宽度
    this.searchInputDynamicWidth = document.body.clientWidth * (1 / 6);
    //检查用户是否处于登录状态，处于登录状态返回true,否者放回false
    this.loginStatus=localStorage.getItem(SYSTEM_CONSTANTS.login_token_key) != null;
  },
}
</script>

<style scoped>
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

.bar-avatar {

}
</style>
