import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";

/**
 * HOOK — 0–5s (150 frames)
 * Assembly line of identical app mockups → glitch break.
 * VO carries the message; visuals show the cookie-cutter metaphor.
 */

const LINE_WIDTHS = [0.55, 0.75, 0.4, 0.65, 0.35, 0.8, 0.5];

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();

  /* ── Conveyor belt of identical app screens ─────────────── */
  const conveyorX = interpolate(frame, [0, 150], [100, -1000]);

  /* ── Glitch at ~frame 85 (just before "not what products need") */
  const glitch = interpolate(frame, [82, 88, 94, 105], [0, 1, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Accent line reveals after glitch ──────────────────── */
  const lineWidth = interpolate(frame, [95, 130], [0, 220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Exit ──────────────────────────────────────────────── */
  const exitFade = interpolate(frame, [132, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        opacity: exitFade,
        overflow: "hidden",
      }}
    >
      {/* Assembly line mockups — all identical (cookie cutter) */}
      {[0, 1, 2, 3, 4].map((i) => {
        const x = conveyorX + i * 340;
        const gx = glitch * Math.sin(i * 47) * 30;
        const gy = glitch * Math.cos(i * 31) * 15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + gx,
              top: 160 + gy,
              width: 260,
              height: 460,
              borderRadius: 18,
              background: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              transform: `skewX(${glitch * Math.sin(i * 23) * 7}deg)`,
              boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
              overflow: "hidden",
            }}
          >
            {/* Header bar — identical on every card */}
            <div
              style={{
                height: 5,
                background: theme.colors.textMuted,
                borderRadius: "18px 18px 0 0",
              }}
            />
            {/* Skeleton content lines */}
            {LINE_WIDTHS.map((w, j) => (
              <div
                key={j}
                style={{
                  margin: `${18 + j * 3}px 22px 0`,
                  height: 7,
                  width: `${w * 100}%`,
                  background: theme.colors.border,
                  borderRadius: 4,
                }}
              />
            ))}
            {/* Placeholder button */}
            <div
              style={{
                margin: "auto 22px 28px",
                height: 32,
                width: "45%",
                borderRadius: 8,
                background: theme.colors.border,
              }}
            />
          </div>
        );
      })}

      {/* Glitch scan-line overlay */}
      {glitch > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${theme.colors.accent}18 3px, ${theme.colors.accent}18 4px)`,
            opacity: glitch,
          }}
        />
      )}

      {/* Red chromatic-aberration stripe */}
      {glitch > 0.3 && (
        <div
          style={{
            position: "absolute",
            top: `${45 + Math.sin(frame * 0.5) * 10}%`,
            left: 0,
            right: 0,
            height: 4,
            background: theme.colors.accent,
            opacity: glitch * 0.5,
            filter: "blur(2px)",
          }}
        />
      )}

      {/* Accent underline — "there's something better" cue */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: lineWidth,
          height: 3,
          background: theme.colors.accent,
          borderRadius: 2,
        }}
      />
    </AbsoluteFill>
  );
};
