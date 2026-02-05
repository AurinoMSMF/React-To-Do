import { defineConfig } from "cypress";

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  const path = require("path");

  dotenv.config({ path: path.resolve(__dirname, "./.env") });
}

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    screenshotOnRunFailure: true,
    baseUrl: process.env.BASE_URL,
  },
});
