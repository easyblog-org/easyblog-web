<template>
  <v-row justify="center">
    <v-dialog v-model="showDialogLocal" persistent content-class="elevation-0">
      <div v-show="showLoginContainer" class="login-container">
        <v-card class="mx-auto my-12 rounded-lg login-card">
          <v-card-actions>
            <v-card-title class="login-title"><h2>欢迎使用EasyBlog</h2></v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="handleLoginDialogClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <div class="login-body">
              <v-tabs class="login-tab-title" v-model="login_tab"
                      background-color="transparent"
                      color="basil"
                      @change="onLoginTabsChange"
                      grow>
                <v-tab>
                  手机号
                </v-tab>
                <v-tab>
                  邮箱
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="login_tab">
                <!--手机号登录-->
                <v-tab-item>
                  <v-card color="basil" flat>
                    <v-card-text>
                      <v-form ref="phoneFormRef" v-model="phone_valid" lazy-validation>
                        <v-row>
                          <v-col cols="4">
                            <v-select
                              v-model="selected_location"
                              return-object
                              :item-text="item=>`${item.code}  ${item.name}`"
                              :item-value="item=>`${item.code}`"
                              :items="locations"
                              @change="onLocationSelection"
                              menu-props="auto"
                              label="Select"
                              hide-details
                              single-line
                            ></v-select>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field v-model="phone_account.phone" :counter="11" label="手机号" autofocus required
                                          @input="onPhoneInputUpdate"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="7">
                            <v-text-field v-model="phone_account.captcha" :counter="6" label="验证码"
                                          required></v-text-field>
                          </v-col>
                          <v-col cols="5">
                            <v-btn :color="'#3370FF'" :disabled="captcha_btn_disable"
                                   style="color: aliceblue" width="100%"
                                   @click="onGetCaptchaBtnClick" v-text="captcha_btn_text" ref="captchaBtnRef">

                            </v-btn>
                          </v-col>
                        </v-row>

                        <!--登录按钮-->
                        <v-btn :color="'#3370FF'" style="color: aliceblue;margin-top: 20px" width="100%"
                               @click="phoneLogin">
                          注册/登录
                        </v-btn>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <!--邮箱登录-->
                <v-tab-item>
                  <v-card color="basil" flat>
                    <v-card-text>
                      <v-form ref="emailFormRef" lazy-validation>
                        <v-text-field v-model="email_account.email" label="邮箱" autofocus required></v-text-field>
                        <v-text-field
                          v-model="email_account.password"
                          :append-icon="email_password_show ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="email_password_show ? 'text' : 'password'"
                          @click:append="email_password_show = !email_password_show"
                          label="密码"
                          required
                        ></v-text-field>
                        <v-btn :color="'#3370FF'" style="color: aliceblue;" width="100%"
                               @click="emailLogin">
                          登录
                        </v-btn>
                        <div class="email-forget-password-box">
                    <span><NuxtLink tag="span" style="color: #1976d2;text-underline: none;cursor: pointer"
                                    to="/forget-password" class="content">忘记密码</NuxtLink></span>
                        </div>
                        <div class="email-go-register-box">
                          <span>没有账号？<a @click="handleRegisterDialogOpen" class="content">立即注册</a></span>
                        </div>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </div>

            <!--第三方登录框-->
            <app-third-party-login-box></app-third-party-login-box>

            <!--隐私协议-->
            <div class="privacy_box">
        <span>登录注册即代表同意 EasyBlog <NuxtLink class="content" to="/service-protocol" tag="span"
                                           style="color: #1976d2;text-underline: none;cursor: pointer">《服务协议》</NuxtLink> 和 <NuxtLink
          class="content" to="/privacy" tag="span"
          style="color: #1976d2;text-underline: none;cursor: pointer">《用户隐私政策》</NuxtLink></span>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <div v-show="!showLoginContainer" class="register-container">
        <v-card class="mx-auto my-12 rounded-lg register-card">
          <v-card-actions>
            <v-card-title class="register-title"><h2>邮箱注册</h2></v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="handleLoginDialogClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
          <div class="register-body">
            <v-card color="basil" flat>
              <v-card-text>
                <v-form ref="emailFormRef" lazy-validation>
                  <!--邮箱号-->
                  <v-text-field v-model="email_account.email" label="邮箱" autofocus required></v-text-field>
                  <!--密码-->
                  <v-text-field
                    v-model="email_account.password"
                    :append-icon="email_password_show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="email_password_show ? 'text' : 'password'"
                    @click:append="email_password_show = !email_password_show"
                    label="密码"
                    required>
                  </v-text-field>
                  <!--注册按钮-->
                  <v-btn :color="'#3370FF'" style="color: aliceblue;" width="100%"
                         @click="dialog_verifier_show = !dialog_verifier_show">
                    注册
                  </v-btn>
                  <div class="email-go-login-box">
                    <span>已有账号？<a @click="handleLoginDialogOpen" class="content">返回登录</a></span>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </div>
          <!--第三方登录框-->
          <app-third-party-login-box></app-third-party-login-box>
          <!--隐私协议-->
          <div class="privacy_box">
        <span>登录注册即代表同意EasyBlog <NuxtLink class="content" to="/service-protocol">《服务协议》</NuxtLink> 和
          <NuxtLink class="content" to="/privacy">《用户隐私政策》</NuxtLink></span>
          </div>
        </v-card>
      </div>
    </v-dialog>

    <!--弹出文字验证框-->
    <v-overlay
      :z-index="1000"
      :value="dialog_verifier_show"
    >
      <points-verifier mode="fixed"
                       :default-num="4"
                       :check-num="4"
                       @close="closePointVerifyWindow"
                       @success="pointVerifySuccess"
      ></points-verifier>
    </v-overlay>
  </v-row>
