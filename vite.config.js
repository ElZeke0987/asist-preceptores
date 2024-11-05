import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Navigate } from 'react-router-dom'

const PORT = 3000;
console.log("Abriendo server React, Puerto: ", PORT, "; linea 6 vite.config.js");

export default defineConfig({

  plugins: [react()],
  base:"/",
  
  server:{
    port: PORT,
    host: "127.0.0.1",
    open: "./src/public/dist/index.html",//se abrira en modo dev
    
  },
  rollupOptions: {
    input: "index.html"
  },
  build: {
    outDir: "./src/public/dist",
    
  },
  
}) 
