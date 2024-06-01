import { useContext, useState } from 'react';
import { MainContext, store } from '../../context/MainContext';
import Todo from './Todo';
import { Container, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useDebounce from '../../hooks/UseDebounce.tsx';
import { TodoType } from '../../types';

const Todos = () => {
  const { todos, search, setSearch } = useContext(MainContext)!;
  const [deleteSnackOpen, setDeleteSnackOpen] = useState(false);
  const [editSnackOpen, setEditSnackOpen] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>(
    store.getItem('todos') ? JSON.parse(store.getItem('todos')!) : [],
  );

  useDebounce(() => {
      setFilteredTodos(
        todos.filter((d: TodoType) => d.title.toLowerCase().includes(search.toLowerCase())),
      );
    }, [todos, search], 200,
  );

  return (
    <>
      <div>
        <Container>
          <TextField id="outlined-basic" label="Filter" variant="outlined" size="medium"
                     onChange={(e) => setSearch(e.target.value)} />
        </Container>
        {filteredTodos.map((todo, i) => {
          return (
            <Todo
              todo={todo}
              key={todo.id}
              onDelete={() => setDeleteSnackOpen(true)}
              index={i}
              onEdit={() => setEditSnackOpen(true)}
            />
          );
        })}
      </div>

      <Snackbar
        open={deleteSnackOpen}
        autoHideDuration={4000}
        onClose={() => setDeleteSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setDeleteSnackOpen(false)}
          severity="success"
        >
          Successfully deleted item!
        </Alert>
      </Snackbar>
      <Snackbar
        open={editSnackOpen}
        autoHideDuration={4000}
        onClose={() => setEditSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setEditSnackOpen(false)}
          severity="success"
        >
          Successfully edited item!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Todos;
