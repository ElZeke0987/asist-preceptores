import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Navigate } from 'react-router-dom'

const PORT = 5173;
console.log("Abriendo server React, Puerto: ", PORT);

export default defineConfig({
  plugins: [react()],
  base:"/",
  
  server:{
    //port: PORT,
    open: "./src/public/index.html",
  },
  
  
}) 
