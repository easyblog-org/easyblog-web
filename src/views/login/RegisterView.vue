<template>
  <div class="register-container">
    <v-card class="mx-auto my-12 rounded-lg register-card" max-width="444" height="70%" min-height="500">
      <v-card-title class="register-title"><h2>邮箱注册</h2></v-card-title>
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
                <span>已有账号？<router-link to="/login" class="content">返回登录</router-link></span>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
      <!--第三方登录框-->
      <app-third-party-login-box></app-third-party-login-box>
      <!--隐私协议-->
      <div class="privacy_box">
        <span>登录注册即代表同意EasyBlog <router-link class="content" to="/service">《服务协议》</router-link> 和 <router-link
          class="content" to="/privacy">《用户隐私政策》</router-link></span>
      </div>
    </v-card>
  </div>
</template>

<script>

import AppThirdPartyLoginBox from '@/components/AppThirdPartyLoginBox'
export default {
  name: 'RegisterView',
  components: { AppThirdPartyLoginBox  },
  data: () => ({
    register_tab: null,
    email_password_show: false,
    dialog_verifier_show: false,
    //邮箱账号登录
    email_account: {
      email: '',
      password: ''
    },
  })
}
</script>

<style scoped>

</style>
