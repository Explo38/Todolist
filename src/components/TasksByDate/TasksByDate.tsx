import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Todo } from '../../types';
import TodoList from '../TodoList/TodoList';
import styles from './TasksByDate.module.css';
import { isSameDay } from 'date-fns';

interface TasksByDateProps {
  todos: Todo[];
  toggleCompletion: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (updatedTodo: Todo) => void;
}

const TasksByDate: React.FC<TasksByDateProps> = ({ todos, toggleCompletion, deleteTodo, updateTodo }) => {
  const [filterDate, setFilterDate] = useState<Date | null>(null);

  // Filtrer les tâches pour la date sélectionnée
  const todosToDo = filterDate
    ? todos.filter(todo => !todo.completed && isSameDay(todo.date, filterDate))
    : [];
  const completedTodos = filterDate
    ? todos.filter(todo => todo.completed && isSameDay(todo.date, filterDate))
    : [];

  // Fonction pour ajouter une classe aux jours du calendrier qui ont des tâches
  const getDayClassName = (date: Date): string => {
    const hasTasks = todos.some(todo => isSameDay(todo.date, date));
    return hasTasks ? styles.dayWithTasks : ''; // Ajoute la classe si des tâches sont présentes
  };

  return (
    <div className={styles.tasksByDate}>
      <DatePicker
        selected={filterDate}
        onChange={(date: Date | null) => setFilterDate(date)}
        placeholderText="Sélectionner une date"
        className={styles.datePicker}
        dayClassName={getDayClassName} 
      />

      <h3 className={styles.sectionTitle}>
        Tâches pour {filterDate ? filterDate.toDateString() : 'aucune date sélectionnée'}
      </h3>

      <h4 className={styles.sectionTitle}>Tâches à faire</h4>
      <TodoList
        todos={todosToDo}
        toggleCompletion={toggleCompletion}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />

      <h4 className={styles.sectionTitle}>Tâches terminées</h4>
      <TodoList
        todos={completedTodos}
        toggleCompletion={toggleCompletion}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default TasksByDate;
