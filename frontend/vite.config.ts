import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://dev.to/boostup/uncaught-referenceerror-process-is-not-defined-12kg
const cherryPickedKeys = [
  "SOME_KEY_IN_YOUR_ENV_FILE",
  "SOME_OTHER_KEY_IN_YOUR_ENV_FILE",
];

// https://vitejs.dev/config/
export default defineConfig(({command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
    return {
      plugins: [react()],
      define: {
        'process.env': Object.fromEntries(
          cherryPickedKeys.map((key) => [key, JSON.stringify(env[key])])
        ),
      },
      // https://stackoverflow.com/questions/75201705/how-to-set-multiple-aliases-in-vite-react
      alias: {
        "@/": path.resolve(__dirname, "./")
      }
    }
});
