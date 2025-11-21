export const SETTINGS = {
  PORT: 5002,
  MONGO_URL:
    process.env.MONGO_URL ||
    'mongodb+srv://root:root@cluster0.cagnufl.mongodb.net/?appName=Cluster0',
  DB_NAME: process.env.DB_NAME || 'Cluster0',
};
