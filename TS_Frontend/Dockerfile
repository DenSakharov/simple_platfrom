# Используйте образ с Node.js
FROM node:20

# Создайте рабочую директорию
WORKDIR /app

# Копируйте package.json и package-lock.json в контейнер
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте остальные файлы в контейнер
COPY . .

# Установите Vite глобально
RUN npm install -g create-vite

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
			 