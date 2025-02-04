FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
COPY db.json /app/db.json
RUN npm install
COPY db.json .
EXPOSE 3000
CMD ["npx", "json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "3000"]
