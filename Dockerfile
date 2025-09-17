# Usar una imagen oficial de Node.js que incluya pnpm
FROM node:18-alpine

# Instalar pnpm
RUN npm install -g pnpm

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de definición de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar las dependencias
RUN pnpm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que corre la aplicación Next.js
EXPOSE 3000

# Comando para iniciar la aplicación en modo de desarrollo
CMD ["pnpm", "dev"]
