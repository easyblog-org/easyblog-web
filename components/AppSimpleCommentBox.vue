<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title class="text-h5">
          评论
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-textarea placeholder="请友善评论"
                        :counter="300"
                        :auto-grow="true"
                        :outlined="false">
            </v-textarea>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AppSimpleCommentBox',
  data: () => ({}),
  methods: {}
}
</script>

<style scoped lang="scss">

</style>
