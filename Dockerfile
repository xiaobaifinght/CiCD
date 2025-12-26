FROM node:18-alpine As builder
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build

# 使用 Nginx 镜像，轻量、高性能
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]