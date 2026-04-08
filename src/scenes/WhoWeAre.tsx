import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

export const WhoWeAre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Scene fade-in ──────────────────────────────────────── */
  const sceneFade = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  /* ── VO 00:19–00:26 · frames 30–240 ────────────────────── */
  const labelProgress = spring({ frame, fps, config: { damping: 120 } });

  const head1Progress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 80, mass: 0.8 },
  });
  const head1X = interpolate(head1Progress, [0, 1], [-60, 0]);

  const head2Progress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 80, mass: 0.8 },
  });
  const head2X = interpolate(head2Progress, [0, 1], [60, 0]);

  const accentLine = spring({
    frame: frame - 60,
    fps,
    config: { damping: 80, mass: 0.5 },
  });

  /* ── VO 00:27–00:38 · frames 270–600 — values + transition */
  const transitionProgress = spring({
    frame: frame - 500,
    fps,
    config: { damping: 100 },
  });
  const transitionY = interpolate(transitionProgress, [0, 1], [16, 0]);

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
      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}1a 0%, transparent 60%)`,
          filter: "blur(60px)",
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
        Who we are
      </span>

      {/* Heading — line 1 slides from left, line 2 slides from right */}
      <h1
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: theme.colors.textPrimary,
          margin: 0,
          lineHeight: 1.15,
          letterSpacing: "-1.5px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            opacity: head1Progress,
            transform: `translateX(${head1X}px)`,
          }}
        >
          Founded by an{" "}
          <span style={{ color: theme.colors.accent }}>engineer.</span>
        </span>
        <br />
        <span
          style={{
            display: "inline-block",
            opacity: head2Progress,
            transform: `translateX(${head2X}px)`,
          }}
        >
          Run like a{" "}
          <span style={{ color: theme.colors.accent }}>product team.</span>
        </span>
      </h1>

      {/* Accent underline */}
      <div
        style={{
          width: interpolate(accentLine, [0, 1], [0, 80]),
          height: 4,
          background: theme.colors.accent,
          borderRadius: 2,
          marginTop: 28,
        }}
      />

      {/* Studio values pills */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 36,
          flexWrap: "wrap",
        }}
      >
        {["We challenge assumptions", "We propose better solutions", "We own outcomes"].map((val, i) => {
          const pillDelay = 270 + i * 50;
          const pillProgress = spring({
            frame: frame - pillDelay,
            fps,
            config: { damping: 80 },
          });
          const pillScale = interpolate(pillProgress, [0, 1], [0.85, 1]);
          return (
            <div
              key={val}
              style={{
                background: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: 32,
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: pillProgress,
                transform: `scale(${pillScale})`,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: theme.colors.accent,
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 17,
                  color: theme.colors.textSecondary,
                  fontWeight: 500,
                }}
              >
                {val}
              </span>
            </div>
          );
        })}
      </div>

      {/* Transition line — bridges to Services scene */}
      <p
        style={{
          fontSize: 22,
          color: theme.colors.textSecondary,
          lineHeight: 1.7,
          maxWidth: 780,
          margin: "40px 0 0",
          opacity: transitionProgress,
          transform: `translateY(${transitionY}px)`,
        }}
      >
        Three ways we help you ship{" "}
        <span style={{ color: theme.colors.accent, fontWeight: 600 }}>→</span>
      </p>
    </AbsoluteFill>
  );
};
