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
 * PROBLEM — 5–15s (300 frames)
 * Founder pain points: moving fast vs. wrong partners.
 */

const PAIN_POINTS = [
  { text: "You're a founder — or a product lead —", delay: 13 },
  { text: "trying to move fast.", delay: 93, accent: true },
  { text: "But technical complexity slows you down.", delay: 140 },
  { text: "The wrong build partner slows you down even more.", delay: 225, accent: true },
];

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Scene fade ─────────────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const exitFade = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Slow vertical scroll for cinematic feel ──────────── */
  const scrollY = interpolate(frame, [0, 300], [0, -30], {
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Side accent bar ────────────────────────────────────── */
  const barHeight = interpolate(frame, [5, 60], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: Math.min(entryFade, exitFade),
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 30% 50%, ${theme.colors.accent}08 0%, transparent 60%)`,
        }}
      />

      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: "20%",
          width: 3,
          height: `${barHeight}%`,
          maxHeight: "60%",
          background: `linear-gradient(to bottom, ${theme.colors.accent}, transparent)`,
          borderRadius: 2,
        }}
      />

      {/* Pain points — staggered text blocks */}
      <div
        style={{
          padding: "0 160px",
          transform: `translateY(${scrollY}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 28,
          maxWidth: 1100,
        }}
      >
        {PAIN_POINTS.map((point, i) => {
          const reveal = interpolate(
            frame,
            [point.delay, point.delay + 30],
            [0, 100],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            },
          );

          const slideX = interpolate(
            frame,
            [point.delay, point.delay + 35],
            [30, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            },
          );

          return (
            <p
              key={i}
              style={{
                fontSize: point.accent ? 50 : 44,
                fontWeight: point.accent ? 800 : 600,
                color: point.accent
                  ? theme.colors.accent
                  : theme.colors.textPrimary,
                margin: 0,
                lineHeight: 1.3,
                letterSpacing: "-0.5px",
                clipPath: `inset(0 ${100 - reveal}% 0 0)`,
                transform: `translateX(${slideX}px)`,
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
