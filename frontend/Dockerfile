# Используйте образ Node.js для сборки приложения React
FROM node:20 AS build
WORKDIR /app

# Копируйте файлы проекта и установите зависимости
COPY package*.json ./
RUN npm install

# Копируйте исходный код и соберите приложение
COPY . .
RUN npm run build

# Используйте образ Nginx для выполнения приложения
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Копируйте собранные файлы React в образ Nginx
COPY --from=build /app/build .

# Экспозиция порта 80, который будет использоваться вашим приложением React
EXPOSE 80

# Запустите Nginx при старте контейнера
CMD ["nginx", "-g", "daemon off;"]
