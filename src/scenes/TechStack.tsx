import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

const CATEGORIES = [
  {
    num: "01",
    title: "Mobile & Desktop",
    items: ["Flutter", "Dart", "Swift", "Kotlin"],
  },
  {
    num: "02",
    title: "Web",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    num: "03",
    title: "Backend & Cloud",
    items: ["Node.js", "Python", "AWS", "Firebase"],
  },
  {
    num: "04",
    title: "AI & Data",
    items: ["OpenAI", "LangChain", "PostgreSQL", "Redis"],
  },
];

const PRODUCTS = [
  { name: "Synema", category: "AI Video Production" },
  { name: "Mental Health Research Platform", category: "HIPAA-compliant Research Tech" },
  { name: "247 AICFO", category: "AI-powered Finance Automation" },
];

export const TechStack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelProgress = spring({ frame, fps, config: { damping: 120 } });
  const headProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 100 },
  });
  const headY = interpolate(headProgress, [0, 1], [28, 0]);

  /* ── VO 01:11 · frame 240 — "We've shipped products like..." ── */
  const dividerProgress = spring({
    frame: frame - 240,
    fps,
    config: { damping: 80 },
  });

  const productsLabelProgress = spring({
    frame: frame - 260,
    fps,
    config: { damping: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        padding: "64px 100px",
        display: "flex",
        flexDirection: "column",
        opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      {/* Section label */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: theme.colors.accent,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: labelProgress,
          marginBottom: 10,
        }}
      >
        Tech stack & work
      </span>

      {/* Section heading */}
      <h2
        style={{
          fontSize: 40,
          fontWeight: 700,
          color: theme.colors.textPrimary,
          margin: "0 0 6px",
          opacity: headProgress,
          transform: `translateY(${headY}px)`,
        }}
      >
        Flutter-first.{" "}
        <span style={{ color: theme.colors.textSecondary }}>Far from Flutter-only.</span>
      </h2>

      <p
        style={{
          fontSize: 16,
          color: theme.colors.textMuted,
          margin: "0 0 24px",
          opacity: headProgress,
        }}
      >
        We pick the right tool for every layer of your product.
      </p>

      {/* Category cards (compact) */}
      <div style={{ display: "flex", gap: 18 }}>
        {CATEGORIES.map((cat, i) => {
          const delay = 16 + i * 10;
          const cardProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 100 },
          });
          const cardY = interpolate(cardProgress, [0, 1], [22, 0]);

          return (
            <div
              key={cat.num}
              style={{
                flex: 1,
                background: theme.colors.surface,
                borderRadius: 14,
                padding: "22px 20px",
                border: `1px solid ${theme.colors.border}`,
                opacity: cardProgress,
                transform: `translateY(${cardY}px)`,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(to right, transparent, ${theme.colors.accent}, transparent)`,
                }}
              />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: theme.colors.accent,
                  fontFamily: "monospace",
                  marginBottom: 10,
                  letterSpacing: 1,
                }}
              >
                {cat.num}
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: theme.colors.textPrimary,
                  margin: "0 0 12px",
                }}
              >
                {cat.title}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {cat.items.map((item, j) => {
                  const itemProgress = spring({
                    frame: frame - (delay + 6 + j * 4),
                    fps,
                    config: { damping: 120 },
                  });
                  return (
                    <span
                      key={item}
                      style={{
                        fontSize: 14,
                        color: theme.colors.textSecondary,
                        opacity: itemProgress,
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: theme.colors.accent,
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Animated divider */}
      <div
        style={{
          width: `${interpolate(dividerProgress, [0, 1], [0, 100])}%`,
          height: 1,
          background: theme.colors.border,
          margin: "24px 0 16px",
        }}
      />

      {/* Products label */}
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: theme.colors.accent,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: productsLabelProgress,
          marginBottom: 14,
        }}
      >
        Products we've shipped
      </span>

      {/* Product cards */}
      <div style={{ display: "flex", gap: 18 }}>
        {PRODUCTS.map((product, i) => {
          const delay = 280 + i * 30;
          const productProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 100 },
          });
          const productY = interpolate(productProgress, [0, 1], [14, 0]);

          return (
            <div
              key={product.name}
              style={{
                flex: 1,
                background: theme.colors.surface,
                borderRadius: 12,
                padding: "18px 22px",
                border: `1px solid ${theme.colors.border}`,
                opacity: productProgress,
                transform: `translateY(${productY}px)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(to right, ${theme.colors.accent}, ${theme.colors.accentSoft})`,
                }}
              />
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: theme.colors.textPrimary,
                  margin: "0 0 4px",
                }}
              >
                {product.name}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: theme.colors.accent,
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {product.category}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
