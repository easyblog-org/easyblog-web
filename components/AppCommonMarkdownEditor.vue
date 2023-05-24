<template>
   <div class="vditor-container">
        <div id="vditor"></div>
    </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: 'app-common-article-editor',
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    id: {
      type: String,
      required: false,
      default() {
        return (
          'markdown-editor-' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
        )
      },
    },
    isHideTools: {
      type: Boolean,
      required: false,
      default: false,
    },
    isPin: {
      type: Boolean,
      required: false,
      default: true,
    },
    width: {
      type: String,
      required: false,
      default: '100%',
    },
    height:{
       type:String,
       required:false,
       default: '600px'
    },
    mode: {
      type: String,
      required: false,
      default: 'ir',
    },
  },
  data() {
    return {
      vditor: '',
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
  },
  mounted() {
    this.vditor = new Vditor('vditor', {
      placeholder: '在这里记录你的灵感吧！',
      height: this.height,
      width: this.width,
      toolbarConfig: {
        pin: this.isPin,
        hide: this.isHideTools,
      },
      cache: {
        enable: true,
      },
      after: () => {
        this.vditor.setValue(this.value)
      },
      mode: this.mode,
      theme: 'ant-design',
      preview: {
        mode: 'both',
        actions: [],
      },
      focus: (val) => {
        //获得聚焦之后
      },
      image: {
        /** 是否预览图片。默认值: true */
        isPreview: true,
        /** 图片预览处理 */
        preview: (val) => {
          console.log('preview image+' + val)
        },
      },
      preview: {
        mode: 'both',
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
      },
      upload: {
        accept: 'image/*', // 规定上传的图片格式
        url: '/api/uploadFile', // 请求的接口
        multiple: false,
        fieldName: 'file',
        max: 10 * 1024 * 1024, //上传图片的大小
        // extraData: { 'access_token': this.token }, // 为 FormData 添加额外的参数
        linkToImgUrl: '/api/admin/uploadFile',
        validate(files) {
          const isLessthan10M = files[0].size / 1024 / 1024 < 10
          if (!isLessthan10M) {
            //this.$message.error('上传图片大小不能超过 10MB!')
          }
        },
        format(files, responseText) {
          var self = this
          var data = JSON.parse(responseText)
          // 上传图片请求状态
          if (data.status) {
            let filName = data.msg
            let lastTipNum = filName.substr(
              filName.lastIndexOf('/', filName.lastIndexOf('/') - 1) + 1
            )
            let index = lastTipNum.lastIndexOf('/')
            let succ = {}
            succ[filName] = '/api' + data.data
            //图片回显
            return JSON.stringify({
              data: {
                errFiles: [],
                succMap: succ,
              },
            })
          } else {
            // Message({
            //   message: "图片上传失败",
            //   type: 'error',
            // })
            console.log('图片上传失败')
          }
        },
        error(msg) {
          console.log(msg + '上传失败')
        },
      },
    })
    this.unwatch = this.$watch('value', (val) => {
      if (this.vditor && this.getValue() !== val) {
        this.setValue(val)
      }
    })
  },
  beforeDestroy() {
    if (this.unwatch) {
      this.unwatch()
    }
    if (this.vditor) {
      this.vditor.destroy()
    }
  },
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
