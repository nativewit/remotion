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
 * HOOK — 0–5s (150 frames)
 * Fast product screen flashes + bold opening statement.
 */

const PRODUCT_COLORS = [
  theme.colors.accent,
  theme.colors.blue,
  theme.colors.green,
  "#8b5cf6",
  theme.colors.accentSoft,
];

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Fast-cycling "product screens" — colored blocks that flash ── */
  const cycleIndex = Math.floor(frame / 4) % PRODUCT_COLORS.length;

  const flashOpacity = interpolate(frame % 4, [0, 1, 3], [0.7, 0.35, 0], {
    extrapolateRight: "clamp",
  });

  /* ── Text reveal ───────────────────────────────────────── */
  const line1Reveal = interpolate(frame, [4, 40], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  const line2Reveal = interpolate(frame, [78, 110], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Scene exit fade ───────────────────────────────────── */
  const exitFade = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: exitFade,
      }}
    >
      {/* Flash overlay — simulates fast-cut product screens */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 60% 40%, ${PRODUCT_COLORS[cycleIndex]}18 0%, transparent 70%)`,
          opacity: flashOpacity,
        }}
      />

      {/* Product screen mockups — abstract rectangles */}
      {[0, 1, 2].map((i) => {
        const mockDelay = i * 12;
        const mockProgress = spring({
          frame: frame - mockDelay,
          fps,
          config: { damping: 200, mass: 0.3 },
        });
        const mockFade = interpolate(frame, [mockDelay, mockDelay + 10, mockDelay + 25, mockDelay + 35], [0, 0.3, 0.3, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 280,
              height: 500,
              borderRadius: 20,
              background: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              left: `${25 + i * 20}%`,
              top: "15%",
              transform: `translateX(-50%) scale(${interpolate(mockProgress, [0, 1], [0.8, 1])})`,
              opacity: mockFade,
              boxShadow: `0 20px 60px ${PRODUCT_COLORS[i % PRODUCT_COLORS.length]}15`,
            }}
          >
            <div
              style={{
                height: 6,
                borderRadius: "20px 20px 0 0",
                background: PRODUCT_COLORS[i % PRODUCT_COLORS.length],
              }}
            />
          </div>
        );
      })}

      {/* Main text — center */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 120px",
          marginTop: 120,
        }}
      >
        <p
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: theme.colors.textPrimary,
            lineHeight: 1.3,
            margin: 0,
            letterSpacing: "-1px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              clipPath: `inset(0 ${100 - line1Reveal}% 0 0)`,
            }}
          >
            Most software agencies will build what you ask for.
          </span>
        </p>
        <p
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: theme.colors.accent,
            lineHeight: 1.3,
            margin: "12px 0 0",
            letterSpacing: "-1px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              clipPath: `inset(0 ${100 - line2Reveal}% 0 0)`,
            }}
          >
            That's not what great products need.
          </span>
        </p>
      </div>
    </AbsoluteFill>
  );
};
