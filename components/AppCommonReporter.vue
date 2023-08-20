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
                  v-for="(event, index) in reportEvents"
                  :key="event.key"
                  :class="{ 'reporter-item-selected': selectedReportEvents.includes(event) }"
                  @click="handleReportItemClick(event)"
                >
                  {{ event.value }}
                </v-chip>
              </v-col>
            </v-row>
          </div>
          <div>
            <small class="reporter-desc">补充说明</small>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  color="#f2f3f5"
                  background-color="#f2f3f5"
                  placeholder="请输入举报相关的补充说明"
                  v-model="reportDesc"
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
            @click="close"
          >
            取消
          </v-btn>
          <v-btn
            class="reporter-action-commit"
            text
            outlined
            @click="summit"
          >
            确定举报
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <app-common-message-box :showDialog="showWarningMessageEnable"
                            :message="showWarningMessageText"
                            @close="handleMessageDialogClose"></app-common-message-box>
  </v-row>
</template>

<script>
import {updateStatistics} from "@/api/article";
import {queryArticleReportEvent} from "@/api/static";
import {LOCAL_STORAGE_KEY} from "static/global";

export default {
  name: 'app-common-reporter',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialogLocal: this.showDialog,
      reportEvents: [],
      reportDesc: null,  //举报补充说明
      selectedReportEvents: [],
      showWarningMessageEnable: false,
      showWarningMessageText: null
    };
  },
  methods: {
    close() {
      this.showDialogLocal = false;
      this.$emit('close', false);
      this.reportDesc = null;
      this.selectedReportEvents = []
    },
    handleReportItemClick(e) {
      const containsReason = this.selectedReportEvents.some(
        item => item.key === e.key
      );

      if (!containsReason) {
        this.selectedReportEvents.push(e);
      } else {
        this.selectedReportEvents = this.selectedReportEvents.filter(item => item.key !== e.key);
      }
    },
    handleMessageDialogClose(newVal) {
      this.showWarningMessageEnable = newVal
      this.showWarningMessageText = null
    },
    // 提交举报信息
    summit() {
      if (this.selectedReportEvents === null || this.selectedReportEvents.length === 0) {
        this.showWarningMessageEnable = true
        this.showWarningMessageText = '请选择投诉文章的原因!'
        return;
      }

      const containsOtherReason = this.selectedReportEvents.some(
        item => item.value === '其他原因'
      );

      if (containsOtherReason && !this.reportDesc) {
        this.showWarningMessageEnable = true
        this.showWarningMessageText = '请填写具体举报原因!'
        return;
      }

      this.handleArticleEvent(this.$route.params.index, 'report')
    },
    handleArticleEvent(code, event) {
      if (!code || !event) return

      const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.LOGIN_USER));
      const operator = userInfo ? userInfo.code : null;
      updateStatistics({
        'code': code,
        'statistic_index_name': event,
        'increment': 1,
        'operator': operator,
        'remark': JSON.stringify({
          'report_reason': JSON.stringify(this.selectedReportEvents),
          'report_desc': this.reportDesc
        })
      }).then(() => {
        this.showWarningMessageEnable = true
        this.showWarningMessageText = '投诉成功，请耐心等待处理结果！'
        this.close()
      })
    },
  },
  watch: {
    showDialog(newVal) {
      this.showDialogLocal = newVal;
    },
  },
  mounted() {
    queryArticleReportEvent().then(resp => {
      this.reportEvents = resp.data
    })
  }
};
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

.reporter-item-selected {
  background: #eaf2ff !important;
  color: #1e80ff;
}

.reporter-item:hover {
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
