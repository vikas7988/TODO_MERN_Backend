import {config } from "dotenv";

config();

export const mongoURI = process.env.MONGODB_URI;
export const jwtSecret = process.env.JWT_SECRET;
