export const port = process.env.PORT || 5000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const googleAnalyticsId = 'UA-72716212-1';
export const REDIS_ADDR = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1';
export const REDIS_PORT = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
export const MONGO_ADDR = process.env.MONGO_PORT_27017_TCP_ADDR || '127.0.0.1';
export const MONGO_PORT = process.env.MONGO_PORT_27017_TCP_PORT || 27017;
export const MONGO_URL = `mongodb://${MONGO_ADDR}:${MONGO_PORT}/mine`;
