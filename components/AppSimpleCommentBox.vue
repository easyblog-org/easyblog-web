<template>
  <div class="comment-box">
    <v-card>
      <v-card-title class="title">
        评论
      </v-card-title>

      <v-card-text>
        <v-avatar size="40" class="mr-2">
          <img :src="avatar" alt="User Avatar">
        </v-avatar>
        <v-text-field v-model="myComment" label="发表评论"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="submitComment">发表</v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
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
    comments: []
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
    }
  }
}
</script>

<style scoped lang="scss">
.comment-box {
  margin-top: 20px;

  .v-image {
    border-radius: 30px;
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
