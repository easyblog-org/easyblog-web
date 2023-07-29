<template>
  <v-row justify="center">
    <v-dialog
      v-model="showDialogLocal"
      persistent
      max-width="650px"
      class="reporter-wrapper"
    >
      <v-card>
        <v-card-title>
          <span class="font-weight-bold reporter-title">举报反馈</span>
        </v-card-title>
        <v-card-text>
          <div>
            <small class="reporter-type">请选择投诉文章的原因</small>
            <v-row>
              <v-col cols="12">
                <v-chip
                  class="ma-2 reporter-item"
                  label
                  v-for="event in reportEvents" :key="event.key"
                  @click="handleReportItemClick(event.name)"
                >
                  {{ event.name }}
                </v-chip>
              </v-col>
            </v-row>
          </div>
          <div>
            <small class="reporter-desc">补充说明</small>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  filled
                  color="#f2f3f5"
                  background-color="#f2f3f5"
                  name="input-7-4"
                  placeholder="请输入举报相关的补充说明"
                  :value="reportDesc"
                  counter="300"
                ></v-textarea>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions class="reporter-actions">
          <v-spacer></v-spacer>
          <v-btn
            class="reporter-action-cancel"
            text
            outlined
            @click="cancel"
          >
            取消
          </v-btn>
          <v-btn
            class="reporter-action-commit"
            text
            outlined
          >
            确定举报
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'app-common-reporter',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    commitReportEnable: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      showDialogLocal: this.showDialog,
      reportEvents: [
        {
          key: "E0001",
          name: "低俗色情"
        },
        {
          key: "E0002",
          name: "内容抄袭"
        },
        {
          key: "E0003",
          name: "涉嫌违法"
        },
        {
          key: "E0004",
          name: "低俗色情"
        },
        {
          key: "E0005",
          name: "恶意营销"
        },
        {
          key: "E0006",
          name: "内容质量太差"
        },
        {
          key: "E0007",
          name: "侵犯名誉/隐私/著作/肖像权等"
        },
        {
          key: "E0008",
          name: "其他原因"
        }
      ],
      reportDesc: null,  //举报补充说明
      selectedReportEvents:[]
    }
  }
  ,
  methods: {
    cancel() {
      this.showDialogLocal = false
      this.$emit('close', false)
      this.reportDesc = null
    },
    handleReportItemClick(){

    }
  }
  ,
  watch: {
    showDialog(newVal) {
      this.showDialogLocal = newVal;
    }
    ,
  }
}
</script>

<style scoped lang="scss">
.reporter-title {
  font-weight: 500;
  font-size: 17px;
  line-height: 24px;
  color: #252933;
}

.reporter-wrapper {

}

.reporter-action-cancel {
  width: 88px;
  height: 36px;
  background: rgba(30, 128, 255, 0.05);
  border: 1px solid rgba(30, 128, 255, 0.3);
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #1e80ff;
}


.reporter-action-commit {
  background: #007fff;
  border-radius: 4px;
  width: 96px;
  height: 36px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}

.reporter-type,
.reporter-desc {
  float: none;
  display: inline-block;
  line-height: 22px;
  text-align: left;
  padding-right: 0;
  margin-bottom: 12px;
  font-size: 13px;
  color: #252933;
}

.reporter-type:before {
  margin-right: 4px;
  color: #ee4d38;
  font-size: 14px;
  font-family: SimSun, sans-serif;
  line-height: 1;
  content: '*';
}

.reporter-item {
  width: calc(27% - 15px);
  min-height: 46px;
  text-align: center;
  border-radius: 4px;
  background: #f2f3f5;
  justify-content: center;
  align-items: center;
  color: #252933;
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分以省略号显示 */
  white-space: normal; /* 自动换行 */
}

.reporter-item:hover{
  cursor: pointer;
  background: #eaf2ff;
  color: #1e80ff;
}

input {
  outline: none; // 使用outline属性去掉淡蓝色边框
  margin: 0 13px; //默认带有margin
  width: 100%;
  height: 60px;
  line-height: 60px !important;
  font-size: 2vw !important;
  text-align: left;
  border: 0;
  //background:rgba(235,82,134,1);
  border-radius: 0;
  // font-size:***;字体大小最好不要设置 ios上有兼容性问题
  font-family: Source Han Sans CN !important;
  font-weight: 500 !important;
  color: #1f2329 !important; //字体颜色
  caret-color: #1f2329 !important; //光标颜色
}

input::placeholder {
  line-height: 60px !important;
  font-size: 2vw !important;
  color: #bbbfc4;
  text-align: left;
}
</style>
