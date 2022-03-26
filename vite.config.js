import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    base: mode === "production" ? "/plant-site/" : "/",
  };
});
