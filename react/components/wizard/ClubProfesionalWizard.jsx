import React, { useState, useMemo } from "react";
import { Check, ChevronRight, ChevronLeft, CreditCard, MapPin, Sparkles, Info, Loader2, Clock, CalendarCheck, ShieldCheck } from "lucide-react";
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

const BENEFIT_ICONS = [Sparkles, CreditCard, MapPin];

export function ClubProfesionalWizard({
  infoPanelTitle,
  infoPanelText,
  infoStat1Value,
  infoStat1Label,
  infoStat2Value,
  infoStat2Label,
  benefits,
  infoTermsText,
  infoPolicyText,
  heroTitle,
  heroSubtitle,
  promoText
}) {

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const { getToken } = useRecaptcha();

  // Evitamos URLSearchParams: el render SSR de VTEX IO expone un `window`/`location`
  // pero no ese constructor global, y truena con "URLSearchParams is not defined".
  const isDebug =
    typeof window !== "undefined" &&
    typeof window.location?.search === "string" &&
    /(?:^|[?&])debug=1(?:&|$)/.test(window.location.search);

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
        err?.message || "No pudimos enviar tu solicitud. Verifica tu conexión e inténtalo de nuevo."
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
      numeroId: "1710034065",
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
      negocioRuc: "1792060346001",
      actividadNegocio: ACTIVIDADES_NEGOCIO[0],
      documentos: [],
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
          

          <div className={handles.wizardInfoPanel}>
            <h3 className={handles.wizardInfoTitle}>{infoPanelTitle}</h3>
            <p className={handles.wizardInfoText}>{infoPanelText}</p>

            <div className={handles.wizardInfoStats}>
              <div className={handles.wizardInfoStat}>
                <Clock size={16} strokeWidth={1.8} />
                <div>
                  <span className={handles.wizardInfoStatValue}>{infoStat1Value}</span>
                  <span className={handles.wizardInfoStatLabel}>{infoStat1Label}</span>
                </div>
              </div>
              <div className={handles.wizardInfoStat}>
                <CalendarCheck size={16} strokeWidth={1.8} />
                <div>
                  <span className={handles.wizardInfoStatValue}>{infoStat2Value}</span>
                  <span className={handles.wizardInfoStatLabel}>{infoStat2Label}</span>
                </div>
              </div>
            </div>

            <h3 className={handles.wizardInfoTitle}>Beneficios</h3>
            <ul className={handles.wizardBenefits}>
              {benefits.map((benefit, i) => {
                const BenefitIcon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                // Tolera contenido viejo guardado como string antes de que
                // "benefits" pasara a ser un array de objetos { text }.
                const text = typeof benefit === "string" ? benefit : benefit?.text;
                return (
                  <li key={i}>{text}</li>
                );
              })}
            </ul>

            <small className={handles.wizardInfoDisclaimer}>{infoTermsText}</small>

            <p className={handles.wizardInfoPolicy}>
              <ShieldCheck size={14} strokeWidth={1.8} />
              {infoPolicyText}
            </p>
          </div>
          {/* <MembershipCard data={data} progress={progress} /> */}
        </aside>

        <section className={handles.wizardMain}>
          <header className={handles.wizardHeader}>
            <span className={handles.wizardEyebrow}>{heroTitle}</span>
            <h1 className={handles.wizardTitle}>{heroSubtitle}</h1>
            <p className={handles.wizardSubtitle}>
              {promoText} 
            </p>
          </header>

          <Stepper step={step} />

          <div className={handles.wizardStepInfo}>
            <Info size={15} strokeWidth={1.8} />
            <span>{STEP_INFO[step]}</span>
          </div>

          <div className={handles.wizardPanel}>
            {submitting && (
              <div className={handles.wizardLoadingOverlay} role="status" aria-live="polite">
                <Loader2 size={30} strokeWidth={2} className={handles.wizardSpinner} />
                <span className={handles.wizardLoadingTitle}>Enviando tu solicitud...</span>
                <span className={handles.wizardLoadingText}>
                  Estamos validando tus datos y documentos. Esto puede tomar unos segundos,
                  no cierres ni recargues esta página.
                </span>
              </div>
            )}
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
                {submitting ? (
                  <>
                    <Loader2 size={16} className={handles.wizardSpinner} /> Enviando...
                  </>
                ) : step < 4 ? (
                  <>Continuar <ChevronRight size={16} /></>
                ) : (
                  "Enviar solicitud"
                )}
              </button>
            </div>
          </div>
        </section>
      </div>

      {isDebug && (
        <div className={handles.wizardDebugRow}>
          {/* TODO(dev): botón trampa para pruebas rápidas, quitar antes de producción. */}
          <button
            type="button"
            onClick={fillFakeData}
            className={handles.wizardDebugBtn}
          >
            🧪 Rellenar datos de prueba
          </button>
        </div>
      )}
    </div>
  );
}

ClubProfesionalWizard.defaultProps = {
  infoPanelTitle: "Sobre el Club Profesional",
  infoPanelText:
    "Este club es un espacio pensado para quienes viven la belleza. Si eres profesional o estudiante de maquillaje, estilismo, barbería, manicura, cosmetología o áreas afines, aquí encontrarás beneficios exclusivos, descuentos especiales y el impulso que necesitas para seguir creciendo. Juntos haremos de tu pasión una historia de éxito",
  infoStat1Value: "4 días hábiles",
  infoStat1Label: "Tiempo de respuesta",
  infoStat2Value: "Hasta 4 años",
  infoStat2Label: "De vigencia según tu perfil",
  benefits: [
    { text: "✨ 20% de descuento en tu primera compra" },
    { text: "🎓 10% de descuento como estudiante, 15% como profesional — en todas tus compras" },
    { text: "🎂 5% extra en tu cumpleaños (no acumulable con tu primera compra)" },
  ],
  infoTermsText : "*Aplican términos y condiciones. 20% OFF en primera compra excluye sillonería, eléctricos, packs y marca Astra.",
  infoPolicyText:
    "Tus datos y documentos se usan solo para validar tu perfil, conforme a la Ley Orgánica de Protección de Datos Personales. La membresía se activa una vez que tu solicitud es aprobada.",
};
