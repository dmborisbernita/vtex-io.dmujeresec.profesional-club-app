import React from "react";
import handles from "./Input.css";


export function SelectInput({ value, onChange, error, children, ...props }) {
  
  return (
    <select
      className={`${handles.input} ${handles.select}${error ? ` ${handles.inputError}` : ""}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    >
      {children}
    </select>
  );
}
