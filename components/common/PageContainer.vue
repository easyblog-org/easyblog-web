<template>
  <div class="min-h-screen flex flex-col">
    <div :class="['lg:mx-auto px-0 lg:px-4 py-3 lg:py-6 w-full flex-1', mobilePaddingClass, hasSidebar ? 'lg:max-w-6xl' : 'lg:max-w-4xl']">
      <div v-if="hasSidebar" class="flex flex-col-reverse lg:flex-row gap-6">
        <div :class="['lg:w-3/4 page-slide-up', { 'is-loaded': loaded }]">
          <slot />
        </div>
        <aside class="lg:w-1/4 hidden lg:block">
          <div class="sticky top-20 space-y-4">
            <slot name="sidebar" />
          </div>
        </aside>
      </div>
      <article v-else :class="['bg-white dark:bg-gray-900 lg:rounded-xl lg:shadow-sm lg:border lg:border-gray-100 dark:lg:border-gray-800 p-6 lg:p-10 page-slide-up', { 'is-loaded': loaded }]">
        <slot />
      </article>
    </div>
    <SimpleFooter />
  </div>
</template>

<script setup>
import SimpleFooter from '~/components/layout/SimpleFooter.vue'

const props = defineProps({
  hasSidebar: {
    type: Boolean,
    default: false,
  },
  mobilePadding: {
    type: String,
    default: 'px-0',
  },
})

const mobilePaddingClass = computed(() => props.mobilePadding)

const loaded = ref(false)

onMounted(() => {
  nextTick(() => {
    setTimeout(() => { loaded.value = true }, 50)
  })
})
</script>

<style scoped>
.page-slide-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.page-slide-up.is-loaded {
  opacity: 1;
  transform: translateY(0);
}
</style>
