import { TodoType } from '../../types';
import { useState, useContext, forwardRef } from 'react';
import { DeleteConfirm } from '../Actions/DeleteConfirm';
import EditConfirm from '../Actions/EditConfirm';
import {
  Card,
  CardContent,
  Typography,
  Container,
  useMediaQuery,
  Checkbox,
  Grid,
} from '@material-ui/core';
import ActionsMenu from '../Actions/ActionsMenu';
import { MainContext } from '../../context/MainContext';

export interface Props {
  todo: TodoType;
  index: number;
  onDelete: () => void;
  onEdit: () => void;
}

const Todo = forwardRef(({ todo, onDelete, onEdit }: Props, ref: any) => {
  const { markComplete, delTodo, editTodo, markStar } =
    useContext(MainContext)!;
  const matches = useMediaQuery('(max-width: 768px)');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const checkedStyle = { textDecoration: 'none' };
  if (todo.completed) checkedStyle.textDecoration = 'line-through';
  else checkedStyle.textDecoration = 'none';

  const styles: any = {
    card: {
      marginTop: matches ? 20 : 35,
      background: 'lightgray',
    },
    icon: {
      float: 'right',
      paddingTop: '10px',
    },
    text: {
      wordBreak: 'break-word',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      fontWeight: todo.starred ? 600 : 'normal',
      fontSize: matches ? '17px' : '17px',
      color: '',
    },
  };

  if (todo.starred) {
    styles.text.color = '#3f51b5';
  }

  const deleteTodo = (e: any) => {
    if (e.shiftKey) {
      delTodo(todo.id);
      onDelete();
    } else setDeleteOpen(true);
  };
  return (
    <Container ref={ref}>
      <Card
        className="todo-card"
        variant="outlined"
        style={{
          ...styles.card,
          userSelect: 'none',
        }}
      >
        <CardContent className="card-content" style={{ padding: '16px' }}>
          <Typography
            variant="h5"
            component="h2"
            style={checkedStyle}
            className="todo-text"
          >
            <Grid container alignItems="center" justify="flex-start">
              <Grid item>
                <Checkbox
                  checked={todo.completed}
                  color="primary"
                  style={{ marginRight: 5 }}
                  onClick={() => markComplete(todo.id)}
                  centerRipple={false}
                />
              </Grid>
              <Grid item style={{ flex: 2 }}>
                <div style={styles.text}>{todo.title}</div>
              </Grid>
              <Grid item>
                <ActionsMenu
                  deleteTodo={(e) => deleteTodo(e)}
                  setEditOpen={setEditOpen}
                  todo={todo}
                  markStar={markStar}
                />
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </Card>
      <DeleteConfirm
        yes={() => {
          setDeleteOpen(false);
          setTimeout(() => {
            delTodo(todo.id);
            onDelete();
          }, 200);
        }}
        open={deleteOpen}
        close={() => setDeleteOpen(false)}
      />
      <EditConfirm
        yes={(val: string) => {
          setEditOpen(false);
          setTimeout(() => {
            editTodo(todo.id, val);
            onEdit();
          }, 200);
        }}
        open={editOpen}
        close={() => setEditOpen(false)}
        value={todo.title}
      />
    </Container>
  );
});

export default Todo;
