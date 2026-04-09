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
 * DIFFERENTIATOR — 44–65.5s (645 frames)
 * 4 visual phases: blueprint, co-founder, hard questions, AI network.
 * No VO text on screen — visual metaphors only.
 *
 * VO cues (local frames):
 *   0   "What makes us different isn't the tech stack"
 * 134   "We design the architecture before writing a line of code"
 * 286   "We work like a co-founder, not a contractor"
 * 340   "We ask the hard questions early"
 * 485   "With AI embedded in every layer"
 * 563   "we move faster without cutting corners"
 */

export const Differentiator: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Scene transitions ──────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const exitFade = interpolate(frame, [615, 645], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Slow-moving accent line (cinematic pace) ──────────── */
  const lineY = interpolate(frame, [0, 645], [8, 92], {
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Phase visibility helpers ──────────────────────────── */
  const phase1 = interpolate(frame, [0, 30, 120, 145], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2 = interpolate(frame, [134, 164, 270, 300], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase3 = interpolate(frame, [286, 316, 470, 500], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase4 = interpolate(frame, [485, 515, 610, 645], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Blueprint line draw progress (phase 2) ────────────── */
  const blueprintDraw = interpolate(frame, [134, 260], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Question → Checkmark morph (phase 3) ──────────────── */
  const questionToCheck = interpolate(frame, [360, 400], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── AI network pulse (phase 4) ─────────────────────────── */
  const networkPulse = frame > 485
    ? 0.5 + Math.sin((frame - 485) * 0.1) * 0.5
    : 0;

  /* ── Traveling data dots on network connections ──────────── */
  const dataFlowT = frame > 495
    ? ((frame - 495) % 40) / 40
    : 0;

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        opacity: Math.min(entryFade, exitFade),
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 65% 45%, ${theme.colors.accent}08 0%, transparent 50%)`,
        }}
      />

      {/* Subtle floating code particles */}
      {Array.from({ length: 6 }).map((_, i) => {
        const px = 12 + (i * 43) % 76;
        const py = 8 + (i * 61) % 84;
        const drift = Math.sin((frame + i * 50) * 0.02) * 10;
        return (
          <div
            key={`cp-${i}`}
            style={{
              position: "absolute",
              top: `${py}%`,
              left: `${px}%`,
              fontSize: 10,
              fontFamily: "monospace",
              color: theme.colors.textMuted,
              opacity: 0.08,
              transform: `translateY(${drift}px)`,
              userSelect: "none",
            }}
          >
            {["{ }", "</>", "fn()", "[ ]", "=>", "0x"][i]}
          </div>
        );
      })}

      {/* Slow-moving left accent line */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: `${lineY}%`,
          width: 3,
          height: 100,
          background: `linear-gradient(to bottom, ${theme.colors.accent}, transparent)`,
          borderRadius: 2,
        }}
      />

      {/* ═══ PHASE 1: "How we think" — Brain/gear icon ═══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: phase1,
        }}
      >
        {/* Rotating gear outline with proper teeth */}
        <div
          style={{
            width: 100,
            height: 100,
            position: "relative",
            marginBottom: 28,
          }}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            style={{
              transform: `rotate(${frame * 0.8}deg)`,
            }}
          >
            {/* Outer gear teeth */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const x = 50 + Math.cos(angle) * 40;
              const y = 50 + Math.sin(angle) * 40;
              return (
                <rect
                  key={i}
                  x={x - 4}
                  y={y - 4}
                  width="8"
                  height="8"
                  rx="1"
                  fill={`${theme.colors.accent}55`}
                  transform={`rotate(${(i / 12) * 360} ${x} ${y})`}
                />
              );
            })}
            {/* Outer ring */}
            <circle cx="50" cy="50" r="34" fill="none" stroke={`${theme.colors.accent}55`} strokeWidth="3" />
            {/* Inner ring */}
            <circle cx="50" cy="50" r="20" fill="none" stroke={theme.colors.accent} strokeWidth="3" />
            {/* Core dot */}
            <circle cx="50" cy="50" r="8" fill={theme.colors.accent} />
          </svg>
        </div>
        {/* 4 tiny satellite dots */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = ((angle + frame * 0.8) * Math.PI) / 180;
          return (
            <div
              key={angle}
              style={{
                position: "absolute",
                top: `calc(50% - 30px + ${Math.sin(rad) * 65}px)`,
                left: `calc(50% + ${Math.cos(rad) * 65}px)`,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: theme.colors.accent,
                opacity: 0.6,
              }}
            />
          );
        })}
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: theme.colors.accent,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          How we think
        </span>
      </div>

      {/* ═══ PHASE 2: Blueprint wireframe ═══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: phase2,
        }}
      >
        <svg
          width="700"
          height="400"
          viewBox="0 0 700 400"
          fill="none"
        >
          {/* Architecture boxes */}
          <rect
            x="250"
            y="20"
            width="200"
            height="60"
            rx="8"
            stroke={theme.colors.accent}
            strokeWidth="2"
            strokeDasharray="400"
            strokeDashoffset={400 - blueprintDraw * 400}
          />
          <rect
            x="50"
            y="160"
            width="160"
            height="60"
            rx="8"
            stroke={theme.colors.blue}
            strokeWidth="2"
            strokeDasharray="380"
            strokeDashoffset={380 - blueprintDraw * 380}
          />
          <rect
            x="270"
            y="160"
            width="160"
            height="60"
            rx="8"
            stroke={theme.colors.green}
            strokeWidth="2"
            strokeDasharray="380"
            strokeDashoffset={380 - blueprintDraw * 380}
          />
          <rect
            x="490"
            y="160"
            width="160"
            height="60"
            rx="8"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="380"
            strokeDashoffset={380 - blueprintDraw * 380}
          />
          {/* Connecting lines */}
          <line
            x1="350"
            y1="80"
            x2="130"
            y2="160"
            stroke={theme.colors.border}
            strokeWidth="1.5"
            strokeDasharray="300"
            strokeDashoffset={300 - blueprintDraw * 300}
          />
          <line
            x1="350"
            y1="80"
            x2="350"
            y2="160"
            stroke={theme.colors.border}
            strokeWidth="1.5"
            strokeDasharray="80"
            strokeDashoffset={80 - blueprintDraw * 80}
          />
          <line
            x1="350"
            y1="80"
            x2="570"
            y2="160"
            stroke={theme.colors.border}
            strokeWidth="1.5"
            strokeDasharray="300"
            strokeDashoffset={300 - blueprintDraw * 300}
          />
          {/* Bottom DB cylinder */}
          <ellipse
            cx="350"
            cy="310"
            rx="60"
            ry="15"
            stroke={theme.colors.textMuted}
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset={200 - blueprintDraw * 200}
          />
          <line
            x1="290"
            y1="310"
            x2="290"
            y2="340"
            stroke={theme.colors.textMuted}
            strokeWidth="1.5"
            opacity={blueprintDraw}
          />
          <line
            x1="410"
            y1="310"
            x2="410"
            y2="340"
            stroke={theme.colors.textMuted}
            strokeWidth="1.5"
            opacity={blueprintDraw}
          />
          <ellipse
            cx="350"
            cy="340"
            rx="60"
            ry="15"
            stroke={theme.colors.textMuted}
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset={200 - blueprintDraw * 200}
          />
          <line
            x1="350"
            y1="220"
            x2="350"
            y2="295"
            stroke={theme.colors.border}
            strokeWidth="1.5"
            strokeDasharray="80"
            strokeDashoffset={80 - blueprintDraw * 80}
          />
        </svg>
        <span
          style={{
            position: "absolute",
            bottom: "12%",
            fontSize: 13,
            fontWeight: 700,
            color: theme.colors.textMuted,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: phase2,
          }}
        >
          Architecture first
        </span>
      </div>

      {/* ═══ PHASE 3: Co-founder + ? → ✓ ═══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 50,
          opacity: phase3,
        }}
      >
        {/* Two people side by side = partnership */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {/* Person 1 (you) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: theme.colors.textSecondary,
              }}
            />
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "0 0 25px 25px",
                background: theme.colors.textSecondary,
                marginTop: 6,
              }}
            />
          </div>

          {/* Equals / handshake symbol */}
          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: theme.colors.accent,
            }}
          >
            =
          </div>

          {/* Person 2 (us — accent colored) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: theme.colors.accent,
              }}
            />
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "0 0 25px 25px",
                background: theme.colors.accent,
                marginTop: 6,
              }}
            />
          </div>
        </div>

        {/* Question marks morphing into checkmarks */}
        <div style={{ display: "flex", gap: 40 }}>
          {[0, 1, 2].map((i) => {
            const qDelay = 340 + i * 18;
            const localMorph = interpolate(
              frame,
              [qDelay + 20, qDelay + 50],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );
            const qOpacity = 1 - localMorph;
            const cOpacity = localMorph;
            const qProgress = spring({
              frame: frame - qDelay,
              fps,
              config: { damping: 80 },
            });

            return (
              <div
                key={i}
                style={{
                  width: 50,
                  height: 50,
                  position: "relative",
                  opacity: qProgress,
                }}
              >
                {/* Question mark */}
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    fontWeight: 800,
                    color: theme.colors.textMuted,
                    opacity: qOpacity,
                  }}
                >
                  ?
                </span>
                {/* Checkmark */}
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    fontWeight: 800,
                    color: theme.colors.green,
                    opacity: cOpacity,
                    transform: `scale(${interpolate(cOpacity, [0, 1], [0.5, 1])})`,
                  }}
                >
                  ✓
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ PHASE 4: AI neural network ═══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: phase4,
        }}
      >
        <svg
          width="600"
          height="400"
          viewBox="0 0 600 400"
          fill="none"
        >
          {/* Neural network — 3 layers of nodes */}
          {/* Layer 1 */}
          {[100, 200, 300].map((y) => (
            <circle
              key={`l1-${y}`}
              cx="100"
              cy={y}
              r="14"
              fill={`${theme.colors.blue}${Math.round(networkPulse * 100)
                .toString(16)
                .padStart(2, "0")}`}
              stroke={theme.colors.blue}
              strokeWidth="2"
            />
          ))}
          {/* Layer 2 */}
          {[80, 160, 240, 320].map((y) => (
            <circle
              key={`l2-${y}`}
              cx="300"
              cy={y}
              r="14"
              fill={`${theme.colors.accent}${Math.round(networkPulse * 80)
                .toString(16)
                .padStart(2, "0")}`}
              stroke={theme.colors.accent}
              strokeWidth="2"
            />
          ))}
          {/* Layer 3 */}
          {[150, 250].map((y) => (
            <circle
              key={`l3-${y}`}
              cx="500"
              cy={y}
              r="14"
              fill={`${theme.colors.green}${Math.round(networkPulse * 100)
                .toString(16)
                .padStart(2, "0")}`}
              stroke={theme.colors.green}
              strokeWidth="2"
            />
          ))}
          {/* Connection lines L1→L2 */}
          {[100, 200, 300].map((y1) =>
            [80, 160, 240, 320].map((y2) => (
              <line
                key={`c1-${y1}-${y2}`}
                x1="114"
                y1={y1}
                x2="286"
                y2={y2}
                stroke={theme.colors.border}
                strokeWidth="1"
                opacity={networkPulse * 0.5}
              />
            )),
          )}
          {/* Connection lines L2→L3 */}
          {[80, 160, 240, 320].map((y1) =>
            [150, 250].map((y2) => (
              <line
                key={`c2-${y1}-${y2}`}
                x1="314"
                y1={y1}
                x2="486"
                y2={y2}
                stroke={theme.colors.border}
                strokeWidth="1"
                opacity={networkPulse * 0.5}
              />
            )),
          )}
          {/* Traveling data dots on L1→L2 connections */}
          {frame > 495 && [100, 200, 300].map((y1) => {
            const targetY = [80, 160, 240, 320][Math.floor((frame + y1) / 20) % 4];
            const dotX = 114 + dataFlowT * (286 - 114);
            const dotY = y1 + dataFlowT * (targetY - y1);
            return (
              <circle
                key={`df1-${y1}`}
                cx={dotX}
                cy={dotY}
                r="3"
                fill={theme.colors.accent}
                opacity={networkPulse * 0.7}
              />
            );
          })}
          {/* Traveling data dots on L2→L3 connections */}
          {frame > 510 && [80, 240].map((y1) => {
            const targetY2 = y1 < 200 ? 150 : 250;
            const dotX2 = 314 + dataFlowT * (486 - 314);
            const dotY2 = y1 + dataFlowT * (targetY2 - y1);
            return (
              <circle
                key={`df2-${y1}`}
                cx={dotX2}
                cy={dotY2}
                r="3"
                fill={theme.colors.green}
                opacity={networkPulse * 0.6}
              />
            );
          })}
        </svg>

        {/* "AI" badge */}
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: theme.colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 800,
              color: theme.colors.bg,
            }}
          >
            AI
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: theme.colors.textMuted,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Embedded in every layer
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
