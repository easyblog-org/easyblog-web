<template>
  <v-container class="my-bread-crumbs-container">
    <span class="pr-1 my-location-icon">
      <svg t="1651337939446" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="4712" width="14" height="14"><path
        d="M512.421614 0C281.83153 0.628328 94.356588 184.357863 94.356588 410.209908c0 132.458414 155.248081 314.794168 172.957913 335.152391 34.756544 39.979645 40.329626 48.702551 51.571982 66.140177 15.133076 23.473254 37.840875 58.956366 133.788749 181.431126 15.611996 19.244835 37.003788 29.858864 59.746381 30.403278 22.74464-0.544414 44.136431-11.164583 59.750474-30.403278 95.943781-122.470666 118.649534-157.955825 133.788749-181.431126 11.244403-17.433532 16.813391-26.160532 51.571982-66.140177 17.709833-20.358223 172.957913-202.693977 172.957913-335.152391C930.490733 184.357863 743.013745 0.628328 512.421614 0L512.421614 0zM707.737347 703.962265c-37.740589 43.432377-44.625585 54.064826-57.106177 73.424274-13.634913 21.148238-36.475747 56.502409-130.286898 176.263285-2.472377 3.057724-5.231288 3.952119-7.922658 4.742134-2.693417-0.787968-5.452328-1.682362-7.924705-4.742134-93.805011-119.760875-116.645844-155.115047-130.280758-176.263285-12.480592-19.359448-19.371728-29.989851-57.112317-73.424274-75.851624-87.181988-157.454391-216.269537-157.454391-293.752357 0-190.651373 158.152305-345.72958 352.770123-346.355861 194.615772 0.626281 352.768077 155.704488 352.768077 346.355861C865.189691 487.692728 783.586924 616.780277 707.737347 703.962265L707.737347 703.962265zM512.421614 255.888968c-88.338356 0-159.951328 71.615018-159.951328 159.951328 0 88.342449 71.615018 159.955421 159.951328 159.955421 88.342449 0 159.955421-71.612972 159.955421-159.955421C672.377035 327.50194 600.762017 255.888968 512.421614 255.888968L512.421614 255.888968zM512.421614 511.814776c-53.010791 0-95.970387-42.971876-95.970387-95.976527 0-52.998511 42.961643-95.970387 95.970387-95.970387 53.004651 0 95.974481 42.971876 95.974481 95.970387C608.396095 468.8429 565.426265 511.814776 512.421614 511.814776L512.421614 511.814776zM512.421614 511.814776"
        p-id="4713" fill="#8a8a8a"></path></svg>
    </span>您现在的位置是:
    <v-breadcrumbs
      class="my-bread-crumbs pl-1"
      :items="computeUItemDisabledAndGet"
      :divider="divider"
      ref="breadCrumbsRef"
    >
    </v-breadcrumbs>
  </v-container>
</template>

<script>

export default {
  name: 'AppCommonBreadCrumbNavigation',
  props: {
    divider: {
      type: String,
      default: '>',
    },
    items: {
      type: Array,
      default: () => ([
        {
          text: '首页',
          href: '/',
        }
      ]),
    },
    large: Boolean,
  },
  methods:{
    // 通过DOM 操作重新渲染面包屑路径文字的颜色以及鼠标交互效果
    initBreadCrumbsColor(){
      let breadCrumbsRef = this.$refs.breadCrumbsRef
      let children_lis = breadCrumbsRef.$el.children
      for (let i = 0; i < children_lis.length; i++) {
        let children = children_lis[i].children
        if (children !== undefined && children !== null && children.length > 0) {
          children[0].style.color = '#888'
          children[0].style.fontSize='12px'
          children[0].onmouseover = function () {
            children[0].style.color = '#16499d'
          }
          children[0].onmouseout = function () {
            children[0].style.color = '#888'
          }
        }
      }
    }
  },
  computed: {
    computeUItemDisabledAndGet () {
      if (this.items === null || this.items.length === 0) {
        return []
      }
      let list = []
      for (const item in this.items) {
        let disabled = (item.disabled === undefined || item.disabled === null || item.disabled === '') ? true : item.disabled
        list.push({
          text: item.text,
          disabled: disabled,
          href: item.href,
        })
      }
      return this.items
    }
  },
  mounted () {
    this.initBreadCrumbsColor()
  }
}
</script>

<style scoped>
.my-bread-crumbs-container {
  font-size: 12px !important;
  color: #888 !important;
  background-color: #e9ecef;
  padding-top: 5px;
  padding-bottom: 5px;
  height: 45px;
  border-radius: 3px;
  margin-top: 40px;
  margin-bottom: 16px;
  line-height: 0;
}

.my-bread-crumbs {
  display: inline-block;
  color: #888 !important;
}

.my-location-icon {
  position: relative;
  bottom: -3px;
}

.my-bread-crumbs a:hover {
  color: #1976d2;
}
</style>
