import { createRoot } from 'react-dom/client';
import App from './App';

async function bootstrap(namespace: string) {
  console.log('bootstrap', namespace);
  createRoot(document.getElementById('app')!).render(<App />);
}

export { bootstrap };
