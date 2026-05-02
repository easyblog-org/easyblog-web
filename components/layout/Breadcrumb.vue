<template>
  <div class="bg-gray-100 dark:bg-gray-800/50 rounded-lg py-2 px-4 my-4 text-xs flex items-center">
    <svg class="w-3 h-3 mr-1 text-gray-500 dark:text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
    <span class="text-gray-500 dark:text-gray-400 mr-1">您现在的位置是：</span>
    <template v-for="(item, index) in items">
      <span :key="'sep-' + index" v-if="index > 0" class="mx-1 text-gray-400 dark:text-gray-600">&gt;</span>
      <NuxtLink
        v-if="item.href && index < items.length - 1"
        :key="'link-' + index"
        :to="item.href"
        class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline"
      >
        {{ item.text }}
      </NuxtLink>
      <span v-else :key="'text-' + index" class="text-gray-700 dark:text-gray-200">{{ item.text }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>
