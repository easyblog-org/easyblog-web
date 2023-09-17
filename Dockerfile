#使用官方 Node 镜像作为基础镜像，指定版本
FROM node:current-bullseye
MAINTAINER frank.huang
#任意ip
ENV HOST 0.0.0.0
#容器内创建目录/app
RUN mkdir -p /app
#复制当前的内容到容器内容部目录/app
COPY . /app
#切换工作目录到/app
WORKDIR /app
#暴露端口3000，默认端口
EXPOSE 3000
#打node、印npm版本
RUN node -v
RUN npm -v
#清除缓存
RUN npm cache verify
#设置淘宝镜像
RUN npm config set registry https://registry.npm.taobao.org
#安装依赖
RUN npm install --force --legacy-peer-deps --no-package-lock
#构建，生成dist文件
RUN npm run build
#start
CMD ["npm","start"]
