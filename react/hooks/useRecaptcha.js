import React, { useState } from "react";

export function useRecaptcha() {
  const [siteKey, setSiteKey] = useState(null);

  React.useEffect(() => {
    fetch("/_v/club-profesional/config")
      .then((r) => r.json())
      .then((cfg) => {
        if (!cfg.recaptchaSiteKey) return;
        setSiteKey(cfg.recaptchaSiteKey);
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${cfg.recaptchaSiteKey}`;
        document.head.appendChild(script);
      })
      .catch(() => {
        // Si falla, seguimos solo con el honeypot como protección mínima.
      });
  }, []);

  async function getToken() {
    if (!siteKey || !window.grecaptcha) return null;
    return window.grecaptcha.execute(siteKey, { action: "submit_solicitud" });
  }

  return { getToken };
}
