// TaskBoard.jsx (or App.jsx)
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskColumn from './components/TaskColumn';
import NewTaskForm from './components/NewTaskForm';
import SideBar from './components/SideBar';
import Settings from './components/Settings';

const initialTasks = [
  { id: '1', title: 'Learn React', status: 'toDo' },
  { id: '2', title: 'Build a component', status: 'inprogress' },
  { id: '3', title: 'Deploy the app', status: 'done' },
  { id: '4', title: 'Style the elements', status: 'toDo' },
];

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState(null);
  const [activeSidebarItem, setActiveSidebarItem] = useState('Dashboard'); // Default active item

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now().toString(), status: 'toDo' }]);
  };

  const handleEditTask = (taskToEdit) => {
    setEditingTask(taskToEdit);
    // Implement your edit form logic here
    alert(`Editing task: ${taskToEdit.title} (ID: ${taskToEdit.id})`);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleTaskClick = (task) => {
    alert(`Task "${task.title}" clicked! (ID: ${task.id})`);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTasks = [...tasks];
    const movedTaskIndex = newTasks.findIndex((task) => task.id === draggableId);
    const [movedTask] = newTasks.splice(movedTaskIndex, 1);
    movedTask.status = destination.droppableId;
    newTasks.splice(destination.index, 0, movedTask);

    setTasks(newTasks);
  };

  const handleSidebarItemClick = (itemLabel) => {
    setActiveSidebarItem(itemLabel);
  };

  const toDoTasks = tasks.filter((task) => task.status === 'toDo');
  const inProgressTasks = tasks.filter((task) => task.status === 'inprogress');
  const doneTasks = tasks.filter((task) => task.status === 'done');

  const renderContent = () => {
    switch (activeSidebarItem) {
      case 'Dashboard':
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">Task Board</h2>
            <NewTaskForm onAddTask={handleAddTask} />

            {editingTask && (
              <div>
                <h3>Edit Task</h3>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 mb-2"
                />
                <button
                  onClick={() => handleUpdateTask(editingTask)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            )}

            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex gap-4">
                <TaskColumn
                  title="To Do"
                  tasks={toDoTasks}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onTaskClick={handleTaskClick}
                />
                <TaskColumn
                  title="In Progress"
                  tasks={inProgressTasks}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onTaskClick={handleTaskClick}
                />
                <TaskColumn
                  title="Done"
                  tasks={doneTasks}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onTaskClick={handleTaskClick}
                />
              </div>
            </DragDropContext>
          </>
        );
      case 'Projects':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <p>Content for the Projects section.</p>
            {/* Add your projects-related content here */}
          </div>
        );
      case 'Settings':
        return <Settings />; // Render the Settings component
      default:
        return <div>Something went wrong.</div>;
    }
  };

  return (
    <div className="flex">
      <SideBar onItemClick={handleSidebarItemClick} />
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default TaskBoard;