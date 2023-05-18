import createApp from "./main"
 
const { app, router } = createApp()
router.onReady(() => {
    //挂载激活app
    app.$mount("#app")
})