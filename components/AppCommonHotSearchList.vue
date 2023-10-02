<template>
  <v-sheet
    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
  >
    <v-skeleton-loader
      :loading="show_cards===null"
      type="list-item@10"
    >
      <v-card v-show="show_cards!=null&&show_cards.length>0"
              class="hot-search-box sidebar-box-border align-center rounded-sm" elevation="0">
        <v-card-title class="hot-search-title-box">
          <v-row justify="space-between">
            <v-col cols="8">
              <div class="hot-search-icon">
                <svg t="1648301586764" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2207" width="22" height="22">
                  <path
                    d="M756.184615 346.584615l-74.830769 70.892308s0-283.569231-244.184615-378.092308c0 0-23.630769 259.938462-145.723077 354.461539s-370.215385 378.092308 122.092308 590.769231c0 0-244.184615-259.938462 74.830769-448.984616 0 0-23.630769 94.523077 98.461538 189.046154s0 259.938462 0 259.938462 586.830769-141.784615 169.353846-638.03077z"
                    p-id="2208" fill="#d81e06"></path>
                </svg>
              </div>
              <span class="hot-search-title" v-text="this.title"></span>
            </v-col>
            <v-col cols="4" class="page">
          <span>
             <span>
               <svg @click="onHotSearchPageBtnClick(2)"
                    t="1648308912652" class="icon"
                    viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8198" width="22" height="22"><path
                 d="M503.466667 490.666667l174.933333 174.933333-59.733333 59.733333L384 490.666667 618.666667 256l59.733333 59.733333-174.933333 174.933334z"
                 fill="#515151" p-id="8199"></path></svg>
             </span>
        <span>
          <svg @click="onHotSearchPageBtnClick(1)"
               t="1648308957781" class="icon"
               viewBox="0 0 1024 1024"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="8579" width="22" height="22"><path
            d="M558.933333 490.666667L384 665.6l59.733333 59.733333 234.666667-234.666666L443.733333 256 384 315.733333l174.933333 174.933334z"
            fill="#515151" p-id="8580"></path></svg>
        </span>
      </span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text tag="div" class="hot-search-content-box">
          <v-card-text v-for="(item,i) in this.show_cards" :key="item.code" class="hot-search-content">
            <v-row tag="a" :href="articleDetailsJumpPath(item)" :title="item.title">
              <v-col cols="9" class="text">
                <span class="rank-num" :style="{'color':item.rank_icon}">{{ item.rank }}</span>

                <NuxtLink :to="articleDetailsJumpPath(item)">{{ item.title }}</NuxtLink>
              </v-col>
              <v-col cols="3" class="click">{{ item.click_num }}</v-col>
            </v-row>
          </v-card-text>
        </v-card-text>
      </v-card>
    </v-skeleton-loader>
  </v-sheet>
</template>

<script>
import {queryArticleList} from "@/api/article";
import {getNthPartitionOf} from "static/util";
import {COMMON_HOT_SEARCH_ARTICLE_LIST_CARD_OPT} from "static/global";

