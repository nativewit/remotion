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
 * CTA — 65.5–78s (375 frames)
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
  const lineReveal = interpolate(frame, [13, 60], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── URL ────────────────────────────────────────────────── */
  const urlProgress = spring({
    frame: frame - 100,
    fps,
    config: { damping: 100 },
  });
  const urlScale = interpolate(urlProgress, [0, 1], [0.9, 1]);

  /* ── Ambient glow pulse ─────────────────────────────────── */
  const glowPulse = interpolate(
    frame,
    [0, 125, 250, 375],
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

      {/* Expanding ring pulses */}
      {[0, 1, 2].map((i) => {
        const ringDelay = 50 + i * 80;
        const ringProgress = interpolate(
          (frame - ringDelay) % 200,
          [0, 200],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const ringOp = frame > ringDelay
          ? interpolate(ringProgress, [0, 0.3, 1], [0, 0.15, 0])
          : 0;
        return (
          <div
            key={`ring-${i}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 100 + ringProgress * 500,
              height: 100 + ringProgress * 500,
              borderRadius: "50%",
              border: `1px solid ${theme.colors.accent}`,
              opacity: ringOp,
            }}
          />
        );
      })}

      {/* Rising particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const px = 42 + (i * 17) % 20;
        const rise = ((frame + i * 30) % 120) / 120;
        const pOp = interpolate(rise, [0, 0.2, 0.8, 1], [0, 0.2, 0.15, 0]);
        return (
          <div
            key={`rp-${i}`}
            style={{
              position: "absolute",
              bottom: `${rise * 80}%`,
              left: `${px}%`,
              width: 2 + (i % 2),
              height: 2 + (i % 2),
              borderRadius: "50%",
              background: theme.colors.accent,
              opacity: frame > 30 ? pOp : 0,
            }}
          />
        );
      })}

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

      {/* Main CTA line with cursor */}
      <div style={{ position: "relative", display: "inline-block" }}>
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
          <span style={{ color: theme.colors.accent }}>Let's talk.</span>
        </h1>
        {/* Blinking cursor after text */}
        {lineReveal >= 100 && (
          <div
            style={{
              position: "absolute",
              right: -12,
              top: "15%",
              width: 3,
              height: "70%",
              background: theme.colors.accent,
              borderRadius: 1,
              opacity: Math.sin(frame * 0.15) > 0 ? 0.8 : 0,
            }}
          />
        )}
      </div>

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
