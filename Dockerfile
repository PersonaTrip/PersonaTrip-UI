# 构建阶段
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制package.json和yarn.lock
COPY package.json yarn.lock ./

# 安装依赖
RUN yarn install --frozen-lockfile

# 复制所有源代码
COPY . .

# 构建应用
RUN yarn build

# 生产阶段
FROM nginx:alpine

# 复制构建产物到Nginx服务目录
COPY --from=build /app/dist /usr/share/nginx/html

# 复制自定义Nginx配置（可选，如果需要）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]
