// newtaskform.jsx
import React, { useState } from 'react';

const NewTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim()) {
      onAddTask({ title });
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex items-center">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline mr-2 bg-white dark:bg-gray-700"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Task
      </button>
    </form>
  );
};

export default NewTaskForm;