#!/bin/bash

# 定义镜像名称和标签
IMAGE_NAME="easyblog-web"
IMAGE_TAG="latest"

# 构建 Docker 镜像
docker build -t "$IMAGE_NAME:$IMAGE_TAG" . && docker run -d -p 3000:3000 "$IMAGE_NAME:$IMAGE_TAG"

# 清理不再使用的 Docker 镜像和容器
docker system prune -f
