import { defineNitroConfig } from "nitropack";

export default defineNitroConfig({
  publicAssets: [
    {
      baseURL: "/",
      dir: "/public",
    },
  ],
});
