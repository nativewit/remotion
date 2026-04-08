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
 * DIFFERENTIATOR — 48–67s (570 frames)
 * Slower pace. Co-founder mindset. AI embedded.
 */

const POINTS = [
  {
    text: "We work like a co-founder, not a contractor.",
    delay: 143,
    emphasis: true,
  },
  {
    text: "We ask the hard questions early — so you don't build the wrong thing fast.",
    delay: 241,
    emphasis: false,
  },
  {
    text: "AI is embedded in every layer of how we build — we move faster without cutting corners.",
    delay: 379,
    emphasis: false,
  },
];

export const Differentiator: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Scene transitions ──────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const exitFade = interpolate(frame, [540, 570], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Header ─────────────────────────────────────────────── */
  const labelProgress = spring({ frame, fps, config: { damping: 120 } });

  const headReveal = interpolate(frame, [14, 56], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Moving accent line — cinematic emphasis ────────────── */
  const lineY = interpolate(frame, [0, 570], [10, 90], {
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        padding: "0 140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        opacity: Math.min(entryFade, exitFade),
      }}
    >
      {/* Subtle background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 70% 50%, ${theme.colors.accent}0a 0%, transparent 50%)`,
        }}
      />

      {/* Slow-moving left accent line */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: `${lineY}%`,
          width: 3,
          height: 120,
          background: `linear-gradient(to bottom, ${theme.colors.accent}, transparent)`,
          borderRadius: 2,
        }}
      />

      {/* Section label */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: theme.colors.accent,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: labelProgress,
          marginBottom: 20,
        }}
      >
        What sets us apart
      </span>

      {/* Header */}
      <h2
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: theme.colors.textPrimary,
          margin: "0 0 50px",
          letterSpacing: "-1.5px",
          lineHeight: 1.15,
          maxWidth: 800,
          clipPath: `inset(0 ${100 - headReveal}% 0 0)`,
        }}
      >
        It's not the tech stack —{" "}
        <span style={{ color: theme.colors.accent }}>it's how we think.</span>
      </h2>

      {/* Key points — large text, one at a time */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}
      >
        {POINTS.map((point, i) => {
          const pointProgress = spring({
            frame: frame - point.delay,
            fps,
            config: { damping: 80, mass: 0.6 },
          });
          const pointX = interpolate(pointProgress, [0, 1], [40, 0]);

          /* Each point fades down when the next one appears */
          const nextDelay = POINTS[i + 1]?.delay ?? 570;
          const dimFactor = interpolate(
            frame,
            [nextDelay - 20, nextDelay + 20],
            [1, 0.4],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          return (
            <p
              key={i}
              style={{
                fontSize: point.emphasis ? 38 : 32,
                fontWeight: point.emphasis ? 800 : 600,
                color: point.emphasis
                  ? theme.colors.textPrimary
                  : theme.colors.textSecondary,
                margin: 0,
                lineHeight: 1.5,
                maxWidth: 900,
                opacity: pointProgress * dimFactor,
                transform: `translateX(${pointX}px)`,
              }}
            >
              {point.text}
            </p>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
