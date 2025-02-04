# Fase 1: Construcción de la aplicación Angular
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci --legacy-peer-deps

# Copiar el código fuente
COPY . .

# Construir la aplicación Angular
RUN npm run build --configuration=production

# 🔥 DEBUG: Verificar que los archivos existen antes de copiarlos
RUN ls -lah /app/dist/heroes

# Fase 2: Servir la aplicación con NGINX
FROM nginx:alpine

# Copiar la aplicación construida al directorio de NGINX
COPY --from=builder /app/dist/heroes/browser /usr/share/nginx/html

# Copiar configuración de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
