import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/**
 * AUTHORITY — 15–33s (540 frames)
 * "We're Nativewit" — who we are + credibility stats.
 */

const STATS = [
  { value: "8+", label: "Years with Flutter" },
  { value: "30+", label: "Products shipped" },
  { value: "AU / US", label: "Clients across" },
];

const VERTICALS = ["Fintech", "Healthtech", "Video"];

export const Authority: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Scene transitions ──────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const exitFade = interpolate(frame, [510, 540], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Logo ───────────────────────────────────────────────── */
  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 100, mass: 0.5 },
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0.7, 1]);

  /* ── Brand name ─────────────────────────────────────────── */
  const nameReveal = interpolate(frame, [18, 55], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Subtitle ───────────────────────────────────────────── */
  const subtitleProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 120 },
  });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [12, 0]);

  /* ── Divider ────────────────────────────────────────────── */
  const dividerWidth = interpolate(frame, [120, 170], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Verticals ──────────────────────────────────────────── */
  const verticalsProgress = spring({
    frame: frame - 360,
    fps,
    config: { damping: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: Math.min(entryFade, exitFade),
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}15 0%, transparent 70%)`,
          filter: "blur(60px)",
          opacity: logoProgress,
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: logoProgress,
          transform: `scale(${logoScale})`,
          marginBottom: 24,
        }}
      >
        <Img
          src={staticFile("logo.png")}
          style={{ width: 100, height: "auto" }}
        />
      </div>

      {/* Brand name — clip-reveal */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: theme.colors.textPrimary,
          margin: 0,
          letterSpacing: "-2px",
          clipPath: `inset(0 ${100 - nameReveal}% 0 0)`,
        }}
      >
        We're{" "}
        <span style={{ color: theme.colors.accent }}>Nativewit.</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 24,
          fontWeight: 500,
          color: theme.colors.textSecondary,
          margin: "16px 0 0",
          opacity: subtitleProgress,
          transform: `translateY(${subtitleY}px)`,
          letterSpacing: 1,
        }}
      >
        Flutter-first product engineering studio.
      </p>

      {/* Divider */}
      <div
        style={{
          width: `${dividerWidth}%`,
          maxWidth: 600,
          height: 1,
          background: theme.colors.border,
          margin: "40px 0",
        }}
      />

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
        }}
      >
        {STATS.map((stat, i) => {
          const statDelays = [271, 310, 456];
          const delay = statDelays[i];
          const statProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 80, mass: 0.5 },
          });
          const statScale = interpolate(statProgress, [0, 1], [0.8, 1]);

          return (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                opacity: statProgress,
                transform: `scale(${statScale})`,
              }}
            >
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 800,
                  color: theme.colors.accent,
                  lineHeight: 1,
                  letterSpacing: "-1px",
                }}
              >
                {stat.value}
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: theme.colors.textMuted,
                  margin: "8px 0 0",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Verticals pills */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 40,
          opacity: verticalsProgress,
        }}
      >
        {VERTICALS.map((v, i) => {
          const pillDelay = 370 + i * 25;
          const pillProgress = spring({
            frame: frame - pillDelay,
            fps,
            config: { damping: 80 },
          });
          const pillScale = interpolate(pillProgress, [0, 1], [0.85, 1]);

          return (
            <div
              key={v}
              style={{
                background: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: 24,
                padding: "10px 24px",
                opacity: pillProgress,
                transform: `scale(${pillScale})`,
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  color: theme.colors.textSecondary,
                  fontWeight: 600,
                }}
              >
                {v}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
