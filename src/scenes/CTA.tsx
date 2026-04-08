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
 * CTA — 67–80s (390 frames)
 * Clean close. Logo + one line + URL.
 */

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Scene fade-in ──────────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  /* ── Logo ───────────────────────────────────────────────── */
  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 80, mass: 0.5 },
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0.6, 1]);

  /* ── Main line ──────────────────────────────────────────── */
  const lineReveal = interpolate(frame, [19, 65], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── URL ────────────────────────────────────────────────── */
  const urlProgress = spring({
    frame: frame - 146,
    fps,
    config: { damping: 100 },
  });
  const urlScale = interpolate(urlProgress, [0, 1], [0.9, 1]);

  /* ── Ambient glow pulse ─────────────────────────────────── */
  const glowPulse = interpolate(
    frame,
    [0, 130, 260, 390],
    [0.1, 0.25, 0.15, 0.2],
  );

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: entryFade,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}22 0%, transparent 60%)`,
          filter: "blur(80px)",
          opacity: glowPulse,
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: logoProgress,
          transform: `scale(${logoScale})`,
          marginBottom: 40,
        }}
      >
        <Img
          src={staticFile("logo.png")}
          style={{ width: 80, height: "auto" }}
        />
      </div>

      {/* Main CTA line */}
      <h1
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: theme.colors.textPrimary,
          margin: 0,
          textAlign: "center",
          lineHeight: 1.25,
          letterSpacing: "-1.5px",
          maxWidth: 900,
          clipPath: `inset(0 ${100 - lineReveal}% 0 0)`,
        }}
      >
        If you're building something that matters —
        <br />
        <span style={{ color: theme.colors.accent }}>let's talk.</span>
      </h1>

      {/* URL */}
      <div
        style={{
          marginTop: 48,
          opacity: urlProgress,
          transform: `scale(${urlScale})`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: theme.colors.accent,
          }}
        />
        <span
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: theme.colors.textSecondary,
            letterSpacing: 1,
          }}
        >
          nativewit.in
        </span>
      </div>
    </AbsoluteFill>
  );
};
