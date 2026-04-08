import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Scene fade-in ────────────────────────────────────── */
  const sceneFade = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headProgress = spring({ frame, fps, config: { damping: 80 } });
  const headScale = interpolate(headProgress, [0, 1], [0.9, 1]);
  const headY = interpolate(headProgress, [0, 1], [30, 0]);

  const subProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 100 },
  });
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  const ctaProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 80, mass: 0.6 },
  });
  const emailX = interpolate(ctaProgress, [0, 1], [-40, 0]);

  const phoneProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 80, mass: 0.6 },
  });
  const phoneX = interpolate(phoneProgress, [0, 1], [40, 0]);

  const footerProgress = spring({
    frame: frame - 45,
    fps,
    config: { damping: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: sceneFade,
      }}
    >
      {/* Top glow */}
      <div
        style={{
          position: "absolute",
          top: -200,
          width: 800,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}1a 0%, transparent 60%)`,
          filter: "blur(80px)",
          opacity: headProgress,
        }}
      />

      {/* Heading */}
      <h1
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: theme.colors.textPrimary,
          margin: 0,
          textAlign: "center",
          opacity: headProgress,
          transform: `translateY(${headY}px) scale(${headScale})`,
          lineHeight: 1.2,
          letterSpacing: "-1.5px",
        }}
      >
        Let's talk about
        <br />
        <span style={{ color: theme.colors.accent }}>what you're building.</span>
      </h1>

      {/* Sub text */}
      <p
        style={{
          fontSize: 20,
          color: theme.colors.textSecondary,
          margin: "24px 0 0",
          opacity: subProgress,
          transform: `translateY(${subY}px)`,
          textAlign: "center",
          maxWidth: 560,
          lineHeight: 1.6,
        }}
      >
        No pitch decks. No sales scripts. Just a real conversation
        about your product.
      </p>

      <div
        style={{
          marginTop: 48,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: 12,
            padding: "16px 40px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: ctaProgress,
            transform: `translateX(${emailX}px)`,
          }}
        >
          <span style={{ fontSize: 20, color: theme.colors.accent, fontWeight: 700 }}>✉</span>
          <span style={{ fontSize: 20, color: theme.colors.textPrimary, fontWeight: 600 }}>
            hello@nativewit.in
          </span>
        </div>
        <div
          style={{
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: 12,
            padding: "14px 40px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: phoneProgress,
            transform: `translateX(${phoneX}px)`,
          }}
        >
          <span style={{ fontSize: 18, color: theme.colors.accent, fontWeight: 700 }}>☎</span>
          <span style={{ fontSize: 18, color: theme.colors.textPrimary, fontWeight: 600 }}>
            +91 99443 96311
          </span>
        </div>
      </div>

      {/* Website footer */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: footerProgress,
        }}
      >
        <span style={{ fontSize: 16, color: theme.colors.textSecondary, fontWeight: 500 }}>
          nativewit.in
        </span>
      </div>
    </AbsoluteFill>
  );
};
