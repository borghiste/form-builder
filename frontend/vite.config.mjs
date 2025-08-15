import { defineConfig, loadEnv } from 'vite';



// Carica le variabili di ambiente
const env = loadEnv(process.env.NODE_ENV, process.cwd());

export default defineConfig({
  root: './src',  // Imposta la directory principale del progetto
  
  build: {
    outDir: '../dist', // Imposta la cartella di output
  },


  server: {
    port: env.VITE_PORT || 5173
  },
});





