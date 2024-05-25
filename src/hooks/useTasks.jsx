import { useState, useEffect } from 'react';

function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      try {
        const res = await fetch('https://to-do-app-backend-jmiy.onrender.com/todo/tasks');
        const tasksData = await res.json();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    getTasks();
  }, []);

  const createTask = async (newTaskData) => {
    try {
      const res = await fetch('https://to-do-app-backend-jmiy.onrender.com/todo/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskData),
      });

      if (!res.ok) {
        throw new Error('Failed to create task');
      }

      const newTask = await res.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await fetch(`https://to-do-app-backend-jmiy.onrender.com/todo/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const updateTask = async (updatedTask, taskId) => {
    try {
      const res = await fetch(`https://to-do-app-backend-jmiy.onrender.com/todo/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTaskData = await res.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTaskData._id ? updatedTaskData : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`https://to-do-app-backend-jmiy.onrender.com/todo/tasks/${taskId}`, {
        method: 'DELETE',
      });

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return { tasks, createTask, updateTaskStatus, updateTask, deleteTask };
}

export default useTasks;
