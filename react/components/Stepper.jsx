import React from "react";
import { Check } from "lucide-react";
import handles from  "./Stepper.css";
import { STEPS } from "../constants/catalog";


export function Stepper({ step }) {
  return (
    <ol className={handles.stepperList}>
      {STEPS.map((s) => (
        <li
          key={s.id}
          className={`${handles.stepperItem}${s.id === step ? ` ${handles.stepperItemActive}` : ""}${
            s.id < step ? ` ${handles.stepperItemDone}` : ""
          }`}
        >
          <span className={handles.stepperDot}>{s.id < step ? <Check size={13} /> : s.id}</span>
          <span className={handles.stepperLabel}>{s.label}</span>
        </li>
      ))}
    </ol>
  );
}
