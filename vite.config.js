import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // กำหนด port เว็บ
  server: {
    port: 3000,
  },
  //
});