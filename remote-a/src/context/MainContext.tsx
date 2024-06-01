import { TodoType } from '../types';
import { createContext, useState, useEffect, ReactNode } from 'react';

interface MainContextInterface {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  markComplete: (id: string) => void;
  delTodo: (id: string) => void;
  deleteAll: () => void;
  editTodo: (id: string, text: string) => void;
  addTodo: (title: string) => void;
  moveTodo: (old: number, new_: number) => void;
  markStar: (id: string) => void;
  search: string;
  setSearch: (text: string) => void;
  isLocalStorageEnabled: boolean;
}

interface Props {
  children: ReactNode;
}

const isLocalStorage = () => {
  try {
    return typeof localStorage === 'object' && window.navigator?.cookieEnabled;
  } catch (e) {
    return false;
  }
};

interface StorageInterface {
  data: Map<string, string>;
  getItem: (id: string) => string | undefined;
  setItem: (id: string, text: string) => undefined;
}

const storage: StorageInterface = {
  data: new Map<string, never>,
  getItem: function(id: string) {
    return this.data.get(id);
  },
  setItem: function(id: string, text: string) {
    this.data.set(id, text);
  },
};

export const store = isLocalStorage() ? localStorage : storage;

export const MainContext = createContext<MainContextInterface | null>(null);

export const MainProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<TodoType[]>(
    store.getItem('todos') ? JSON.parse(store.getItem('todos')!) : [],
  );

  const [search, setSearch] = useState<string>(
    '',
  );

  useEffect(() => {
    store.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    if (title.trim()) {
      const newTodo = {
        id: String(Math.random() * 5000),
        title,
        completed: false,
        starred: false,
      };
      const orderTodos = [newTodo, ...todos];
      orderStarAndComplete(orderTodos);
      setTodos(orderTodos);
    }
  };
  const editTodo: (id: string, text: string) => void = (
    id: string,
    text: string,
  ) => {
    if (!(text === null) && text.trim()) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) todo.title = text;
          return todo;
        }),
      );
    }
  };
  const markComplete = (id: string) => {
    const orderTodos = todos.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    });
    orderStarAndComplete(orderTodos);
    setTodos(orderTodos);
  };

  const markStar = (id: string) => {
    const orderTodos = todos.map((todo) => {
      if (todo.id === id) todo.starred = !todo.starred;
      return todo;
    });
    orderStarAndComplete(orderTodos);
    setTodos(orderTodos);
  };

  const orderStarAndComplete = (todos: TodoType[]) => {
    todos.sort((x, y) => y.starred - x.starred);
    todos.sort((x, y) => x.completed - y.completed);
  };

  const delTodo = (id: string) =>
    setTodos(todos.filter((todo) => todo.id !== id));
  const deleteAll = () => setTodos([]);
  const moveTodo = (old: number, new_: number) => {
    const copy = JSON.parse(JSON.stringify(todos));
    const thing = JSON.parse(JSON.stringify(todos[old]));
    copy.splice(old, 1);
    copy.splice(new_, 0, thing);
    setTodos(copy);
  };

  const mainContextValue: MainContextInterface = {
    todos,
    setTodos,
    markComplete,
    delTodo,
    deleteAll,
    editTodo,
    addTodo,
    moveTodo,
    markStar,
    search,
    setSearch,
    isLocalStorageEnabled: isLocalStorage(),
  };

  return (
    <MainContext.Provider value={mainContextValue}>
      {children}
    </MainContext.Provider>
  );
};
