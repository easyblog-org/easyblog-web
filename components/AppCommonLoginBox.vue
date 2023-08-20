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
                            <v-text-field v-model="login_phone_account.phone" :counter="11" label="手机号" autofocus
                                          required
                                          @input="onPhoneInputUpdate"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="7">
                            <v-text-field v-model="login_phone_account.captcha" :counter="6" label="验证码"
                                          required></v-text-field>
                          </v-col>
                          <v-col cols="5">
                            <v-btn :color="'#3370FF'" :disabled="phone_login_captcha_btn_disable"
                                   style="color: aliceblue" width="100%"
                                   @click="onPhoneLoginGetCaptchaBtnClick" v-text="phone_login_captcha_btn_text"
                                   ref="captchaBtnRef">

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
                      <v-form ref="emailLoginFormRef" lazy-validation>
                        <v-text-field v-model="login_email_account.email" :rules="emailVerifier" label="邮箱" autofocus
                                      required></v-text-field>
                        <v-text-field
                          :rules="emailPasswordVerifier"
                          v-model="login_email_account.password"
                          :append-icon="login_email_password_show ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="login_email_password_show ? 'text' : 'password'"
                          @click:append="login_email_password_show = !login_email_password_show"
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
        <span>登录/注册即代表同意 EasyBlog <NuxtLink class="content" to="/service-protocol" tag="span">《服务协议》</NuxtLink> 和 <NuxtLink
          class="content" to="/privacy" tag="span">《用户隐私政策》</NuxtLink></span>
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
          <v-card-text>
            <div class="register-body">
              <v-form ref="emailRegisterFormRef" lazy-validation>
                <!--邮箱号-->
                <v-text-field v-model="register_email_account.email" label="邮箱" :rules="emailVerifier" autofocus
                              required></v-text-field>
                <!--邮箱注册验证码-->
                <v-row>
                  <v-col cols="7">
                    <v-text-field v-model="register_email_account.captcha" :counter="6" label="验证码"
                                  :rules="captchaCodeVerifier"
                                  required></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-btn :color="'#3370FF'" :disabled="email_register_captcha_btn_disable"
                           style="color: aliceblue" width="100%"
                           @click="onEmailRegisterGetCaptchaBtnClick" v-text="email_register_captcha_btn_text"
                           ref="emailRegisterCaptchaBtnRef">

                    </v-btn>
                  </v-col>
                </v-row>
                <!--密码-->
                <v-text-field
                  v-model="register_email_account.password"
                  :append-icon="email_register_password_show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="email_register_password_show ? 'text' : 'password'"
                  @click:append="email_register_password_show = !email_register_password_show"
                  label="密码"
                  :rules="emailPasswordVerifier"
                  required>
                </v-text-field>
                <!--注册按钮-->
                <v-btn :color="'#3370FF'" style="color: aliceblue;" width="100%"
                       @click="submitEmailRegister">
                  注册
                </v-btn>
              </v-form>

              <div class="email-go-login-box">
                <span>已有账号？<a @click="handleLoginDialogOpen" class="content">返回登录</a></span>
              </div>
            </div>

            <!--隐私协议-->
            <div class="privacy_box" style="margin-top: 60px">
              <span>登录/注册即代表同意 EasyBlog<NuxtLink class="content" to="/service-protocol" tag="span">《服务协议》</NuxtLink> 和 <NuxtLink
                class="content" to="/privacy" tag="span">用户隐私政策》</NuxtLink>
              </span>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>

    <app-common-message-box :showDialog="message.isShow"
                            :message="message.context"
                            @close="handleMessageDialogClose"></app-common-message-box>
  </v-row>
</template>

