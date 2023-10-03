<template>
  <!--文章详情主体-->
  <div class="vditor-container">
    <div hidden>{{ active }}</div>
    <div id="vditor"></div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import {queryArticleDetails} from "@/api/article";

export default {
  name: 'app-common-article-previewer',
  props: {
    id: {
      type: String,
      required: true,
      default: '',
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      vditor: '',
      content: null
    }
  },
  methods: {
    getValue() {
      return this.vditor.getValue()
    },
    getHTML() {
      return this.vditor.getHTML()
    },
    setValue(value) {
      return this.vditor.setValue(value)
    },
    disabled() {
      return this.vditor.disabled()
    },
    preview(content = this.content) {
      Vditor.preview(document.getElementById('vditor'), content, {
        theme: {current: this.active ? 'dark' : 'light'},
        mode: 'light',
        speech: {enable: true},
        icon: 'ant',
        hljs: {
          /** 代码块没有指定语言时，使用此值。默认值: "" */
          defaultLang: 'text',
          /** 是否启用行号。默认值: false */
          lineNumber: true,
          /** 代码风格，可选值参见 [Chroma](https://xyproto.github.io/splash/docs/longer/all.html)。 默认值: 'github' */
          style: 'github',
          /** 是否启用代码高亮。默认值: true */
          enable: true,
        },
        image: {
          /** 是否预览图片。默认值: true */
          isPreview: true,
          /** 图片预览处理 */
          preview: (val) => {
            console.log('preview image+' + val)
          },
        },
      }).then(() => {
        // 触发完成事件
        this.$emit('done', true);
      })
    },
  },
  mounted() {
    queryArticleDetails(this.id, {
      "sections": 'article_content'
    }).then((resp) => {
      if (!resp || !resp.data) {
        this.$router.push('/404')
        return;
      }

      this.content = resp.data.content
      this.preview(resp.data.content)
    })
    // window.addEventListener('resize', this.preview)
    // this.unwatch = this.$watch('value', (val) => {
    //   if (this.vditor && this.getValue() !== val) {
    //     this.setValue(val)
    //   }
    // })
  },
  beforeDestroy() {
    if (this.unwatch) {
      this.unwatch()
    }
    if (this.vditor) {
      this.vditor.destroy()
    }
  }
}
</script>
<style scoped lang="scss">
.vditor-container {
  width: 100% !important;

  ::v-deep .vditor-toolbar--hide {
    display: none !important;
  }

  ::v-deep .vditor {
    display: flex;
    flex-direction: column;
    border: none;
    border-radius: 3px;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans',
    'Hiragino Sans GB', 'Microsoft Yahei', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Noto Color Emoji', 'Segoe UI Symbol', 'Android Emoji',
    'EmojiSymbols';
  }

  ::v-deep .vditor-reset {
    padding: 10px 13px !important;
  }
}
</style>
