<template>
  <v-app>
    <app-common-bar></app-common-bar>

    <!--面包屑导航-->
    <app-common-bread-crumb-navigation :items="[{
          text: '首页',
          href: '/',
        },
        {
          text: '在线工具',
          href: '/tools',
        }]"></app-common-bread-crumb-navigation>

    <v-container class="pr-0 pl-0 pt-0">
      <v-row>
        <v-col>
          <v-card style="min-height: 1024px">
            <v-toolbar
              flat
              color="primary"
              dark
            >
              <v-toolbar-title>
                {{ activeToolMenu }}
              </v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical>
              <v-tab @click="onMenuClick('全部工具')" style="text-align: justify;">
                全部工具
              </v-tab>
              <v-tab v-for="toolMenu in toolMenus" :key="toolMenu"
                     @click="onMenuClick(toolMenu)" style="text-align: justify;">
                {{ toolMenu }}
              </v-tab>

              <v-tab-item>
                <v-card flat>
                  <v-card-text v-for="(toolsConfig) in activeToolMenuItems" :key="toolsConfig.type">
                    <h3>
                      {{ toolsConfig.name }}
                    </h3>

                    <v-card v-for="item in toolsConfig.items" :key="item.name" max-width="30%"
                            min-width="30%"
                            style="display: inline-flex;margin: 10px 10px 20px 0">
                      <NuxtLink :to="item.location" class="tool-item-context" target="_blank">
                        <div>
                          <v-avatar
                            tile
                            color="grey darken-1"
                            size="40"
                            style="display: inline-block; margin: 15px 0 15px 15px"
                          >
                            <img
                              :src="item.icon"
                              alt="avatar"/>
                          </v-avatar>
                          <v-card-title class="tool-item-title"> {{ item.name }}</v-card-title>
                        </div>
                        <v-card-subtitle class="tool-item-subtitle"> {{ item.description }}</v-card-subtitle>
                      </NuxtLink>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item v-for="toolMenu in toolMenus" :key="toolMenu">
                <v-card flat>
                  <v-card-text>
                    <v-card v-for="item in activeToolMenuItems.items" :key="item.name" max-width="30%"
                            min-width="30%"
                            style="display: inline-flex;margin: 10px 10px 20px 0">
                      <NuxtLink :to="item.location" class="tool-item-context" target="_blank">
                        <div>
                          <v-avatar
                            tile
                            color="grey darken-1"
                            size="40"
                            style="display: inline-block; margin: 15px 0 15px 15px"
                          >
                            <img
                              :src="item.icon"
                              alt="avatar"/>
                          </v-avatar>
                          <v-card-title class="tool-item-title"> {{ item.name }}</v-card-title>
                        </div>
                        <v-card-subtitle class="tool-item-subtitle"> {{ item.description }}</v-card-subtitle>
                      </NuxtLink>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-center">
        <app-simple-footer></app-simple-footer>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import AppCommonBar from '@/components/AppCommonBar'
import AppCommonBreadCrumbNavigation from '@/components/AppCommonBreadCrumbNavigation'
import AppSimpleFooter from '@/components/AppSimpleFooter'
import toolsConfig from '@/static/tool/tools.json'


export default {
  name: 'ContactUsView',
  components: {
    AppSimpleFooter,
    AppCommonBreadCrumbNavigation,
    AppCommonBar
  },
  data: () => ({
    activeToolMenu: '全部工具',
    activeToolMenuItems: [],
    toolMenus: [],
    toolsConfigs: {}
  }),
  methods: {
    fetchTools() {
      if (!toolsConfig) return

      this.toolsConfigs = toolsConfig.reduce((map, obj) => {
        const {type, ...rest} = obj;

        // 如果Map中已存在相同type的项，则将当前对象合并到已存在项中的items数组
        if (map.has(type)) {
          const existingItem = map.get(type);
          existingItem.items.push(...rest.items);
        } else {
          // 否则，创建一个新的项
          map.set(type, {...rest, items: [...rest.items]});
        }

        return map;
      }, new Map());
    },
    fetchToolMenus() {
      if (!toolsConfig) return

      this.toolMenus = toolsConfig.map(obj => obj.type)
    },
    switchToolMenu(toolMenu) {
      if (!toolMenu) return

      if ('全部工具' === toolMenu) {
        this.activeToolMenuItems = toolsConfig;
      } else {
        const toolConfig = this.toolsConfigs.get(toolMenu)
        const formattedJSON = JSON.stringify(toolConfig, null, 2);
        console.log("switchToolMenu==>" + formattedJSON)
        this.activeToolMenuItems = toolConfig
      }
    },
    onMenuClick(toolMenu) {
      this.activeToolMenu = toolMenu
      console.log(this.activeToolMenu)
      this.switchToolMenu(toolMenu)
    }
  },
  computed: {},
  created() {
    this.fetchTools()
    this.fetchToolMenus()
    this.switchToolMenu("全部工具")
  }
}
</script>

<style scoped>
.my-subtitle {
  font-size: 16px;
  color: #5fa207;
  font-weight: 600;
}

.tool-item-context {
  color: #252933;
  text-decoration: unset;
}

.tool-item-title, .tool-item-subtitle {
  padding: 10px;
}

.tool-item-title {
  font-size: 16px;
  margin-bottom: 10px;
  display: inline-block;
}

.tool-item-subtitle {
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
}
</style>
