// src/components/CustomSelect.js
import React from "react";

const CustomSelect = ({ itemType, setItemType }) => {
  const handleChange = (event) => {
    setItemType(event.target.value);
  };

  return (
    <div className="">
      <select
        name="itemType"
        id="itemType"
        value={itemType}
        onChange={handleChange}
        className="px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="backlog">Volvo</option>
        <option value="inProgress">Saab</option>
        <option value="completed">Mercedes</option>
      </select>
    </div>
  );
};

export default CustomSelect;
