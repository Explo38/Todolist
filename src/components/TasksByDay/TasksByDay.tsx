import React from 'react';
import { Todo } from '../../types';
import TodoList from '../TodoList/TodoList';
import { isToday } from 'date-fns';
import styles from './TasksByDay.module.css';

interface TasksByDayProps {
  todos: Todo[];
  toggleCompletion: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (updatedTodo: Todo) => void; // Ajout de updateTodo
}

const TasksByDay: React.FC<TasksByDayProps> = ({ todos, toggleCompletion, deleteTodo, updateTodo }) => {
  const todosForToday = todos.filter(todo => isToday(todo.date));
  const todosToDo = todosForToday.filter(todo => !todo.completed);
  const completedTodos = todosForToday.filter(todo => todo.completed);

  return (
    <div className={styles.tasksByDay}>
      <h3 className={styles.sectionTitle}>Tâches à faire du jour</h3>
      <TodoList todos={todosToDo} toggleCompletion={toggleCompletion} deleteTodo={deleteTodo} updateTodo={updateTodo} />

      <h3 className={styles.sectionTitle}>Tâches terminées</h3>
      <TodoList todos={completedTodos} toggleCompletion={toggleCompletion} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </div>
  );
};

export default TasksByDay;
