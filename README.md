# Heroes Application

Este proyecto es una aplicación Angular desarrollada para gestionar héroes. Incluye un servidor JSON simulado que actúa como backend para manejar datos de forma local.

## Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- Node.js (versión 20 o superior)
- npm (gestor de paquetes incluido con Node.js)
- Angular CLI (instalado globalmente: `npm install -g @angular/cli`)

## Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd heroes
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución

### Iniciar el servidor JSON

1. Inicia el servidor JSON para servir los datos desde el archivo `server/db.json`. Este servidor se ejecutará en el puerto `3000`:

   ```bash
   npm run start:json-server
   ```

2. Deja esta terminal abierta, ya que el servidor JSON debe permanecer en ejecución mientras utilizas la aplicación.

### Iniciar la aplicación Angular

1. En una nueva terminal, inicia el servidor de desarrollo de Angular:

   ```bash
   npm start
   ```

2. Accede a la aplicación en tu navegador web abriendo la URL: `http://localhost:4200`.

## Scripts disponibles

- `npm start`: Inicia el servidor de desarrollo de Angular en el puerto `4200`.
- `npm run start:json-server`: Inicia el servidor JSON en el puerto `3000`.
- `npm run build`: Genera una versión optimizada de la aplicación para producción en la carpeta `dist/`.
- `npm run format`: Aplica el formato Prettier a todo el código del proyecto.

## Estructura del proyecto

- `server/db.json`: Archivo que contiene los datos simulados para la API JSON.
- `src/`: Carpeta principal que contiene el código fuente de la aplicación Angular.

## Notas

- Asegúrate de que ambos servidores (JSON y Angular) estén ejecutándose para que la aplicación funcione correctamente.
- Puedes cambiar el puerto del servidor JSON modificando el script en el archivo `package.json`.
