FROM node:16

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo de definición de dependencias primero para aprovechar la caché de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm install

COPY . .

CMD ["node", "src/server.js"]

EXPOSE 3001
