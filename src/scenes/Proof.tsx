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
 * PROOF — synced to VO 31.0–46.9s (480 frames)
 * Phase 1: Sequential category showcases (one at a time, synced to VO)
 *   - AI/Video Production  (frames 0-90):   VO "AI-powered video production tools"
 *   - Health Research      (frames 90-238):  VO "mental health research platforms..."
 *   - Financial Automation (frames 238-330): VO "financial automation for SMEs"
 * Phase 2: Real products, real users (frames 330-396)
 * Phase 3: Weeks, not months (frames 396-478)
 */

export const Proof: React.FC = () => {
  const frame = useCurrentFrame();

  const entryFade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const exitFade = interpolate(frame, [450, 480], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /* Category show/hide — synced to VO transcript timing
   * Proof scene starts at video frame 960 = VO 31.0s (VO offset = INTRO_DELAY 1s).
   * Segment boundaries (frames within Proof scene):
   *   Cat 1 AI Video:    0  – 121  VO ~36.02s → video 36.02s
   *   Cat 2 Health:    121 – 225  VO ~39.5s → video 39.5s
   *   Cat 3 Financial: 228 – 300  VO ~39.8–42s → video 39.8–42s
   *   Phase 2 Real:    298 – 320  VO ~42s → video 42s
   *   Phase 3 Weeks:   307 – 468  VO ~42.22s → video 42.22s
   */
  const cat1 = interpolate(frame, [15, 30, 101, 121], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cat2 = interpolate(frame, [121, 135, 213, 225], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cat3 = interpolate(frame, [228, 240, 290, 300], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const phase2 = interpolate(frame, [298, 308, 308, 320], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase3 = interpolate(frame, [307, 321, 452, 468], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const breathe = Math.sin(frame * Math.PI / 30);
  const breatheY = breathe * 3;

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg, fontFamily: theme.font,
        opacity: Math.min(entryFade, exitFade), overflow: "hidden",
      }}
    >
      <GeometricBg frame={frame} opacity={0.04} />

      {/* Persistent "What we shipped" popup across all category slides */}
      {frame < 300 && (
        <div style={{
          position: "absolute", top: 40, left: "50%",
          padding: "14px 40px", borderRadius: 20,
          background: `${theme.colors.accent}15`, border: `2px solid ${theme.colors.accent}44`,
          opacity: interpolate(frame, [0, 12, 285, 300], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          zIndex: 10,
          boxShadow: `0 4px 24px ${theme.colors.accent}22`,
          transform: `translateX(-50%) scale(${interpolate(frame, [0, 12], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
        }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: theme.colors.accent, letterSpacing: 5, textTransform: "uppercase" }}>What we shipped</span>
        </div>
      )}

      {/* ═══ CAT 1: AI / Video Production ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 60, opacity: cat1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <span style={{ fontSize: 52, fontWeight: 900, color: "#8b5cf6", letterSpacing: 3 }}>AI Video Production</span>
        </div>
        {/* Video editor timeline */}
        <svg width="720" height="400" viewBox="0 0 600 340">
          {/* Editor window */}
          <rect x="10" y="10" width="580" height="320" rx="12" fill={theme.colors.surface} stroke={"#8b5cf644"} strokeWidth="2"
            opacity={interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          {/* Title bar */}
          <rect x="10" y="10" width="580" height="28" rx="12" fill={theme.colors.surfaceLight} opacity={0.8} />
          {[0,1,2].map(d => <circle key={d} cx={28 + d * 16} cy="24" r="4" fill={d === 0 ? "#e63434" : d === 1 ? "#eab308" : theme.colors.green} opacity="0.6" />)}
          <text x="300" y="28" textAnchor="middle" fill={theme.colors.textMuted} fontSize="10" fontWeight="700" letterSpacing="1">VIDEO EDITOR</text>
          {/* Preview area */}
          <rect x="20" y="45" width="360" height="180" rx="8" fill={`#8b5cf612`} stroke={"#8b5cf633"} strokeWidth="1.5" />
          {/* Play button */}
          <polygon points="180,120 220,140 180,160" fill="#8b5cf6" opacity={0.5 + Math.sin(frame * 0.1) * 0.3} />
          {/* B-Roll clips panel */}
          {[0, 1, 2].map(c => {
            const clipP = interpolate(frame, [40 + c * 10, 55 + c * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <g key={`clip-${c}`} opacity={clipP}>
                <rect x={395} y={50 + c * 58} width="185" height="48" rx="6" fill={`#8b5cf6${c === 1 ? "22" : "15"}`} stroke={"#8b5cf633"} strokeWidth="1" />
                <rect x={402} y={56 + c * 58} width="36" height="36" rx="4" fill={"#8b5cf633"} />
                <polygon points={`${415},${66 + c * 58} ${425},${74 + c * 58} ${415},${82 + c * 58}`} fill="#8b5cf6" opacity="0.6" />
                <text x="450" y={70 + c * 58} fill={theme.colors.textSecondary} fontSize="9" fontWeight="700" letterSpacing="1">
                  {["B-ROLL 01", "B-ROLL 02", "B-ROLL 03"][c]}
                </text>
                <text x="450" y={83 + c * 58} fill={theme.colors.textMuted} fontSize="8">
                  {["0:04 · 1080p", "0:06 · 4K", "0:03 · 1080p"][c]}
                </text>
              </g>
            );
          })}
          {/* Timeline tracks */}
          {[0, 1, 2].map((t, ti) => {
            const trackColors = ["#8b5cf6", "#a78bfa", "#7c3aed"];
            const trackP = interpolate(frame, [50 + ti * 8, 80 + ti * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <g key={`track-${t}`}>
                <rect x="20" y={240 + t * 28} width={560 * trackP} height="20" rx="4" fill={`${trackColors[ti]}33`} stroke={`${trackColors[ti]}55`} strokeWidth="1" />
                {/* Clip segments */}
                {[0, 0.25, 0.55, 0.8].map((seg, si) => (
                  <rect key={`seg-${si}`} x={20 + seg * 540} y={242 + t * 28} width={[120, 140, 100, 80][si] * trackP} height="16" rx="3"
                    fill={trackColors[ti]} opacity={0.4 + (si === 1 ? 0.2 : 0)} />
                ))}
              </g>
            );
          })}
          {/* Playhead */}
          <line x1={20 + ((frame * 2) % 560)} y1="235" x2={20 + ((frame * 2) % 560)} y2="310" stroke="#8b5cf6" strokeWidth="2" opacity="0.7" />
          <circle cx={20 + ((frame * 2) % 560)} cy="235" r="4" fill="#8b5cf6" />
        </svg>
      </div>

      {/* ═══ CAT 2: Health Research ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 60, opacity: cat2 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <span style={{ fontSize: 52, fontWeight: 900, color: theme.colors.green, letterSpacing: 3 }}>Health Research</span>
        </div>
        <svg width="660" height="420" viewBox="0 0 550 360">
          {/* Dashboard frame */}
          <rect x="10" y="10" width="530" height="340" rx="14" fill={theme.colors.surface} stroke={`${theme.colors.green}44`} strokeWidth="2" />
          {/* Sidebar */}
          <rect x="10" y="10" width="100" height="340" rx="14" fill={theme.colors.surfaceLight} opacity="0.5" />
          {[0,1,2,3,4].map(n => <rect key={n} x="22" y={50 + n * 36} width="66" height="8" rx="4" fill={theme.colors.green} opacity={n === 1 ? 0.6 : 0.2} />)}
          {/* Heart ECG */}
          <polyline points={`120,80 160,80 175,60 185,100 195,70 205,85 250,85 ${250 + ((frame - 90) % 40) * 2},${85 - Math.sin((frame - 90) * 0.3) * 15}`}
            fill="none" stroke={theme.colors.green} strokeWidth="2.5" opacity="0.8"
            strokeDasharray="200" strokeDashoffset={interpolate(frame, [112, 199], [200, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          {/* Patient data cards */}
          {[0, 1, 2].map(c => {
            const cardP = interpolate(frame - 114, [c * 12, c * 12 + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <g key={`hcard-${c}`} opacity={cardP}>
                <rect x={120 + c * 140} y="120" width="125" height="100" rx="8" fill={`${theme.colors.green}12`} stroke={`${theme.colors.green}33`} strokeWidth="1.5" />
                <circle cx={182 + c * 140} cy="148" r="14" fill={`${theme.colors.green}22`} stroke={theme.colors.green} strokeWidth="1.5" />
                {c === 0 && <path d="M175,148 L180,153 L190,143" fill="none" stroke={theme.colors.green} strokeWidth="2" strokeLinecap="round" />}
                {c === 1 && <>
                  <line x1="316" y1="142" x2="316" y2="155" stroke={theme.colors.green} strokeWidth="2" />
                  <line x1="310" y1="148" x2="322" y2="148" stroke={theme.colors.green} strokeWidth="2" />
                </>}
                {c === 2 && <circle cx="462" cy="148" r="6" fill={theme.colors.green} opacity="0.5" />}
                <rect x={135 + c * 140} y="172" width="80" height="6" rx="3" fill={theme.colors.green} opacity="0.3" />
                <rect x={135 + c * 140} y="184" width="55" height="6" rx="3" fill={theme.colors.green} opacity="0.2" />
                <text x={182 + c * 140} y="206" textAnchor="middle" fill={theme.colors.green} fontSize="10" fontWeight="800" letterSpacing="1" opacity="0.6">
                  {["VITALS", "LAB RESULTS", "IMAGING"][c]}
                </text>
              </g>
            );
          })}
          {/* Progress bars */}
          {[0.7, 0.45, 0.85].map((w, i) => {
            const barP = interpolate(frame - 124, [i * 10, i * 10 + 20], [0, w], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <g key={`bar-${i}`}>
                <rect x="120" y={245 + i * 28} width="400" height="14" rx="7" fill={`${theme.colors.green}15`} />
                <rect x="120" y={245 + i * 28} width={400 * barP} height="14" rx="7" fill={theme.colors.green} opacity={0.4 + i * 0.15} />
                <text x="525" y={255 + i * 28} fill={theme.colors.textMuted} fontSize="10" fontWeight="700">{Math.round(barP / w * 100)}%</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ═══ CAT 3: Financial Automation ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 60, opacity: cat3 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <span style={{ fontSize: 52, fontWeight: 900, color: theme.colors.blue, letterSpacing: 3 }}>Financial Automation</span>
        </div>
        <svg width="700" height="400" viewBox="0 0 580 340">
          {/* Dashboard */}
          <rect x="10" y="10" width="560" height="320" rx="14" fill={theme.colors.surface} stroke={`${theme.colors.blue}44`} strokeWidth="2" />
          {/* Top stat cards */}
          {[0, 1, 2].map(c => {
            const sp = interpolate(frame - 233, [c * 8, c * 8 + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const vals = ["$247K", "1,842", "99.7%"];
            const labels = ["REVENUE", "TRANSACTIONS", "ACCURACY"];
            return (
              <g key={`stat-${c}`} opacity={sp}>
                <rect x={25 + c * 182} y="25" width="168" height="65" rx="8" fill={`${theme.colors.blue}12`} stroke={`${theme.colors.blue}33`} strokeWidth="1" />
                <text x={109 + c * 182} y="52" textAnchor="middle" fill={theme.colors.blue} fontSize="22" fontWeight="900">{vals[c]}</text>
                <text x={109 + c * 182} y="72" textAnchor="middle" fill={theme.colors.textMuted} fontSize="9" fontWeight="700" letterSpacing="1.5">{labels[c]}</text>
              </g>
            );
          })}
          {/* Live trading chart */}
          <rect x="25" y="105" width="340" height="200" rx="8" fill={`${theme.colors.blue}08`} />
          {/* Chart grid */}
          {[0, 1, 2, 3].map(g => <line key={`cg-${g}`} x1="25" y1={145 + g * 42} x2="365" y2={145 + g * 42} stroke={theme.colors.blue} strokeWidth="0.5" opacity="0.1" />)}
          {/* Candlesticks */}
          {Array.from({ length: 16 }).map((_, i) => {
            const cp = interpolate(frame - 238, [i * 2, i * 2 + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const h = 15 + Math.sin(i * 1.3) * 30 + Math.cos(i * 0.7) * 20;
            const isUp = Math.sin(i * 2.1) > 0;
            return (
              <g key={`candle-${i}`} opacity={cp}>
                <line x1={40 + i * 20} y1={250 - h - 8} x2={40 + i * 20} y2={250 - h + 35} stroke={isUp ? theme.colors.green : theme.colors.accent} strokeWidth="1" />
                <rect x={35 + i * 20} y={250 - h} width="10" height={22} rx="1" fill={isUp ? theme.colors.green : theme.colors.accent} opacity="0.7" />
              </g>
            );
          })}
          {/* Automation panel right */}
          <rect x="385" y="105" width="170" height="200" rx="8" fill={`${theme.colors.blue}08`} stroke={`${theme.colors.blue}22`} strokeWidth="1" />
          <text x="470" y="125" textAnchor="middle" fill={theme.colors.blue} fontSize="10" fontWeight="800" letterSpacing="1.5" opacity="0.6">AUTOMATION</text>
          {/* Gears spinning */}
          <g style={{ transform: `rotate(${(frame - 228) * 1.2}deg)`, transformOrigin: "440px 170px" }}>
            <circle cx="440" cy="170" r="18" fill="none" stroke={theme.colors.blue} strokeWidth="2" opacity="0.4" />
            <circle cx="440" cy="170" r="6" fill={theme.colors.blue} opacity="0.3" />
            {[0, 60, 120, 180, 240, 300].map(a => {
              const rad = (a * Math.PI) / 180;
              return <rect key={a} x={440 + Math.cos(rad) * 20 - 3} y={170 + Math.sin(rad) * 20 - 3} width="6" height="6" rx="1" fill={theme.colors.blue} opacity="0.5" />;
            })}
          </g>
          <g style={{ transform: `rotate(${-(frame - 228) * 1.8}deg)`, transformOrigin: "100px 95px" }}>
            <circle cx="500" cy="190" r="12" fill="none" stroke={theme.colors.blue} strokeWidth="1.5" opacity="0.3" />
            <circle cx="500" cy="190" r="4" fill={theme.colors.blue} opacity="0.3" />
          </g>
          {/* Invoice rows */}
          {[0, 1, 2].map(r => {
              const rp = interpolate(frame - 248, [r * 10, r * 10 + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <g key={`inv-${r}`} opacity={rp}>
                <rect x="395" y={215 + r * 28} width="150" height="20" rx="4" fill={`${theme.colors.blue}15`} />
                <text x="405" y={229 + r * 28} fill={theme.colors.textMuted} fontSize="8" fontWeight="700">INV-{2024 + r}</text>
                <path d={`M${530},${222 + r * 28} L${534},${226 + r * 28} L${540},${219 + r * 28}`} fill="none" stroke={theme.colors.green} strokeWidth="1.5" opacity="0.7" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* ═══ PHASE 2: Real Products, Real Users ═══ */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 40, opacity: phase2,
      }}>
        <span style={{ fontSize: 36, fontWeight: 900, color: theme.colors.accent, letterSpacing: 5, textTransform: "uppercase" }}>
          Real products · Real users
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 50, transform: `translateY(${breatheY}px)` }}>
          {/* Stacked device previews */}
          <div style={{ position: "relative", width: 280, height: 230 }}>
            {/* Desktop behind */}
            <div style={{
              position: "absolute", top: 0, left: 0,
              width: 240, height: 160, borderRadius: 12,
              border: `2px solid ${theme.colors.border}`, background: theme.colors.surface,
              overflow: "hidden", transform: "rotate(-4deg)",
              boxShadow: `0 16px 40px rgba(0,0,0,0.4)`,
              opacity: interpolate(frame, [303, 321], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              <div style={{ height: 16, background: theme.colors.surfaceLight, display: "flex", alignItems: "center", padding: "0 6px", gap: 3 }}>
                {[0,1,2].map(d => <div key={d} style={{ width: 5, height: 5, borderRadius: "50%", background: d === 0 ? theme.colors.accent : theme.colors.textMuted, opacity: 0.5 }} />)}
              </div>
              <div style={{ display: "flex", height: "calc(100% - 16px)" }}>
                <div style={{ width: 45, background: theme.colors.surfaceLight, opacity: 0.4 }} />
                <div style={{ flex: 1, padding: 8 }}>
                  {[0.7, 0.5, 0.8, 0.4].map((w, j) => <div key={j} style={{ height: 6, width: `${w * 100}%`, background: theme.colors.border, borderRadius: 3, marginTop: 6 }} />)}
                </div>
              </div>
              <div style={{ position: "absolute", top: 10, right: 8, width: 8, height: 8, borderRadius: "50%", background: theme.colors.green, boxShadow: `0 0 6px ${theme.colors.green}`, opacity: 0.5 + Math.sin(frame * 0.15) * 0.5 }} />
            </div>
            {/* Phone in front */}
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: 110, height: 190, borderRadius: 18,
              border: `2px solid ${theme.colors.accent}55`, background: theme.colors.surface,
              overflow: "hidden", transform: "rotate(3deg)",
              boxShadow: `0 16px 40px rgba(0,0,0,0.5)`,
              opacity: interpolate(frame, [308, 328], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              <div style={{ height: 18, background: theme.colors.accent, opacity: 0.7 }} />
              {[0.6, 0.8, 0.5, 0.7].map((w, j) => <div key={j} style={{ margin: `${6 + j}px 8px 0`, height: 5, width: `${w * 100}%`, background: theme.colors.border, borderRadius: 3 }} />)}
              <div style={{ margin: "8px 8px", height: 40, borderRadius: 6, background: `linear-gradient(135deg, ${theme.colors.accent}18, ${theme.colors.green}15)` }} />
            </div>
          </div>

          {/* User count with avatars */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex" }}>
              {[0, 1, 2, 3, 4, 5].map(i => {
                const aP = interpolate(frame - (305 + i * 3), [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) });
                return (
                  <div key={i} style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: [theme.colors.accent, theme.colors.green, theme.colors.blue, "#8b5cf6", theme.colors.accent, theme.colors.green][i],
                    opacity: aP * 0.85, transform: `scale(${interpolate(aP, [0, 1], [0.3, 1])})`,
                    border: `3px solid ${theme.colors.bg}`, marginLeft: i > 0 ? -10 : 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="5" fill={theme.colors.bg} opacity="0.7" />
                      <path d="M4 22 C4 16 8 13 12 13 C16 13 20 16 20 22" fill={theme.colors.bg} opacity="0.5" />
                    </svg>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 60, fontWeight: 900, color: theme.colors.accent, lineHeight: 1, letterSpacing: "-2px" }}>
                {Math.min(1000, Math.floor(interpolate(frame, [311, 353], [0, 1000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })))}+
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: theme.colors.textMuted, letterSpacing: 3, textTransform: "uppercase" }}>Active Users</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ PHASE 3: Weeks Not Months ═══ */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 36, opacity: phase3,
      }}>
        {/* Comparison row: crossed-out months vs highlighted weeks */}
        <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
          {/* Old way — months */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
            opacity: interpolate(frame, [342, 357], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            {/* Multiple calendar pages */}
            <div style={{ position: "relative", width: 130, height: 130 }}>
              {[0, 1, 2].map(c => (
                <div key={c} style={{
                  position: "absolute", left: c * 8, top: c * 8, width: 110, height: 110, borderRadius: 12,
                  background: theme.colors.surface, border: `2px solid ${theme.colors.textMuted}33`,
                  opacity: 0.4 + c * 0.3,
                }}>
                  {c === 2 && <>
                    <div style={{ height: 22, background: theme.colors.textMuted, opacity: 0.3, borderRadius: "12px 12px 0 0" }} />
                    {Array.from({ length: 9 }).map((_, d) => (
                      <div key={d} style={{ position: "absolute", left: 10 + (d % 4) * 24, top: 30 + Math.floor(d / 4) * 22, width: 14, height: 10, borderRadius: 3, background: theme.colors.textMuted, opacity: 0.2 }} />
                    ))}
                  </>}
                </div>
              ))}
              {/* Cross-out */}
              <svg width="130" height="130" viewBox="0 0 130 130" style={{ position: "absolute", top: 0, left: 0 }}>
                <line x1="10" y1="10" x2="120" y2="120" stroke={theme.colors.accent} strokeWidth="3" opacity="0.7"
                  strokeDashoffset={interpolate(frame, [362, 382], [155, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
                <line x1="120" y1="10" x2="10" y2="120" stroke={theme.colors.accent} strokeWidth="3" opacity="0.7"
                  strokeDasharray="155" strokeDashoffset={interpolate(frame, [367, 387], [155, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
              </svg>
            </div>
            <span style={{ fontSize: 24, fontWeight: 800, color: theme.colors.textMuted, letterSpacing: 3, textTransform: "uppercase", textDecoration: "line-through", textDecorationColor: theme.colors.accent }}>6+ Months</span>
          </div>

          {/* Arrow */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {[0, 1, 2].map(a => {
              const arrowP = interpolate(frame, [372 + a * 6, 385 + a * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) });
              return (
                <svg key={a} width="50" height="24" viewBox="0 0 50 24" opacity={arrowP}>
                  <polygon points="0,4 35,4 35,0 50,12 35,24 35,20 0,20" fill={theme.colors.accent} opacity={0.3 + a * 0.2} />
                </svg>
              );
            })}
          </div>

          {/* New way — weeks with rocket */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
            opacity: interpolate(frame, [377, 392], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            {/* Single sprint calendar */}
            <div style={{ position: "relative" }}>
              <svg width="130" height="130" viewBox="0 0 130 130">
                <rect x="5" y="5" width="120" height="120" rx="14" fill={theme.colors.surface} stroke={theme.colors.green} strokeWidth="2.5" />
                <rect x="5" y="5" width="120" height="26" rx="14" fill={theme.colors.green} opacity="0.7" />
                <rect x="5" y="20" width="120" height="11" fill={theme.colors.green} opacity="0.7" />
                {/* Sprint days highlighted */}
                {Array.from({ length: 10 }).map((_, d) => {
                  const dayP = interpolate(frame - 382, [d * 2, d * 2 + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return <rect key={d} x={15 + (d % 5) * 22} y={42 + Math.floor(d / 5) * 28} width="16" height="18" rx="3"
                    fill={theme.colors.green} opacity={dayP * 0.6} />;
                })}
                {/* Checkmark at end */}
                <path d="M80 88 L90 98 L110 75" fill="none" stroke={theme.colors.green} strokeWidth="3" strokeLinecap="round"
                  opacity={interpolate(frame, [397, 407], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
              </svg>
              {/* Rocket */}
              <svg width="40" height="50" viewBox="0 0 40 50" style={{
                position: "absolute", top: -20, right: -15,
                transform: `rotate(-30deg) translateY(${-breatheY * 2}px)`,
                opacity: interpolate(frame, [387, 397], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}>
                <path d="M20 3 C12 3 8 18 8 30 L32 30 C32 18 28 3 20 3Z" fill={theme.colors.surface} stroke={theme.colors.textSecondary} strokeWidth="1.5" />
                <path d="M20 3 C15 3 13 10 13 14 L27 14 C27 10 25 3 20 3Z" fill={theme.colors.accent} opacity="0.8" />
                <ellipse cx="20" cy={35 + Math.sin(frame * 0.3) * 3} rx="6" ry={8 + Math.sin(frame * 0.4) * 4} fill={theme.colors.accent} opacity="0.6" />
                <ellipse cx="20" cy={36 + Math.sin(frame * 0.35) * 2} rx="3" ry={5 + Math.sin(frame * 0.5) * 3} fill="#eab308" opacity="0.7" />
              </svg>
            </div>
            <span style={{ fontSize: 24, fontWeight: 800, color: theme.colors.green, letterSpacing: 3, textTransform: "uppercase" }}>2–4 Weeks</span>
          </div>
        </div>

        <span style={{ fontSize: 40, fontWeight: 900, color: theme.colors.textSecondary, letterSpacing: 5, textTransform: "uppercase", transform: `translateY(${breatheY}px)` }}>
          Weeks, not months
        </span>
      </div>

      <RobotGuide frame={frame} x={90} y={3} scale={0.6} expression="happy" />
    </AbsoluteFill>
  );
};
