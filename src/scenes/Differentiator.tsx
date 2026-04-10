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
 * DIFFERENTIATOR — 48–70.5s (675 frames)
 * 4 visual phases with rich infographics and animations.
 *
 * VO cues (local frames):
 *   0   "What makes us different isn't the tech stack"
 * 117   "We design the architecture before writing a line of code"
 * 227   "We work like a co-founder, not a contractor"
 * 323   "We ask the hard questions early"
 * 463   "With AI embedded in every layer"
 * 574   "we move faster without cutting corners"
 */

export const Differentiator: React.FC = () => {
  const frame = useCurrentFrame();

  const entryFade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const exitFade = interpolate(frame, [645, 675], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const lineY = interpolate(frame, [0, 645], [8, 92], { easing: Easing.bezier(0.19, 1, 0.22, 1) });

  const phase1 = interpolate(frame, [0, 15, 100, 120], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase2 = interpolate(frame, [105, 120, 210, 225], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase3 = interpolate(frame, [215, 230, 450, 465], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase4 = interpolate(frame, [450, 465, 630, 660], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const blueprintDraw = interpolate(frame, [105, 215], [0, 1], {
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
          <svg width="160" height="160" viewBox="0 0 90 90" style={{
            transform: `rotate(${frame * 0.5}deg) scale(${1 + breathe * 0.04})`,
            filter: `drop-shadow(0 0 16px ${theme.colors.accent}44)`,
          }}>
            <polygon points="45,2 58,32 88,45 58,58 45,88 32,58 2,45 32,32" fill="none" stroke={theme.colors.accent} strokeWidth="2.5" />
            <polygon points="45,14 54,34 74,45 54,56 45,76 36,56 16,45 36,34" fill={`${theme.colors.accent}33`} />
            <circle cx="45" cy="45" r="8" fill={theme.colors.accent} opacity="0.7" />
          </svg>
          <span style={{ fontSize: 56, fontWeight: 900, color: theme.colors.accent, letterSpacing: 4, textTransform: "uppercase" }}>
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
                <span style={{ fontSize: 18, fontWeight: 800, color: theme.colors.accent, letterSpacing: 3 }}>{kw}</span>
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
          <div style={{ position: "relative", width: 700, height: 440, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Circuit lines radiating from gear */}
            <svg width="700" height="440" viewBox="0 0 600 380" style={{ position: "absolute", top: 0, left: 0 }}>
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
                  <span style={{ fontSize: 36 }}>{node.icon}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: theme.colors.textMuted, textAlign: "center", whiteSpace: "pre-line", letterSpacing: 1.5, textTransform: "uppercase" }}>{node.label}</span>
                </div>
              );
            })}
            {/* Center gear */}
            <svg width="280" height="280" viewBox="0 0 150 150" style={{ transform: `rotate(${frame * 0.5}deg)` }}>
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
          <span style={{ fontSize: 48, fontWeight: 900, color: theme.colors.accent, letterSpacing: 4, textTransform: "uppercase", transform: `translateY(${breatheY}px)`, marginTop: -20 }}>
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

        <svg width="1100" height="620" viewBox="0 0 700 400" fill="none">
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
            const flowT = ((frame - 145 + offset) % 50) / 50;
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

          {/* Cache node */}
          <rect x="130" y="305" width="100" height="40" rx="6"
            fill={`${theme.colors.green}${Math.round(interpolate(blueprintDraw, [0.6, 0.8], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke={theme.colors.green} strokeWidth="1.5" strokeDasharray="240" strokeDashoffset={240 - blueprintDraw * 240} />
          <text x="180" y="329" textAnchor="middle" fill={theme.colors.green} fontSize="10" fontWeight="700" letterSpacing="1.5"
            opacity={interpolate(blueprintDraw, [0.65, 0.8], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>CACHE</text>
          <line x1="290" y1="325" x2="230" y2="325" stroke={theme.colors.border} strokeWidth="1" strokeDasharray="60" strokeDashoffset={60 - blueprintDraw * 60} />

          {/* Monitoring node */}
          <rect x="470" y="305" width="120" height="40" rx="6"
            fill={`#eab308${Math.round(interpolate(blueprintDraw, [0.65, 0.85], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke="#eab308" strokeWidth="1.5" strokeDasharray="280" strokeDashoffset={280 - blueprintDraw * 280} />
          <text x="530" y="329" textAnchor="middle" fill="#eab308" fontSize="10" fontWeight="700" letterSpacing="1.5"
            opacity={interpolate(blueprintDraw, [0.7, 0.85], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>MONITORING</text>
          <line x1="410" y1="325" x2="470" y2="325" stroke={theme.colors.border} strokeWidth="1" strokeDasharray="60" strokeDashoffset={60 - blueprintDraw * 60} />

          {/* Queue node */}
          <rect x="440" y="100" width="80" height="35" rx="6"
            fill={`${theme.colors.accent}${Math.round(interpolate(blueprintDraw, [0.5, 0.7], [0, 8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke={theme.colors.accent} strokeWidth="1.5" strokeDasharray="200" strokeDashoffset={200 - blueprintDraw * 200} />
          <text x="480" y="122" textAnchor="middle" fill={theme.colors.accent} fontSize="9" fontWeight="700" letterSpacing="1.5"
            opacity={interpolate(blueprintDraw, [0.55, 0.7], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>QUEUE</text>
          <line x1="430" y1="190" x2="480" y2="135" stroke={theme.colors.border} strokeWidth="1" strokeDasharray="80" strokeDashoffset={80 - blueprintDraw * 80} />
          <line x1="480" y1="135" x2="570" y2="160" stroke={theme.colors.border} strokeWidth="1" strokeDasharray="100" strokeDashoffset={100 - blueprintDraw * 100} />
        </svg>

        {/* Label */}
        <div style={{ position: "absolute", bottom: "6%", display: "flex", alignItems: "center", gap: 20, opacity: phase2, transform: `translateY(${breatheY}px)` }}>
          <svg width="40" height="40" viewBox="0 0 32 32">
            <rect x="2" y="2" width="28" height="28" rx="4" fill="none" stroke={theme.colors.accent} strokeWidth="2" opacity="0.6" />
            <line x1="2" y1="12" x2="30" y2="12" stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.4" />
            <line x1="12" y1="2" x2="12" y2="30" stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.4" />
            <circle cx="22" cy="22" r="5" fill={theme.colors.accent} opacity="0.5" />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 900, color: theme.colors.accent, letterSpacing: 4, textTransform: "uppercase" }}>Architecture first</span>
        </div>
      </div>

      {/* ═══ PHASE 3: Co-founder vs Contractor + Hard Questions ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: phase3 }}>

        {/* ── Title ── */}
        <div style={{
          position: "absolute", top: 50,
          opacity: interpolate(frame, [225, 238, 320, 332], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [225, 238], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
        }}>
          <span style={{ fontSize: 44, fontWeight: 900, color: theme.colors.textSecondary, letterSpacing: 4, textTransform: "uppercase" }}>
            We work like a co-founder
          </span>
        </div>

        {/* ── Part A: Comparison split (frames 230–320) ── */}
        <div style={{
          position: "relative", width: 1050, height: 420, display: "flex",
          opacity: interpolate(frame, [228, 242, 318, 332], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          {/* Central divider */}
          <div style={{
            position: "absolute", left: "50%", top: 0, width: 2, borderRadius: 1,
            height: `${interpolate(frame, [230, 250], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
            background: `linear-gradient(to bottom, ${theme.colors.accent}55, ${theme.colors.accent}11)`,
          }} />

          {/* VS badge */}
          <div style={{
            position: "absolute", left: "50%", top: "45%", zIndex: 3,
            width: 50, height: 50, borderRadius: "50%",
            background: theme.colors.surface, border: `2px solid ${theme.colors.accent}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: interpolate(frame, [242, 252], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `translate(-50%, -50%) scale(${interpolate(frame, [242, 255], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 900, color: theme.colors.textMuted, letterSpacing: 2 }}>VS</span>
          </div>

          {/* ── LEFT: Contractor ── */}
          <div style={{
            width: "48%", display: "flex", flexDirection: "column", alignItems: "center", gap: 22, paddingTop: 20,
            opacity: interpolate(frame, [234, 250], [0, 0.88], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: "rgba(255,255,255,0.85)", letterSpacing: 5, textTransform: "uppercase" }}>CONTRACTOR</span>

            {/* Person icon */}
            <svg width="80" height="90" viewBox="0 0 60 70" style={{
              opacity: interpolate(frame, [235, 250], [0, 0.85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              <rect x="5" y="5" width="50" height="60" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4 3" />
              <circle cx="30" cy="22" r="9" fill="rgba(255,255,255,0.7)" />
              <rect x="21" y="32" width="18" height="24" rx="4" fill="rgba(255,255,255,0.5)" />
              <line x1="30" y1="56" x2="24" y2="68" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
              <line x1="30" y1="56" x2="36" y2="68" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* Comparison items */}
            {[
              { text: "Takes orders" },
              { text: "Ships code" },
              { text: "Exits at launch" },
            ].map((item, i) => {
              const rowDelay = 252 + i * 14;
              const rowP = interpolate(frame, [rowDelay, rowDelay + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14, opacity: rowP,
                  transform: `translateX(${interpolate(rowP, [0, 1], [-15, 0])}px)`,
                }}>
                  {/* Red X badge */}
                  <div style={{ width: 22, height: 22, position: "relative", flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 22 22">
                      <circle cx="11" cy="11" r="10" fill={theme.colors.accent} opacity="0.2" />
                      <line x1="7" y1="7" x2="15" y2="15" stroke={theme.colors.accent} strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="15" y1="7" x2="7" y2="15" stroke={theme.colors.accent} strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 21, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: 1 }}>{item.text}</span>
                </div>
              );
            })}

            {/* Red X overlay — drawn on reveal */}
            <svg style={{
              position: "absolute", top: "8%", left: "2%", width: "46%", height: "84%", pointerEvents: "none",
              opacity: interpolate(frame, [295, 308], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }} viewBox="0 0 200 360" preserveAspectRatio="none">
              <line x1="10" y1="10" x2="190" y2="350" stroke={theme.colors.accent} strokeWidth="3" opacity="0.7"
                strokeDasharray="360" strokeDashoffset={interpolate(frame, [295, 310], [360, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
              <line x1="190" y1="10" x2="10" y2="350" stroke={theme.colors.accent} strokeWidth="3" opacity="0.7"
                strokeDasharray="360" strokeDashoffset={interpolate(frame, [302, 317], [360, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
            </svg>
          </div>

          {/* ── RIGHT: Co-founder (highlighted) ── */}
          <div style={{
            width: "48%", marginLeft: "4%", display: "flex", flexDirection: "column", alignItems: "center", gap: 22, paddingTop: 20,
            opacity: interpolate(frame, [238, 255], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            <span style={{
              fontSize: 26, fontWeight: 900, color: theme.colors.accent, letterSpacing: 5, textTransform: "uppercase",
              filter: `drop-shadow(0 0 10px ${theme.colors.accent}33)`,
            }}>CO-FOUNDER</span>

            {/* Connected people icon */}
            <svg width="110" height="90" viewBox="0 0 80 70" style={{
              opacity: interpolate(frame, [240, 258], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              <circle cx="25" cy="20" r="9" fill={theme.colors.accent} opacity="0.45" />
              <rect x="16" y="30" width="18" height="24" rx="4" fill={theme.colors.accent} opacity="0.25" />
              <circle cx="55" cy="20" r="9" fill={theme.colors.accent} opacity="0.45" />
              <rect x="46" y="30" width="18" height="24" rx="4" fill={theme.colors.accent} opacity="0.25" />
              <path d="M34 38 Q40 30 46 38" fill="none" stroke={theme.colors.accent} strokeWidth="2.5" opacity="0.55" strokeLinecap="round" />
              <path d="M34 50 L46 50" stroke={theme.colors.accent} strokeWidth="2" opacity="0.35" strokeLinecap="round" />
              <path d="M42 47 L46 50 L42 53" fill="none" stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
              <path d="M38 47 L34 50 L38 53" fill="none" stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
            </svg>

            {/* Comparison items */}
            {[
              { text: "Challenges assumptions", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
              { text: "Ships outcomes", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { text: "Scales with you", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
            ].map((item, i) => {
              const rowDelay = 256 + i * 14;
              const rowP = interpolate(frame, [rowDelay, rowDelay + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14, opacity: rowP,
                  transform: `translateX(${interpolate(rowP, [0, 1], [15, 0])}px)`,
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill={theme.colors.accent} opacity="0.15" />
                    <path d="M8 12 L11 15 L16 9" fill="none" stroke={theme.colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 21, fontWeight: 700, color: theme.colors.accent, letterSpacing: 1 }}>{item.text}</span>
                </div>
              );
            })}

            {/* Glow border */}
            <div style={{
              position: "absolute", inset: -2, borderRadius: 16, right: 0, width: "48%", left: "auto",
              border: `2px solid ${theme.colors.accent}`,
              opacity: interpolate(frame, [302, 316], [0, 0.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              boxShadow: `0 0 30px ${theme.colors.accent}18, inset 0 0 20px ${theme.colors.accent}06`,
            }} />
          </div>
        </div>

        {/* ── Part B: Hard Questions → Checkmarks (frames 323–445) ── */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30,
          opacity: interpolate(frame, [322, 336, 443, 458], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          {/* Title */}
          <div style={{
            position: "absolute", top: 55,
            opacity: interpolate(frame, [324, 336], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [324, 336], [12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          }}>
            <span style={{ fontSize: 40, fontWeight: 900, color: theme.colors.textSecondary, letterSpacing: 4, textTransform: "uppercase" }}>
              We ask the hard questions early
            </span>
          </div>

          {/* Question cards */}
          <div style={{ display: "flex", gap: 36, marginTop: 30 }}>
            {[
              { question: "Will it scale?", color: theme.colors.accent },
              { question: "Right architecture?", color: theme.colors.blue },
              { question: "Does the user need this?", color: theme.colors.green },
            ].map((card, i) => {
              const cardDelay = 340 + i * 14;
              const cardP = interpolate(frame, [cardDelay, cardDelay + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) });
              const morphDelay = 370 + i * 15;
              const morph = interpolate(frame, [morphDelay, morphDelay + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) });

              return (
                <div key={i} style={{
                  width: 270, height: 200, borderRadius: 20,
                  background: theme.colors.surface, border: `2px solid ${card.color}44`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22,
                  opacity: cardP,
                  transform: `scale(${interpolate(cardP, [0, 1], [0.7, 1])}) translateY(${Math.sin((frame + i * 20) * 0.04) * 3}px)`,
                  boxShadow: morph > 0.5 ? `0 0 24px ${card.color}22` : "none",
                  overflow: "hidden", position: "relative",
                }}>
                  {/* Question text */}
                  <span style={{ fontSize: 20, fontWeight: 800, color: card.color, letterSpacing: 1, textAlign: "center", padding: "0 20px" }}>
                    {card.question}
                  </span>

                  {/* ? → ✓ morph */}
                  <div style={{ position: "relative", width: 52, height: 52 }}>
                    {/* Ripple */}
                    <div style={{
                      position: "absolute", inset: -10, borderRadius: "50%",
                      border: `2px solid ${card.color}`,
                      opacity: interpolate(morph, [0, 0.3, 0.8], [0, 0.5, 0]),
                      transform: `scale(${interpolate(morph, [0, 0.5, 1], [0.3, 1.4, 1])})`,
                    }} />
                    <span style={{
                      position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 36, fontWeight: 900, color: theme.colors.textMuted, opacity: 1 - morph,
                    }}>?</span>
                    <span style={{
                      position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 36, fontWeight: 900, color: card.color, opacity: morph,
                      transform: `scale(${interpolate(morph, [0, 0.5, 1], [0.3, 1.15, 1])})`,
                      filter: morph > 0.5 ? `drop-shadow(0 0 8px ${card.color}44)` : "none",
                    }}>✓</span>
                  </div>

                  {/* Sweep effect */}
                  {morph > 0 && morph < 1 && (
                    <div style={{
                      position: "absolute", top: 0, left: `${interpolate(morph, [0, 1], [-20, 120])}%`,
                      width: 30, height: "100%",
                      background: `linear-gradient(90deg, transparent, ${card.color}12, transparent)`,
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Subtitle */}
          <div style={{
            opacity: interpolate(frame, [358, 370], [0, 0.55], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [358, 370], [8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: theme.colors.textMuted, letterSpacing: 2, textTransform: "uppercase" }}>
              So you don't build the wrong thing fast
            </span>
          </div>
        </div>
      </div>

      {/* ═══ PHASE 4: AI embedded in every layer — 2×2 grid with connecting lines ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0, opacity: phase4 }}>
        <div style={{ position: "relative", width: 740, height: 520 }}>
          {/* Connecting lines SVG overlay */}
          <svg style={{ position: "absolute", inset: 0, width: 740, height: 520, pointerEvents: "none", zIndex: 2 }} viewBox="0 0 740 520">
            {/* Horizontal top */}
            <line x1="280" y1="110" x2="460" y2="110" stroke={theme.colors.accent} strokeWidth="2"
              strokeDasharray="180" strokeDashoffset={interpolate(frame, [475, 505], [180, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} opacity="0.3" />
            {/* Horizontal bottom */}
            <line x1="280" y1="400" x2="460" y2="400" stroke={theme.colors.accent} strokeWidth="2"
              strokeDasharray="180" strokeDashoffset={interpolate(frame, [480, 510], [180, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} opacity="0.3" />
            {/* Vertical left */}
            <line x1="140" y1="225" x2="140" y2="290" stroke={theme.colors.accent} strokeWidth="2"
              strokeDasharray="65" strokeDashoffset={interpolate(frame, [477, 503], [65, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} opacity="0.3" />
            {/* Vertical right */}
            <line x1="600" y1="225" x2="600" y2="290" stroke={theme.colors.accent} strokeWidth="2"
              strokeDasharray="65" strokeDashoffset={interpolate(frame, [483, 507], [65, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} opacity="0.3" />
            {/* Diagonal cross */}
            <line x1="280" y1="225" x2="460" y2="290" stroke={theme.colors.accent} strokeWidth="1.5"
              strokeDasharray="200" strokeDashoffset={interpolate(frame, [485, 515], [200, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} opacity="0.15" />
            <line x1="460" y1="225" x2="280" y2="290" stroke={theme.colors.accent} strokeWidth="1.5"
              strokeDasharray="200" strokeDashoffset={interpolate(frame, [487, 517], [200, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} opacity="0.15" />

            {/* Animated data flow dots on lines */}
            {frame > 505 && [
              { x1: 280, y1: 110, x2: 460, y2: 110 },
              { x1: 280, y1: 400, x2: 460, y2: 400 },
              { x1: 140, y1: 225, x2: 140, y2: 290 },
              { x1: 600, y1: 225, x2: 600, y2: 290 },
            ].map((line, li) => {
              const t = ((frame - 505 + li * 20) % 60) / 60;
              return <circle key={`fd-${li}`} cx={line.x1 + t * (line.x2 - line.x1)} cy={line.y1 + t * (line.y2 - line.y1)}
                r="4" fill={theme.colors.accent} opacity={interpolate(t, [0, 0.2, 0.8, 1], [0, 0.7, 0.7, 0])} />;
            })}

            {/* Center AI node */}
            <circle cx="370" cy="258" r={18 + Math.sin(frame * 0.1) * 2} fill={theme.colors.accent} opacity={interpolate(frame, [495, 513], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
            <text x="370" y="263" textAnchor="middle" fill={theme.colors.bg} fontSize="14" fontWeight="900" letterSpacing="1"
              opacity={interpolate(frame, [500, 515], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>AI</text>
            {/* Pulse ring */}
            <circle cx="370" cy="258" r={28 + Math.sin(frame * 0.15) * 8} fill="none" stroke={theme.colors.accent} strokeWidth="1.5"
              opacity={interpolate(frame, [500, 513], [0, 0.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * (0.5 + Math.sin(frame * 0.12) * 0.5)} />
          </svg>

          {/* 2×2 grid of square layer boxes */}
          {[
            { label: "FRONTEND", color: theme.colors.blue, x: 0, y: 0, icon: 0 },
            { label: "BACKEND", color: theme.colors.green, x: 460, y: 0, icon: 1 },
            { label: "DATA", color: "#8b5cf6", x: 0, y: 290, icon: 2 },
            { label: "INFRA", color: theme.colors.accent, x: 460, y: 290, icon: 3 },
          ].map((layer, i) => {
            const layerDelay = 455 + i * 10;
            const layerP = interpolate(frame - layerDelay, [0, 20], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1),
            });
            const layerB = Math.sin((frame + i * 15) * Math.PI / 30) * 2;
            const aiBadge = interpolate(frame - (layerDelay + 15), [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const scanT = ((frame - layerDelay + i * 20) % 80) / 80;

            return (
              <div key={layer.label} style={{
                position: "absolute", left: layer.x, top: layer.y, width: 280, height: 220, borderRadius: 20,
                background: theme.colors.surface, border: `2px solid ${layer.color}44`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
                opacity: layerP,
                transform: `scale(${interpolate(layerP, [0, 1], [0.7, 1])}) translateY(${layerB}px)`,
                boxShadow: `0 8px 30px ${layer.color}15`, overflow: "hidden", zIndex: 1,
              }}>
                {/* Scan line */}
                {aiBadge > 0.5 && (
                  <div style={{
                    position: "absolute", top: 0, left: `${interpolate(scanT, [0, 1], [-10, 110])}%`,
                    width: 40, height: "100%",
                    background: `linear-gradient(90deg, transparent, ${layer.color}12, transparent)`,
                  }} />
                )}

                {/* Layer icon */}
                <div style={{
                  width: 64, height: 64, borderRadius: 18, background: `${layer.color}18`,
                  border: `2px solid ${layer.color}44`, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24">
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

                {/* Label */}
                <span style={{ fontSize: 22, fontWeight: 900, color: theme.colors.textSecondary, letterSpacing: 4 }}>{layer.label}</span>

                {/* AI badge */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 8, opacity: aiBadge,
                  padding: "6px 16px", borderRadius: 10, background: `${layer.color}15`, border: `1.5px solid ${layer.color}44`,
                }}>
                  <svg width="18" height="18" viewBox="0 0 28 28">
                    <circle cx="4" cy="8" r="2.5" fill={layer.color} opacity="0.6" />
                    <circle cx="4" cy="20" r="2.5" fill={layer.color} opacity="0.6" />
                    <circle cx="14" cy="14" r="2.5" fill={layer.color} />
                    <circle cx="24" cy="14" r="3" fill={layer.color} />
                    <line x1="6.5" y1="8" x2="11.5" y2="14" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                    <line x1="6.5" y1="20" x2="11.5" y2="14" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                    <line x1="16.5" y1="14" x2="21.5" y2="14" stroke={layer.color} strokeWidth="1" opacity="0.5" />
                  </svg>
                  <span style={{ fontSize: 14, fontWeight: 900, color: layer.color, letterSpacing: 2 }}>AI POWERED</span>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%", background: layer.color,
                    opacity: 0.5 + Math.sin((frame + i * 15) * 0.15) * 0.5,
                    boxShadow: `0 0 6px ${layer.color}`,
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="34" height="34" viewBox="0 0 30 30" style={{ transform: `translateY(${breatheY}px)` }}>
            <rect x="6" y="6" width="18" height="18" rx="3" fill="none" stroke={theme.colors.accent} strokeWidth="2" opacity="0.6" />
            <circle cx="15" cy="15" r="4" fill={theme.colors.accent} opacity="0.5" />
          </svg>
          <span style={{ fontSize: 34, fontWeight: 900, color: theme.colors.textMuted, letterSpacing: 4, textTransform: "uppercase", transform: `translateY(${breatheY}px)` }}>
            Embedded in every layer
          </span>
        </div>
      </div>

      <RobotGuide frame={frame} x={4} y={3} scale={0.6}
        expression={frame < 120 ? "thinking" : frame < 240 ? "neutral" : frame < 450 ? "happy" : "waving"} />
    </AbsoluteFill>
  );
};
