import React from "react";
import handles from "./Step.css";
import { Field, TextInput, SelectInput, OptionCards } from "../../fields";
import {
  TIPO_SOLICITUD_OPTIONS,
  ACTIVIDADES_INDEPENDIENTE,
  ACTIVIDADES_NEGOCIO,
} from "../../../constants/catalog";

export function StepPerfil({ data, errors, update }) {

  return (
    <div className={handles.stepContent}>
      <Field label="¿Cuál es tu perfil profesional?" required>
        <OptionCards
          columns={3}
          options={TIPO_SOLICITUD_OPTIONS}
          value={data.tipoSolicitud}
          onChange={(v) => update("tipoSolicitud", v)}
        />
      </Field>

      {data.tipoSolicitud === "estudiante" && (
        <>
          <Field label="Nombre de la academia" required error={errors.academiaNombre}>
            <TextInput
              value={data.academiaNombre}
              onChange={(v) => update("academiaNombre", v)}
              error={errors.academiaNombre}
              placeholder="Nombre de tu institución"
            />
          </Field>
          <div className={handles.row}>
            <Field label="Dirección de la academia">
              <TextInput
                value={data.academiaDireccion}
                onChange={(v) => update("academiaDireccion", v)}
                placeholder="Opcional"
              />
            </Field>
            <Field label="Teléfono de la academia" required error={errors.academiaTelefono}>
              <TextInput
                value={data.academiaTelefono}
                onChange={(v) => update("academiaTelefono", v.replace(/[^0-9]/g, ""))}
                error={errors.academiaTelefono}
                maxLength={10}
                inputMode="numeric"
              />
            </Field>
          </div>
          <Field label="Fecha de graduación estimada" required error={errors.fechaGraduacion}>
            <TextInput
              type="date"
              value={data.fechaGraduacion}
              onChange={(v) => update("fechaGraduacion", v)}
              error={errors.fechaGraduacion}
            />
          </Field>
        </>
      )}

      {data.tipoSolicitud === "independiente" && (
        <Field label="Actividad principal" required>
          <SelectInput
            value={data.actividadIndependiente}
            onChange={(v) => update("actividadIndependiente", v)}
          >
            {ACTIVIDADES_INDEPENDIENTE.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </SelectInput>
        </Field>
      )}

      {data.tipoSolicitud === "propietario" && (
        <>
          <Field label="Nombre del negocio" required error={errors.negocioNombre}>
            <TextInput
              value={data.negocioNombre}
              onChange={(v) => update("negocioNombre", v)}
              error={errors.negocioNombre}
            />
          </Field>
          <div className={handles.row}>
            <Field label="RUC del negocio" required error={errors.negocioRuc}>
              <TextInput
                value={data.negocioRuc}
                onChange={(v) => update("negocioRuc", v.replace(/[^0-9]/g, ""))}
                error={errors.negocioRuc}
                maxLength={13}
                inputMode="numeric"
              />
            </Field>
            <Field label="Actividad del negocio" required>
              <SelectInput
                value={data.actividadNegocio}
                onChange={(v) => update("actividadNegocio", v)}
              >
                {ACTIVIDADES_NEGOCIO.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </SelectInput>
            </Field>
          </div>
        </>
      )}
    </div>
  );
}
