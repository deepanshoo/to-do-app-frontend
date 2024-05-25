import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import CreateTask from './components/CreateTask';
import useTasks from './hooks/useTasks';

function App() {
  const { tasks, createTask, updateTaskStatus, updateTask, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  return (
    <div className="container">
      <h1 className="title">Todo App</h1>
      <CreateTask onCreate={createTask} />
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className="task">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <div className="buttons">
              <button
                className="form__button"
                onClick={() => updateTaskStatus(task._id, 'in-progress')}
                disabled={task.status === 'in-progress'}
              >
                Mark as In Progress
              </button>
              <button
                className="form__button"
                onClick={() => updateTaskStatus(task._id, 'completed')}
                disabled={task.status === 'completed'}
              >
                Mark as Completed
              </button>
              <button className="form__button" onClick={() => handleEditClick(task)}>
                Edit
              </button>
              <button className="form__button" onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </div>
            {editingTask && editingTask._id === task._id && (
              <TaskForm task={editingTask} onUpdate={(updatedTask) => updateTask(updatedTask, task._id)} />
            )}
          </div>
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
}

export default App;
