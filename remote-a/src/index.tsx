import { createRoot } from 'react-dom/client';
import { MainProvider } from './context/MainContext';
import './styles.css';
import RemoteA from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <MainProvider>
    <RemoteA />
  </MainProvider>,
);
