<template>
  <div class="login-container">
    <v-card class="mx-auto my-12 rounded-lg login-card" max-width="444" height="80%" min-height="500">
      <v-card-title class="login-title"><h2>欢迎使用EasyBlog</h2></v-card-title>
      <div class="login-body">
        <v-tabs class="login-tab-title" v-model="login_tab"
                background-color="transparent"
                color="basil"
                grow>
          <v-tab>
            手机号
          </v-tab>
          <v-tab>
            邮箱
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="login_tab">
          <v-tab-item>
            <!--手机号登录-->
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
                                    :rules="phoneVerifier"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="7">
                      <v-text-field v-model="phone_account.captcha" :counter="6" label="验证码" required></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-btn :color="'#3370FF'" style="color: aliceblue" width="100%">
                        获取验证码
                      </v-btn>
                    </v-col>
                  </v-row>


                  <!--登录按钮-->
                  <v-btn :color="'#3370FF'" style="color: aliceblue;margin-top: 15px" width="100%">
                    登录
                  </v-btn>

                  <!--隐私协议-->
                  <div class="login-privacy-box">
                    <v-checkbox
                      dense
                      class="login-check-box"
                      :rules="[v => !!v || '请先阅读并同意 服务协议 和 隐私政策!']"
                      label="我已阅读并同意 服务协议 和 用户隐私政策"
                      required
                    ></v-checkbox>
                  </div>

                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!--邮箱登录-->
          <v-tab-item>
            <v-card color="basil" flat>
              <v-card-text>
                <v-form ref="emailFormRef" lazy-validation>
                  <v-text-field v-model="email_account.email" label="邮箱" autofocus required
                                :rules="emailVerifier"
                  ></v-text-field>

                  <v-text-field
                    v-model="email_account.password"
                    label="密码"

                    required
                  ></v-text-field>

                  <v-btn :color="'#3370FF'" style="color: aliceblue;" width="100%">
                    登录
                  </v-btn>

                  <!--隐私协议-->
                  <div class="login-privacy-box">
                    <v-checkbox
                      dense
                      class="login-check-box"
                      :rules="[v => !!v || '请先阅读并同意 服务协议 和 隐私政策!']"
                      label="我已阅读并同意 服务协议 和 用户隐私政策"
                      required
                    ></v-checkbox>
                  </div>

                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>

      <v-divider class="mx-4">更多登录方式</v-divider>

      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
          @click="login"
        >
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data: () => ({
    login_tab: null,
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
  }),
  methods: {
    //用户登录
    login: () => {

    },
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
    }
  }
}
</script>

<style scoped>
.login-title {
  padding: 30px 30px !important;
}

.login-container {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
  font: 600 16px/18px 'Open Sans', sans-serif;
  background: #f4f5f5 no-repeat center;
  background-size: cover;
}

.login-body {
  margin: 0 15px
}

.login-tab-title {
  padding: 0 16px;
}

.v-label {
  font-size: 14px !important;
}

.login-btn-active {
  background: #3370FF;
}

.login-card {
  max-width: 444px !important;
}

.login-privacy-box {
  margin-top: 10px;
}
</style>
