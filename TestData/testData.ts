import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

console.log("Environment Variables:", {
  RM_512_URL: process.env.RM_512_URL,
  APP_USERNAME: process.env.APP_USERNAME,
  APP_PASSWORD: process.env.APP_PASSWORD,
  WAIT_FOR_ELEMENT: process.env.WAIT_FOR_ELEMENT,
});

export const testData = {
  rm_512: process.env.RM_512_URL || "",
  username: process.env.APP_USERNAME || "",
  password: process.env.APP_PASSWORD || "",
  waitForElement: parseInt(process.env.WAIT_FOR_ELEMENT || "120000", 10),
};