<script>
import PointsVerifier from '@/components/verify/PointsVerifier'
import AppThirdPartyLoginBox from '@/components/AppThirdPartyLoginBox'
import isSuccess from "@/static/util";
import {LOCAL_STORAGE_KEY, SESSION_STORAGE_KEY, SYSTEM_CONSTANTS} from "@/static/global";
import {logged, login, logout, register, sendCaptchaCode} from "@/api/user";
import {decrypt, encrypt} from "static/crypto";
import {getIpInfo} from "@/api/mxnzp";
import {getIpLocation} from "@/api/openapi";

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
      login_email_password_show: false,
      //发送短信验证码验证图案通过
      login_dialog_verifier_show: false,
      //邮箱账号登录
      login_email_account: {
        email: '',
        password: ''
      },
      // 验证码获取按钮是否可以点击
      phone_login_captcha_btn_disable: false,
      // 验证码按钮文本
      phone_login_captcha_btn_text: "获取验证码",
      // 验证码倒计时
      phone_login_captcha_total_time: SYSTEM_CONSTANTS.COUNTDOWN_BTN_DEFAULT_TIME,
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
      login_phone_account: {
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
      emailVerifier: [
        v => !!v || '邮箱号不能为空',
        v => {
          const pattern = /.+@.+\..+/
          return pattern.test(v) || '请输入正确的邮箱号'
        }
      ],
      captchaCodeVerifier: [
        v => !!v || '验证码不能为空',
        v => {
          const pattern = /^[a-zA-Z0-9]{6}$/
          return pattern.test(v) || '请输入正确的验证码'
        }
      ],
      emailPasswordVerifier: [
        v => !!v || '密码不能为空'
      ],
      email_register_password_show: false,
      register_dialog_verifier_show: false,
      //邮箱账号登录
      register_email_account: {
        email: '',
        password: '',
        captcha: ''
      },
      // 验证码获取按钮是否可以点击
      email_register_captcha_btn_disable: false,
      // 验证码按钮文本
      email_register_captcha_btn_text: "获取验证码",
      // 验证码倒计时
      email_register_captcha_total_time: SYSTEM_CONSTANTS.COUNTDOWN_BTN_DEFAULT_TIME,
      message: {
        isShow: false,
        context: '',
      },
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
    onPhoneLoginGetCaptchaBtnClick() {
      //this.login_dialog_verifier_show = true
      this.handlePhoneLoginCaptcha()
    },
    //获取邮箱验证码
    onEmailRegisterGetCaptchaBtnClick() {
      this.handleEmailRegisterCaptcha()
    },
    handleMessageDialogClose(val) {
      this.message.isShow = val
    },
    //文字验证成功==>发送验证码
    handlePhoneLoginCaptcha(data) {
      if (!data) return
      this.phone_login_captcha_btn_disable = true
      if (isSuccess("ok")) {
        this.phone_login_captcha_btn_text = this.phone_login_captcha_total_time + 's后重新发送'
        const clock = window.setInterval(() => {
          this.phone_login_captcha_total_time--
          this.phone_login_captcha_btn_text = this.phone_login_captcha_total_time + 's后重新发送'
          this.$refs.captchaBtnRef.innerText = this.phone_login_captcha_btn_text
          if (this.phone_login_captcha_total_time < 0) {
            window.clearInterval(clock)
            this.phone_login_captcha_total_time = SYSTEM_CONSTANTS.COUNTDOWN_BTN_DEFAULT_TIME
            this.phone_login_captcha_btn_text = '重新发送验证码'
            this.$refs.captchaBtnRef.innerText = "重新发送验证码"
            this.phone_login_captcha_btn_disable = false
          }
        }, 1000)
      }
    },
    //文字验证成功==>发送验证码
    handleEmailRegisterCaptcha() {
      if (!this.register_email_account.email || this.email_register_captcha_btn_disable) {
        return;
      }

      this.email_register_captcha_btn_disable = true
      //请求接口发送验证码
      sendCaptchaCode({
        "captcha_code_type": "register",
        "identifier_type": 1,
        "identifier": this.register_email_account.email
      }).then((resp) => {
        this.message.context = '验证码发送成功！'
        this.message.isShow = true

        this.email_register_captcha_btn_text = this.email_register_captcha_total_time + 's后重新发送'
        const clock = window.setInterval(() => {
          this.email_register_captcha_total_time--
          this.email_register_captcha_btn_text = this.email_register_captcha_total_time + 's后重新发送'
          if (this.email_register_captcha_total_time < 0) {
            window.clearInterval(clock)
            this.email_register_captcha_total_time = SYSTEM_CONSTANTS.COUNTDOWN_BTN_DEFAULT_TIME
            this.email_register_captcha_btn_text = '重新发送验证码'
            this.email_register_captcha_btn_disable = false
          }
        }, 1000)
      }).catch((resp) => {
        this.message.context = resp.message
        this.message.isShow = true
      })
    },
    //手机登录
    phoneLogin() {

    },
    logout() {
      logout({
        "token": decrypt(localStorage.getItem(LOCAL_STORAGE_KEY.LOGIN_TOKEN))
      }).then((resp) => {
        this.clearLoginState()
      }).catch((resp) => {
        this.message.context = '发生错误，请稍后重试！'
        this.message.isShow = true
      })
    },
    //邮箱登录
    emailLogin() {
      if (!this.$refs.emailLoginFormRef.validate()) {
        console.log("表单校验未通过....")
        return
      }
      login({
        "identifier_type": 10,
        "identifier": this.login_email_account.email,
        "credential": encrypt(this.login_email_account.password),
        ip: sessionStorage.getItem(SESSION_STORAGE_KEY.CLIENT_IP_ADDRESS),
        location: sessionStorage.getItem(SESSION_STORAGE_KEY.CLIENT_IP_ADDRESS_LOCATION),
        device: this.$ua.deviceType(),
        operation_system: this.$ua.os() + " " + this.$ua.osVersion()
      }).then((resp) => {
        this.saveLoginState(resp)
        this.handleLoginDialogClose()
      }).catch((resp) => {
        this.message.context = '发生错误，请稍后重试！'
        this.message.isShow = true
      })
    },
    /**
     * 保存登录状态
     * @param resp
     */
    saveLoginState(resp) {
      localStorage.setItem(LOCAL_STORAGE_KEY.LOGIN_USER, JSON.stringify(resp.data.user))
      localStorage.setItem(LOCAL_STORAGE_KEY.LOGIN_TOKEN, encrypt(resp.data.token))
      this.setCheckLoginStateInterval(resp.data.token)
      this.$emit('refresh', true)
    },
    /**
     * 清除登录状态
     */
    clearLoginState() {
      localStorage.removeItem(LOCAL_STORAGE_KEY.LOGIN_USER)
      localStorage.removeItem(LOCAL_STORAGE_KEY.LOGIN_TOKEN)
      this.$emit('refresh', false)
    },
    /**
     * 定时检查登录状态
     * @param token
     */
    setCheckLoginStateInterval(token) {
      if (!token) {
        return
      }

      const clock = window.setInterval(() => {
        logged(token).then((resp) => {
          if (!resp.data) {
            window.clearInterval(clock)
            localStorage.removeItem(LOCAL_STORAGE_KEY.LOGIN_USER)
            localStorage.removeItem(LOCAL_STORAGE_KEY.LOGIN_TOKEN)
            this.$emit('refresh', false)
          }
        })
      }, 1000)
    },
    //关闭文字验证框
    closePointVerifyWindow(state) {
      this.login_dialog_verifier_show = false
    },
    //关闭文字验证框
    closeEmailRegisterPointVerifyWindow(state) {
      this.email_register_dialog_verifier_show = false
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
    },
    submitEmailRegister() {
      if (this.$refs.emailRegisterFormRef.validate()) {
        register({
          "identifier_type": 10,
          "identifier": this.register_email_account.email,
          "credential": encrypt(this.register_email_account.password),
          "credential_again": this.register_email_account.captcha
        }).then((resp) => {
          this.message.context = '注册成功！'
          this.message.isShow = true
          this.register_dialog_verifier_show = false
          this.$refs.emailRegisterFormRef.reset()
          this.handleLoginDialogClose()
        }).catch((resp) => {
          this.message.context = resp.data.code
          this.message.isShow = true
        })
      }
    },
    loadClientIpInfo() {
      const isInitialized = sessionStorage.getItem(SESSION_STORAGE_KEY.CLIENT_IP_INFO_INITIALIZED);
      if (!isInitialized) {
        getIpInfo().then((resp) => {
          if (undefined === resp || null === resp) {
            return
          }

          const clientIp = resp.data.ip || "127.0.0.1"
          sessionStorage.setItem(SESSION_STORAGE_KEY.CLIENT_IP_ADDRESS, clientIp)

          getIpLocation(clientIp).then((resp) => {
            if (undefined === resp || null === resp) {
              sessionStorage.setItem(SESSION_STORAGE_KEY.CLIENT_IP_ADDRESS_LOCATION, '未知')
              return
            }

            const location = resp.result.Country + ' ' + resp.result.Province + ' ' + resp.result.City
            sessionStorage.setItem(SESSION_STORAGE_KEY.CLIENT_IP_ADDRESS_LOCATION, location)
            sessionStorage.setItem(SESSION_STORAGE_KEY.CLIENT_IP_INFO_INITIALIZED, 'true')
          })
        })
      }
    }
  },
  watch: {
    showDialog(newVal) {
      this.showDialogLocal = newVal;
    },
  },
  mounted() {
    this.loadClientIpInfo()
  }
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
