import { createRoot } from 'react-dom/client';
import App from './App';
import '@react-admin/styles';
import '@react-admin/tailwindcss-config/tailwindcss';
import '@react-admin/styles/antd.css';

async function bootstrap(namespace: string) {
  console.log('bootstrap', namespace);
  createRoot(document.getElementById('app')!).render(<App />);
}

export { bootstrap };
