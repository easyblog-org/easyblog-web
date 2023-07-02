<template>
  <v-card class="hot-search-box sidebar-box-border align-center rounded-sm" elevation="0">
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
               <svg @click="onHotSearchPageBtnClick(1)" v-show="card_show === 2" t="1648308912652" class="icon"
                    viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8198" width="22" height="22"><path
                 d="M503.466667 490.666667l174.933333 174.933333-59.733333 59.733333L384 490.666667 618.666667 256l59.733333 59.733333-174.933333 174.933334z"
                 fill="#515151" p-id="8199"></path></svg>
               <svg @click="onHotSearchPageBtnClick(1)" v-show="card_show === 1" t="1648309106345" class="icon"
                    viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="8867" width="22" height="22"><path
                 d="M503.466667 490.666667l174.933333 174.933333-59.733333 59.733333L384 490.666667 618.666667 256l59.733333 59.733333-174.933333 174.933334z"
                 fill="#cdcdcd" p-id="8868"></path></svg>
             </span>
        <span>
          <svg @click="onHotSearchPageBtnClick(2)" v-show="card_show === 1" t="1648308957781" class="icon"
               viewBox="0 0 1024 1024"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="8579" width="22" height="22"><path
            d="M558.933333 490.666667L384 665.6l59.733333 59.733333 234.666667-234.666666L443.733333 256 384 315.733333l174.933333 174.933334z"
            fill="#515151" p-id="8580"></path></svg>
           <svg @click="onHotSearchPageBtnClick(2)" v-show="card_show === 2" t="1648308957781" class="icon"
                viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="8579" width="22" height="22"><path
             d="M558.933333 490.666667L384 665.6l59.733333 59.733333 234.666667-234.666666L443.733333 256 384 315.733333l174.933333 174.933334z"
             fill="#cdcdcd" p-id="8580"></path></svg>
        </span>
      </span>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text tag="div" class="hot-search-content-box">
      <v-card-text v-for="(item,i) in this.articles_for_show" :key="item.id" class="hot-search-content">
        <v-row tag="a" :href="articleDetailsJumpPath(item)" :title="item.name">
          <v-col cols="9" class="text">
            <span class="rank-num" :style="{'color':item.rank_icon}">{{ item.rank }}</span>

            <NuxtLink :to="articleDetailsJumpPath(item)">{{ item.name }}</NuxtLink>
          </v-col>
          <v-col cols="3" class="click">{{ item.click_num }}</v-col>
        </v-row>
      </v-card-text>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'app-common-hot-search-list',
  props: {
    title: {
      type: String,
      default: '热搜榜'
    },
    height: {
      type: String | Number,
      default: '340px'
    },
    page_size: {
      type: Number,
      default: 10
    },
    page_no: {
      type: Number,
      default: 1
    },
    list_size: {
      type: Number,
      default: 20
    }
  },
  data: () => ({
    original_hot_search_articles: [
      {
        code: '1',
        article_name: '海量数据处理：如何从10亿个数中，找出最大的10000个数？（top K问题',
        click_num: 188000,
        rank: 1,
      },
      {
        code: '2',
        article_name: 'HashMap是如何工作的',
        click_num: 178000,
        rank: 2,
      },
      {
        code: '3',
        article_name: 'Redis五种常见数据结构的实现及使用场景',
        click_num: 163001,
        rank: 3,
      },
      {
        code: '4',
        article_name: 'Redisson 实现分布式锁原理浅析',
        click_num: 100099,
        rank: 4,
      },
      {
        code: '5',
        article_name: '深入理解JVM—垃圾回收器（Grabage Collector）基础篇',
        click_num: 51000,
        rank: 5,
      },
      {
        code: '6',
        article_name: 'SpringBoot从入门到精通—SpringBoot快速入门',
        click_num: 60088,
        rank: 6,
      },
      {
        code: '7',
        article_name: '高并发编程之AQS（AbstractQueuedSynchornizer）—源码剖析',
        click_num: 50002,
        rank: 7,
      },
      {
        code: '8',
        article_name: 'SpringBoot网站基于OAuth2添加第三方登录之GitHub登录',
        click_num: 49999,
        rank: 8,
      },
      {
        code: '9',
        article_name: 'SpringBoot从入门到精通—SpringBoot快速入门',
        click_num: 30000,
        rank: 9,
      },
      {
        code: '10',
        article_name: '作为Java工程师你真的理解synchronized吗',
        click_num: 1444,
        rank: 10,
      },
      {
        code: '11',
        article_name: 'RocketMQ Linux 安装配置',
        click_num: 1234,
        rank: 11,
      },
      {
        code: '12',
        article_name: 'Spring教程：事物详解（一）初探事物',
        click_num: 500,
        rank: 12,
      }
    ],
    articles_for_show: [], //展示的卡片
    card_show: 1,  //控制显示哪个热搜卡片
  }),
  methods: {
    //翻页按钮点击事件处理
    onHotSearchPageBtnClick(card) {
      if (card == null || card === '' || this.card_show === card) {
        return
      }
      this.card_show = card
      this.getShowArticles()
    },
    //获取用于展示的文章
    getShowArticles() {
      const original_articles = this.original_hot_search_articles
      if (original_articles === null || original_articles.length === 0) {
        return []
      }
      const articles = []
      const card = this.card_show
      for (const item of original_articles) {
        let icon = ''
        if (item.rank === 1) {
          icon = '#d81e06'
        } else if (item.rank === 2) {
          icon = '#ff9406'
        } else if (item.rank === 3) {
          icon = '#fec42d'
        } else if (item.rank <= 10) {
          icon = '#52afff'
        } else {
          icon = '#999aaa'
        }

        const article = {
          id: item.id,
          code: item.code,
          name: item.article_name,
          click_num: this.formatClickNum(item.click_num),
          rank: item.rank,
          rank_icon: icon
        }

        if (card === 1 && item.rank <= this.page_size) {
          articles.push(article)
        } else if (card === 2 && item.rank > this.page_size && item.rank <= this.list_size) {
          articles.push(article)
        }
      }

      this.articles_for_show = articles
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
  created() {
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
