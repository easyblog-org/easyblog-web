<template>
  <v-app>
    <app-common-bar></app-common-bar>

    <!--面包屑导航-->
    <app-common-bread-crumb-navigation :items="[{
          text: '首页',
          href: '/',
        },
        {
          text: '在线工具',
          href: '/tools',
        },
        {
          text: '短链生成',
          href: '/shortlink',
        }]"></app-common-bread-crumb-navigation>

    <v-container class="pr-0 pl-0 pt-0">
      <v-row>
        <v-col >
          <v-card class="shortlink-container" style="min-height: 1024px">
            <h1>简单易用的渠道短链接生成工具</h1>
            <div class="search">
              <input type="text" placeholder="请输入 http:// 或 https:// 开头的网址" v-model="link.sourceUrl" class="search_input">
              <button class="search_button">
                <span class="button-text" @click="genLink">生成短链接</span>
              </button>
            </div>

            <div class="result" v-if="showLinkGenResult">
              <div class="result_top">
                <div class="qrcode">
                  <img
                    src="data:image/png;base64,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"
                    alt="">
                </div>
                <div class="linkinfo">
                  <div class="top-link">
                    <span class="result-font">短链接：</span>
                    <a :href="link.tinyUrl" id="result-url" target="_blank">{{ link.tinyUrl }}</a>
                    <div class="copy-button" @click="copyText">
                      <div class="bottomone copyicon"></div>
                      <div class="topone copyicon topone-active"></div>
                    </div>
                    <div class="linkborder"></div>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAP1BMVEVHcEwxOFo2PV0xN1szOVwwNloyOV0wNlowNllCSXAxN1oxN1oxN1o+PmEwNlowNlkxN1kxNlowNlowN1kwNlkR4snwAAAAFHRSTlMAQhZYI98x7/oGhE1qD5TQdsC2oGS1aooAAAEFSURBVCjPjZPtuoUQEIUjzBDpY93/te4JlVPnnGfPH7GwlpeG4ZtK0xLVH9pIkLLTb9oMcLYix7c2AXsaBrOC3Uu02Evr58U8NQdcY0k/04Dqhw/iS4fDD8vSNxmlqD+TBsZjXQYH5SKBeuetdEPLqi22TjQEVpI51K7qApZImBLQvDyjQxVYBHE+CVDJUCduQnVJMhSvc7sO7Oyl3UGVwAp7amI/11gMq/zgVty7rsi+wRBrPu4udARaSL2j1epusHWhE652jjEIRG77LsgnCGpplUyrB/UmNWu68qd8Br8YjR1Pbic42fewxawleeOU5Iz7Ug2gH8/qfog6LI+nE9z/f8EHBQsN39c3rQEAAAAASUVORK5CYII="
                      class="linkicon">
                    <span class="linkitem">访问人数：{{link.uv}}</span>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAMAAADeQm2wAAAAQlBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABz07T7AAAAFXRSTlMAEcCM534oGQn1tlI7dk7QZ92hYEZG7muuAAAAsUlEQVQoz42S6w7DIAiFvSvapvZy3v9VB25Lt6Zh44cEPuEoasy/llPK9yA6Ahu5eN2QN3zY9oUbFwXfUs6p+cDl7WQzo/0Md8bzO+iAs+zL1PckCeuA/mQTUIv4VfSc6JUKTMLKikXYASx+CwiDLlgl6UHSywZEcRVVShLB8yVoJE2DGyKWIPomgjIvQeq5weuAFcdQk04qVNuqB9Kvog5BH58+eP3J9MfWv8mPD3ZnDxxRD4W4SO98AAAAAElFTkSuQmCC"
                      class="linkicon eyeicon">
                    <span class="linkitem">访问次数：{{link.pv}}</span></div>
                  <p class="origin-link">
                    原始链接：{{link.sourceUrl}}</p>
                </div>
              </div>
              <div class="result_bottom"><p class="result-font">注意：此短链接有效期
                <b class="result-font">永久</b></p></div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-center">
        <app-simple-footer></app-simple-footer>
      </div>

      <v-snackbar v-model="showResultSnackbar" top text :color="showResultSnackbarColor">
        {{ showResultSnackbarText }}
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import AppCommonBar from '@/components/AppCommonBar'
import AppCommonBreadCrumbNavigation from '@/components/AppCommonBreadCrumbNavigation'
import AppSimpleFooter from '@/components/AppSimpleFooter'
import CacheUtils from "static/cache";

