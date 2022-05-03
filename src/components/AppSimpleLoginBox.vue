<template>
  <v-card class="simple-login-box-container">
    <v-card-title>快捷登录</v-card-title>
    <v-card-text>
      <v-form ref="emailFormRef" lazy-validation>
        <v-text-field v-model="account.identifier" label="邮箱" autofocus required></v-text-field>
        <v-text-field
          v-model="account.credential"
          :append-icon="credential_show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="credential_show ? 'text' : 'password'"
          @click:append="credential_show = !credential_show"
          label="密码"
          required
        ></v-text-field>
        <v-btn :color="'#3370FF'" style="color: aliceblue;" width="100%"
               @click="login">
          登录
        </v-btn>
        <div class="email-go-register-box">
          <span><router-link to="/register" class="content" tag="span">忘记密码？</router-link></span>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'app-simple-login-box',
  data: () => ({
    account: {
      //账号
      identifier: '',
      //账号类型
      identifier_type: '',
      //账号密码
      credential: ''
    },
    credential_show: false
  }),
  methods: {
    login () {

    }
  }
}
</script>

<style scoped>
.simple-login-box-container {
  min-height: 340px;
}
</style>
