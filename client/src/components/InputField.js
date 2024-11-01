// src/components/InputField.js

import React from "react";

const InputField = ({
  label,
  type,
  value,
  onChange,
  required,
  placeholder,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
