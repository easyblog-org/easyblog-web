import createApp from "./main"

// context执行上下文环境
module.exports = (context) => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise(async (reslove, reject) => {
    // 解构出浏览器访问的url
    const { url } = context
    // 传入执行上下文，实例化app实例，解构出app和router
    const {app, router} = createApp(context)
    // 导航到浏览器访问URL，使app实例匹配到对应的组件
    router.push(url)
    /**
     * router.onReady(callback, [errorCallback])
     * 在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。
     * 这可以有效确保服务端渲染时服务端和客户端输出的一致。
     * 第二个参数 errorCallback 只在 2.4+ 支持。它会在初始化路由解析运行出错 (比如解析一个异步组件失败) 时被调用。
     */
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if(!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      reslove(app)
    },reject)
  })
}