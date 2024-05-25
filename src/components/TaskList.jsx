import React from 'react';
import TaskForm from './TaskForm';

function TaskList({ tasks, onUpdateStatus, onEditClick, onDeleteClick, editingTask, onUpdateTask }) {
  return (
    <div>
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
                onClick={() => onUpdateStatus(task._id, 'in-progress')}
                disabled={task.status === 'in-progress'}
              >
                Mark as In Progress
              </button>
              <button
                className="form__button"
                onClick={() => onUpdateStatus(task._id, 'completed')}
                disabled={task.status === 'completed'}
              >
                Mark as Completed
              </button>
            </div>
            <div className="buttons">
              <button className="form__button" onClick={() => onEditClick(task)}>
                Edit
              </button>
              <button className="form__button" onClick={() => onDeleteClick(task._id)}>
                Delete
              </button>
            </div>
            {editingTask && editingTask._id === task._id && (
              <TaskForm task={editingTask} onUpdate={(updatedTask) => onUpdateTask(updatedTask, task._id)} />
            )}
          </div>
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
}

export default TaskList;
