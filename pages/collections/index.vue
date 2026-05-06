<template>
  <div v-if="showCollection" class="max-w-6xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">专栏</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="col in collections"
        :key="col.slug"
        class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 hover:shadow-md hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200 flex flex-col"
      >
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 dark:text-white">{{ col.title }}</h3>
            <span class="text-xs text-gray-400 dark:text-gray-500">{{ col.articleCount }} 篇文章</span>
          </div>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 flex-1">{{ col.description }}</p>
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <span class="text-lg font-bold text-primary">{{ col.price }}</span>
          <button class="bg-primary text-white px-5 py-2 rounded-lg text-sm hover:bg-primary-hover transition-colors" @click="handleSubscribe(col)">订阅专栏</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const showCollection = ref(true)

const collections = [
  { slug: 'backend-practice', title: '后端工程实践', description: '从零构建高可用后端系统，涵盖微服务架构、数据库优化、缓存策略、消息队列等核心主题。', price: '¥99', articleCount: 12 },
  { slug: 'ai-exploration', title: 'AI 探索笔记', description: 'AI 应用开发实战记录，从 LLM 原理到 RAG 系统、Agent 开发的完整学习路径。', price: '¥49', articleCount: 8 },
  { slug: 'devops-toolkit', title: 'DevOps 工具箱', description: 'CI/CD、容器化、Kubernetes、监控告警等运维开发实践指南。', price: '¥69', articleCount: 10 },
]

function handleSubscribe(col) {
  alert('订阅专栏：' + col.title + '（功能开发中）')
}
</script>
