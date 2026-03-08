import { defineConfig } from "vite";
export default defineConfig({
  build: {
    lib: {
      entry: "./index.js",
      name: "MyUI",
      fileName: (format) => `my-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"], // 别把 vue 源码打进去！
    },
  },
});
