import { config } from 'dotenv';
import { access } from 'fs';
if (process.env.NODE_ENV === 'production') {
    config({ path: (process.cwd(), 'config/production.env') });
} else {
    config({ path: (process.cwd(), 'config/development.env') });
}
export const databaseConfig = {
    uri: process.env.MONGODB_URI
};

export const appConfig = {
    port: process.env.APP_PORT,
    prefix: process.env.API_PREFIX,
    backendDomain: process.env.BACKEND_DOMAIN,
    name: process.env.APP_NAME,
};

export const minioConfig = {
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    bucket: process.env.MINIO_BUCKET,
    port: process.env.MINIO_PORT,
    endPoint: process.env.MINIO_ENDPOINT
}