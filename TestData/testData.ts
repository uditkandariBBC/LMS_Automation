import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const testData = {
  rm_512: process.env.RM_512_URL || "",
  username: process.env.APP_USERNAME || "",
  password: process.env.APP_PASSWORD || "",
  waitForElement: parseInt(process.env.WAIT_FOR_ELEMENT || "120000", 10),
};