export default {
  name: 'app-common-hot-search-list',
  //Vuetify components provide a theme variable that is used to determine dark
  inject: {
    theme: {
      default: {isDark: false},
    },
  },
  props: {
    title: {
      type: String,
      default: '热搜榜'
    },
    height: {
      type: String | Number,
      default: '340px'
    },
    params: {
      type: Object,
      default: function () {
        return {
          limit: this.list_size,
          offset: 0,
          order_cause: 'page_views',
          order_dir: 'desc'
        }
      }
    },
    card_size: {
      type: Number,
      default: 10
    },
    list_size: {
      type: Number,
      default: 20
    }
  },
  data: () => ({
    // 卡片页数
    card_no: 1,
    // 全部数据
    list: [],
    //当前展示的数据
    show_cards: [],
    card_opt: null
  }),
  methods: {
    /**
     * 翻页按钮点击事件处理
     * @param card_opt @see global.js/COMMON_HOT_SEARCH_ARTICLE_LIST_CARD_OPT
     */
    onHotSearchPageBtnClick(card_opt) {
      console.log(card_opt)
      if (!card_opt ||
        card_opt !== COMMON_HOT_SEARCH_ARTICLE_LIST_CARD_OPT.NEXT_PAGE ||
        card_opt !== COMMON_HOT_SEARCH_ARTICLE_LIST_CARD_OPT.PREV_PAGE) {
        return
      }

      console.log("next_page?" + card_opt === COMMON_HOT_SEARCH_ARTICLE_LIST_CARD_OPT.NEXT_PAGE)
      console.log("pre_page?" + card_opt === COMMON_HOT_SEARCH_ARTICLE_LIST_CARD_OPT.PREV_PAGE)
      if (card_opt === COMMON_HOT_SEARCH_ARTICLE_LIST_CARD_OPT.NEXT_PAGE) {
        if (this.card_no * this.card_size < this.list.length) {
          this.card_no += 1
        } else {
          //实现循环翻页效果
          this.card_no = 1
        }
      } else if (card_opt === COMMON_HOT_SEARCH_ARTICLE_LIST_CARD_OPT.PREV_PAGE) {
        if (this.card_no > 1) {
          this.card_no -= 1
        }
      }
      this.switchShowCard()
    },
    //获取用于展示的文章
    getShowArticles() {
      queryArticleList(this.params).then(resp => {
        this.list = this.renderArticles(resp.data.data)
        console.log(this.list)
        this.switchShowCard()
      })
    },
    renderArticles(original_articles = []) {
      if (original_articles === null || original_articles.length === 0) {
        return []
      }

      let rank = 0;
      return original_articles.map(item => {
        rank++
        let icon = ''
        if (rank === 1) {
          icon = '#d81e06'
        } else if (rank === 2) {
          icon = '#ff9406'
        } else if (rank === 3) {
          icon = '#fec42d'
        } else if (rank <= 10) {
          icon = '#52afff'
        } else {
          icon = '#999aaa'
        }
        return {
          ...item,
          click_num: this.formatClickNum(item.page_views),
          rank: rank,
          rank_icon: icon
        };
      });
    },
    // 切换展示卡片
    switchShowCard() {
      this.show_cards = getNthPartitionOf(this.list, this.card_size, this.card_no)
    },
    //格式化热搜文章点击数
    // 1. 10000以下 显示原始数字
    // 2. 10000以上换算成xxx万显示，比如 125000 => 12.5万
    formatClickNum(num) {
      if (num < 10000) {
        return num
      } else {
        return (num / 10000).toFixed(1) + '万'
      }
    },
    articleDetailsJumpPath(item) {
      if (!item) return "/"
      return `/article/${item.code}`
    }
  },
  mounted() {
    this.getShowArticles()
  }
}
</script>

<style scoped>

.hot-search-content-box {
  padding-top: 0;
}

.hot-search-box {
  min-height: 340px;
}

/*热搜icon图标*/
.hot-search-icon {
  display: inline;
  margin-right: 5px;
}

.hot-search-title-box {
  padding-bottom: 12px;
}

.hot-search-title {
  font-weight: 600;
  font-size: 17px;
}

.hot-search-content {
  padding-top: 10.5px;
  padding-bottom: 10.5px;
}

.hot-search-content .rank-num {
  text-align: left;
  margin: auto 5px auto 0;
  font-weight: 800;
  font-size: 12px;
}

.rank-num {
  font-size: 14px !important;
}

.hot-search-content .text {
  padding-left: 0;
  padding-right: 0;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hot-search-content .click {
  text-align: end;
  color: #939393;
  font-size: 12px;
  padding-left: 0;
  padding-right: 0;
}

.hot-search-content a {
  color: inherit;
  text-decoration: none;
}

.hot-search-box .page {
  text-align: end;
}

.hot-search-box .page svg {
  cursor: pointer;
}

.sidebar-box-border {
  border: 1px solid #e1e1e1;
}
</style>
