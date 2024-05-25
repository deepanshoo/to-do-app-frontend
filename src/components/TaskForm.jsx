import React, { useState } from 'react';

function TaskForm({ task, onUpdate }) {
  const [formData, setFormData] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="title">Title:</label>
      <input
        className="form__input"
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        className="form__input"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="dueDate">Due Date:</label>
      <input
        type="date"
        id="dueDate"
        className="form__input"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        required
      />

      <button type="submit" className="form__button">
        Update Task
      </button>
    </form>
  );
}

export default TaskForm;
