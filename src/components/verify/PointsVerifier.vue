<template>
  <v-card class="verify-point-container">
    <div style="position: relative"
         class="verify-point-inner-container"
         @mouseover="mode === 'pop'?(showImage = true):undefined"
         @mouseout="mode === 'pop'?(showImage = false):undefined">
      <div class="verify-bar-area"
           :style="{'width': this.barSize.width,
                      'height': this.barSize.height,
                      'color': this.barAreaColor,
                      'border': 'unset',
                      'line-height':this.barSize.height}">
        <span class="verify-msg" v-html="text"></span>
      </div>

      <div class="verify-img-out"
           v-show="showImage"
           @mouseover="mode === 'pop'?(showImage = true):undefined"
           @mouseout="mode === 'pop'?(showImage = false):undefined"
           :style="mode === 'pop' ?
                                {display: 'none', position: 'absolute', bottom: '42px', height: parseInt(setSize.imgHeight) + vSpace + 'px'} :
                                {position: 'relative', height: parseInt(setSize.imgHeight) + vSpace + 'px'}">
        <div class="verify-img-panel" :style="{'width': setSize.imgWidth,
                                                   'height': setSize.imgHeight,
                                                   'background-size' : setSize.imgWidth + ' '+ setSize.imgHeight,
                                                   'margin-bottom': vSpace + 'px'}">
          <canvas :width="setSize.imgWidth" :height="setSize.imgHeight"
                  ref="canvas"
                  @click="bindingClick?canvasClick($event):undefined"></canvas>
          <div v-for="(tempPoint, index) in tempPoints" :key="index" class="point-area"
               :style="{
                        'background-color':'#1abd6c',
                        color:'#fff',
                        'z-index':9999,
                        width:'30px',
                        height:'30px',
                        'text-align':'center',
                        'line-height':'30px',
                        'border-radius': '50%',
                        position:'absolute',
                        top:parseInt(tempPoint.y-10) + 'px',
                        left:parseInt(tempPoint.x-10) + 'px'
                     }">
            {{ index + 1 }}
          </div>
        </div>
      </div>

      <v-row align="center"
             justify="space-around">
        <v-col style="text-align: left">
          <v-tooltip bottom>
            <template v-slot:activator="{on,attrs}">
              <span class="icon-box" v-on="on" v-bind="attrs">
            <div style="z-index:3" @click="refresh" v-show="showRefresh">
            <i class="iconfont icon-refresh"></i>
            </div>
          </span>
            </template>
            <span>刷新</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{on ,attrs}">
              <span class="icon-box" v-on="on" v-bind="attrs">
            <div style="z-index:3" @click="closeWindow" v-show="showRefresh">
            <i class="iconfont icon-close"></i>
            </div>
          </span>
            </template>
            <span>关闭</span>
          </v-tooltip>
        </v-col>
        <v-col style="text-align: right">
          <v-btn depressed color="primary" width="40%" @click="verifyPassOnConfirmClick">确定</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script type="text/babel">/**
 * VerifyPoints
 * @description 点选
 * */
import { resetSize, _code_chars, _code_color1, _code_color2 } from '@/assets/util.js'

function getOffset (Node, offset = {
  top: 0,
  left: 0
}) {
  if (Node === document.body) {//当该节点为body节点时，结束递归
    return offset
  }

  offset.top += Node.offsetTop
  offset.left += Node.offsetLeft

  return getOffset(Node.parentNode, offset)//向上累加offset里的值
}

