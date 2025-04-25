const API_URL = 'https://68076032e81df7060eb9f118.mockapi.io/api/v1/tasks';

export const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (err) {
    console.error('Error fetching tasks:', err);
    return [];
  }
};

export const addTask = async (newTask) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    return await response.json();
  } catch (err) {
    console.error('Error adding task:', err);
    return null;
  }
};

export const updateTask = async (id, updatedTask) => {
  try {
    const response = await fetch(${API_URL}/${id}, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    return await response.json();
  } catch (err) {
    console.error('Error updating task:', err);
    return null;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(${API_URL}/${id}, { method: 'DELETE' });
    return response.ok;
  } catch (err) {
    console.error('Error deleting task:', err);
    return false;
  }
};