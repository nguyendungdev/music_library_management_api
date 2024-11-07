import { config } from 'dotenv';
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