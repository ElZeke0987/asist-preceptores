import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { regMinified } from '../../src/conf-vars'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"./",
  build:{
    minify: regMinified,
  }
})
