<template>
  <div class="about">
    <h1>This is an login page</h1>


    <router-link to="/register">立即注册</router-link>

    <v-spacer></v-spacer>
    <router-link to="/get-back-password">找回密码</router-link>
  </div>
</template>

<script>
export default {
  name: 'LoginView'
}
</script>

<style scoped>

</style>
