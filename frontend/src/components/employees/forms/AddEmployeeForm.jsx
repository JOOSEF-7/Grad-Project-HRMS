import { useState } from 'react';

const AddEmployeeForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    type: '',
    attendance: 'On Time',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Employee name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="">Select type</option>
        <option value="Full Time">Full Time</option>
        <option value="Part Time">Part Time</option>
      </select>

      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;
