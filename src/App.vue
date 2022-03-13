<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

import HomeView from '@/views/HomeView'

export default {
  name: 'App',
  components: {
    HomeView
  },
  data: () => ({})
}
</script>
