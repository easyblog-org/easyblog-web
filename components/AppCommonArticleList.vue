<template>
  <div class="common-article-list-container">
    <div>
      <h2 class="h_title">最新文章</h2>
    </div>

    <!-- 骨架加载效果 -->
    <v-sheet
      :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
    >
      <v-skeleton-loader
        :loading="total === null"
        type="article@5"
      >
        <div class="common-article-content rounded-0">
          <v-card-text v-for="(item) in preparedArticleList" :key="item.code"
                       class="article-list">
            <v-row v-if="articleListModel==='list'">
              <v-col cols="3" class="">
                <NuxtLink :to="item.url">
                  <v-img
                    :src="item.featured_image"
                    class="white--text align-end transition-swing"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  >
                  </v-img>
                </NuxtLink>
              </v-col>
              <v-col cols="9">
                <!--标题-->
                <v-row>
                  <NuxtLink :to="item.url">
                    <v-card-title class="article-list-title">
                      {{ item.title }}
                    </v-card-title>
                  </NuxtLink>
                </v-row>
                <v-row>
                  <p v-text="item.article_summary"></p>
                </v-row>
                <v-row class="article-info" justify="space-between">
                  <div>
                    <span v-text="item.author.nick_name" class="article-list-author"></span>
                    <span class="article-list-time"> {{ item.create_time  | formatDates('YYYY-MM-dd HH:mm') }}</span>
                  </div>
                  <div class="article-list-tags">
                    <a v-for="cat in item.categories">{{ cat }}</a>
                  </div>
                </v-row>
              </v-col>
            </v-row>
            <v-row v-if="articleListModel==='icon'" style="align-items:center">
              <v-col cols="5">
                <NuxtLink :to="item.url">
                  <v-img
                    :src="item.featured_image"
                    eager
                    min-height="100px"
                    max-height="120px"
                    class="white--text align-end transition-swing"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  >
                  </v-img>
                </NuxtLink>
              </v-col>
              <v-col cols="7">
                <!--标题-->
                <v-row>
                  <NuxtLink :to="item.url">
                    <v-card-title class="m-article-list-title">
                      {{ item.title }}
                    </v-card-title>
                  </NuxtLink>
                </v-row>
                <v-row>
                  <p style="margin-bottom: 5px;font-size: 13px" v-text="item.article_summary"></p>
                </v-row>
                <v-row class="article-info" justify="space-between">
                  <div>
                    <span v-text="item.author.nick_name" class="article-list-author"></span>
                  </div>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <div class="common-article-read-more rounded-0" @click="loadMoreArticles">
            <v-btn v-show="total>params.offset" block class="rounded-0">
              阅读更多
            </v-btn>
            <v-row style="margin-top: 10px;padding-bottom: 10px" class="align-center justify-center baseline"
                   v-show="total<=params.offset">我是有底线的~
            </v-row>
          </div>
        </div>
      </v-skeleton-loader>
    </v-sheet>
  </div>
</template>

<script>
import {extractKeywordSummary, prepareArticleListAppendJumpPath} from "static/util";
import {queryArticleList} from "@/api/article";

export default {
  name: 'app-common-article-list',
  props: {
    summary_word_count: {
      type: Number,
      default: 150
    }
  },
  //Vuetify components provide a theme variable that is used to determine dark
  inject: {
    theme: {
      default: {isDark: false},
    },
  },
  data() {
    return {
      list: [],
      params: {
        limit: 10,
        offset: 0,
        order_cause: 'create_time',
        order_dir: 'desc',
        sections: 'article_content,article_author_avatar,article_category'
      },
      total: null
    }
  },
  methods: {
    async loadArticles() {
      // 1. 查询文章列表
      this.total = null
      queryArticleList(this.params).then(resp => {
        this.list = prepareArticleListAppendJumpPath([...this.list, ...resp.data.data])
        this.total = resp.data.total
      })
    },
    loadMoreArticles() {
      this.params.offset += this.params.limit
      if (this.params.offset >= this.total) return;

      this.loadArticles()
    }
  },
  computed: {
    preparedArticleList() {
      if (!this.list) return []
      return this.list.map(item => {
        return {
          ...item,
          article_summary: extractKeywordSummary(item.content, this.summary_word_count),
        };
      });
    },
    articleListModel() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'icon'
        case 'sm':
          return 'list'
        case 'md':
          return 'list'
        case 'lg':
          return 'list'
        case 'xl':
          return 'list'
      }
    },
  },
  mounted() {
    this.loadArticles()
  },
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
.article-list-title a:hover,
.m-article-list-title a:hover {
  color: #16499d;
}


.article-list a,
.article-list-title a
.m-article-list-title a {
  color: #333333;
  text-decoration: none;
}

.m-article-list-title {
  padding: 0 !important;
  line-height: 28px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
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
  color: #b3b2b2;
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

.common-article-read-more {
  padding: 15px 0 15px 0;
}

.common-article-read-more button {
  background-color: #f1f1f1;
  box-shadow: unset !important;
  color: #000000;
  font-weight: 400;
}

.common-article-read-more button:hover {
  background-color: #16499d;
  color: #ffffff;
  font-weight: 400;
}

.baseline {
  color: #b3b2b2;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
