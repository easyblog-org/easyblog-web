//nodejs服务器
const express = require("express")
const Vue = require("vue")
const fs = require("fs")
 
//创建express实例
const app = express()
//创建渲染器
const { createBundleRenderer } = require("vue-server-renderer")
const serverBundle = require("./dist/server/vue-ssr-server-bundle.json")
const clientManifest = require("./dist/client/vue-ssr-client-manifest.json")
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync("./public/index.temp.html", "utf-8"), //页面模板
    clientManifest
})
 
//中间件处理静态文件请求
app.use(express.static("./dist/client", { index: false }))
 
//将路由的处理交给vue
app.get("*", async (req, res) => {
    try {
        response.status(200)
        response.setHeader("Content-type", "text/html;charset=utf-8")
        const { url } = request
        // favicon.ico 图标用于收藏夹图标和浏览器标签上的显示，如果不设置，浏览器会请求网站根目录的这个图标，如果网站根目录也没有这图标会产生 404。
        if (url ==='/favicon.ico') return
        const context = {
            url: url,
            title: ""
        }
        //````````````渲染一个string类型的Vue实例（内容少时）````````````````
        // const html = await renderer.renderToString(context)
        // res.send(html)
        //````````````渲染一个流模式的Vue实例（内容多时）````````````````````
        const ssrStream = await renderer.renderToStream(context)
        const buffers = []
        ssrStream.on("data", (data) => {
            buffers.push(data)
        })
        ssrStream.on("end", () => {
            res.end(Buffer.concat(buffers))
        })
    }catch {
        res.status(500).send("服务器内部错误！")
    }
})

 
app.listen(3000, () => {
    console.log("Server start at port 3000 succesfully!")
})