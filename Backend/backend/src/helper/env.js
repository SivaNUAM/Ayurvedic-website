// config.js
import dotenv from "dotenv";

dotenv.config();  // Load .env file content into process.env

export const envConfig = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  // Add other environment variables here as needed
};
