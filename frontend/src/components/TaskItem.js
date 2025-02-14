import React, { useState } from 'react';

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleUpdate = () => {
    updateTask(task.id, updatedTask);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;