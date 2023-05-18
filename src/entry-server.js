import createApp from "./main"
 
//context就是地址
export default context => {   
    return new Promise((resolve, reject) => {
        const { app, router } = createApp()
        //渲染首屏
        router.push(context.url)
        router.onReady(() => {
            resolve(app)
        }, reject)
    })
}