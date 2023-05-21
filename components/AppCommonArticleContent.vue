<template>
  <!--文章详情主体-->
  <div class="vditor-container">
    <div id="vditor"/>
  </div>
</template>

<script>
import Vditor from "vditor"
import "vditor/dist/index.css"


export default {
  name: "app-common-article-content",
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: false,
      default() {
        return 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    isHideTools: {
      type: Boolean,
      required: false,
      default: false
    },
    isPin: {
      type: Boolean,
      required: false,
      default: true
    },
    height: {
      type: String,
      required: false,
      default: '300px'
    },
    width: {
      type: String,
      required: false,
      default: "auto"
    },
    mode: {
      type: String,
      required: false,
      default: 'ir'
    },
  },
  data() {
    return {
      vditor: ""
    }
  },
  methods: {
    getValue() {
      return this.vditor.getValue();
    },
    getHTML() {
      return this.vditor.getHTML();
    },
    setValue(value) {
      return this.vditor.setValue(value);
    },
    disabled() {
      return this.vditor.disabled();
    },
  },
  mounted() {
    this.vditor = new Vditor("vditor", {
      height: this.height,
      width: this.width,
      toolbarConfig: {
        pin: this.isPin,
        hide: this.isHideTools,
      },
      cache: {
        enable: true
      },
      after: () => {
        this.vditor.setValue(this.value)
      },
      mode: this.mode,
      theme: 'ant-design',
      preview: {
        mode: "both",
        actions: []
      },
      upload: {
        accept: 'image/*',// 规定上传的图片格式
        url: "/api/uploadFile",// 请求的接口
        multiple: false,
        fieldName: 'file',
        max: 10 * 1024 * 1024,//上传图片的大小
        // extraData: { 'access_token': this.token }, // 为 FormData 添加额外的参数
        linkToImgUrl: "/api/admin/uploadFile",
        validate(files) {
          const isLessthan10M = files[0].size / 1024 / 1024 < 10
          if (!isLessthan10M) {
            //this.$message.error('上传图片大小不能超过 10MB!')
          }
        },
        format(files, responseText) {
          var self = this;
          var data = JSON.parse(responseText)
          // 上传图片请求状态
          if (data.status) {
            let filName = data.msg
            let lastTipNum = filName.substr(filName.lastIndexOf('/', filName.lastIndexOf('/') - 1) + 1);
            let index = lastTipNum.lastIndexOf("\/");
            let succ = {}
            succ[filName] = "/api" + data.data
            //图片回显
            return JSON.stringify({
              data: {
                errFiles: [],
                succMap: succ
              }
            })
          } else {
            // Message({
            //   message: "图片上传失败",
            //   type: 'error',
            // })
            console.log("图片上传失败")
          }
        },
        error(msg) {
          console.log(msg + "上传失败")
        },
      }
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
<style scoped>
</style>
