import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

const PROBLEM_STEPS = [
  "Take specs",
  "Write code",
  "Ship it",
];

export const MarketProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Scene fade-in ──────────────────────────────────────── */
  const sceneFade = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  /* ── VO 00:00–00:04 · frames 0–120 ─────────────────────── */
  const labelProgress = spring({ frame, fps, config: { damping: 120 } });

  const head1Progress = spring({
    frame: frame - 8,
    fps,
    config: { damping: 80, mass: 0.8 },
  });

  const head2Progress = spring({
    frame: frame - 22,
    fps,
    config: { damping: 80, mass: 0.8 },
  });
  const head2X = interpolate(head2Progress, [0, 1], [50, 0]);

  const subProgress = spring({
    frame: frame - 50,
    fps,
    config: { damping: 100 },
  });
  const subY = interpolate(subProgress, [0, 1], [16, 0]);

  /* ── VO 00:05–00:11 · frames 150–330 — problem steps ──── */

  /* ── VO 00:11–00:18 · frames 330–540 — strike + resolve ── */
  const strikeProgress = spring({
    frame: frame - 330,
    fps,
    config: { damping: 60, mass: 0.8 },
  });

  const cardDim = interpolate(frame, [340, 420], [1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bottomProgress = spring({
    frame: frame - 420,
    fps,
    config: { damping: 100 },
  });
  const bottomY = interpolate(bottomProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        padding: "0 120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        opacity: sceneFade,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: -150,
          left: -150,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}12 0%, transparent 60%)`,
          filter: "blur(80px)",
          opacity: head1Progress,
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
          marginBottom: 16,
        }}
      >
        The challenge
      </span>

      {/* Main heading — line 1 clip-reveals left-to-right, line 2 slides from right */}
      <div>
        <h1
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: theme.colors.textPrimary,
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: "-1.5px",
            maxWidth: 900,
          }}
        >
          <span
            style={{
              display: "inline-block",
              clipPath: `inset(0 ${interpolate(head1Progress, [0, 1], [100, 0])}% 0 0)`,
            }}
          >
            Your product needs
          </span>
          <br />
          <span
            style={{
              display: "inline-block",
              color: theme.colors.accent,
              opacity: head2Progress,
              transform: `translateX(${head2X}px)`,
            }}
          >
            more than developers.
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 22,
          color: theme.colors.textSecondary,
          margin: "16px 0 0",
          opacity: subProgress,
          transform: `translateY(${subY}px)`,
          maxWidth: 700,
        }}
      >
        It needs a team that thinks like owners.
      </p>

      {/* Problem flow: slides in horizontally, synced with VO 00:05–00:11 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginTop: 48,
          position: "relative",
        }}
      >
        {PROBLEM_STEPS.map((step, i) => {
          const stepDelay = 150 + i * 50;
          const stepProgress = spring({
            frame: frame - stepDelay,
            fps,
            config: { damping: 80 },
          });
          const stepX = interpolate(stepProgress, [0, 1], [-40, 0]);

          return (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  background: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: 12,
                  padding: "16px 28px",
                  opacity: stepProgress * cardDim,
                  transform: `translateX(${stepX}px)`,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: theme.colors.textSecondary,
                  }}
                >
                  {step}
                </span>
                {/* Strike-through line */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 8,
                    height: 3,
                    width: `${interpolate(strikeProgress, [0, 1], [0, 100])}%`,
                    background: theme.colors.accent,
                    borderRadius: 2,
                    transform: "translateY(-50%)",
                  }}
                />
              </div>
              {i < PROBLEM_STEPS.length - 1 && (
                <span
                  style={{
                    fontSize: 22,
                    color: theme.colors.textMuted,
                    fontWeight: 600,
                    opacity: stepProgress,
                  }}
                >
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom statement — professional, forward-looking */}
      <p
        style={{
          fontSize: 24,
          color: theme.colors.textSecondary,
          lineHeight: 1.7,
          maxWidth: 820,
          margin: "48px 0 0",
          opacity: bottomProgress,
          transform: `translateY(${bottomY}px)`,
        }}
      >
        We believe there's a{" "}
        <span style={{ color: theme.colors.accent, fontWeight: 700 }}>
          better approach.
        </span>
      </p>
    </AbsoluteFill>
  );
};
