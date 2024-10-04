import React, { useState, useEffect, useMemo } from 'react';
import AddTask from '../AddTask/AddTask';
import TasksByDay from '../TasksByDay/TasksByDay';
import TasksByDate from '../TasksByDate/TasksByDate';
import AllTasks from '../AllTasks/AllTasks';
import styles from './Tache.module.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  date: Date;
}

const Tache: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [view, setView] = useState<'today' | 'date' | 'all'>('today');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      const todosWithDates = parsedTodos.map((todo: any) => ({
        ...todo,
        date: new Date(todo.date),
      }));
      setTodos(todosWithDates);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (text: string, date: Date) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      date,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const toggleCompletion = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const tasksForToday = useMemo(() => {
    const today = new Date();
    return todos.filter(todo => todo.date.toDateString() === today.toDateString());
  }, [todos]);

  const tasksByDate = useMemo(() => {
    return todos;
  }, [todos]);

  const allTasks = useMemo(() => {
    return todos;
  }, [todos]);

  return (
    <div className={styles.tacheContainer}>
      <AddTask addTodo={addTodo} />

      <div className={styles.buttonGroup}>
        <button
          onClick={() => setView('today')}
          className={`${styles.button} ${view === 'today' ? styles.activeButton : ''}`}
        >
          Tâches du jour
        </button>
        <button
          onClick={() => setView('date')}
          className={`${styles.button} ${view === 'date' ? styles.activeButton : ''}`}
        >
          Tâches par date
        </button>
        <button
          onClick={() => setView('all')}
          className={`${styles.button} ${view === 'all' ? styles.activeButton : ''}`}
        >
          Toutes les tâches
        </button>
      </div>

      {view === 'today' && (
        <div className={styles.todoListContainer}>
          <TasksByDay
            todos={tasksForToday}
            toggleCompletion={toggleCompletion}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo} // Ajout de la fonction updateTodo
          />
        </div>
      )}
      {view === 'date' && (
        <div className={styles.todoListContainer}>
          <TasksByDate
            todos={tasksByDate}
            toggleCompletion={toggleCompletion}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo} // Ajout de la fonction updateTodo
          />
        </div>
      )}
      {view === 'all' && (
        <div className={styles.todoListContainer}>
          <AllTasks
            todos={allTasks}
            toggleCompletion={toggleCompletion}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo} // Ajout de la fonction updateTodo
          />
        </div>
      )}
    </div>
  );
};

export default Tache;
