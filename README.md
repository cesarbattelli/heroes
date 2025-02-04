# Heroes Application

Este proyecto es una aplicación Angular desarrollada para gestionar héroes. Incluye un servidor JSON simulado que actúa como backend para manejar datos de forma local. Ahora también se puede ejecutar mediante **Docker** para simplificar la configuración del entorno.

---

## **🛠️ Requisitos previos**

Asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js** (versión 20 o superior)
- **npm** (gestor de paquetes incluido con Node.js)
- **Angular CLI** (instalado globalmente con `npm install -g @angular/cli`)
- **Docker** y **Docker Compose** (para la ejecución en contenedores)

---

## **🛠️ Instalación Manual**

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

---

## **🔄 Ejecución Manual**

### **Iniciar el servidor JSON**

1. Inicia el servidor JSON para servir los datos desde el archivo `server/db.json`. Este servidor se ejecutará en el puerto `3000`:

   ```bash
   npm run start:json-server
   ```

2. Deja esta terminal abierta, ya que el servidor JSON debe permanecer en ejecución mientras utilizas la aplicación.

### **Iniciar la aplicación Angular**

1. En una nueva terminal, inicia el servidor de desarrollo de Angular:

   ```bash
   npm start
   ```

2. Accede a la aplicación en tu navegador web abriendo la URL: `http://localhost:4200`.

---

## **🚀 Ejecución con Docker**

### **Construir y levantar los contenedores**

Si deseas ejecutar la aplicación mediante Docker, sigue estos pasos:

1. Asegúrate de estar en la carpeta raiz del proyecto (`heroes/`).
2. Ejecuta el siguiente comando para construir y levantar los contenedores:

   ```bash
   docker-compose up --build
   ```

3. La aplicación Angular estará disponible en `http://localhost:80` y la API JSON en `http://localhost:3000`.

4. Para detener los contenedores:
   ```bash
   docker-compose down
   ```

---

## **🔧 Scripts disponibles**

- `npm start`: Inicia el servidor de desarrollo de Angular en el puerto `4200`.
- `npm run start:json-server`: Inicia el servidor JSON en el puerto `3000`.
- `npm run build`: Genera una versión optimizada de la aplicación para producción en la carpeta `dist/`.
- `npm run format`: Aplica el formato Prettier a todo el código del proyecto.
- `docker-compose up --build`: Construye y ejecuta la aplicación con Docker.
- `docker-compose down`: Detiene y elimina los contenedores de Docker.

---

## **📂 Estructura del proyecto**

```
heroes/
│── server/
│   ├── db.json  # Archivo con los datos simulados de la API JSON
│   ├── Dockerfile  # Dockerfile para json-server
│── src/  # Código fuente de la aplicación Angular
│── Dockerfile  # Dockerfile para el frontend
│── docker-compose.yml  # Archivo para levantar la aplicación con Docker
│── package.json  # Dependencias y scripts del proyecto
```

---

## **🛠️ Notas**

- Asegúrate de que ambos servidores (JSON y Angular) estén ejecutándose para que la aplicación funcione correctamente.
- Puedes cambiar el puerto del servidor JSON modificando el script en el archivo `package.json`.
- Si tienes problemas con Docker y el puerto 3000 está en uso, prueba cambiarlo en `docker-compose.yml`.

---

💡 **Ahora tu aplicación de héroes está lista para ser ejecutada en cualquier entorno!** ✨
