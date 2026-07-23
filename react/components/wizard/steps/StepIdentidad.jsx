import React from "react";
import handles from "./Step.css";
import { Field, TextInput, OptionCards } from "../../fields";

const MAX_FECHA_NACIMIENTO = (() => {
  const hoy = new Date();
  hoy.setFullYear(hoy.getFullYear() - 18);
  return hoy.toISOString().slice(0, 10);
})();

export function StepIdentidad({ data, errors, update }) {
  const esCedula = data.tipoId === "cedula";
  const longitudDocumento = esCedula ? 10 : 13;

  function handleTipoIdChange(tipo) {
    update("tipoId", tipo);
    update("numeroId", "");
  }

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
            onChange={handleTipoIdChange}
          />
        </Field>
        <Field
          label={esCedula ? "Número de cédula" : "Número de RUC"}
          required
          error={errors.numeroId}
          hint={`${longitudDocumento} dígitos`}
        >
          <TextInput
            value={data.numeroId}
            onChange={(v) =>
              update("numeroId", v.replace(/[^0-9]/g, "").slice(0, longitudDocumento))
            }
            error={errors.numeroId}
            maxLength={longitudDocumento}
            inputMode="numeric"
            placeholder={esCedula ? "0102030405" : "0102030405001"}
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
            max={MAX_FECHA_NACIMIENTO}
          />
        </Field>
        <Field label="Género" required error={errors.genero}>
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
