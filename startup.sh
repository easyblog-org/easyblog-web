#!/bin/bash

# 定义镜像名称和标签
IMAGE_NAME="easyblog-web"
IMAGE_TAG="latest"

# 构建 Docker 镜像
docker build -t "$IMAGE_NAME:$IMAGE_TAG" . >/dev/null

if [ "$?" -ne 0 ]; then
    echo "Build ${IMAGE_NAME} image failed"
    # 清理不再使用的 Docker 镜像和容器
    docker system prune -f
    exit 1
fi

instances=$(docker ps -q -a --filter "name=${ARTIFACT}")
# 检查并停止老的实例
for ins in $instances; do
    docker stop "$ins" && docker rm "$ins"
done

docker run --name "${IMAGE_NAME}" -d -p 3000:3000 "$IMAGE_NAME:$IMAGE_TAG"

# 清理不再使用的 Docker 镜像和容器
docker system prune -f
