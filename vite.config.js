// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig(() => {
//   return {
//     server: {
//         open: true,
//     },
//     build: {
//       outDir: 'build',
//     },
//     plugins: [react()],
//   };
// });


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8088',
    },
  },
})