export default {
  name: 'points-verifier',
  props: {
    //弹出式pop，固定fixed
    mode: {
      type: String,
      default: 'fixed'
    },
    //默认的文字数量
    defaultNum: {
      type: Number,
      default: 4
    },
    //校对的文字数量
    checkNum: {
      type: Number,
      default: 3
    },
    //间隔
    vSpace: {
      type: Number,
      default: 5
    },
    //背景图片地址
    imgsAddress: {
      type: Array,
      default () {
        return [require('@/assets/img/verify/1.jpg'),
          require('@/assets/img/verify/2.jpg'),
          require('@/assets/img/verify/3.jpg'),
          require('@/assets/img/verify/4.jpg'),
          require('@/assets/img/verify/5.jpg'),
          require('@/assets/img/verify/6.jpg'),
          require('@/assets/img/verify/7.jpg'),
          require('@/assets/img/verify/8.jpg')
        ]
      }
    },
    //图片大小
    imgSize: {
      type: Object,
      default () {
        return {
          width: '400px',
          height: '200px'
        }
      }
    },
    barSize: {
      type: Object,
      default () {
        return {
          width: '400px',
          height: '40px'
        }
      }
    },
    circleRadius: {
      type: String,
      default: '10px',
    }
  },
  data () {
    return {
      fontPos: [], // 选中的坐标信息
      checkPosArr: [], //用户点击的坐标
      num: 1,//点击的记数
      imgRand: 0, // //随机的背景图片
      setSize: {
        imgHeight: 0,
        imgWidth: 0,
        barHeight: 0,
        barWidth: 0
      },
      showImage: true,
      tempPoints: [],
      text: '',
      barAreaColor: undefined,
      barAreaBorderColor: undefined,
      showRefresh: true,
      bindingClick: true,
      //校验是否成功
      success: false
    }
  },
  computed: {
    resetSize () {
      return resetSize
    }
  },
  methods: {
    init () {
      //加载页面
      this.fontPos.splice(0, this.fontPos.length)
      this.checkPosArr.splice(0, this.checkPosArr.length)
      this.num = 1
      // this.imgRand = Math.floor(Math.random() * this.imgName.length)

      this.$nextTick(() => {
        this.setSize = this.resetSize(this)	//重新设置宽度高度
        this.refresh()
        this.$parent.$emit('ready', this)
      })

    },
    close () {
      this.showImage = false
    },
    canvasClick (e) {
      this.checkPosArr.push(this.getMousePos(this.$refs.canvas, e))
      if (this.num === this.checkNum) {

        this.num = this.createPoint(this.getMousePos(this.$refs.canvas, e))
        setTimeout(() => {
          const flag = this.comparePos(this.fontPos, this.checkPosArr)
          if (flag === false) {	//验证失败
            this.$parent.$emit('error', this)
            this.barAreaColor = '#d9534f'
            this.barAreaBorderColor = '#d9534f'
            this.text = '验证失败'

            setTimeout(() => {
              this.refresh()
            }, 400)

          } else {	//验证成功
            this.barAreaColor = '#4cae4c'
            this.barAreaBorderColor = '#5cb85c'
            this.text = '验证成功'
            this.showRefresh = false
            this.bindingClick = false
            this.$parent.$emit('success', this)
            this.success = true
          }
        }, 400)

      }

      if (this.num < this.checkNum) {
        this.num = this.createPoint(this.getMousePos(this.$refs.canvas, e))
      }

    },
    //绘制合成的图片
    drawImg: function (obj, img) {
      //准备canvas环境
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')

      // 绘制图片
      ctx.drawImage(img, 0, 0, parseInt(this.setSize.imgWidth), parseInt(this.setSize.imgHeight))

      // 绘制水印
      const fontSizeArr = ['italic small-caps bold 20px microsoft yahei', 'small-caps normal 25px arial', '34px microsoft yahei']
      const fontStr = '天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光果珍李柰菜重芥姜海咸河淡鳞潜羽翔龙师火帝鸟官人皇始制文字乃服衣裳推位让国有虞陶唐吊民伐罪周发殷汤坐朝问道垂拱平章爱育黎首臣伏戎羌遐迩体率宾归王'	//不重复的汉字

      const fontChars = []

      const avg = Math.floor(parseInt(this.setSize.imgWidth) / (parseInt(this.defaultNum) + 1))
      let tmp_index = ''
      const color2Num = Math.floor(Math.random() * 5)

      for (let i = 1; i <= this.defaultNum; i++) {

        fontChars[i - 1] = this.getChars(fontStr, fontChars)

        tmp_index = Math.floor(Math.random() * 3)
        ctx.font = fontSizeArr[tmp_index]
        ctx.fillStyle = _code_color2[color2Num]

        var tmp_y
        if (Math.floor(Math.random() * 2) === 1) {
          tmp_y = Math.floor(parseInt(this.setSize.imgHeight) / 2) + tmp_index * 20 + 20
        } else {
          tmp_y = Math.floor(parseInt(this.setSize.imgHeight) / 2) - tmp_index * 20
        }

        ctx.fillText(fontChars[i - 1], avg * i, tmp_y)
        this.fontPos[i - 1] = {
          'char': fontChars[i - 1],
          'x': avg * i,
          'y': tmp_y
        }
      }

      for (let i = 0; i < (this.defaultNum - this.checkNum); i++) {
        this.shuffle(this.fontPos).pop()
      }

      let msgStr = ''
      for (let i = 0; i < this.fontPos.length; i++) {
        msgStr += this.fontPos[i].char + ','
      }

      this.text = '请在下图<span style="#1c75e4">依次</span>点击【' + msgStr.substring(0, msgStr.length - 1) + '】'

      return this.fontPos
    },
    //获取坐标
    getMousePos: function (obj, e) {
      const x = e.offsetX - 5
      const y = e.offsetY - 5

      return {
        x,
        y
      }
    },
    //递归去重
    getChars: function (fontStr, fontChars) {
      let tmp_rand = parseInt(Math.floor(Math.random() * fontStr.length))
      if (tmp_rand > 0) {
        tmp_rand = tmp_rand - 1
      }

      const tmp_char = fontStr.charAt(tmp_rand)
      if (fontChars.indexOf(tmp_char) === -1) {
        return tmp_char
      } else {
        return this.getChars(fontStr, fontChars)
      }
    },
    //洗牌数组
    shuffle: function (arr) {
      let m = arr.length, i
      let tmpF
      while (m) {
        i = (Math.random() * m--) >>> 0
        tmpF = arr[m]
        arr[m] = arr[i]
        arr[i] = tmpF
        //[arr[m], arr[i]] = [arr[i], arr[m]];	//低版本浏览器不支持此写法
      }
      return arr
    },
    //创建坐标点
    createPoint: function (pos) {
      this.tempPoints.push(Object.assign({}, pos))
      return ++this.num
    },
    comparePos: function (fontPos, checkPosArr) {
      let flag = true
      for (let i = 0; i < fontPos.length; i++) {
        if (!(parseInt(checkPosArr[i].x) + 40 > fontPos[i].x && parseInt(checkPosArr[i].x) - 40 < fontPos[i].x && parseInt(checkPosArr[i].y) + 40 > fontPos[i].y && parseInt(checkPosArr[i].y) - 40 < fontPos[i].y)) {
          flag = false
          break
        }
      }

      return flag
    },
    refresh: function () {
      this.tempPoints.splice(0, this.tempPoints.length)
      this.barAreaColor = '#000'
      this.barAreaBorderColor = '#ddd'
      this.bindingClick = true

      this.fontPos.splice(0, this.fontPos.length)
      this.checkPosArr.splice(0, this.checkPosArr.length)
      this.num = 1

      // this.imgRand = Math.floor(Math.random() * this.imgName.length);
      // 随机的背景图片
      const img = new Image();
      ``
      // img.src = this.imgUrl + this.imgName[this.imgRand];
      img.src = this.imgsAddress[Math.floor(Math.random() * this.imgsAddress.length)]
      // 加载完成开始绘制
      const _this = this
      img.onload = function (e) {
        _this.$nextTick(() => {
          _this.fontPos = _this.drawImg(_this.$el, this)
        })
      }

      this.text = '验证失败'
      this.showRefresh = true
    },
    //关闭验证窗口
    closeWindow () {
      //通知父组件关闭弹窗
      this.showRefresh = false
      this.$emit('close', false)
    },
    verifyPassOnConfirmClick(){
      if(this.success === true){
        this.closeWindow()
        this.$emit("success",true)
      }
    }
  },
  watch: {
    // type变化则全面刷新
    type: {
      immediate: true,
      handler () {
        this.init()
      }
    }
  },
  mounted () {
    // 禁止拖拽
    this.$el.onselectstart = function () {
      return false
    }
  },
  i18n: {
    messages: {
      'en-US': {},
      'zh-CN': {}
    }
  }
}
</script>
<style scoped>
.icon-refresh:before {
  margin: unset;
  cursor: pointer;
  width: 25px;
  height: 25px;
  position: unset;
  background-image: url("../../assets/img/refresh.png");
  background-size: contain;
}

.icon-close {

}

.icon-close:before {
  margin: unset;
  cursor: pointer;
  width: 25px;
  height: 25px;
  position: unset;
  background-image: url("../../assets/img/close.png");
  background-size: contain;
}

.icon-box {
  display: inline-block !important;
  color: black;
  margin-right: 10px;
}
</style>
