<template>
  <v-app class="app">
    <transition enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutDown">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>