</template>

<script>
import PointsVerifier from '@/components/verify/PointsVerifier'
import AppThirdPartyLoginBox from '@/components/AppThirdPartyLoginBox'
import isSuccess from "@/static/util";
import {SYSTEM_CONSTANTS} from "@/static/global";

const cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'AppCommonLoginBox',
  components: {
    PointsVerifier,
    AppThirdPartyLoginBox
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      showDialogLocal: this.showDialog,
      showLoginContainer: true,
      //登录Tab
      login_tab: null,
      //邮箱登录密码隐藏与显示控制
      email_password_show: false,
      //发送短信验证码验证图案通过
      dialog_verifier_show: false,
      // 验证码获取按钮是否可以点击
      captcha_btn_disable: false,
      // 验证码按钮文本
      captcha_btn_text: "获取验证码",
      // 验证码倒计时
      captcha_total_time: SYSTEM_CONSTANTS.COUNTDOWN_BTN_DEFAULT_TIME,
      selected_location: {
        code: '+86',
        name: '中国'
      },
      locations: [
        {
          code: '+86',
          name: '中国'
        },
        {
          name: '中国香港',
          code: '+825',
        },
        {
          name: '中国台湾',
          code: '+886',
        },
        {
          name: '中国澳门',
          code: '+853',
        },
      ],
      //手机验证码登录
      phone_account: {
        //
        phone: '',
        captcha: ''
      },
      //表单是否通过检验
      phone_valid: false,
      //手机号验证器
      phoneVerifier: [
        v => !!v || '手机号不能为空',
        v => {
          const pattern = /^1([3|5|6|7|8|9])\d{9}$/
          return pattern.test(v) || '请输入正确的手机号'
        }
      ],
      //邮箱账号登录
      email_account: {
        email: '',
        password: ''
      },
      emailVerifier: [
        v => !!v || '邮箱号不能为空',
        v => {
          const pattern = /.+@.+\..+/
          return pattern.test(v) || '请输入正确的邮箱号'
        }
      ]
    }
  },
  methods: {
    //区号下拉框数据变更
    onLocationSelection(any) {
      console.log(any)
      console.log(this.selected_location)
    },
    //手机号输入框发生变更
    onPhoneInputUpdate(any) {
      console.log(any)
      this.$refs.phoneFormRef.validate(valid => {
        if (!valid) {
          console.log('校验不通过')
        }
        console.log('校验通过')
      })
    },
    onLoginTabsChange() {
      //将弹窗验证强制隐藏

    },
    //获取验证码
    onGetCaptchaBtnClick() {
      this.dialog_verifier_show = true
    },
    //文字验证成功==>发送验证码
    pointVerifySuccess(data) {
      if (!data) return
      this.captcha_btn_disable = true
      //TODO 请求后端获取验证码
      if (isSuccess("ok")) {
        this.captcha_btn_text = this.captcha_total_time + 's后重新发送'
        const clock = window.setInterval(() => {
          this.captcha_total_time--
          this.captcha_btn_text = this.captcha_total_time + 's后重新发送'
          this.$refs.captchaBtnRef.innerText = this.captcha_btn_text
          if (this.captcha_total_time < 0) {
            window.clearInterval(clock)
            this.captcha_total_time = SYSTEM_CONSTANTS.COUNTDOWN_BTN_DEFAULT_TIME
            this.captcha_btn_text = '重新发送验证码'
            this.$refs.captchaBtnRef.innerText = "重新发送验证码"
            this.captcha_btn_disable = false
          }
        }, 1000)
      }
    },
    //手机登录
    phoneLogin() {

    },
    //邮箱登录
    emailLogin() {
      setTimeout(() => { // 定时器模拟api请求
        const user = {
          code: 'LSzeyP',
          username: 'Tom',
          token: '86974888'
        }

        this.$store.commit('setUser', user)
      })
    },
    //关闭文字验证框
    closePointVerifyWindow(state) {
      this.dialog_verifier_show = state
    },
    handleLoginDialogClose() {
      this.showDialogLocal = false
      this.$emit('close', false)
      this.showLoginContainer = true
    },
    handleRegisterDialogOpen() {
      this.showLoginContainer = false
    },
    handleLoginDialogOpen() {
      this.showLoginContainer = true
    }
  },
  watch: {
    showDialog(newVal) {
      this.showDialogLocal = newVal;
    },
  },
}
</script>

<style scoped>
.v-input__slot label {
  font-size: 14px !important;
}

.login-btn-active {
  background: #3370FF;
}

.v-dialog__container {
  box-shadow: none;
}

</style>