export default {
  name: 'ContactUsView',
  components: {
    AppSimpleFooter,
    AppCommonBreadCrumbNavigation,
    AppCommonBar
  },
  data: () => ({
    showLinkGenResult: false,
    link:{
      sourceUrl:'',
      tinyUrl:'https://sourl.cn/5SwPA2',
      pv: 0,
      uv: 0
    },
    showResultSnackbar: false,
    showResultSnackbarText: '已复制到粘贴板',
    showResultSnackbarColor: 'primary'
  }),
  methods: {
    copyText() {
      navigator.clipboard.writeText(this.link.tinyUrl)
        .then(() => {
          this.showResultSnackbar = true
          this.showResultSnackbarText = '已复制到粘贴板'
          this.showResultSnackbarColor = 'primary'
        })
        .catch((err) => {
          this.showResultSnackbar = true
          this.showResultSnackbarText = '负责到粘贴板失败'
          this.showResultSnackbarColor = 'red accent-2'
        });
    },
    genLink() {
      if(!this.sourceUrl){
        this.showResultSnackbar = true
        this.showResultSnackbarText = '请输入http://或https://开头的网址'
        this.showResultSnackbarColor = 'red accent-2'
      }
    }
  },
  created() {

  }
}
</script>

<style scoped>
.shortlink-container {
  background-image: url('https://image.easyblog.top/PRHyDJkNJofk29Z1mXV/X4zi9FvY4voYuSg4U68PhnU=');
}

.shortlink-container h1 {
  color: #303659;
  font-weight: 400;
  line-height: 56px;
  padding-top: 100px;
  margin-bottom: 32px;
  font-size: 40px;
  text-align: center;
  font-family: -apple-system, Source Sans Pro, BlinkMacSystemFont, PingFang SC, Helvetica, Tahoma, Arial, Hiragino Sans GB, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", sans-serif;
}

.search {
  border: 1px solid #dce3f2;
  width: 790px;
  background-color: #fff;
  border-radius: 2px;
  padding: 16px 24px 16px 30px;
  /*display: -webkit-box;*/
  /*display: flex;*/
  position: absolute;
  left: 18%;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  text-align: center;
  box-shadow: 0 20px 40px rgba(52, 100, 224, .1);
}

.search_input {
  width: 576px;
  height: 100%;
}

input {
  outline: none;
  border: 0;
  background: none;
}

input:focus {
  outline: none;
}

.search_button {
  cursor: pointer;
  flex-shrink: 0;
  width: 140px;
  height: 48px;
  border-radius: 2px;
  background-color: #3464e0;
  border: none;
  position: relative;
}

.search_button:hover {
  background-color: #1e80ff;
}

.button-text {
  font-size: 16px;
  color: #fff;
}

.result {
  border: 1px solid #dce3f2;
  padding: 20px 32px 16px;
  width: 790px;
  margin-top: 100px;
  background-color: #fff;
  position: absolute;
  left: 18%;
}

.result-font {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: -apple-system, Source Sans Pro, BlinkMacSystemFont, PingFang SC, Helvetica, Tahoma, Arial, Hiragino Sans GB, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #303659;
  -webkit-font-smoothing: antialiased;
}

.result_top {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.result_top .qrcode {
  width: 70px;
  height: 70px;
  margin-right: 20px;
  flex-shrink: 0;
}

.result_top .qrcode img {
  width: 100% !important;
}

.result_top .linkinfo {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
}

.result_top .linkinfo .top-link {
  margin-bottom: 8px;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.result_top .linkinfo .top-link a {
  color: #3464e0;
  margin-right: 12px;
}

.result_top .linkinfo .origin-link {
  width: 240px;
  color: #c5c7ce;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result_bottom {
  width: 100%;
  margin-top: 10px;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.result_bottom p b {
  color: #3464e0;
  font-weight: 500;
  font-family: sans-serif;
}

.copy-button {
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: relative;
}

.copy-button:hover {
  border: 1px solid #ffffff;
}

.copy-button .bottomone {
  top: 4px;
  left: 4px;
}

.copy-button .copyicon {
  width: 10px;
  height: 12px;
  border: 1px solid #303659;
  position: absolute;
  background-color: #fff;
}

.copy-button .topone {
  top: 2px;
  left: 2px;
}

.copy-button .copyicon {
  width: 10px;
  height: 12px;
  border: 1px solid #303659;
  position: absolute;
  background-color: #fff;
}

.copy-button .topone-active {
  animation: .1s 1 alternate-reverse;
}

.result_top .linkinfo .top-link .linkborder {
  width: 1px;
  height: 20px;
  background-color: #ebecf3;
  margin: 0 24px;
}

.result .linkicon {
  width: 16px;
  height: 16px;
  -o-object-fit: contain;
  object-fit: contain;
}

.result_top .linkinfo .top-link .linkitem {
  font-size: 12px;
  margin-left: 8px;
}

.result_top .linkinfo .top-link .eyeicon {
  margin-left: 32px;
}

.result .linkicon {
  width: 16px;
  height: 16px;
  -o-object-fit: contain;
  object-fit: contain;
}
</style>
