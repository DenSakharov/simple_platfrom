# ����������� ����� � Node.js
FROM node:20

# �������� ������� ����������
WORKDIR /app

# ��������� package.json � package-lock.json � ���������
COPY package*.json ./

# ���������� �����������
RUN npm install

# ��������� ��������� ����� � ���������
COPY . .

# ���������� Vite ���������
RUN npm install -g create-vite

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
			 