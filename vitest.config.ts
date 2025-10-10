import react from '@vitejs/plugin-react-swc';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    exclude: [...configDefaults.exclude],
  },
});
