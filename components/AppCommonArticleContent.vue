<template>
  <div class="article-content-box">
    <!--文章标题-->
    <v-row>
      <input v-model="title" placeholder="请输入标题"/>
    </v-row>
    <!--作者信息-->
    <v-row>
      <div class="author">
        <v-col class="author-img-box" cols="1" style="display:inline-block">
          <v-img
        :src="`https://picsum.photos/500/300?image=15`"
        :lazy-src="`https://picsum.photos/10/6?image=15`"
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
        </v-col>
        <v-col cols="10" style="display:inline-block">
          <v-row>
            <span>{{authorName}}</span>
          </v-row>
          <v-row>
            <span> {{publishTime | formatDates('YYYY-MM-dd HH:mm')}} </span>
            <span class="views-count">
                    &nbsp;&nbsp;·&nbsp;&nbsp;阅读
                   <span>{{pageViews}}</span>
                  </span>
          </v-row>
        </v-col>
      </div>
    </v-row>
    <!--文章详情主体-->
    <v-row>
      <div class="vditor-container">
        <div id="vditor"></div>
       </div>
    </v-row>
  </div>
</template>

<script>
import Vditor from "vditor"
import "vditor/dist/index.css"


export default {
  name: "app-common-article-editor",
  props: {
    pageViews:{
      type: Number,
      required: false,
      default: 0
    },
    authorName: {
      type: String,
      required: false,
      default: 'EasyBlog用户'
    },
    publishTime:{
      type: Number,
      required: false,
      default: 0
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
     title: {
      type: String,
      required: false,
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
      default: "100%"
    },
    mode: {
      type: String,
      required: false,
      default: 'ir'
    }
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
      placeholder:"在这里记录你的灵感吧！",
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
      // outline:{
      //   enable:true,
      //   position: "left"
      // },
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
<style scoped lang="scss">
.vditor-container {
  width:100% !important;
  ::v-deep .vditor-toolbar--hide {
    display: none !important;
  }

  ::v-deep .vditor{
    display: flex;
    flex-direction: column;
    border: none;
    border-radius: 3px;
    box-sizing: border-box;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", "Hiragino Sans GB", "Microsoft Yahei", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", "EmojiSymbols";
  }

  ::v-deep .vditor-reset {
    padding: 10px 13px !important;
  }
}


.article-content-box {
  .author{
    width: 100%;
    min-height: 43px;
    margin: 0 13px;
    .v-image{
       border-radius: 30px;
    }

    .author-img-box{
      padding: 5px 0 5px 5px;
    }
  }
}

input{
    outline: none;// 使用outline属性去掉淡蓝色边框
    margin:0 13px; //默认带有margin
    width: 100%;
    height: 60px;
    line-height: 60px !important;
    font-size: 2vw !important;
    text-align: left;
    border: 0;
    //background:rgba(235,82,134,1);
    border-radius:0;
    // font-size:***;字体大小最好不要设置 ios上有兼容性问题
    font-family:Source Han Sans CN !important;
    font-weight:500 !important;
    color:#1f2329 !important;//字体颜色
    caret-color:#1f2329 !important;//光标颜色
}

input::placeholder {
    line-height: 60px !important;
    font-size: 2vw !important;
    color: #bbbfc4;
    text-align: left;
}
</style>
