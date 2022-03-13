<template>
  <div class="top-bar">
    <v-app-bar
      app
      color="white"
      elevation="2"
      flat
    >
      <v-container class="py-0 fill-height">

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

        <v-responsive max-width="400">
          <v-text-field
            class="search-input"
            ref="searchInputRef"
            dense
            flat
            solo
            hide-details
            :background-color="'#f2f2f2'"
            clearable
            :color="'black'"
            label="SpringBoot实战项目"
            append-icon="mdi-magnify"
            @focus="onSearchInputLevelIn"
            @blur="onSearchInputLevelOut"
          ></v-text-field>
        </v-responsive>

        <v-spacer></v-spacer>

        <!--登录/头像按钮-->
        <div>
          <div class="bar-avatar" v-if="checkLoginStatus">
            <v-avatar
              class="mr-10"
              color="grey darken-1"
              size="35"
            ></v-avatar>
          </div>
          <div class="bar-login-btn" v-else>
            <router-link to="/login">登录|注册</router-link>
          </div>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import global from '@/assets/global'

export default {
  name: 'AppCommonBar',
  data: () => ({
    links: [
      '编程入门教程',
      '编程实战',
      '编程题库',
      '开源项目',
      '在线工具'
    ],
    search_input_width: 310
  }),
  methods: {
    onSearchInputLevelIn () {

    },
    onSearchInputLevelOut () {

    }
  },
  computed: {
    /**
     * 检查用户是否处于登录状态，处于登录状态返回true,否者放回false
     * @returns {boolean}
     */
    checkLoginStatus: function () {
      //登录时会将用户登录token存放到本地
      return localStorage.getItem(global.SYSTEM_CONSTANTS.login_token_key) != null
    }
  }
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
