import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";
import { GeometricBg } from "../components/GeometricBg";
import { RobotGuide } from "../components/RobotGuide";

/**
 * DIFFERENTIATOR — 44–65.5s (645 frames)
 * 4 visual phases with rich infographics and animations.
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

  const entryFade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const exitFade = interpolate(frame, [615, 645], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const lineY = interpolate(frame, [0, 645], [8, 92], { easing: Easing.bezier(0.19, 1, 0.22, 1) });

  const phase1 = interpolate(frame, [0, 30, 125, 150], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase2 = interpolate(frame, [138, 168, 270, 300], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase3 = interpolate(frame, [286, 316, 470, 500], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase4 = interpolate(frame, [485, 515, 610, 645], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const blueprintDraw = interpolate(frame, [138, 260], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  const questionToCheck = interpolate(frame, [360, 400], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  const breathe = Math.sin(frame * Math.PI / 30);
  const breatheY = breathe * 3;

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg, fontFamily: theme.font,
        opacity: Math.min(entryFade, exitFade), overflow: "hidden",
      }}
    >
      <GeometricBg frame={frame} opacity={0.03} />

      {/* Slow-moving left accent line */}
      <div style={{ position: "absolute", left: 80, top: `${lineY}%`, width: 3, height: 100, background: `linear-gradient(to bottom, ${theme.colors.accent}, transparent)`, borderRadius: 2 }} />

      {/* ═══ PHASE 1: "How we think" — Brain/gear icon ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: phase1 }}>
        {/* Title */}
        <div style={{
          position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", gap: 28,
          opacity: interpolate(frame, [0, 15, 50, 70], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          <svg width="120" height="120" viewBox="0 0 90 90" style={{
            transform: `rotate(${frame * 0.5}deg) scale(${1 + breathe * 0.04})`,
            filter: `drop-shadow(0 0 16px ${theme.colors.accent}44)`,
          }}>
            <polygon points="45,2 58,32 88,45 58,58 45,88 32,58 2,45 32,32" fill="none" stroke={theme.colors.accent} strokeWidth="2.5" />
            <polygon points="45,14 54,34 74,45 54,56 45,76 36,56 16,45 36,34" fill={`${theme.colors.accent}33`} />
            <circle cx="45" cy="45" r="8" fill={theme.colors.accent} opacity="0.7" />
          </svg>
          <span style={{ fontSize: 42, fontWeight: 900, color: theme.colors.accent, letterSpacing: 4, textTransform: "uppercase" }}>
            What makes us different
          </span>
          {/* Floating keyword badges */}
          {["STRATEGY", "DESIGN", "AI", "SCALE"].map((kw, i) => {
            const kwP = interpolate(frame, [8 + i * 7, 18 + i * 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const positions = [{ x: -380, y: -60 }, { x: 320, y: -50 }, { x: -340, y: 80 }, { x: 360, y: 70 }];
            return (
              <div key={kw} style={{
                position: "absolute", left: `calc(50% + ${positions[i].x}px)`, top: `calc(50% + ${positions[i].y}px)`,
                padding: "8px 20px", borderRadius: 20, background: `${theme.colors.accent}12`, border: `1.5px solid ${theme.colors.accent}33`,
                opacity: kwP * 0.7, transform: `translateY(${Math.sin((frame + i * 20) * 0.06) * 6}px)`,
              }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: theme.colors.accent, letterSpacing: 3 }}>{kw}</span>
              </div>
            );
          })}
        </div>

        {/* Gear + "How we think" with surrounding circuit lines */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          opacity: interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(frame, [55, 80], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) })})`,
        }}>
          <div style={{ position: "relative", width: 600, height: 380, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Circuit lines radiating from gear */}
            <svg width="600" height="380" viewBox="0 0 600 380" style={{ position: "absolute", top: 0, left: 0 }}>
              {[
                { x1: 300, y1: 160, x2: 80, y2: 60 }, { x1: 300, y1: 160, x2: 520, y2: 60 },
                { x1: 300, y1: 160, x2: 80, y2: 280 }, { x1: 300, y1: 160, x2: 520, y2: 280 },
                { x1: 300, y1: 160, x2: 80, y2: 160 }, { x1: 300, y1: 160, x2: 520, y2: 160 },
              ].map((l, i) => {
                const lineP = interpolate(frame, [60 + i * 4, 85 + i * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return (
                  <g key={`cl-${i}`}>
                    <line x1={l.x1} y1={l.y1} x2={l.x1 + (l.x2 - l.x1) * lineP} y2={l.y1 + (l.y2 - l.y1) * lineP}
                      stroke={theme.colors.accent} strokeWidth="1" opacity="0.15" />
                    {lineP > 0.9 && <circle cx={l.x2} cy={l.y2} r="4" fill={theme.colors.accent} opacity="0.3" />}
                  </g>
                );
              })}
            </svg>
            {/* Floating concept nodes at circuit endpoints */}
            {[
              { label: "Product\nThinking", x: 35, y: 25, icon: "💡" },
              { label: "System\nDesign", x: 490, y: 25, icon: "🔧" },
              { label: "User\nFocus", x: 35, y: 255, icon: "👁" },
              { label: "Speed", x: 490, y: 255, icon: "⚡" },
            ].map((node, i) => {
              const nodeP = interpolate(frame, [75 + i * 6, 95 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={node.label} style={{
                  position: "absolute", left: node.x, top: node.y, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  opacity: nodeP, transform: `scale(${interpolate(nodeP, [0, 1], [0.7, 1])}) translateY(${Math.sin((frame + i * 25) * 0.05) * 4}px)`,
                }}>
                  <span style={{ fontSize: 26 }}>{node.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: theme.colors.textMuted, textAlign: "center", whiteSpace: "pre-line", letterSpacing: 1.5, textTransform: "uppercase" }}>{node.label}</span>
                </div>
              );
            })}
            {/* Center gear */}
            <svg width="200" height="200" viewBox="0 0 150 150" style={{ transform: `rotate(${frame * 0.5}deg)` }}>
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i / 16) * Math.PI * 2;
                const x = 75 + Math.cos(angle) * 62;
                const y = 75 + Math.sin(angle) * 62;
                return <rect key={i} x={x - 5} y={y - 5} width="10" height="10" rx="2"
                  fill={`${theme.colors.accent}55`} transform={`rotate(${(i / 16) * 360} ${x} ${y})`} />;
              })}
              <circle cx="75" cy="75" r="52" fill="none" stroke={`${theme.colors.accent}44`} strokeWidth="3" />
              <circle cx="75" cy="75" r="32" fill="none" stroke={theme.colors.accent} strokeWidth="2.5" strokeDasharray="12 6" strokeDashoffset={frame * 0.4} />
              {[0, 72, 144, 216, 288].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const nodeOp = interpolate(frame, [10 + i * 8, 20 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return (
                  <g key={i}>
                    <circle cx={75 + Math.cos(rad) * 20} cy={75 + Math.sin(rad) * 20} r="4" fill={theme.colors.accent} opacity={nodeOp} />
                    <line x1={75 + Math.cos(rad) * 20} y1={75 + Math.sin(rad) * 20}
                      x2={75 + Math.cos(((deg + 72) * Math.PI) / 180) * 20} y2={75 + Math.sin(((deg + 72) * Math.PI) / 180) * 20}
                      stroke={theme.colors.accent} strokeWidth="1.5" opacity={nodeOp * 0.5} />
                  </g>
                );
              })}
              <circle cx="75" cy="75" r={8 + Math.sin(frame * 0.12) * 2} fill={theme.colors.accent} opacity={0.8} />
            </svg>
          </div>
          <span style={{ fontSize: 36, fontWeight: 900, color: theme.colors.accent, letterSpacing: 4, textTransform: "uppercase", transform: `translateY(${breatheY}px)`, marginTop: -20 }}>
            How we think
          </span>
        </div>
      </div>

      {/* ═══ PHASE 2: Blueprint wireframe + infographics ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: phase2 }}>
        {/* Blueprint grid */}
        <svg style={{ position: "absolute", inset: 0 }} width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`vg-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="1080" stroke={theme.colors.accent} strokeWidth="0.5" opacity={0.04} />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`hg-${i}`} x1="0" y1={i * 100} x2="1920" y2={i * 100} stroke={theme.colors.accent} strokeWidth="0.5" opacity={0.04} />
          ))}
        </svg>

        <svg width="900" height="520" viewBox="0 0 700 400" fill="none">
          {/* Top: API Gateway */}
          <rect x="250" y="20" width="200" height="60" rx="8"
            fill={`${theme.colors.accent}${Math.round(interpolate(blueprintDraw, [0.3, 0.5], [0, 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke={theme.colors.accent} strokeWidth="2" strokeDasharray="400" strokeDashoffset={400 - blueprintDraw * 400} />
          <text x="350" y="48" textAnchor="middle" fill={theme.colors.accent} fontSize="14" fontWeight="700" letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.25, 0.4], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>API GATEWAY</text>

          {/* Mini person on API Gateway — placing block */}
          {blueprintDraw > 0.35 && (() => {
            const pWalk = interpolate(blueprintDraw, [0.35, 0.55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const px = 220 + pWalk * 40;
            return (
              <g transform={`translate(${px}, -2)`} opacity={interpolate(pWalk, [0, 0.1, 0.8, 1], [0, 0.7, 0.7, 0])}>
                <circle cx="8" cy="4" r="5" fill={theme.colors.accent} opacity="0.6" />
                <line x1="8" y1="9" x2="8" y2="22" stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.5" />
                <line x1="8" y1="13" x2={2 + Math.sin(frame * 0.15) * 3} y2="18" stroke={theme.colors.accent} strokeWidth="1.2" opacity="0.5" />
                <line x1="8" y1="13" x2={14 - Math.sin(frame * 0.15) * 3} y2="18" stroke={theme.colors.accent} strokeWidth="1.2" opacity="0.5" />
                <line x1="8" y1="22" x2={4 + Math.sin(frame * 0.12) * 2} y2="30" stroke={theme.colors.accent} strokeWidth="1.2" opacity="0.5" />
                <line x1="8" y1="22" x2={12 - Math.sin(frame * 0.12) * 2} y2="30" stroke={theme.colors.accent} strokeWidth="1.2" opacity="0.5" />
                <rect x="0" y="-3" width="10" height="7" rx="1.5" fill={theme.colors.accent} opacity="0.35" />
              </g>
            );
          })()}

          {/* Frontend */}
          <rect x="50" y="160" width="160" height="60" rx="8"
            fill={`${theme.colors.blue}${Math.round(interpolate(blueprintDraw, [0.4, 0.6], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke={theme.colors.blue} strokeWidth="2" strokeDasharray="380" strokeDashoffset={380 - blueprintDraw * 380} />
          <text x="130" y="188" textAnchor="middle" fill={theme.colors.blue} fontSize="14" fontWeight="700" letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.35, 0.5], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>FRONTEND</text>

          {/* Mini person on Frontend — hammering */}
          {blueprintDraw > 0.45 && (() => {
            const pOp = interpolate(blueprintDraw, [0.45, 0.55], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <g transform="translate(28, 140)" opacity={pOp}>
                <circle cx="10" cy="4" r="5" fill={theme.colors.blue} opacity="0.6" />
                <line x1="10" y1="9" x2="10" y2="22" stroke={theme.colors.blue} strokeWidth="1.5" opacity="0.5" />
                <line x1="10" y1="14" x2={4 + Math.sin(frame * 0.2) * 4} y2={10} stroke={theme.colors.blue} strokeWidth="1.2" opacity="0.5" />
                <line x1="10" y1="14" x2="18" y2="18" stroke={theme.colors.blue} strokeWidth="1.2" opacity="0.5" />
                <line x1="10" y1="22" x2="6" y2="30" stroke={theme.colors.blue} strokeWidth="1.2" opacity="0.5" />
                <line x1="10" y1="22" x2="14" y2="30" stroke={theme.colors.blue} strokeWidth="1.2" opacity="0.5" />
              </g>
            );
          })()}

          {/* Backend */}
          <rect x="270" y="160" width="160" height="60" rx="8"
            fill={`${theme.colors.green}${Math.round(interpolate(blueprintDraw, [0.4, 0.6], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke={theme.colors.green} strokeWidth="2" strokeDasharray="380" strokeDashoffset={380 - blueprintDraw * 380} />
          <text x="350" y="188" textAnchor="middle" fill={theme.colors.green} fontSize="14" fontWeight="700" letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.35, 0.5], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>BACKEND</text>

          {/* Mini person on Backend — typing */}
          {blueprintDraw > 0.5 && (() => {
            const pOp = interpolate(blueprintDraw, [0.5, 0.6], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <g transform="translate(438, 148)" opacity={pOp}>
                <circle cx="10" cy="4" r="5" fill={theme.colors.green} opacity="0.6" />
                <line x1="10" y1="9" x2="10" y2="22" stroke={theme.colors.green} strokeWidth="1.5" opacity="0.5" />
                <line x1="10" y1="14" x2="3" y2="19" stroke={theme.colors.green} strokeWidth="1.2" opacity="0.5" />
                <line x1="10" y1="14" x2="17" y2="19" stroke={theme.colors.green} strokeWidth="1.2" opacity="0.5" />
                <line x1="10" y1="22" x2="6" y2="30" stroke={theme.colors.green} strokeWidth="1.2" opacity="0.5" />
                <line x1="10" y1="22" x2="14" y2="30" stroke={theme.colors.green} strokeWidth="1.2" opacity="0.5" />
              </g>
            );
          })()}

          {/* Services */}
          <rect x="490" y="160" width="160" height="60" rx="8"
            fill={`#8b5cf6${Math.round(interpolate(blueprintDraw, [0.4, 0.6], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke="#8b5cf6" strokeWidth="2" strokeDasharray="380" strokeDashoffset={380 - blueprintDraw * 380} />
          <text x="570" y="188" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="700" letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.35, 0.5], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>SERVICES</text>

          {/* Mini person on Services — pushing gear */}
          {blueprintDraw > 0.55 && (() => {
            const pOp = interpolate(blueprintDraw, [0.55, 0.65], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <g transform="translate(656, 140)" opacity={pOp}>
                <circle cx="10" cy="4" r="5" fill="#8b5cf6" opacity="0.6" />
                <line x1="10" y1="9" x2="10" y2="22" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.5" />
                <line x1="10" y1="14" x2="4" y2="19" stroke="#8b5cf6" strokeWidth="1.2" opacity="0.5" />
                <line x1="10" y1="14" x2={16 + Math.sin(frame * 0.15) * 3} y2={11} stroke="#8b5cf6" strokeWidth="1.2" opacity="0.5" />
                <line x1="10" y1="22" x2="6" y2="30" stroke="#8b5cf6" strokeWidth="1.2" opacity="0.5" />
                <line x1="10" y1="22" x2="14" y2="30" stroke="#8b5cf6" strokeWidth="1.2" opacity="0.5" />
                {/* Small gear being pushed */}
                <circle cx="22" cy="10" r="5" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.5" style={{ transform: `rotate(${frame * 2}deg)`, transformOrigin: "22px 10px" }} />
              </g>
            );
          })()}

          {/* Connecting lines */}
          <line x1="350" y1="80" x2="130" y2="160" stroke={theme.colors.border} strokeWidth="1.5" strokeDasharray="300" strokeDashoffset={300 - blueprintDraw * 300} />
          <line x1="350" y1="80" x2="350" y2="160" stroke={theme.colors.border} strokeWidth="1.5" strokeDasharray="80" strokeDashoffset={80 - blueprintDraw * 80} />
          <line x1="350" y1="80" x2="570" y2="160" stroke={theme.colors.border} strokeWidth="1.5" strokeDasharray="300" strokeDashoffset={300 - blueprintDraw * 300} />

          {/* Endpoint dots */}
          {[[350, 80], [130, 160], [350, 160], [570, 160]].map(([cx, cy], i) => (
            <circle key={`ep-${i}`} cx={cx} cy={cy} r="4" fill={theme.colors.accent}
              opacity={interpolate(blueprintDraw, [0.3, 0.5], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          ))}

          {/* Data flow dots */}
          {blueprintDraw > 0.5 && [
            { x1: 350, y1: 80, x2: 130, y2: 160, offset: 0 },
            { x1: 350, y1: 80, x2: 350, y2: 160, offset: 15 },
            { x1: 350, y1: 80, x2: 570, y2: 160, offset: 30 },
          ].map(({ x1, y1, x2, y2, offset }, i) => {
            const flowT = ((frame - 180 + offset) % 50) / 50;
            return <circle key={`flow-${i}`} cx={x1 + flowT * (x2 - x1)} cy={y1 + flowT * (y2 - y1)} r="3" fill={theme.colors.accent}
              opacity={interpolate(flowT, [0, 0.2, 0.8, 1], [0, 0.6, 0.6, 0])} />;
          })}

          {/* DB */}
          <ellipse cx="350" cy="310" rx="60" ry="15" stroke={theme.colors.textMuted} strokeWidth="1.5" strokeDasharray="200" strokeDashoffset={200 - blueprintDraw * 200} />
          <line x1="290" y1="310" x2="290" y2="340" stroke={theme.colors.textMuted} strokeWidth="1.5" opacity={blueprintDraw} />
          <line x1="410" y1="310" x2="410" y2="340" stroke={theme.colors.textMuted} strokeWidth="1.5" opacity={blueprintDraw} />
          <ellipse cx="350" cy="340" rx="60" ry="15" stroke={theme.colors.textMuted} strokeWidth="1.5" strokeDasharray="200" strokeDashoffset={200 - blueprintDraw * 200} />
          <text x="350" y="370" textAnchor="middle" fill={theme.colors.textMuted} fontSize="16" fontWeight="700" letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.6, 0.75], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>DATABASE</text>
          <line x1="350" y1="220" x2="350" y2="295" stroke={theme.colors.border} strokeWidth="1.5" strokeDasharray="80" strokeDashoffset={80 - blueprintDraw * 80} />

          {/* Mini person near DB — checking data */}
          {blueprintDraw > 0.65 && (() => {
            const pOp = interpolate(blueprintDraw, [0.65, 0.75], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <g transform="translate(420, 310)" opacity={pOp}>
                <circle cx="10" cy="4" r="5" fill={theme.colors.textMuted} opacity="0.6" />
                <line x1="10" y1="9" x2="10" y2="22" stroke={theme.colors.textMuted} strokeWidth="1.5" opacity="0.5" />
                <line x1="10" y1="14" x2="4" y2="19" stroke={theme.colors.textMuted} strokeWidth="1.2" opacity="0.5" />
                <line x1="10" y1="14" x2="16" y2="19" stroke={theme.colors.textMuted} strokeWidth="1.2" opacity="0.5" />
                <line x1="10" y1="22" x2="6" y2="30" stroke={theme.colors.textMuted} strokeWidth="1.2" opacity="0.5" />
                <line x1="10" y1="22" x2="14" y2="30" stroke={theme.colors.textMuted} strokeWidth="1.2" opacity="0.5" />
                {/* Clipboard */}
                <rect x="18" y="10" width="8" height="10" rx="1" fill="none" stroke={theme.colors.textMuted} strokeWidth="0.8" opacity="0.5" />
                <line x1="20" y1="14" x2="24" y2="14" stroke={theme.colors.textMuted} strokeWidth="0.6" opacity="0.4" />
                <line x1="20" y1="16" x2="24" y2="16" stroke={theme.colors.textMuted} strokeWidth="0.6" opacity="0.4" />
              </g>
            );
          })()}
        </svg>

        {/* Label */}
        <div style={{ position: "absolute", bottom: "10%", display: "flex", alignItems: "center", gap: 14, opacity: phase2, transform: `translateY(${breatheY}px)` }}>
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect x="2" y="2" width="28" height="28" rx="4" fill="none" stroke={theme.colors.accent} strokeWidth="2" opacity="0.6" />
            <line x1="2" y1="12" x2="30" y2="12" stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.4" />
            <line x1="12" y1="2" x2="12" y2="30" stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.4" />
            <circle cx="22" cy="22" r="5" fill={theme.colors.accent} opacity="0.5" />
          </svg>
          <span style={{ fontSize: 28, fontWeight: 900, color: theme.colors.accent, letterSpacing: 4, textTransform: "uppercase" }}>Architecture first</span>
        </div>
      </div>

      {/* ═══ PHASE 3: Co-founder + Hard Questions ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30, opacity: phase3 }}>
        {/* Shared workspace: two people at one desk, shared screen */}
        <div style={{ position: "relative", width: 800, height: 400, zIndex: 1 }}>

          {/* Desk / Table */}
          <div style={{
            position: "absolute", bottom: 50, left: "50%", transform: "translateX(-50%)", width: 600, height: 8, borderRadius: 4,
            background: `linear-gradient(90deg, ${theme.colors.textMuted}33, ${theme.colors.textSecondary}55, ${theme.colors.textMuted}33)`,
            opacity: interpolate(frame, [290, 310], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }} />

          {/* Shared monitor in center */}
          <div style={{
            position: "absolute", top: 30, left: "50%", transform: "translateX(-50%)",
            opacity: interpolate(frame, [295, 315], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            <svg width="200" height="150" viewBox="0 0 200 150">
              <rect x="10" y="5" width="180" height="110" rx="8" fill={theme.colors.surface} stroke={theme.colors.textSecondary} strokeWidth="2" />
              {/* Screen content — code lines */}
              {Array.from({ length: 5 }).map((_, l) => {
                const lineP = interpolate(frame, [310 + l * 4, 320 + l * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                const widths = [90, 70, 110, 55, 85];
                return <rect key={l} x="25" y={22 + l * 16} width={widths[l] * lineP} height="6" rx="2"
                  fill={l === 2 ? theme.colors.green : theme.colors.accent} opacity={l === 2 ? 0.5 : 0.2} />;
              })}
              {/* Cursor blink */}
              <rect x={25 + ((frame * 1.2) % 110)} y={22 + (Math.floor((frame * 0.08) % 5)) * 16} width="2" height="10" rx="1"
                fill={theme.colors.accent} opacity={Math.sin(frame * 0.2) > 0 ? 0.7 : 0} />
              {/* Monitor stand */}
              <rect x="90" y="115" width="20" height="15" fill={theme.colors.textMuted} opacity="0.3" />
              <rect x="70" y="130" width="60" height="5" rx="2" fill={theme.colors.textMuted} opacity="0.3" />
            </svg>
          </div>

          {/* Left person — "YOU" with laptop */}
          <div style={{
            position: "absolute", left: 80, bottom: 60,
            opacity: interpolate(frame, [300, 318], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `translateX(${interpolate(frame, [300, 318], [-30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          }}>
            <svg width="100" height="150" viewBox="0 0 100 150">
              {/* Head */}
              <circle cx="50" cy="25" r="18" fill={theme.colors.textSecondary} opacity="0.5" />
              <circle cx="44" cy="22" r="2" fill={theme.colors.bg} opacity="0.7" />
              <path d="M42 30 Q50 35 58 30" fill="none" stroke={theme.colors.bg} strokeWidth="1.5" opacity="0.5" />
              {/* Body */}
              <rect x="35" y="43" width="30" height="45" rx="6" fill={theme.colors.textSecondary} opacity="0.3" />
              {/* Arms reaching to desk */}
              <line x1="35" y1="55" x2="15" y2="75" stroke={theme.colors.textSecondary} strokeWidth="3" opacity="0.3" strokeLinecap="round" />
              <line x1="65" y1="55" x2="85" y2="75" stroke={theme.colors.textSecondary} strokeWidth="3" opacity="0.3" strokeLinecap="round" />
              {/* Laptop */}
              <rect x="10" y="78" width="45" height="28" rx="3" fill={theme.colors.surface} stroke={theme.colors.textSecondary} strokeWidth="1.5" opacity="0.6" />
              <rect x="8" y="106" width="50" height="4" rx="2" fill={theme.colors.textSecondary} opacity="0.3" />
              {/* Legs */}
              <line x1="42" y1="88" x2="35" y2="120" stroke={theme.colors.textSecondary} strokeWidth="3" opacity="0.3" strokeLinecap="round" />
              <line x1="58" y1="88" x2="65" y2="120" stroke={theme.colors.textSecondary} strokeWidth="3" opacity="0.3" strokeLinecap="round" />
            </svg>
            <div style={{ textAlign: "center", marginTop: 4 }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: theme.colors.textSecondary, letterSpacing: 3, textTransform: "uppercase" }}>YOU</span>
            </div>
          </div>

          {/* Right person — "NATIVEWIT" with laptop */}
          <div style={{
            position: "absolute", right: 80, bottom: 60,
            opacity: interpolate(frame, [305, 323], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `translateX(${interpolate(frame, [305, 323], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          }}>
            <svg width="100" height="150" viewBox="0 0 100 150">
              {/* Head */}
              <circle cx="50" cy="25" r="18" fill={theme.colors.accent} opacity="0.5" />
              <circle cx="56" cy="22" r="2" fill={theme.colors.bg} opacity="0.7" />
              <path d="M42 30 Q50 35 58 30" fill="none" stroke={theme.colors.bg} strokeWidth="1.5" opacity="0.5" />
              {/* Body */}
              <rect x="35" y="43" width="30" height="45" rx="6" fill={theme.colors.accent} opacity="0.25" />
              {/* Arms reaching to desk */}
              <line x1="35" y1="55" x2="15" y2="75" stroke={theme.colors.accent} strokeWidth="3" opacity="0.3" strokeLinecap="round" />
              <line x1="65" y1="55" x2="85" y2="75" stroke={theme.colors.accent} strokeWidth="3" opacity="0.3" strokeLinecap="round" />
              {/* Laptop */}
              <rect x="45" y="78" width="45" height="28" rx="3" fill={theme.colors.surface} stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.6" />
              <rect x="42" y="106" width="50" height="4" rx="2" fill={theme.colors.accent} opacity="0.3" />
              {/* Legs */}
              <line x1="42" y1="88" x2="35" y2="120" stroke={theme.colors.accent} strokeWidth="3" opacity="0.3" strokeLinecap="round" />
              <line x1="58" y1="88" x2="65" y2="120" stroke={theme.colors.accent} strokeWidth="3" opacity="0.3" strokeLinecap="round" />
            </svg>
            <div style={{ textAlign: "center", marginTop: 4 }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: theme.colors.accent, letterSpacing: 3, textTransform: "uppercase" }}>NATIVEWIT</span>
            </div>
          </div>

          {/* Chat bubbles between them */}
          {[
            { text: "What if we...", side: "left", delay: 325 },
            { text: "Yes! And also...", side: "right", delay: 345 },
            { text: "Let's ship it ✓", side: "left", delay: 365 },
          ].map((bubble, i) => {
            const bP = interpolate(frame, [bubble.delay, bubble.delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const bFade = interpolate(frame, [bubble.delay + 40, bubble.delay + 55], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const isLeft = bubble.side === "left";
            return (
              <div key={i} style={{
                position: "absolute", top: 40 + i * 50, left: isLeft ? 220 : 430,
                padding: "8px 16px", borderRadius: 12, background: isLeft ? `${theme.colors.textSecondary}22` : `${theme.colors.accent}22`,
                border: `1.5px solid ${isLeft ? theme.colors.textSecondary : theme.colors.accent}44`,
                opacity: bP * bFade, transform: `scale(${interpolate(bP, [0, 1], [0.8, 1])}) translateY(${-6 * bP}px)`,
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: isLeft ? theme.colors.textSecondary : theme.colors.accent, letterSpacing: 0.5 }}>{bubble.text}</span>
              </div>
            );
          })}

          {/* "Same team" connecting arc */}
          <svg width="800" height="400" viewBox="0 0 800 400" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
            <path d="M200 340 Q400 380 600 340" fill="none" stroke={theme.colors.accent} strokeWidth="1.5" opacity={interpolate(frame, [330, 350], [0, 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} strokeDasharray="8 4" />
          </svg>
        </div>

        {/* Question marks → Checkmarks */}
        <div style={{ display: "flex", gap: 40, zIndex: 1 }}>
          {[0, 1, 2].map((i) => {
            const qDelay = 345 + i * 20;
            const localMorph = interpolate(frame, [qDelay + 22, qDelay + 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const qP = interpolate(frame - qDelay, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) });

            return (
              <div key={i} style={{ width: 56, height: 56, position: "relative", opacity: qP }}>
                <div style={{
                  position: "absolute", inset: -8, borderRadius: "50%", border: `2px solid ${theme.colors.green}`,
                  opacity: interpolate(localMorph, [0, 0.3, 0.8], [0, 0.4, 0]),
                  transform: `scale(${interpolate(localMorph, [0, 0.5, 1], [0.3, 1.3, 1])})`,
                }} />
                <span style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 38, fontWeight: 800, color: theme.colors.textMuted, opacity: 1 - localMorph,
                }}>?</span>
                <span style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 38, fontWeight: 800, color: theme.colors.green, opacity: localMorph,
                  transform: `scale(${interpolate(localMorph, [0, 0.5, 1], [0.3, 1.15, 1])})`,
                  filter: localMorph > 0.5 ? `drop-shadow(0 0 8px ${theme.colors.green}44)` : "none",
                }}>✓</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ PHASE 4: AI embedded in every layer ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, opacity: phase4 }}>
        {[
          { label: "FRONTEND", color: theme.colors.blue },
          { label: "BACKEND", color: theme.colors.green },
          { label: "DATA", color: "#8b5cf6" },
          { label: "INFRA", color: theme.colors.accent },
        ].map((layer, i) => {
          const layerDelay = 490 + i * 12;
          const layerP = interpolate(frame - layerDelay, [0, 20], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1),
          });
          const layerB = Math.sin((frame + i * 15) * Math.PI / 30) * 2;
          const aiBadge = interpolate(frame - (layerDelay + 15), [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const scanT = ((frame - layerDelay + i * 20) % 80) / 80;

          /* Mini person animation cycle per layer */
          const personWalk = Math.sin((frame + i * 30) * 0.08) * 4;
          const armSwing = Math.sin((frame + i * 20) * 0.15) * 6;

          return (
            <div key={layer.label} style={{
              width: 700, height: 80, borderRadius: 16, background: theme.colors.surface,
              border: `2px solid ${layer.color}44`, display: "flex", alignItems: "center",
              justifyContent: "space-between", padding: "0 28px", opacity: layerP,
              transform: `translateX(${interpolate(layerP, [0, 1], [i % 2 === 0 ? -50 : 50, 0])}px) translateY(${layerB}px)`,
              boxShadow: `0 4px 20px ${layer.color}15`, position: "relative", overflow: "hidden",
            }}>
              {aiBadge > 0.5 && (
                <div style={{
                  position: "absolute", top: 0, left: `${interpolate(scanT, [0, 1], [-10, 110])}%`,
                  width: 40, height: "100%",
                  background: `linear-gradient(90deg, transparent, ${layer.color}12, transparent)`,
                }} />
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: `${layer.color}22`,
                  border: `2px solid ${layer.color}55`, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    {i === 0 && <>
                      <rect x="2" y="3" width="20" height="18" rx="3" fill="none" stroke={layer.color} strokeWidth="2" />
                      <line x1="2" y1="9" x2="22" y2="9" stroke={layer.color} strokeWidth="1.5" />
                    </>}
                    {i === 1 && <>
                      <rect x="4" y="2" width="16" height="7" rx="2" fill="none" stroke={layer.color} strokeWidth="2" />
                      <rect x="4" y="11" width="16" height="7" rx="2" fill="none" stroke={layer.color} strokeWidth="2" />
                    </>}
                    {i === 2 && <>
                      <ellipse cx="12" cy="6" rx="8" ry="4" fill="none" stroke={layer.color} strokeWidth="2" />
                      <line x1="4" y1="6" x2="4" y2="18" stroke={layer.color} strokeWidth="2" />
                      <line x1="20" y1="6" x2="20" y2="18" stroke={layer.color} strokeWidth="2" />
                      <ellipse cx="12" cy="18" rx="8" ry="4" fill="none" stroke={layer.color} strokeWidth="2" />
                    </>}
                    {i === 3 && <path d="M6 18h12a5 5 0 10-2-9.8A7 7 0 104 15a4 4 0 002 3z" fill="none" stroke={layer.color} strokeWidth="2" />}
                  </svg>
                </div>
                <span style={{ fontSize: 22, fontWeight: 800, color: theme.colors.textSecondary, letterSpacing: 3 }}>{layer.label}</span>
              </div>

              {/* Mini people working on this layer */}
              <div style={{ display: "flex", alignItems: "center", gap: 24, position: "absolute", left: 250 }}>
                {/* Person 1 — typing/working */}
                <svg width="30" height="40" viewBox="0 0 30 40" opacity={aiBadge * 0.6}>
                  <circle cx="15" cy="6" r="5" fill={layer.color} opacity="0.5" />
                  <line x1="15" y1="11" x2="15" y2="24" stroke={layer.color} strokeWidth="1.5" opacity="0.4" />
                  <line x1="15" y1="16" x2={9 + armSwing} y2="22" stroke={layer.color} strokeWidth="1.2" opacity="0.4" />
                  <line x1="15" y1="16" x2={21 - armSwing} y2="22" stroke={layer.color} strokeWidth="1.2" opacity="0.4" />
                  <line x1="15" y1="24" x2="11" y2="34" stroke={layer.color} strokeWidth="1.2" opacity="0.4" />
                  <line x1="15" y1="24" x2="19" y2="34" stroke={layer.color} strokeWidth="1.2" opacity="0.4" />
                </svg>
                {/* Person 2 — carrying block */}
                <svg width="30" height="40" viewBox="0 0 30 40" opacity={aiBadge * 0.5}
                  style={{ transform: `translateX(${personWalk}px)` }}>
                  <circle cx="15" cy="6" r="5" fill={layer.color} opacity="0.5" />
                  <line x1="15" y1="11" x2="15" y2="24" stroke={layer.color} strokeWidth="1.5" opacity="0.4" />
                  <line x1="15" y1="15" x2="8" y2="10" stroke={layer.color} strokeWidth="1.2" opacity="0.4" />
                  <line x1="15" y1="15" x2="22" y2="10" stroke={layer.color} strokeWidth="1.2" opacity="0.4" />
                  <rect x="6" y="3" width="18" height="8" rx="2" fill={layer.color} opacity="0.2" />
                  <line x1="15" y1="24" x2={11 + Math.sin((frame + i * 10) * 0.12) * 2} y2="34" stroke={layer.color} strokeWidth="1.2" opacity="0.4" />
                  <line x1="15" y1="24" x2={19 - Math.sin((frame + i * 10) * 0.12) * 2} y2="34" stroke={layer.color} strokeWidth="1.2" opacity="0.4" />
                </svg>
                {/* Person 3 — waving/pointing */}
                <svg width="30" height="40" viewBox="0 0 30 40" opacity={aiBadge * 0.45}>
                  <circle cx="15" cy="6" r="5" fill={layer.color} opacity="0.5" />
                  <line x1="15" y1="11" x2="15" y2="24" stroke={layer.color} strokeWidth="1.5" opacity="0.4" />
                  <line x1="15" y1="16" x2={8 + Math.sin((frame + i * 15) * 0.1) * 5} y2={12 - Math.abs(Math.sin((frame + i * 15) * 0.1)) * 4} stroke={layer.color} strokeWidth="1.2" opacity="0.4" />
                  <line x1="15" y1="16" x2="22" y2="20" stroke={layer.color} strokeWidth="1.2" opacity="0.4" />
                  <line x1="15" y1="24" x2="11" y2="34" stroke={layer.color} strokeWidth="1.2" opacity="0.4" />
                  <line x1="15" y1="24" x2="19" y2="34" stroke={layer.color} strokeWidth="1.2" opacity="0.4" />
                </svg>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: aiBadge }}>
                <svg width="28" height="28" viewBox="0 0 28 28" style={{ transform: `scale(${1 + Math.sin((frame + i * 20) * 0.1) * 0.08})` }}>
                  <circle cx="4" cy="8" r="2.5" fill={layer.color} opacity="0.6" />
                  <circle cx="4" cy="20" r="2.5" fill={layer.color} opacity="0.6" />
                  <circle cx="14" cy="6" r="2.5" fill={layer.color} opacity="0.8" />
                  <circle cx="14" cy="14" r="2.5" fill={layer.color} />
                  <circle cx="14" cy="22" r="2.5" fill={layer.color} opacity="0.8" />
                  <circle cx="24" cy="14" r="3" fill={layer.color} />
                  <line x1="6.5" y1="8" x2="11.5" y2="6" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                  <line x1="6.5" y1="8" x2="11.5" y2="14" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                  <line x1="6.5" y1="20" x2="11.5" y2="14" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                  <line x1="6.5" y1="20" x2="11.5" y2="22" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                  <line x1="16.5" y1="6" x2="21.5" y2="14" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                  <line x1="16.5" y1="14" x2="21.5" y2="14" stroke={layer.color} strokeWidth="1" opacity="0.5" />
                  <line x1="16.5" y1="22" x2="21.5" y2="14" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                </svg>
                <div style={{
                  padding: "6px 14px", borderRadius: 8, background: `${layer.color}22`, border: `1.5px solid ${layer.color}66`,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ fontSize: 15, fontWeight: 900, color: layer.color, letterSpacing: 1.5 }}>AI</span>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%", background: layer.color,
                    opacity: 0.5 + Math.sin((frame + i * 15) * 0.15) * 0.5,
                    boxShadow: `0 0 6px ${layer.color}`,
                  }} />
                </div>
              </div>
            </div>
          );
        })}

        {/* Energy flow between layers */}
        {frame > 535 && (
          <svg style={{ position: "absolute", left: "50%", top: "26%", transform: "translateX(-50%)", width: 20, height: "48%", pointerEvents: "none" }} viewBox="0 0 20 520">
            <line x1="10" y1="0" x2="10" y2="520" stroke={theme.colors.accent} strokeWidth="1" opacity="0.1" />
            {[0, 1, 2, 3].map((d) => {
              const dotT = ((frame - 535 + d * 30) % 90) / 90;
              return <circle key={d} cx="10" cy={dotT * 520} r="4" fill={theme.colors.accent}
                opacity={interpolate(dotT, [0, 0.15, 0.85, 1], [0, 0.7, 0.7, 0])} />;
            })}
          </svg>
        )}

        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="30" height="30" viewBox="0 0 30 30" style={{ transform: `translateY(${breatheY}px)` }}>
            <rect x="6" y="6" width="18" height="18" rx="3" fill="none" stroke={theme.colors.accent} strokeWidth="2" opacity="0.6" />
            <circle cx="15" cy="15" r="4" fill={theme.colors.accent} opacity="0.5" />
          </svg>
          <span style={{ fontSize: 28, fontWeight: 900, color: theme.colors.textMuted, letterSpacing: 4, textTransform: "uppercase", transform: `translateY(${breatheY}px)` }}>
            Embedded in every layer
          </span>
        </div>
      </div>

      <RobotGuide frame={frame} x={4} y={3} scale={0.6}
        expression={frame < 150 ? "thinking" : frame < 300 ? "neutral" : frame < 485 ? "happy" : "waving"} />
    </AbsoluteFill>
  );
};
