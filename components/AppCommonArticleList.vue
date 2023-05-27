<template>
  <div class="common-article-list-container">
    <div>
      <h2 class="h_title">最新文章</h2>
    </div>
    <div class="common-article-content rounded-0">
      <v-card-text v-for="(item) in list" :key="item.id"
                   class="article-list">
        <v-row>
          <v-col cols="3" class="">
            <v-img
              :src="item.first_img"
              class="white--text align-end transition-swing"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
            </v-img>
          </v-col>
          <v-col cols="9">
            <!--标题-->
            <v-row>
              <v-card-title class="article-list-title" @click="handleClick(item.code)">
                {{ item.title }}
              </v-card-title>
            </v-row>
            <v-row>
              <p v-text="item.content"></p>
            </v-row>
            <v-row class="article-info" justify="space-between">
              <div>
                <span v-text="item.author" class="article-list-author"></span>
                <span v-text="item.create_time" class="article-list-time"></span>
              </div>
              <div class="article-list-tags">
                <a v-for="tag in item.category" :key="tag">{{ tag }}</a>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-common-article-list',
  props: {
    //文章列表
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    handleClick(code) {
      this.$router.push(`/article/${code}`)
    }
  }
}
</script>

<style scoped>
.common-article-list-container {
  margin-top: 15px;
}

.h_title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}

.common-article-content {
  padding: 0;
}

.common-article-content-col {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  border-radius: unset !important;
}

.article-list {
  padding-left: 0;
  border-radius: unset;
  transition: all 0.4s linear;
  -moz-transition: all 0.4s linear; /* Firefox 4 */
  -webkit-transition: all 0.4s linear; /* Safari and Chrome */
  -o-transition: all 0.4s linear; /* Opera */
  border-bottom: 1px dashed #e5e5e5;
}

.article-list:hover {
  box-shadow: 0 18px 8px -18px #c0bebe
}

.v-image {
  height: 120px;
  width: 210px;
  cursor: pointer !important;
  transition: all 0.8s linear;
  -moz-transition: all 0.8s linear; /* Firefox 4 */
  -webkit-transition: all 0.8s linear; /* Safari and Chrome */
  -o-transition: all 0.8s linear; /* Opera */
}

.v-image:hover {
  transform: scale(1.1) !important;
}

.article-list-title {
  padding-left: 0;
  padding-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 28px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
}

.article-list-title:hover,
.article-list-title a:hover {
  color: #16499d;
}


.article-list a,
.article-list-title a {
  color: #333333;
  text-decoration: none;
}

.article-list p {
  color: #737373;
  line-height: 20px;
  font-size: 14px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
}

.article-info {
  margin-top: 13px !important;
}

.article-list-author {
  color: #333;
  margin: 0 5px 0 0;
  font-size: 13px;
}

.article-list-time {
  color: #b3b2b2;
  font-size: 13px;
}

.article-list-time:before {
  content: "·";
  padding: 0 5px;
}

.article-list-tags {
  display: inline-block;
}

.article-list-tags a {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  margin: 5px 5px 0 0;
  padding: 1px 7px;
  height: 18px;
  color: #16499d;
  background: #d2e3fe;
  border-radius: 10px;
  line-height: 18px;
  font-size: 12px;
}

.article-list-tags a:hover {
  background: #16499d;
  color: #fff;
}
</style>
