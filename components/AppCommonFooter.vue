<template>
  <v-footer padless :width="width" class="sidebar-box-border">
    <v-card flat tile class="text-center" :width="width">
      <v-card-text class="grey--text pt-8 footer-tag">
        <v-row>
          <v-col cols="4">
            <NuxtLink to="/about" target="_blank">关于网站</NuxtLink>
          </v-col>
          <v-col cols="4">
            <NuxtLink to="/contact" target="_blank">联系我们</NuxtLink>
          </v-col>
          <v-col cols="4">
            <a href="https://www.cnzz.com/stat/website.php?web_id=1278953609" target="_blank">
              网站统计
            </a>
          </v-col>
        </v-row>
        <v-row style="margin-top: 20px">
          <v-col cols="4">
            <NuxtLink to="/service-protocol" target="_blank">用户协议</NuxtLink>
          </v-col>
          <v-col cols="4">
            <NuxtLink to="/privacy" target="_blank">隐私协议</NuxtLink>
          </v-col>
          <v-col cols="4">
            <NuxtLink to="/sitemap" target="_blank">网站地图</NuxtLink>
          </v-col>
        </v-row>
      </v-card-text>


      <v-card-text>
        <v-row>
          <v-col cols="6" class="pb-0">
            <v-img
              :width="concat_img_width"
              :src="require('@/assets/img/QR-wechat.jpg')"
            />
            <div class="concat_img_desc">联系开发者</div>
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-img
              :width="concat_img_width"
              :src="require('@/assets/img/QR-public-account.jpg')"
            />
            <div class="concat_img_desc">关注公众号</div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text class="pt-1 my-copyright text-justify">
        <div>
          <a href="http://beian.miit.gov.cn" target="_blank">陕ICP备19025460号-1</a>
          <NuxtLink tag='a' to="/disclaimer" class="ma-2">免责声明</NuxtLink>
          <br/>
          <a href="https://www.12377.cn/">有害信息举报</a>
          <a href="http://www.cyberpolice.cn/wfjb/" class="ma-2">网络110报警服务</a>
        </div>
        <div style="color: #999AAA">
          ©2019-{{ getFullYear }}
          <a href="/">EasyBlog</a>
          版权所有.
        </div>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import {SYSTEM_CONSTANTS} from '@/static/global'

export default {
  name: 'app-common-footer',
  props: {
    width: {
      type: String | Number,
      default: 270.25
    }
  },
  data: () => ({
    domain: SYSTEM_CONSTANTS.domain,
    concat_img_width: 100
  }),
  computed: {
    getFullYear() {
      return new Date().getFullYear()
    }
  },
  mounted() {
    document.write(unescape("%3Cspan id='cnzz_stat_icon_1278953609'%3E%3C/span%3E%3Cscript src='https://s4.cnzz.com/z_stat.php%3Fid%3D1278953609%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
  }
}
</script>

<style scoped>
.concat_img_desc {
  margin-top: 8px;
}

.v-footer--fixed {
  position: unset !important;
}

.footer-tag .col {
  padding: 0 !important;
  border-right: solid 1px #999AAA;
  line-height: 16px;
}

/**
  最后一个不设置右边框
 */
.footer-tag .col:last-child {
  border-right: unset;
}

.my-copyright,
.footer-tag {
  font-size: 14px;
  color: #999AAA;
}

.my-copyright a,
.footer-tag a {
  color: #999AAA;
  text-decoration: none
}

.my-copyright a:hover,
.footer-tag a:hover {
  cursor: pointer;
  color: #1976d2;
}

.my-copyright div {
  margin-top: 5px;
}

.sidebar-box-border {
  border: 1px solid #e1e1e1;
}
</style>
