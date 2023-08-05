<template>
  <v-row justify="center">
    <v-dialog
      v-model="showDialogLocal"
      width="300px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="close"
          >
            {{ confirmBtnText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'AppCommonMessageBox',
  props: {
    title: {
      type: String,
      default: "提示"
    },
    message: {
      type: String,
      default: "我是提示！"
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    confirmBtnText: {
      type: String,
      default: "我知道了"
    }
  },
  data() {
    return {
      showDialogLocal: this.showDialog,
    };
  },
  methods: {
    close() {
      this.showDialogLocal = false;
      this.$emit('close', false);
    },
  },
  watch: {
    showDialog(newVal) {
      this.showDialogLocal = newVal;
    },
  },
}
</script>
<style scoped lang="scss">

</style>
