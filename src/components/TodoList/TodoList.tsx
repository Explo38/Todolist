import React, { useState } from 'react';
import { FaTrashAlt, FaEdit, FaSave } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import styles from './TodoList.module.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  date: Date;
}

interface TodoListProps {
  todos: Todo[];
  toggleCompletion: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (updatedTodo: Todo) => void; 
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleCompletion, deleteTodo, updateTodo }) => {
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [editDate, setEditDate] = useState<Date | null>(null);

  const startEditing = (todo: Todo) => {
    setEditMode(todo.id);
    setEditValue(todo.text);
    setEditDate(todo.date);
  };

  const saveEdit = (id: number) => {
    if (editValue.trim() === '' || !editDate) return;

    const updatedTodo = { id, text: editValue, completed: false, date: editDate };
    updateTodo(updatedTodo); // Utilisation de la fonction updateTodo
    setEditMode(null);
    setEditValue('');
    setEditDate(null);
  };

  return (
    <ul className={styles.todoList}>
      {todos.map(todo => (
        <li key={todo.id} className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleCompletion(todo.id)}
            className={styles.checkbox}
          />
          {editMode === todo.id && !todo.completed ? (
            <>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className={styles.editInput}
              />
              <DatePicker
                selected={editDate}
                onChange={(date: Date | null) => setEditDate(date)}
                className={styles.datePicker}
              />
              <button onClick={() => saveEdit(todo.id)} className={styles.saveButton}>
                <FaSave />
              </button>
            </>
          ) : (
            <>
              <span>{todo.text}</span>{' '}
              <span>({format(todo.date, 'dd MMM yyyy')})</span>
              {!todo.completed && (
                <button
                  className={styles.editButton}
                  onClick={() => startEditing(todo)}
                >
                  <FaEdit />
                </button>
              )}
            </>
          )}
          <button className={styles.deleteButton} onClick={() => deleteTodo(todo.id)}>
            <FaTrashAlt />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
