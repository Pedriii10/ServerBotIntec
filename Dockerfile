# Usar una imagen base oficial de Node.js
FROM node:16

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo de definición de dependencias primero para aprovechar la caché de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar los archivos de código fuente necesarios al contenedor
# Esto excluye node_modules y logs debido al .dockerignore
COPY . .

# El directorio de trabajo ya está en /app, así que no necesitamos cambiarlo

# Tu aplicación está en la carpeta 'src', así que asegúrate de que
# Node.js ejecute el archivo JavaScript correcto
CMD ["node", "src/server.js"]

# Exponer el puerto que utiliza tu aplicación
EXPOSE 3001
