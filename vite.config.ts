import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: new URL("./index.html", import.meta.url).pathname,
        apiDocs: new URL("./api-docs.html", import.meta.url).pathname,
      },
    },
  },
});
