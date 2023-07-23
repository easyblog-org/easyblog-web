// store/index.js

// 在服务端渲染期间运行都是同一个实例
const cookieParser = process.server ? require('cookie-parser') : null

// 为了防止数据冲突，务必要把 state 定义成一个函数， 返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: {
      'code':'jt9pke'
    }
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxtServerInit 是一个特殊的 action 方法，这个action 会在服务端渲染期间自动调用，且仅在服务端渲染时运行
  // 主要作用是：初始化容器数据，传递数据给客户端使用
  nuxtServerInit({commit}, {req}) {
  }
}
