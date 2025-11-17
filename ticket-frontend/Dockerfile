# 1단계: Build Stage
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: Run Stage (Nginx)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# React Router 404 방지
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
