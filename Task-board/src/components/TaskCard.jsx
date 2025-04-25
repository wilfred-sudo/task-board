// taskcard.jsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task, index, onEdit, onDelete, onClick }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided) => (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 p-3 mb-2 rounded shadow-sm cursor-grab text-gray-800 dark:text-gray-100"
        onClick={() => onClick(task)}
      >
        <div className="flex justify-between items-center">
          <span>{task.title}</span>
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mr-2"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              Delete
            </button>
          </div>
        </div>
        {/* You can add more task details here */}
      </div>
    )}
  </Draggable>
);

export default TaskCard;