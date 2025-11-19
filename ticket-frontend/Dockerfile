# -------------------------------
# 1단계: Build Stage
# -------------------------------
FROM node:20 AS builder
WORKDIR /app

# 패키지 먼저 복사 (캐시 활용)
COPY package*.json ./
RUN npm install

# 전체 소스 복사
COPY . .

# 리액트 프로젝트 빌드
RUN npm run build


# -------------------------------
# 2단계: Run Stage (Nginx)
# -------------------------------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Nginx 기본 파일 제거
RUN rm -rf ./*

# builder 단계에서 빌드된 파일 복사
COPY --from=builder /app/dist ./

# React Router 문제 해결 위한 Nginx 설정 적용
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
