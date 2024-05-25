import React, { useState } from 'react';

function CreateTask({ onCreate }) {
  const [newTaskData, setNewTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newTaskData);
    setNewTaskData({
      title: '',
      description: '',
      dueDate: '',
    });
  };

  return (
    <div className="create-form-container">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="title">Title:</label>
        <input
          className="form__input"
          type="text"
          id="title"
          name="title"
          value={newTaskData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          className="form__input"
          name="description"
          value={newTaskData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          className="form__input"
          name="dueDate"
          value={newTaskData.dueDate}
          onChange={handleChange}
          required
        />

        <button type="submit" className="form__button">
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
