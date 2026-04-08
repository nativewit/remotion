import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/**
 * PROOF — 33–48s (450 frames)
 * Product montage — categories + cross-domain tagline.
 */

const PRODUCTS = [
  {
    category: "Payments",
    description: "Payment flows that handle scale.",
    color: theme.colors.blue,
  },
  {
    category: "Clinical",
    description: "Clinical tools that work offline.",
    color: theme.colors.green,
  },
  {
    category: "Video",
    description: "AI-powered video production platforms.",
    color: "#8b5cf6",
  },
  {
    category: "Marketplaces",
    description: "Marketplace platforms across industries.",
    color: theme.colors.accentSoft,
  },
];

export const Proof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Scene transitions ──────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const exitFade = interpolate(frame, [420, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Header ─────────────────────────────────────────────── */
  const headReveal = interpolate(frame, [10, 50], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Bottom tagline ─────────────────────────────────────── */
  const taglineProgress = spring({
    frame: frame - 323,
    fps,
    config: { damping: 100 },
  });
  const taglineY = interpolate(taglineProgress, [0, 1], [16, 0]);

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        padding: "80px 120px",
        display: "flex",
        flexDirection: "column",
        opacity: Math.min(entryFade, exitFade),
      }}
    >
      {/* Section heading */}
      <h2
        style={{
          fontSize: 48,
          fontWeight: 800,
          color: theme.colors.textPrimary,
          margin: "0 0 12px",
          letterSpacing: "-1.5px",
          clipPath: `inset(0 ${100 - headReveal}% 0 0)`,
        }}
      >
        What we've shipped.
      </h2>
      <p
        style={{
          fontSize: 18,
          color: theme.colors.textMuted,
          margin: "0 0 56px",
          opacity: interpolate(frame, [40, 70], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Real products. Real scale. Real users.
      </p>

      {/* Product cards — montage grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          flex: 1,
        }}
      >
        {PRODUCTS.map((product, i) => {
          const cardDelays = [15, 61, 142, 227];
          const delay = cardDelays[i];
          const cardProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 80, mass: 0.5 },
          });
          const cardScale = interpolate(cardProgress, [0, 1], [0.9, 1]);
          const cardY = interpolate(cardProgress, [0, 1], [24, 0]);

          /* Active glow while VO discusses this category */
          const nextDelay = cardDelays[i + 1] ?? 450;
          const isActive = frame >= delay && frame < nextDelay + 40;

          return (
            <div
              key={product.category}
              style={{
                background: theme.colors.surface,
                borderRadius: 16,
                padding: "32px 36px",
                border: `1px solid ${isActive ? product.color + "55" : theme.colors.border}`,
                opacity: cardProgress,
                transform: `translateY(${cardY}px) scale(${cardScale})`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: `${interpolate(cardProgress, [0, 1], [0, 100])}%`,
                  height: 3,
                  background: product.color,
                  borderRadius: "16px 16px 0 0",
                }}
              />

              {/* Category badge */}
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: product.color,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {product.category}
              </span>

              {/* Description */}
              <p
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: theme.colors.textPrimary,
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {product.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Cross-domain tagline */}
      <p
        style={{
          fontSize: 22,
          color: theme.colors.textSecondary,
          margin: "36px 0 0",
          opacity: taglineProgress,
          transform: `translateY(${taglineY}px)`,
          textAlign: "center",
        }}
      >
        We bring{" "}
        <span style={{ color: theme.colors.accent, fontWeight: 700 }}>
          cross-domain pattern recognition
        </span>{" "}
        to every engagement.
      </p>
    </AbsoluteFill>
  );
};
