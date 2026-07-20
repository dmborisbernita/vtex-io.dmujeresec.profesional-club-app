import React from "react";
import handles from "./Field.css";

export function Field({ label, required, error, hint, children }) {
  
  return (
    <div className={handles.field}>
      <label className={handles.label}>
        {label}
        {required && <span className={handles.req}>*</span>}
      </label>
      {children}
      {hint && !error && <span className={handles.hint}>{hint}</span>}
      {error && <span className={handles.error}>{error}</span>}
    </div>
  );
}
