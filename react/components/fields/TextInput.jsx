import React from "react";
import handles from "./Input.css";


export function TextInput({ value, onChange, error, ...props }) {
  
  return (
    <input
      className={`${handles.input}${error ? ` ${handles.inputError}` : ""}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
}
