import React from "react";
import handles from "./Step.css";
import { Field, TextInput, SelectInput } from "../../fields";
import { PROVINCES, CITIES_BY_PROVINCE } from "../../../constants/locations";


export function StepContacto({ data, errors, update }) {

  const cities = data.provincia ? CITIES_BY_PROVINCE[data.provincia] || [] : [];

  return (
    <div className={handles.stepContent}>
      <div className={handles.row}>
        <Field label="Correo electrónico" required error={errors.email}>
          <TextInput
            type="email"
            value={data.email}
            onChange={(v) => update("email", v)}
            error={errors.email}
            placeholder="nombre@ejemplo.com"
          />
        </Field>
        <Field label="Teléfono" required error={errors.telefono}>
          <TextInput
            value={data.telefono}
            onChange={(v) => update("telefono", v.replace(/[^0-9]/g, ""))}
            error={errors.telefono}
            maxLength={10}
            inputMode="numeric"
            placeholder="0991234567"
          />
        </Field>
      </div>

      <div className={handles.row}>
        <Field label="Provincia" required error={errors.provincia}>
          <SelectInput
            value={data.provincia}
            onChange={(v) => update("provincia", v)}
            error={errors.provincia}
          >
            <option value="">Selecciona una provincia</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Ciudad" required error={errors.ciudad}>
          <SelectInput
            value={data.ciudad}
            onChange={(v) => update("ciudad", v)}
            error={errors.ciudad}
            disabled={!data.provincia}
          >
            <option value="">
              {data.provincia ? "Selecciona una ciudad" : "Elige primero una provincia"}
            </option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </SelectInput>
        </Field>
      </div>

      <Field label="Dirección" required error={errors.direccion}>
        <TextInput
          value={data.direccion}
          onChange={(v) => update("direccion", v)}
          error={errors.direccion}
          placeholder="Calle principal y secundaria, referencia"
        />
      </Field>
    </div>
  );
}
