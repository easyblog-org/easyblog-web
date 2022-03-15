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
                  <v-btn :color="'#3370FF'" style="color: aliceblue;margin-top: 20px" width="100%">
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
                  <v-text-field v-model="email_account.email" label="邮箱" autofocus required
                  ></v-text-field>

                  <v-text-field
                    v-model="email_account.password"
                    label="密码"

                    required
                  ></v-text-field>

                  <v-btn :color="'#3370FF'" style="color: aliceblue;" width="100%">
                    登录
                  </v-btn>

                  <div class="email-login-register-box">
                    <span>没有账号？<router-link to="/register" class="content">立即注册</router-link></span>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>

      <div class="third-party-login-box">
        <div class="third-party-wrapper">
          <div class="txt">更多登录方式</div>
        </div>
        <v-card-text>
          <v-row>
            <v-spacer></v-spacer>
            <!--QQ登录-->
            <v-tooltip bottom>
              <template v-slot:activator="{ on,attrs}">
                <v-btn
                  class="mx-4"
                  height="45"
                  width="45"
                  icon
                  drak
                  v-bind="attrs"
                  v-on="on"
                >
                  <svg t="1647268364790" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="7099" width="36" height="36">
                    <path
                      d="M512.268258 64.433103c-247.183323 0-447.569968 200.380501-447.569968 447.563825 0 247.189467 200.385621 447.570992 447.569968 447.570992s447.569968-200.380501 447.569968-447.569968c0-247.184347-200.386645-447.564849-447.569968-447.564849z m252.85872 584.692787c-18.997168 16.287968-43.668709-53.628042-47.2134-42.875198-8.642616 26.161294-12.695154 43.646184-38.148944 72.127602-1.35972 1.521494 29.43056 12.647032 38.148944 36.396051 8.346713 22.756875 24.596797 58.811973-81.725503 70.125906-62.389428 6.635801-107.471099-33.244533-111.964932-32.85648-8.325212 0.734126-4.618747 0-13.568528 0-7.321804 0-7.807126 0.534468-14.69685 0-1.899307-0.140272-22.632985 32.85648-115.364231 32.85648-71.878798 0-90.48177-45.243445-76.032701-70.125906 14.464428-24.877342 38.579999-32.122354 35.176604-36.06636-16.73643-19.39546-28.287904-40.1404-35.176604-58.882621-1.705793-4.666869-3.135137-9.209848-4.262434-13.574672-2.611931-10.008479-22.627866 58.76385-44.111028 42.875198-21.483162-15.883533-19.567472-56.309597-5.659014-95.003248 14.033372-39.006959 49.37687-76.562049 49.771065-84.854496 1.412962-30.849665-3.044011-35.975235 0-44.078263 6.780169-18.149391 15.034732-11.190043 15.034733-20.609788 0-118.64476 88.172909-214.829571 196.933079-214.829571 108.755051 0 196.928984 96.184811 196.928984 214.829571 0 4.554242 11.815637 0 17.474651 20.609788 1.165181 4.256291 1.968931 20.684531 0.58771 44.078263-0.658358 11.238165 29.954789 24.914202 45.777913 84.854496 15.845649 59.945414 0 88.215912-7.909514 95.003248z"
                      fill="#68A5E1" p-id="7100" data-spm-anchor-id="a313x.7781069.0.i0" class=""></path>
                  </svg>
                </v-btn>
              </template>
              <span>QQ</span>
            </v-tooltip>

            <!--微信登录-->
            <v-tooltip bottom>
              <template v-slot:activator="{on,attrs}">
                <v-btn
                  class="mx-4"
                  height="45"
                  width="45"
                  icon
                  drak
                  v-bind="attrs"
                  v-on="on"
                >
                  <svg t="1647268503547" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="9971" width="36" height="36">
                    <path
                      d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                      fill="#28C445" p-id="9972"></path>
                    <path
                      d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                      fill="#28C445" p-id="9973"></path>
                  </svg>
                </v-btn>
              </template>
              <span>微信</span>
            </v-tooltip>

            <!--Gitee登录-->
            <v-tooltip bottom>
              <template v-slot:activator="{on,attrs}">
                <v-btn
                  class="mx-4"
                  height="45"
                  width="45"
                  icon
                  drak
                  v-bind="attrs"
                  v-on="on"
                >
                  <svg t="1647268593218" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="10214" width="36" height="36">
                    <path
                      d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z"
                      fill="#C71D23" p-id="10215"></path>
                  </svg>
                </v-btn>
              </template>
              <span>Gitee</span>
            </v-tooltip>


            <!--Github登录-->
            <v-tooltip bottom>
              <template v-slot:activator="{on,attrs}">
                <v-btn
                  class="mx-4"
                  height="45"
                  width="45"
                  icon
                  drak
                  v-bind="attrs"
                  v-on="on"
                >
                  <svg t="1647268685194" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="12418" width="36" height="36">
                    <path
                      d="M511.957333 12.650667C229.248 12.650667 0 241.877333 0 524.672c0 226.197333 146.688 418.090667 350.165333 485.802667 25.6 4.693333 34.944-11.093333 34.944-24.682667 0-12.16-0.426667-44.352-0.682666-87.082667-142.421333 30.933333-172.48-68.629333-172.48-68.629333C188.672 770.944 155.093333 755.2 155.093333 755.2c-46.485333-31.786667 3.52-31.146667 3.52-31.146667 51.392 3.626667 78.421333 52.778667 78.421334 52.778667 45.674667 78.229333 119.829333 55.637333 149.013333 42.538667 4.650667-33.066667 17.877333-55.658667 32.512-68.437334-113.706667-12.928-233.216-56.853333-233.216-253.056 0-55.893333 19.946667-101.589333 52.693333-137.386666-5.269333-12.949333-22.826667-65.002667 5.013334-135.509334 0 0 42.986667-13.76 140.8 52.48 40.832-11.349333 84.629333-17.024 128.170666-17.216 43.477333 0.213333 87.296 5.866667 128.192 17.237334 97.749333-66.261333 140.650667-52.48 140.650667-52.48 27.946667 70.485333 10.368 122.538667 5.098667 135.466666 32.810667 35.818667 52.629333 81.514667 52.629333 137.408 0 196.693333-119.701333 239.978667-233.770667 252.650667 18.389333 15.786667 34.773333 47.061333 34.773334 94.805333 0 68.458667-0.64 123.669333-0.64 140.458667 0 13.696 9.216 29.632 35.2 24.618667C877.44 942.570667 1024 750.784 1024 524.672 1024 241.877333 794.730667 12.650667 511.957333 12.650667z"
                      fill="#191717" p-id="12419"></path>
                  </svg>
                </v-btn>
              </template>
              <span>GitHub</span>
            </v-tooltip>
            <v-spacer></v-spacer>
          </v-row>
        </v-card-text>
      </div>

      <!--隐私协议-->
      <div class="privacy_box">
        <span>登录注册即代表同意EasyBlog <router-link class="content" to="/protocol">《服务协议》</router-link> 和 <router-link
          class="content" to="/privacy">《用户隐私政策》</router-link></span>
      </div>
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
  background: #f4f5f5 no-repeat center;
  background-size: cover;
}

.login-body {
  margin: 0 15px;
  min-height: 300px;
}

.login-tab-title {
  padding: 0 16px;
}

.v-input__slot label {
  font-size: 14px !important;
}

.login-btn-active {
  background: #3370FF;
}

.login-card {
  max-width: 444px !important;
}

.third-party-login-box {
  margin-top: 10px;
}

.third-party-wrapper {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.third-party-wrapper .txt {
  color: rgba(0, 0, 0, 0.40);
  vertical-align: -4px;
  font-size: 12px;
}

.privacy_box {
  margin-top: 20px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.40);
}

.privacy_box .content {
  color: rgba(0, 0, 0, 0.60);
  text-decoration: unset;
}

.email-login-register-box {
  margin-top: 15px;
  float: right;
}

.email-login-register-box .content {
  text-decoration: unset;
}
</style>
