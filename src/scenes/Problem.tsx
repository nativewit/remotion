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
 * PROBLEM — 5–16.5s (345 frames)
 * Visual metaphor: a racing indicator hits walls and decelerates.
 * VO: founder trying to move fast, complexity + wrong partner slow you down.
 */

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Scene transitions ──────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const exitFade = interpolate(frame, [315, 345], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Racing orb — fast then decelerating ────────────────── */
  // VO "trying to move fast" at local frame 97, walls at 158 & 252
  const orbX = interpolate(
    frame,
    [0, 60, 97, 158, 252, 345],
    [5, 25, 42, 52, 60, 62],
    { extrapolateRight: "clamp" },
  );
  const orbGlow = interpolate(frame, [0, 97, 200, 300], [1, 0.8, 0.4, 0.15], {
    extrapolateRight: "clamp",
  });

  /* ── Speed lines behind orb (fade as it slows) ──────────── */
  const speedOpacity = interpolate(frame, [0, 97, 200], [0.7, 0.35, 0], {
    extrapolateRight: "clamp",
  });

  /* ── Wall 1: Complexity — appears at ~frame 140 ─────────── */
  const wall1 = spring({
    frame: frame - 140,
    fps,
    config: { damping: 80, mass: 0.5 },
  });

  /* ── Wall 2: Wrong partner — appears at ~frame 235 ──────── */
  const wall2 = spring({
    frame: frame - 235,
    fps,
    config: { damping: 80, mass: 0.5 },
  });

  /* ── Impact shake on wall hits ──────────────────────────── */
  const shake1 = frame >= 158 && frame < 170
    ? Math.sin(frame * 2.5) * interpolate(frame, [158, 170], [4, 0], { extrapolateRight: "clamp" })
    : 0;
  const shake2 = frame >= 252 && frame < 268
    ? Math.sin(frame * 2.5) * interpolate(frame, [252, 268], [6, 0], { extrapolateRight: "clamp" })
    : 0;

  /* ── Warning pulse after second wall ────────────────────── */
  const warningPulse = frame > 260
    ? interpolate(frame % 25, [0, 12, 25], [0.15, 0.45, 0.15])
    : 0;

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        opacity: Math.min(entryFade, exitFade),
        overflow: "hidden",
        transform: `translateX(${shake1 + shake2}px)`,
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${orbX}% 50%, ${theme.colors.accent}0c 0%, transparent 40%)`,
        }}
      />

      {/* Track line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "5%",
          right: "5%",
          height: 2,
          background: theme.colors.border,
        }}
      />

      {/* Speed lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${47 + (i - 2) * 2.5}%`,
            left: `${Math.max(5, orbX - 4 - i * 2)}%`,
            width: `${2.5 - i * 0.3}%`,
            height: 2,
            background: theme.colors.accent,
            opacity: speedOpacity * (1 - i * 0.15),
            borderRadius: 1,
          }}
        />
      ))}

      {/* Racing orb */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${orbX}%`,
          transform: "translate(-50%, -50%)",
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: theme.colors.accent,
          boxShadow: `0 0 ${35 * orbGlow}px ${18 * orbGlow}px ${theme.colors.accent}55`,
          opacity: 0.5 + orbGlow * 0.5,
        }}
      />

      {/* Wall 1 — Complexity (gears) */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "55%",
          width: 4,
          height: `${50 * wall1}%`,
          background: `linear-gradient(to bottom, ${theme.colors.accent}bb, ${theme.colors.accent}22)`,
          borderRadius: 2,
        }}
      />
      {wall1 > 0.5 && (
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "57%",
            opacity: wall1,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Gear icon — two concentric circles */}
          <div style={{ position: "relative", width: 30, height: 30 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: `2.5px solid ${theme.colors.textMuted}`,
                transform: `rotate(${frame * 1.5}deg)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 9,
                left: 9,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: theme.colors.textMuted,
              }}
            />
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: theme.colors.textMuted,
              letterSpacing: 2.5,
              textTransform: "uppercase",
            }}
          >
            Complexity
          </span>
        </div>
      )}

      {/* Wall 2 — Wrong Partner (X mark) */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "72%",
          width: 4,
          height: `${56 * wall2}%`,
          background: `linear-gradient(to bottom, ${theme.colors.accent}, ${theme.colors.accent}22)`,
          borderRadius: 2,
        }}
      />
      {wall2 > 0.5 && (
        <div
          style={{
            position: "absolute",
            top: "28%",
            left: "74%",
            opacity: wall2,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* X icon */}
          <div style={{ position: "relative", width: 22, height: 22 }}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: "100%",
                height: 2.5,
                background: theme.colors.accent,
                transform: "rotate(45deg)",
                borderRadius: 1,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: "100%",
                height: 2.5,
                background: theme.colors.accent,
                transform: "rotate(-45deg)",
                borderRadius: 1,
              }}
            />
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: theme.colors.textMuted,
              letterSpacing: 2.5,
              textTransform: "uppercase",
            }}
          >
            Wrong partner
          </span>
        </div>
      )}

      {/* Warning border pulse */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: `2px solid ${theme.colors.accent}`,
          opacity: warningPulse,
        }}
      />
    </AbsoluteFill>
  );
};
