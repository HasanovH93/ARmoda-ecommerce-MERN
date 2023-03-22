import React from "react";

const CheckboxGroup = ({ type, options, handleCheckboxChange }) => {
  return (
    <div className="checkbox-group">
      {options.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            value={option}
            onChange={(e) => handleCheckboxChange(type, e)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
