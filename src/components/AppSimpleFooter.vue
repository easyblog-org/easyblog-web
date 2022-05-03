<template>
  <div class="footer">
    <span>Copyright © 2019-{{ getFullYear }} </span>
    <span>
      <a class="domain" href="/">EasyBlog</a> 版权所有.
    </span>
    <a href="http://beian.miit.gov.cn" class="beian" target="_blank">
      陕ICP备19025460号-1
    </a>
  </div>
</template>

<script>

export default {
  name: 'app-simple-footer',
  computed: {
    getFullYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  margin: 25px auto 8px auto;
  font-size: 14px;
  color: #666666;
}

.footer a{
  text-decoration: none;
}

.footer a:hover{
  color: #16499d;
}

.domain{
  color: inherit;

}

.beian{
  color: #848585;
}
</style>
