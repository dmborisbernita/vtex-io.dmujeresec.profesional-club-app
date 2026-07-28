import React from "react";
import {
  Star,
  Gift,
  Tag,
  ShieldCheck,
  Heart,
  Sparkles,
  Percent,
  Calendar,
  Clock,
  Award,
  Users,
  CheckCircle,
  Zap,
  Gem,
  Crown,
  ThumbsUp,
  Truck,
  MessageCircle,
  Smile,
  BadgePercent,
} from "lucide-react";
import handles from "./WhyJoinCards.css";

const ICONS = {
  star: Star,
  gift: Gift,
  tag: Tag,
  "shield-check": ShieldCheck,
  heart: Heart,
  sparkles: Sparkles,
  percent: Percent,
  calendar: Calendar,
  clock: Clock,
  award: Award,
  users: Users,
  "check-circle": CheckCircle,
  zap: Zap,
  gem: Gem,
  crown: Crown,
  "thumbs-up": ThumbsUp,
  truck: Truck,
  "message-circle": MessageCircle,
  smile: Smile,
  "badge-percent": BadgePercent,
};

const ICON_KEYS = Object.keys(ICONS);

function WhyJoinCards({ title, cards }) {
  const list = Array.isArray(cards) ? cards : [];

  return (
    <section className={handles.whyJoinRoot}>
      {title ? (
        <h2 className={handles.whyJoinTitle}>
          <span className={handles.whyJoinTitleText}>{title}</span>
        </h2>
      ) : null}

      <div className={handles.whyJoinGrid}>
        {list.map((card, i) => {
          const Icon = ICONS[card.icon] || Star;
          return (
            <div className={handles.whyJoinCard} key={i} tabIndex={0}>
              <div className={handles.whyJoinCardBody}>
                <Icon
                  className={handles.whyJoinIcon}
                  size={22}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <p className={handles.whyJoinLine1}>{card.line1}</p>
                <p className={handles.whyJoinLine2}>{card.line2}</p>
              </div>
              {card.hoverText ? (
                <p className={handles.whyJoinHoverText}>{card.hoverText}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

WhyJoinCards.defaultProps = {
  title: "¿Por qué unirte?",
  cards: [
    {
      icon: "star",
      line1: "20% de descuento",
      line2: "en tu primera compra",
      hoverText: "Aplica en tu primera compra al unirte al club.",
    },
    {
      icon: "gift",
      line1: "Beneficios especiales",
      line2: "en tu cumpleaños",
      hoverText: "Recibe un descuento especial durante tu mes de cumpleaños.",
    },
    {
      icon: "tag",
      line1: "Descuentos y promociones",
      line2: "permanentes todo el año",
      hoverText: "10% de descuento como estudiante, 15% como profesional.",
    },
    {
      icon: "shield-check",
      line1: "Validación rápida",
      line2: "y segura",
      hoverText: "Tu solicitud se valida de forma rápida y segura.",
    },
  ],
};

// Respaldo del schema por si el Site Editor no toma interfaces.json (versiones antiguas del builder store).
WhyJoinCards.schema = {
  title: "Por qué unirte (tarjetas)",
  type: "object",
  properties: {
    title: { title: "Título de la sección", type: "string" },
    cards: {
      title: "Tarjetas",
      type: "array",
      items: {
        title: "Tarjeta",
        type: "object",
        properties: {
          icon: {
            title: "Ícono",
            type: "string",
            enum: ICON_KEYS,
            default: "star",
          },
          line1: { title: "Texto línea 1", type: "string" },
          line2: { title: "Texto línea 2", type: "string" },
          hoverText: {
            title: "Texto al pasar el mouse (hover)",
            type: "string",
          },
        },
      },
    },
  },
};

export default WhyJoinCards;
