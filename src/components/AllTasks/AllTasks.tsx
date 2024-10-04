import React from 'react';
import { Todo } from '../../types';
import TodoList from '../TodoList/TodoList';
import styles from './AllTasks.module.css';

interface AllTasksProps {
  todos: Todo[];
  toggleCompletion: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (updatedTodo: Todo) => void; // Ajout de updateTodo
}

const AllTasks: React.FC<AllTasksProps> = ({ todos, toggleCompletion, deleteTodo, updateTodo }) => {
  const sortedTodos = todos.sort((a, b) => a.date.getTime() - b.date.getTime());
  const todosToDo = sortedTodos.filter(todo => !todo.completed);
  const completedTodos = sortedTodos.filter(todo => todo.completed);

  return (
    <div className={styles.allTasks}>
      <h3 className={styles.sectionTitle}>Tâches à faire</h3>
      <TodoList todos={todosToDo} toggleCompletion={toggleCompletion} deleteTodo={deleteTodo} updateTodo={updateTodo} />

      <h3 className={styles.sectionTitle}>Tâches terminées</h3>
      <TodoList todos={completedTodos} toggleCompletion={toggleCompletion} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </div>
  );
};

export default AllTasks;
