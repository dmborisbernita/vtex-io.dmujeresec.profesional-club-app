import React from "react";
import handles from "./OptionCards.css";


export function OptionCards({ options, value, onChange, columns }) {
  
  return (
    <div className={handles.options} style={{ "--cols": columns || options.length }}>
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = value === opt.value;
        return (
          <button
            type="button"
            key={opt.value}
            className={`${handles.option}${active ? ` ${handles.optionActive}` : ""}`}
            onClick={() => onChange(opt.value)}
          >
            {Icon && <Icon size={20} strokeWidth={1.6} />}
            <span className={handles.optionLabel}>{opt.label}</span>
            {opt.desc && <span className={handles.optionDesc}>{opt.desc}</span>}
          </button>
        );
      })}
    </div>
  );
}
