import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

const STATS = [
  { value: "30+", label: "Products shipped" },
  { value: "5.0", label: "Clutch rating" },
  { value: "12 wks", label: "Avg. to launch" },
  { value: "99.7%", label: "Crash-free rate" },
];

const TESTIMONIALS = [
  {
    quote:
      "They approach complex technical challenges with creativity and clarity — like an embedded wing of our company.",
    name: "Yis Tigay",
    title: "CEO, Synema",
    initials: "YT",
  },
  {
    quote:
      "What stood out was the direct involvement of their founder. His hands-on approach added a layer of expertise and accountability that greatly benefited the project.",
    name: "Elliot Cohen",
    title: "CEO, Pebl",
    initials: "EC",
  },
  {
    quote:
      "Their expertise in mobile app development was outstanding. Always responsible to deliver on time. Completely satisfied after years of working with them.",
    name: "Shahin Motevalli",
    title: "Senior IT Manager, Rotortrade",
    initials: "SM",
  },
];

export const Testimonials: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Scene fade-in ────────────────────────────────────── */
  const sceneFade = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  /* ── VO 01:37–01:44 · frames 0–210 — stats appear ───── */
  const labelProgress = spring({ frame, fps, config: { damping: 120 } });
  const headProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 100 },
  });
  const headY = interpolate(headProgress, [0, 1], [24, 0]);

  /* ── VO 01:48–01:56 · frame 330 — Witflo mention ────── */
  const witfloProgress = spring({
    frame: frame - 330,
    fps,
    config: { damping: 100 },
  });
  const witfloY = interpolate(witfloProgress, [0, 1], [14, 0]);

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        padding: "60px 100px",
        display: "flex",
        flexDirection: "column",
        opacity: sceneFade,
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
        Track record
      </span>

      {/* Section heading */}
      <h2
        style={{
          fontSize: 40,
          fontWeight: 700,
          color: theme.colors.textPrimary,
          margin: "0 0 28px",
          opacity: headProgress,
          transform: `translateY(${headY}px)`,
        }}
      >
        Results that speak for themselves.
      </h2>

      {/* Stats row + Witflo badge */}
      <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
        {STATS.map((stat, i) => {
          const delay = 15 + i * 40;
          const statProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 80 },
          });
          const statScale = interpolate(statProgress, [0, 1], [0.85, 1]);
          const statY = interpolate(statProgress, [0, 1], [14, 0]);

          return (
            <div
              key={stat.label}
              style={{
                flex: 1,
                background: theme.colors.surface,
                borderRadius: 12,
                padding: "18px 16px",
                border: `1px solid ${theme.colors.border}`,
                opacity: statProgress,
                transform: `translateY(${statY}px) scale(${statScale})`,
                textAlign: "center",
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
                  fontSize: 30,
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentSoft})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-1px",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: theme.colors.textMuted,
                  margin: "5px 0 0",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </p>
            </div>
          );
        })}

        {/* Witflo open-source badge */}
        <div
          style={{
            flex: 1.5,
            background: theme.colors.surface,
            borderRadius: 12,
            padding: "16px 20px",
            border: `1px solid ${theme.colors.accent}44`,
            opacity: witfloProgress,
            transform: `translateY(${witfloY}px)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
              background: theme.colors.accent,
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: theme.colors.accent,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 5,
            }}
          >
            Open Source
          </span>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: theme.colors.textPrimary,
              margin: "0 0 3px",
            }}
          >
            Witflo
          </p>
          <p
            style={{
              fontSize: 12,
              color: theme.colors.textSecondary,
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Zero-trust encryption · 6 platforms
          </p>
        </div>
      </div>

      {/* Three testimonials */}
      <div style={{ display: "flex", gap: 18, flex: 1 }}>
        {TESTIMONIALS.map((t, i) => {
          const delay = 380 + i * 50;
          const cardProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 100 },
          });
          const cardY = interpolate(cardProgress, [0, 1], [22, 0]);

          return (
            <div
              key={t.name}
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
              <span
                style={{
                  fontSize: 32,
                  color: theme.colors.accent,
                  lineHeight: 1,
                  marginBottom: 8,
                  fontFamily: "Georgia, serif",
                }}
              >
                "
              </span>
              <p
                style={{
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  lineHeight: 1.6,
                  margin: "0 0 16px",
                  flex: 1,
                }}
              >
                {t.quote}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentSoft})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: theme.colors.textPrimary,
                      margin: 0,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: theme.colors.textMuted,
                      margin: "2px 0 0",
                    }}
                  >
                    {t.title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
