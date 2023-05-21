<template>
  <v-card class="text-center rounded-sm sidebar-box-border" elevation="0">
    <v-card-title class="friend-list-title">友情链接</v-card-title>
    <v-card-text class="text-left">
      <v-chip label :color="item.color" class="ma-2 friend-list-item"
              v-for="item in friend_list" :key="item.id">
        <a :href="item.url" target="_blank">{{ item.name }}</a>
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AppCommonFriendLinker',
  data: () => ({
    friend_list: [
      {
        id: '1',
        color: 'black',
        name: 'GitHub',
        url: 'https://www.github.com'
      },
      {
        id: '2',
        color: 'Blue',
        name: 'EasyBlog',
        url: 'https://www.easyblog.top'
      },
      {
        id: '3',
        color: 'light-blue',
        name: 'Vuetify官网Vuetify官网',
        url: 'https://vuetifyjs.com/zh-Hans/'
      },
      {
        id: '4',
        color: 'cyan',
        name: 'Vuetify官网',
        url: 'https://vuetifyjs.com/zh-Hans/'
      }
    ]
  })
}
</script>

<style scoped>
.sidebar-box-border {
  border: 1px solid #e1e1e1;
}

.friend-list-title {
  font-weight: 600;
  font-size: 17px;
}

.friend-list-item a {
  text-decoration: unset;
  color: #FFFFFF;
}
</style>
