import React from "react";
import handles from "./Step.css";
import { Field, TextInput, OptionCards } from "../../fields";

export function StepIdentidad({ data, errors, update }) {

  return (
    <div className={handles.stepContent}>
      <Field label="Nombre completo" required error={errors.nombre}>
        <TextInput
          value={data.nombre}
          onChange={(v) => update("nombre", v)}
          error={errors.nombre}
          placeholder="María Fernanda Torres"
        />
      </Field>

      <div className={handles.row}>
        <Field label="Tipo de identificación" required>
          <OptionCards
            columns={2}
            options={[
              { value: "cedula", label: "Cédula" },
              { value: "ruc", label: "RUC" },
            ]}
            value={data.tipoId}
            onChange={(v) => update("tipoId", v)}
          />
        </Field>
        <Field
          label={data.tipoId === "cedula" ? "Número de cédula" : "Número de RUC"}
          required
          error={errors.numeroId}
        >
          <TextInput
            value={data.numeroId}
            onChange={(v) => update("numeroId", v.replace(/[^0-9]/g, ""))}
            error={errors.numeroId}
            maxLength={13}
            inputMode="numeric"
            placeholder="0102030405"
          />
        </Field>
      </div>

      <div className={handles.row}>
        <Field label="Fecha de nacimiento" required error={errors.fechaNacimiento}>
          <TextInput
            type="date"
            value={data.fechaNacimiento}
            onChange={(v) => update("fechaNacimiento", v)}
            error={errors.fechaNacimiento}
          />
        </Field>
        <Field label="Género" required>
          <OptionCards
            columns={2}
            options={[
              { value: "F", label: "Femenino" },
              { value: "M", label: "Masculino" },
            ]}
            value={data.genero}
            onChange={(v) => update("genero", v)}
          />
        </Field>
      </div>
    </div>
  );
}
