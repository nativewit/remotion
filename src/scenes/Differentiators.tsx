import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

const DIFFERENTIATORS = [
  {
    icon: "🎯",
    title: "Product Owners",
    body: "We challenge assumptions, propose better UX, and flag scope creep — before it gets expensive.",
  },
  {
    icon: "⚡",
    title: "AI-Native Workflow",
    body: "AI baked into our process and your product. Proven integrations with measurable ROI, not just demos.",
  },
  {
    icon: "🚀",
    title: "Speed to Market",
    body: "Concept to App Store in 12 weeks avg. Iterative sprints so you see working software every cycle.",
  },
  {
    icon: "👤",
    title: "Founder-Led",
    body: "Every project has the founder reviewing architecture and code. You work with the decision-maker directly.",
  },
];

export const Differentiators: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelProgress = spring({ frame, fps, config: { damping: 120 } });
  const headProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 100 },
  });
  const headY = interpolate(headProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        padding: "80px 100px",
        display: "flex",
        flexDirection: "column",
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
          marginBottom: 12,
        }}
      >
        Why us
      </span>

      {/* Section heading */}
      <h2
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: theme.colors.textPrimary,
          margin: "0 0 56px",
          opacity: headProgress,
          transform: `translateY(${headY}px)`,
        }}
      >
        Not just developers.{" "}
        <span style={{ color: theme.colors.accent }}>Product partners.</span>
      </h2>

      {/* Differentiator cards */}
      <div style={{ display: "flex", gap: 24, flex: 1 }}>
        {DIFFERENTIATORS.map((diff, i) => {
          const delay = 18 + i * 12;
          const cardProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 100 },
          });
          const cardY = interpolate(cardProgress, [0, 1], [30, 0]);

          return (
            <div
              key={diff.title}
              style={{
                flex: 1,
                background: theme.colors.surface,
                borderRadius: 16,
                padding: "32px 28px",
                border: `1px solid ${theme.colors.border}`,
                opacity: cardProgress,
                transform: `translateY(${cardY}px)`,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent line */}
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
                  fontSize: 32,
                  marginBottom: 16,
                }}
              >
                {diff.icon}
              </div>
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: theme.colors.textPrimary,
                  margin: "0 0 10px",
                }}
              >
                {diff.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: theme.colors.textSecondary,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {diff.body}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
