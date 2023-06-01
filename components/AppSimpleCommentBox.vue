<template>
  <div class="comment-box">
    <v-card style="padding-bottom: 20px">
      <v-card-title class="title">
        评论
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="1" style="display: inline-block">
            <v-avatar size="43" class="mr-2">
              <img :src="avatar" alt="User Avatar">
            </v-avatar>
          </v-col>
          <v-col cols="11" style="display: inline-block">
            <v-textarea
              @focus="switchShowSubmitBtn"
              @blur="switchShowSubmitBtn"
              outlined
              auto-grow
              dense
              :rows="3"
              :light="true"
              label="请友善评论"
              v-model="myComment"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <transition name="fade">
        <v-card-actions v-show="showSubmitComment" class="mt-2">
          <v-btn color="primary" @click="submitComment">发表评论</v-btn>
        </v-card-actions>
      </transition>

      <div v-if="comments.length!==0">
        <v-card-subtitle class="subtitle">
          全部评论 {{ comments.length }}
        </v-card-subtitle>

        <v-card-text v-for="(comment, index) in comments" :key="comment.code">
          <v-avatar size="40" class="mr-2">
            <img :src="comment.user.avatar" alt="User Avatar">
          </v-avatar>
          <span>{{ comment.user.name }}</span>
          <p>{{ comment.text }}</p>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'AppSimpleCommentBox',
  props: {
    avatar: {
      type: String,
      required: false,
      default: 'https://p3-passport.byteimg.com/img/user-avatar/240af8d420db0bb748224fab461ee36a~100x100.awebp',
    },
    articleId: {
      type: String,
      required: true,
      default: 0,
    },
  },
  data: () => ({
    myComment: '',
    comments: [],
    showSubmitComment: false
  }),
  methods: {
    submitComment() {
      if (this.comment.trim() !== '') {
        this.comments.push({
          user: this.user,
          text: this.comment
        });
        this.comment = '';
      }
    },
    switchShowSubmitBtn() {
      this.showSubmitComment = !this.showSubmitComment
    },
    loadComments(){
      console.log("query comments of article ",this.articleId)
      this.comments=[
        {
          user:{
            avatar: 'https://p3-passport.byteimg.com/img/user-avatar/5c89bb3e88a85819c8b3ed91097b9d34~100x100.awebp',
            name: '新年快乐d'
          },
          text:'vue从始至终就没自己的创新，为什么 solidjs 没出来就想不到可以这样做，永远是借鉴'
        },
        {
          user:{
            avatar: 'https://p3-passport.byteimg.com/img/user-avatar/cce305933a408d2bdad99d5ce4707154~100x100.awebp',
            name: 'CV怪'
          },
          text:'这就不得不提某个懂哥的前端拖垮全球经济论了'
        }
      ]
    }
  },
  beforeMount() {
    this.loadComments()
  }
}
</script>

<style scoped lang="scss">

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease; /* 设置过渡属性和持续时间 */
}

.fade-enter,
.fade-leave-to {
  opacity: 0; /* 设置初始状态和结束状态的透明度 */
  transform: translateX(-100px);
}

.comment-box {
  margin-top: 30px;
  padding-bottom: 30px;

  .v-image {
    border-radius: 30px;
  }

  .v-card__text {
    padding: 0 20px 0 20px;
  }

  .v-textarea{
    height: 72px !important;
  }

  .v-card__actions {
    justify-items: right;
    justify-content: right;
    margin-right: 10px;
  }

  .title {
    font-size: 18px;
    line-height: 30px;
    font-weight: 600;
    color: #252933;
  }

  .subtitle {
    line-height: 30px;
    font-weight: 600;
    font-size: 18px;
    color: #252933;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
  }

  .author-img {
    padding: 5px 0 5px 5px;
  }
}
</style>
