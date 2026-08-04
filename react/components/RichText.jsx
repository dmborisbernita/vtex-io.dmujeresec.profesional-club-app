import React from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

// Solo formato inline (negrita, cursiva, links, código); nada de encabezados,
// listas ni HTML crudo, para que un texto corto del Site Editor no rompa el
// layout de por sí. react-markdown ya escapa HTML por defecto (sin rehype-raw),
// así que esto no abre una puerta de XSS aunque el contenido venga de terceros.
// remark-breaks hace que un solo "\n" en el texto (p.ej. desde blocks.jsonc)
// se renderice como <br/>, en vez de requerir la sintaxis markdown de doble
// espacio al final de línea para forzar un salto.
const ALLOWED_ELEMENTS = ["strong", "em", "a", "code", "br"];
const COMPONENTS = { p: React.Fragment };

export function RichText({ children }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkBreaks]}
      allowedElements={ALLOWED_ELEMENTS}
      unwrapDisallowed
      components={COMPONENTS}
    >
      {children || ""}
    </ReactMarkdown>
  );
}
