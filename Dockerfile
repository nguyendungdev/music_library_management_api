FROM node:18 as builder
RUN apt-get update && apt-get install -y ffmpeg
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18
RUN apt-get update && apt-get install -y ffmpeg
ARG PORT=3000
ENV PORT=${PORT}
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
EXPOSE 3000
CMD ["node", "dist/main"]
