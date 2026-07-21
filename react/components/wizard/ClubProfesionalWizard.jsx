import React, { useState, useMemo } from "react";
import { Check, ChevronRight, ChevronLeft, CreditCard, MapPin, Sparkles, Info } from "lucide-react";
import handles from "./ClubProfesionalWizard.css";
import { Stepper } from "../Stepper";
import { MembershipCard } from "../MembershipCard";
import { StepIdentidad } from "./steps/StepIdentidad";
import { StepContacto } from "./steps/StepContacto";
import { StepPerfil } from "./steps/StepPerfil";
import { StepConfirmar } from "./steps/StepConfirmar";
import {
  STEPS,
  STEP_INFO,
  DOC_OPTIONS_BY_TIPO,
  ACTIVIDADES_INDEPENDIENTE,
  ACTIVIDADES_NEGOCIO,
} from "../../constants/catalog";
import { INITIAL_DATA } from "../../constants/initialData";
import { useRecaptcha } from "../../hooks/useRecaptcha";
import { validateStep } from "../../utils/validateStep";



export function ClubProfesionalWizard() {

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const { getToken } = useRecaptcha();

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function update(field, value) {
    setData((d) => {
      const next = { ...d, [field]: value };
      if (field === "provincia") next.ciudad = "";
      return next;
    });
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function runValidation(current) {
    const e = validateStep(current, data);
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function goNext() {
    if (!runValidation(step)) return;
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const recaptchaToken = await getToken();
      const documentos = await Promise.all(
        data.documentos.map(async (f) => ({
          nombre: f.name,
          contenido: await readFileAsBase64(f),
        }))
      );
      const { consentimiento, ...dataToSend } = data;
      const res = await fetch("/_v/club-profesional/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...dataToSend,
          // El backend solo conoce "negocio"; "propietario" es el label/valor
          // que usa la UI para ese mismo perfil.
          tipoSolicitud: data.tipoSolicitud === "propietario" ? "negocio" : data.tipoSolicitud,
          documentos,
          recaptchaToken,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "No pudimos enviar tu solicitud");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        "No pudimos enviar tu solicitud. Verifica tu conexión e inténtalo de nuevo."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  function resetForm() {
    setData(INITIAL_DATA);
    setErrors({});
    setSubmitError(null);
    setStep(1);
    setSubmitted(false);
  }

  // TODO(dev): botón trampa para pruebas rápidas, quitar antes de producción.
  function fillFakeData() {
    setData({
      ...INITIAL_DATA,
      nombre: "María José Pérez",
      tipoId: "cedula",
      numeroId: "0102030405",
      fechaNacimiento: "1995-05-20",
      genero: "F",
      email: "maria.perez@example.com",
      telefono: "0991234567",
      provincia: "Pichincha",
      ciudad: "Quito",
      direccion: "Av. Amazonas y Naciones Unidas",
      tipoSolicitud: "estudiante",
      academiaNombre: "Academia Glow Beauty",
      academiaDireccion: "Av. 10 de Agosto",
      academiaTelefono: "0987654321",
      fechaGraduacion: "2024-12-15",
      actividadIndependiente: ACTIVIDADES_INDEPENDIENTE[0],
      negocioNombre: "Salón Bella Vita",
      negocioRuc: "1790012345001",
      actividadNegocio: ACTIVIDADES_NEGOCIO[0],
      documentos: [new File(["fake"], "cedula.jpg", { type: "image/jpeg" })],
    });
    setErrors({});
    setStep(4);
  }

  const progress = useMemo(() => {
    const fields = [
      data.nombre, data.numeroId, data.fechaNacimiento, data.email,
      data.telefono, data.provincia, data.ciudad, data.direccion,
    ];
    const filled = fields.filter((f) => String(f || "").trim() !== "").length;
    const base = (filled / fields.length) * 75;
    const bonus = step === 4 ? 25 : (step - 1) * 8;
    return Math.min(100, Math.round(base * 0.7 + bonus));
  }, [data, step]);

  const docOptions = DOC_OPTIONS_BY_TIPO[data.tipoSolicitud];

  if (submitted) {
    return (
      <div className={handles.wizardShell}>
        <div className={handles.wizardSuccess}>
          <div className={handles.wizardSuccessIcon}>
            <Check size={28} strokeWidth={2} />
          </div>
          <h1 className={handles.wizardSuccessTitle}>Solicitud enviada</h1>
          <p className={handles.wizardSuccessText}>
            Recibimos tu solicitud al Club Profesional. Nuestro equipo la revisará
            y te contactará por correo o teléfono en los próximos días hábiles.
          </p>
          <div className={handles.wizardSuccessCard}>
            <MembershipCard data={data} progress={100} />
          </div>
          <button
            type="button"
            className={`${handles.wizardBtn} ${handles.wizardBtnPrimary}`}
            onClick={resetForm}
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={handles.wizardShell}>
      <div className={handles.wizardGrid}>
        <aside className={handles.wizardAside}>
          <MembershipCard data={data} progress={progress} />
           {/* TODO(dev): botón trampa para pruebas rápidas, quitar antes de producción. */}
          <button
            type="button"
            onClick={fillFakeData}
            style={{
              alignSelf: "flex-start",
              marginBottom: "1rem",
              fontSize: "12px",
              fontFamily: "inherit",
              padding: "6px 12px",
              borderRadius: "999px",
              border: "1px dashed #E31C5F",
              background: "#FCE7EE",
              color: "#B8134A",
              cursor: "pointer",
            }}
          >
            🧪 Rellenar datos de prueba
          </button>
          <ul className={handles.wizardBenefits}>
            <li><Sparkles size={15} strokeWidth={1.8} /> Hasta 15% off en tu cuenta profesional</li>
            <li><CreditCard size={15} strokeWidth={1.8} /> Compras a 3 meses sin intereses</li>
            <li><MapPin size={15} strokeWidth={1.8} /> Envíos a nivel nacional</li>
          </ul>
        </aside>

        <section className={handles.wizardMain}>
          <header className={handles.wizardHeader}>
            <span className={handles.wizardEyebrow}>Club profesional</span>
            <h1 className={handles.wizardTitle}>Únete a la comunidad DMujeres</h1>
            <p className={handles.wizardSubtitle}>
              Completa tu solicitud en {STEPS.length} pasos y accede a beneficios exclusivos
              para profesionales de la belleza.
            </p>
          </header>

          <Stepper step={step} />

          <div className={handles.wizardStepInfo}>
            <Info size={15} strokeWidth={1.8} />
            <span>{STEP_INFO[step]}</span>
          </div>

          <div className={handles.wizardPanel}>
            <input
              type="text"
              name="website"
              value={data.website}
              onChange={(e) => update("website", e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className={handles.wizardHoneypot}
            />
            {step === 1 && <StepIdentidad data={data} errors={errors} update={update} />}
            {step === 2 && <StepContacto data={data} errors={errors} update={update} />}
            {step === 3 && <StepPerfil data={data} errors={errors} update={update} />}
            {step === 4 && (
              <StepConfirmar
                data={data}
                errors={errors}
                update={update}
                docOptions={docOptions}
              />
            )}

            {submitError && (
              <p className={`${handles.wizardError} ${handles.wizardSubmitError}`}>{submitError}</p>
            )}

            {step === 4 && (
              <>
                <label className={handles.wizardConsent}>
                  <input
                    type="checkbox"
                    checked={data.consentimiento}
                    onChange={(e) => update("consentimiento", e.target.checked)}
                  />
                  <span>
                    He leído y acepto que mis datos personales sean usados para procesar
                    esta solicitud, conforme a la Ley Orgánica de Protección de Datos
                    Personales.
                  </span>
                </label>
                {errors.consentimiento && (
                  <p className={handles.wizardError}>{errors.consentimiento}</p>
                )}
              </>
            )}

            <div className={handles.wizardNav}>
              {step > 1 ? (
                <button
                  type="button"
                  className={`${handles.wizardBtn} ${handles.wizardBtnGhost}`}
                  onClick={goBack}
                  disabled={submitting}
                >
                  <ChevronLeft size={16} /> Atrás
                </button>
              ) : <span />}
              <button
                type="button"
                className={`${handles.wizardBtn} ${handles.wizardBtnPrimary}`}
                onClick={goNext}
                disabled={submitting}
              >
                {submitting
                  ? "Enviando..."
                  : step < 4
                  ? (<>Continuar <ChevronRight size={16} /></>)
                  : "Enviar solicitud"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
