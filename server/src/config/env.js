import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in environment variables");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in environment variables");
}

export const config = {
  port: process.env.PORT || 5000,
  db: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
