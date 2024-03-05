import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


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
    }
  }
)
