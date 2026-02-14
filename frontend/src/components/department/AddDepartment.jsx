import axios from "axios";
import React, { useState } from "react"
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
    const[department,setDepartment]=useState({
        dep_name:"",
        description:"",

    })
    const navigate = useNavigate();
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setDepartment({...department,[name]:value});
    }
     const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/departments", department);

    navigate("/leave");
  };

  return (
     <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
  <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
    Add Department
  </h3>

  <form className="space-y-5" onSubmit={handleSubmit}>
    {/* Department Name */}
    <div className="flex flex-col gap-1">
      <label
        htmlFor="dep-name"
        className="text-sm font-medium text-gray-700"
      >
        Department Name
      </label>
      <input
        name="dep_name"
        type="text"
        onChange={handleChange}
    
        placeholder="Enter Department Name"
        className="px-4 py-2 border border-gray-300 rounded-md outline-none
                   focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      />
    </div>

    {/* Description */}
    <div className="flex flex-col gap-1">
      <label
        htmlFor="description"
        className="text-sm font-medium text-gray-700"
      >
        Description
      </label>
      <textarea
        name="description"
        rows="4"
        onChange={handleChange}
        placeholder="Department Description"
        className="px-4 py-2 border border-gray-300 rounded-md resize-none outline-none
                   focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      />
    </div>

    {/* Button */}
    <button
      type="submit"
      className="w-full bg-teal-600 text-white py-2 rounded-md font-semibold
                 hover:bg-teal-700 transition duration-200"
    >
      Add Department
    </button>
  </form>
</div>

  );

};

export default AddDepartment;