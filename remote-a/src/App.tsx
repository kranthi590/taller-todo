import { useContext } from 'react';
import AddTodo from './components/Todos/AddTodo';
import Todos from './components/Todos/Todos';
import { MainContext } from './context/MainContext';
import { Alert, AlertTitle } from '@material-ui/lab';

function App() {
  const { addTodo, isLocalStorageEnabled } = useContext(MainContext)!;

  return (
    <div style={{ height: '100vh' }}>
      <AddTodo addTodo={addTodo} />
      <Todos />
      {!isLocalStorageEnabled && <Alert severity="error" style={{
        marginTop: '20px',
      }}>
        <AlertTitle>Localstorage is not accessible, you data is lost on page refresh</AlertTitle>
        Don't allow sites to save data on your device has been enabled
      </Alert>}
    </div>
  );
}

export default App;
