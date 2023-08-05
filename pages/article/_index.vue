<template>
  <v-app ref="articleApp">
    <app-page-view-counter @pageView="sendPageView"/>
    <!--顶部标题栏-->
    <app-common-bar :show="showAppBar"></app-common-bar>

    <v-main class="article-container">
      <v-container>
        <div class="article-likes-bar">
          <div>
            <v-col>
              <v-badge
                overlap
                :color="likesFlag.thumbUp ? '#1e80ff' : '#c2c8d1'"
                :content="authorRecords.likes_num"
                :value="authorRecords.likes_num"
              >
                <v-btn elevation="2" fab rounded middle icon @click="this.handleLikeArticle">
                  <v-icon :color="likesFlag.thumbUp ? '#1e80ff' : '#8a919f'"
                  >mdi-thumb-up
                  </v-icon
                  >
                </v-btn>
              </v-badge>
            </v-col>
            <!--            <v-col>-->
            <!--              <v-badge-->
            <!--                overlap-->
            <!--                :color="likesFlag.comment ? '#1e80ff' : '#c2c8d1'"-->
            <!--                :content="commentNum"-->
            <!--                :value="commentNum"-->
            <!--              >-->
            <!--                <v-btn elevation="2" fab rounded middle>-->
            <!--                  <v-icon :color="likesFlag.comment ? '#1e80ff' : '#8a919f'"-->
            <!--                  >mdi-comment-->
            <!--                  </v-icon-->
            <!--                  >-->
            <!--                </v-btn>-->
            <!--              </v-badge>-->
            <!--            </v-col>-->
            <v-col>
              <v-badge
                overlap
                :color="likesFlag.favorites ? '#1e80ff' : '#c2c8d1'"
                :content="authorRecords.favorites_num"
                :value="authorRecords.favorites_num"
              >
                <v-btn elevation="2" fab rounded middle @click="this.handleFavoriteArticle">
                  <v-icon :color="likesFlag.favorites ? '#1e80ff' : '#8a919f'"
                  >mdi-star
                  </v-icon
                  >
                </v-btn>
              </v-badge>
            </v-col>
            <v-col>
              <v-btn elevation="2" fab rounded middle @click="this.handleShareArticle">
                <v-icon color="#8a919f">mdi-share</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn elevation="2" fab rounded middle @click="this.handleReportDialogOpen">
                <v-icon color="#8a919f">mdi-alert</v-icon>
              </v-btn>
            </v-col>
          </div>
        </div>
        <v-row class="article-row">
          <v-col cols="9" class="pt-0">
            <v-card elevation="1" class="pb-5">
              <!--文章详情主体-->
              <div class="article-content-box">
                <!--文章标题-->
                <v-row>
                  <input v-model="title" disabled/>
                </v-row>
                <!--作者信息-->
                <v-row>
                  <div class="author">
                    <v-col
                      class="author-img"
                      cols="1"
                      style="display: inline-block"
                    >
                      <NuxtLink to="/user-home-page">
                        <v-img
                          :src="authorImgUrl"
                          :lazy-src="authorImgUrl"
                          :min-width="43"
                          :max-width="43"
                          :max-height="43"
                          :min-height="43"
                          aspect-ratio="1"
                          class="grey lighten-2"
                        >
                          <template v-slot:placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                              ></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                      </NuxtLink>
                    </v-col>
                    <v-col cols="10" style="display: inline-block">
                      <v-row>
                        <span class="author-name">{{ authorName }}</span>
                      </v-row>
                      <v-row>
                        <span class="publish-time">
                          {{ publishTime | formatDates('YYYY年MM月dd日 HH:mm') }}
                        </span>
                        <span class="page-views">
                          &nbsp;&nbsp;·&nbsp;&nbsp;阅读
                          <span>{{ authorRecords.visit_num }}</span>
                        </span>
                      </v-row>
                    </v-col>
                  </div>
                </v-row>
                <!--文章详情主体-->
                <v-row>
                  <app-common-markdown-previewer :id="this.$route.params.index"/>
                </v-row>
              </div>
              <div class="content-links">
                <v-row>
                  <v-col cols="6" style="text-align: left">
                    <a @click="jumpToArticleDetails(article_guide.prev.code)">
                      上一篇：
                      {{ article_guide.prev.title }}
                    </a>
                  </v-col>
                  <v-col cols="6" style="text-align: right">
                    <a @click="jumpToArticleDetails(article_guide.next.code)">
                      下一篇：
                      {{ article_guide.next.title }}</a>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card elevation="1" rounded>
              <v-row class="author-info-card">
                <v-col
                  class="author-img"
                  cols="3"
                  style="display: inline-block"
                >
                  <NuxtLink to="/user-home-page">
                    <v-img
                      :src="authorImgUrl"
                      :lazy-src="authorImgUrl"
                      :min-width="48"
                      :max-width="48"
                      :max-height="48"
                      :min-height="48"
                      aspect-ratio="1"
                      class="grey lighten-2"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </NuxtLink>
                </v-col>
                <v-col cols="9" class="author-name-card" style="display: inline-block">
                  <div class="author-name">
                    {{ authorName }}
                  </div>
                  <div class="author-home-page-link">
                    <NuxtLink to="/user-home-page">TA的个人主页&gt;</NuxtLink>
                  </div>
                </v-col>
              </v-row>
              <v-row class="author-info-moments">
                <v-col cols="6">
                  <v-btn
                    class="attention"
                    :color="'#1e80ff'"
                    width="100%"
                    elevation="0"
                  >
                    关注
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    class="private-letter"
                    :color="'#1e80ff'"
                    width="100%"
                    outlined
                    elevation="0"
                  >
                    私信
                  </v-btn>
                </v-col>
              </v-row>
              <v-row class="author-info-divider">
                <v-divider></v-divider>
              </v-row>
              <v-row class="author-record">
                <v-col cols="3">
                  <v-row>
                    <v-col cols="12" class="text-center justify-center">
                      原创
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="text-center justify-center mt-0 pt-0">
                      <NuxtLink to="/categories" class="author-record-num">{{
                          authorRecords.original_article_num
                        }}
                      </NuxtLink>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="3">
                  <v-row>
                    <v-col cols="12" class="text-center justify-center">
                      访问
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="text-center justify-center mt-0 pt-0">
                      {{ authorRecords.visit_num }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="3">
                  <v-row>
                    <v-col cols="12" class="text-center justify-center">
                      点赞
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="text-center justify-center mt-0 pt-0">
                      {{ authorRecords.likes_num }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="3">
                  <v-row>
                    <v-col cols="12" class="text-center justify-center">
                      收藏
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="text-center justify-center mt-0 pt-0">
                      {{ authorRecords.favorites_num }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
            <v-card v-if="!tableOfContents" elevation="1" rounded class="article-content" ref="articleContentRef">
              <v-card-title>目录</v-card-title>

              <div class="content-item" :style="{ 'max-height': tableOfContentMaxHeight }">
                <v-card-text v-for="item in tableOfContents" :key="item.id">
                  <a :href="item.id" :style="{'margin-left': item.indent}">{{ item.title }}</a>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <app-common-reporter :showDialog="showReporterDialog"
                         @close="handleReportDialogClose"></app-common-reporter>

    <app-common-message-box :showDialog="message.isShow"
                            :message="message.context"
                            @close="handleMessageDialogClose"></app-common-message-box>
  </v-app>
</template>

<script>
import AppCommonBar from '~/components/AppCommonBar'
import AppCommonMarkdownPreviewer from '~/components/AppCommonMarkdownPreviewer.vue'
import {queryArticleDetails, updateStatistics, statistics, countArticles} from "@/api/article";

export default {
  name: 'ArticleDetailsView',
  components: {
    AppCommonBar,
    AppCommonMarkdownPreviewer,
  },
  data: () => ({
    article_guide: {
      prev: {
        code: 1596064,
        title: 'Java从入门到入土'
      },
      next: {
        code: 8693095,
        title: '混编模式（策略模式+工厂方法模式+门面模式门面模式门面模式门面模式）'
      },
    },
    message: {
      isShow: false,
      context: '',
    },
    authorName: '',
    authorImgUrl: '',
    publishTime: '',
    title: '',
    content: '',
    likesFlag: {
      thumbUp: false,
      comment: false,
      favorites: false,
    },
    authorRecords: {
      original_article_num: 0,
      visit_num: 0,
      likes_num: 0,
      favorites_num: 0
    },
    tableOfContents: [], // 存储生成的目录项
    tableOfContentMaxHeight: 0,
    showAppBar: true, // 控制是否显示 AppBar
    showReporterDialog: false  //控制显示举报弹窗
  }),
  methods: {
    handleArticleEvent(code, event) {
      if (!code || !event) return
      if (event === 'favorites' && this.likesFlag.favorites) {
        return;
      }
      updateStatistics({
        'code': code,
        'statistic_index_name': event,
        'increment': 1,
        'operator': this.$store.state.user ? this.$store.state.user.code : null
      }).then(() => {
        if (event === 'likes') {
          this.likesFlag.thumbUp ? this.authorRecords.likes_num-- : this.authorRecords.likes_num++
          this.likesFlag.thumbUp = !this.likesFlag.thumbUp
        } else if (event === 'favorites') {
          this.likesFlag.favorites = !this.likesFlag.favorites
          this.authorRecords.favorites_num++
        }
      })
    },
    /**
     * 处理点赞
     */
    handleLikeArticle() {
      this.handleArticleEvent(this.$route.params.index, 'likes')
    },
    /**
     * 处理收藏
     */
    handleFavoriteArticle() {
      this.handleArticleEvent(this.$route.params.index, 'favorites')
    },
    /**
     * 处理分享
     */
    handleShareArticle() {
      this.handleArticleEvent(this.$route.params.index, 'share')
      this.copyLink()
    },
    /**
     * 处理举报
     */
    handleReportDialogOpen() {
      this.showReporterDialog = true
    },
    handleReportDialogClose(val) {
      this.showReporterDialog = val
    },
    handleMessageDialogClose(val) {
      this.message.isShow = val
    },
    copyLink() {
      // 获取当前页面链接
      const link = window.location.href;

      // 创建一个临时文本输入框，用于复制链接
      const tempInput = document.createElement('input');
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      tempInput.value = link;
      document.body.appendChild(tempInput);

      // 选中临时文本输入框中的文本
      tempInput.select();

      // 执行复制命令
      const success = document.execCommand('copy');

      // 移除临时文本输入框
      document.body.removeChild(tempInput);

      // 复制成功提示
      if (success) {
        this.message.context = '分享链接已复制到粘贴板！'
        this.message.isShow = true
      } else {
        this.message.context = '复制分享链接失败，请手动复制！'
        this.message.isShow = true
      }
    },
    /**
     * 查询文章详情
     * @param code
     * @returns any
     */
    queryArticleByPrimaryKey(code) {
      queryArticleDetails(code).then(resp => {
        if (!resp || !resp.data) {
          this.$router.push('/404')
          return;
        }

        this.publishTime = resp.data.create_time
        this.title = resp.data.title
        this.authorName = resp.data.author.nick_name
        this.authorImgUrl = resp.data.author.header_img_url

        setTimeout(this.generateTableOfContents, 500)
      })
    },
    /**
     *  生成目录
     */
    generateTableOfContents() {
      this.$nextTick(() => {
        const articleContent = document.getElementById('vditor');
        if (!articleContent) return;
        const nodes = articleContent.childNodes;
        const titleTag = ["H1", "H2", "H3", "H4", "H5", "H6"];
        let maxLevel = 6;
        let minLevel = 0;

        for (let i = 0; i < nodes.length; i++) {
          const node = articleContent.childNodes[i];
          let level = Number(node.nodeName.substring(1, 2));
          if (titleTag.includes(node.nodeName)) {

            if (level > minLevel) {
              minLevel = level;
            }

            if (maxLevel > level) {
              maxLevel = level;
            }

            const id = "header-" + i;
            node.setAttribute("id", id);
            this.tableOfContents.push({
              id: "#" + id, // 目录项的链接
              title: node.innerHTML,
              nodeName: node.nodeName,
              level: level
            });
          }
        }

        // 根据最大级别设置缩进
        for (let i = 0; i < this.tableOfContents.length; i++) {
          const item = this.tableOfContents[i];
          const indentLevel = item.level;
          if (indentLevel - minLevel > 3) {
            // 目录只保存三级最大目录
            this.tableOfContents.splice(i, 1)
            return;
          }
          item.indent = indentLevel === maxLevel ? '0' : (indentLevel - maxLevel) * 8 + 'px'; // 最大级别的目录项设置为零缩进，其他级别增加8px的缩进
        }
      })
    },
    calculateTableOfContentMaxHeight() {
      const maxHeightPercentage = 0.75; // 最大高度的百分比

      this.tableOfContentMaxHeight = `${window.innerHeight * maxHeightPercentage}px`;
    },
    fixTableOfContentBox(scrollPosition) {
      const contentRef = this.$refs.articleContentRef
      if (scrollPosition > window.innerHeight * 0.36) {
        this.showAppBar = false
        if (!contentRef) return
        const rightPos = (window.innerWidth / 48) * 3.95
        contentRef.$el.style.position = 'fixed'
        contentRef.$el.style.right = rightPos + 'px'
        contentRef.$el.style.top = '15px'
        contentRef.$el.style.width = (window.innerWidth / 48) * 8.45 + 'px'
      } else {
        this.showAppBar = true
        if (!contentRef) return
        contentRef.$el.style.position = 'static'
      }
    },
    addScrollsListener() {
      window.onscroll = () => {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        this.fixTableOfContentBox(scrollTop)
      }
    },
    jumpToArticleDetails(code) {
      this.$router.push(`/article/${code}`)
    },
    sendPageView(code) {
      if (!code) return
      this.handleArticleEvent(code, 'page_views')
    },
    getStatistics(code) {
      if (!code) return

      countArticles({
        'author_id': this.$store.state.user.code
      }).then(resp => {
        this.authorRecords.original_article_num = !resp.data ? 0 : resp.data
      })

      statistics({
        'article_codes': code,
        'events': 'page_views',
      }).then(resp => {
        this.authorRecords.visit_num = !resp.data ? 0 : resp.data
      })

      statistics({
        'article_codes': code,
        'events': 'likes',
      }).then(resp => {
        this.authorRecords.likes_num = !resp.data ? 0 : resp.data
      })

      statistics({
        'article_codes': code,
        'events': 'favorites'
      }).then(resp => {
        this.authorRecords.favorites_num = !resp.data ? 0 : resp.data
      })
    },
    getStatisticsState(code) {
      if (!code) return

      statistics({
        'article_codes': code,
        'events': 'favorites',
        'operators': this.$store.state.user ? this.$store.state.user.code : null
      }).then(resp => {
        console.log("getStatisticsState favorites of  " + this.$store.state.user.code + "=" + JSON.stringify(resp))

        if (!resp) {
          return;
        }

        this.likesFlag.favorites = resp.data > 0
      })

      statistics({
        'article_codes': code,
        'events': 'likes',
        'operators': this.$store.state.user ? this.$store.state.user.code : null
      }).then(resp => {
        if (!resp) {
          return;
        }

        this.likesFlag.thumbUp = resp.data > 0
      })

    },
  },
  mounted() {
    const articleCode = this.$route.params.index
    // 1. 根据code查询文章，没有查到文章跳转404页面
    this.queryArticleByPrimaryKey(articleCode)
    // 2. 初始化文章主体Box最大高度
    this.calculateTableOfContentMaxHeight();
    // 3. 监听窗口大小变化,动态变更文章主体Box高度
    window.addEventListener('resize', this.calculateTableOfContentMaxHeight);
    this.addScrollsListener()
    this.getStatistics(articleCode)
    this.getStatisticsState(articleCode)

    this.sendPageView(articleCode)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateTableOfContentMaxHeight);
  },
}
</script>
<style scoped lang="scss">
.article-container {
  padding: 0 !important;
  margin-top: 1.767rem !important;
  height: max-content;

  .content-links {
    padding: 50px 22px 5px 22px;

    .row {
      display: flex;
      align-items: center;
    }

    a {
      text-decoration: none;
      color: #666;
      text-align: center;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      font-size: 15px;
    }

    a:hover {
      color: #1e80ff;
    }
  }

  .article-content {
    margin-top: 35px;
    background-color: #ffffff;
    padding-bottom: 10px;
    overflow: auto;

    .content-item {
      margin-left: 10px;
      margin-right: 10px;
    }

    .v-card__title {
      padding-bottom: 5px;
      padding-left: 0;
      border-bottom: solid 1px #e4e6eb;
      font-weight: 600;
      font-size: 16px;
      margin: 10px;
    }

    .v-card__text {
      padding: 10px;
    }

    .v-card__text:hover {
      background-color: #e4e6eb;
      border-radius: 5px;
    }

    a {
      text-decoration: none;
      cursor: pointer;
      color: #252933; //#8A919F
      line-height: 10px;
      white-space: inherit;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* 自定义滚动条样式 */
  .article-content::-webkit-scrollbar {
    width: 5px; /* 设置滚动条宽度 */
  }

  .article-content::-webkit-scrollbar-track {
    background-color: #ffffff; /* 设置滚动条轨道背景色 */
  }

  .article-content::-webkit-scrollbar-thumb {
    background-color: #e4e6eb; /* 设置滚动条滑块颜色 */
    border-radius: 4px; /* 设置滚动条滑块圆角 */
  }

  .article-content::-webkit-scrollbar-thumb:hover {
    background-color: #e4e6eb; /* 设置滚动条滑块鼠标悬停时的颜色 */
  }

  .article-likes-bar {
    position: fixed;
    margin-left: -1.5rem;
    top: 15rem;
    z-index: 2;

    .v-btn {
      background-color: #ffffff !important;
    }

    .v-btn--fab.v-size--default {
      height: 48px;
      width: 48px;
      margin-bottom: 0.667rem;
    }

    .v-icon:hover {
      color: #515767 !important;
    }
  }

  .author-info-card {
    padding: 20px 20px 0 20px;

    .v-image {
      border-radius: 30px;
    }

    .author-img {
      padding: 5px 0 5px 5px;
    }

    .author-name-card {
      padding: 10px 5px 10px 5px !important;

      .author-name {
        font-size: 14px;
        font-weight: 500;
        color: #252933;
        line-height: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .author-home-page-link {
      margin-top: 5px;

      a {
        text-decoration: none;
        color: #3399ea;
        font-size: 12px !important;
      }
    }
  }

  .author-info-moments {
    margin-top: 0;
    padding: 5px 10px;

    .attention {
      color: #ffffff !important;
    }

    .private-letter {
      color: #3399ea !important;
    }
  }

  .author-info-divider {
    margin: 5px;
  }

  .author-record {
    margin-top: 0;
    padding: 0 10px;
    color: #666666;
    font-weight: 500;

    .col {
      padding: 10px;
    }

    .author-record-num {
      text-decoration: none;
      color: #666666;
    }
  }

  .article-row {
    margin-left: 3.5rem;

    .article-content-box {
      padding: 10px 22px;

      .author {
        width: 100%;
        min-height: 43px;
        margin: 0 13px;

        .v-image {
          border-radius: 30px;
        }

        .author-img {
          padding: 5px 0 5px 5px;
        }

        .author-name {
          font-size: 16px;
          font-weight: 700;
          color: #515767;
        }

        .publish-time,
        .page-views {
          font-size: 15px;
          color: #8a919f;
          margin-top: 2px;
          line-height: 22px;
        }
      }
    }
  }
}

input {
  outline: none; // 使用outline属性去掉淡蓝色边框
  margin: 0 13px; //默认带有margin
  width: 100%;
  height: 60px;
  line-height: 60px !important;
  font-size: 2vw !important;
  text-align: left;
  border: 0;
  //background:rgba(235,82,134,1);
  border-radius: 0;
  // font-size:***;字体大小最好不要设置 ios上有兼容性问题
  font-family: Source Han Sans CN !important;
  font-weight: 500 !important;
  color: #1f2329 !important; //字体颜色
  caret-color: #1f2329 !important; //光标颜色
}

input::placeholder {
  line-height: 60px !important;
  font-size: 2vw !important;
  color: #bbbfc4;
  text-align: left;
}
</style>
