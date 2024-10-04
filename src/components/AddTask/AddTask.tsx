import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './AddTask.module.css';

interface AddTaskProps {
  addTodo: (text: string, date: Date) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleAddTask = () => {
    if (inputValue.trim() === '' || !selectedDate) return;
    addTodo(inputValue, selectedDate);
    setInputValue('');
    setSelectedDate(new Date());
  };

  return (
    <div className={styles.addTask}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Entrez votre tâche..."
        className={styles.input}
      />
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        className={styles.datePicker}
      />
      <button onClick={handleAddTask} className={styles.button}>Enregistrer</button>
    </div>
  );
};

export default AddTask;
