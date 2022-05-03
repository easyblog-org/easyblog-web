<template>
  <div class="login-container">
    <v-card class="mx-auto my-12 rounded-lg login-card" max-width="444"
            height="575" min-height="500">
      <v-card-title class="login-title"><h2>欢迎使用EasyBlog</h2></v-card-title>
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
                      <v-text-field v-model="phone_account.captcha" :counter="6" label="验证码" required></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-btn :color="'#3370FF'" style="color: aliceblue" width="100%"
                             @click="onGetCaptchaBtnClick">
                        获取验证码
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
                  <div class="email-go-register-box">
                    <span>没有账号？<router-link to="/register" class="content">立即注册</router-link></span>
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
        <span>登录注册即代表同意EasyBlog <router-link class="content" to="/service">《服务协议》</router-link> 和 <router-link
          class="content" to="/privacy">《用户隐私政策》</router-link></span>
      </div>
    </v-card>

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
  </div>
</template>

<script>
import PointsVerifier from '@/components/verify/PointsVerifier'
import AppThirdPartyLoginBox from '@/components/AppThirdPartyLoginBox'

export default {
  name: 'LoginView',
  components: {
    PointsVerifier,
    AppThirdPartyLoginBox
  },
  data: () => ({
      login_tab: null,
      email_password_show: false,
      dialog_verifier_show: false,
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
  ),
  methods: {
    //区号下拉框数据变更
    onLocationSelection (any) {
      console.log(any)
      console.log(this.selected_location)
    },
    //手机号输入框发生变更
    onPhoneInputUpdate (any) {
      console.log(any)
      this.$refs.phoneFormRef.validate(valid => {
        if (!valid) {
          console.log('校验不通过')
        }
        console.log('校验通过')
      })
    },
    onLoginTabsChange () {
      //将弹窗验证强制隐藏

    },
    //获取验证码
    onGetCaptchaBtnClick () {
      this.dialog_verifier_show = true
    },
    //文字验证
    pointVerifySuccess (data) {
      console.log("验证成功，"+data+"发起请求获取验证码")
    },
    //手机登录
    phoneLogin () {

    },
    //邮箱登录
    emailLogin () {

    },
    //关闭文字验证框
    closePointVerifyWindow (state) {
      this.dialog_verifier_show = state
    }
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

</style>
