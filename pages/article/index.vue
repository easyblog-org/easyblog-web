<template>
  <v-app>
    <!--顶部标题栏-->
    <app-common-bar></app-common-bar>

    <v-main class="article-container">
      <v-container>
        <v-row>
          <v-col cols="1">
            <v-card>
              左侧栏
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card elevation="0">
              <!--文章详情主体-->
              <app-common-article-content
                :height="editorHeight"
                :value="content"
                :is-hide-tools="true"
                :publishTime="1683889351000"
                :pageViews="100308"
                :authorName="'我是小胖'"
                mode="ir"></app-common-article-content>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              右侧栏
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppCommonBar from "~/components/AppCommonBar";
import AppCommonArticleContent from "~/components/AppCommonArticleContent";
import {getClientHeight} from "static/util";

export default {
  name: "ArticleDetailsView",
  components: {
    AppCommonArticleContent,
    AppCommonBar
  },
  data: () => ({
    editorHeight: '300px',
    content: ''
  }),
  beforeMount() {
    this.editorHeight = getClientHeight() + 'px'
    console.log(this.editorHeight)
  }
};


</script>
<style scoped lang="scss">
.article-container {
  padding: 0 !important;
  margin-top: 1.767rem !important;
}
</style>
