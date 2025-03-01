import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_CLIENT_GOOGLE': JSON.stringify(env.REACT_APP_CLIENT_GOOGLE),
      'process.env.REACT_APP_REDIRECT_GOOGLE': JSON.stringify(env.REACT_APP_REDIRECT_GOOGLE),
      'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL),
    },
    plugins: [react()],
    base: '/',
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@contributeComponents': path.resolve(__dirname, './src/contributeComponents'),
      },
    },
  };
});