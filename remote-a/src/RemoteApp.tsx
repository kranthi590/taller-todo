import { MainProvider } from './context/MainContext';
import App from './App.tsx';

function RemoteApp() {
  return (
    <MainProvider>
      <App />
    </MainProvider>
  );
}

export default RemoteApp;
