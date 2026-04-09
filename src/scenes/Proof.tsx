import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";

/**
 * PROOF — 29.5–44s (435 frames)
 * 3 fullscreen phases with rich icons and animations:
 *   Phase 1 (0-270): Product categories — Video & AI, Health, Fintech
 *   Phase 2 (271-338): Real products, real users
 *   Phase 3 (339-435): Weeks, not months
 */

const CATEGORIES = [
  { label: "Video & AI", color: "#8b5cf6", delay: 0 },
  { label: "Health", color: theme.colors.green, delay: 84 },
  { label: "Fintech", color: theme.colors.blue, delay: 185 },
];

export const Proof: React.FC = () => {
  const frame = useCurrentFrame();

  /* ── Scene transitions ──────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const exitFade = interpolate(frame, [405, 435], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase visibility (fullscreen slides) ────────────────── */
  const phase1 = interpolate(frame, [0, 15, 255, 275], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2 = interpolate(frame, [265, 285, 325, 345], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase3 = interpolate(frame, [335, 355, 405, 435], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Continuous breathing ───────────────────────────────── */
  const breathe = Math.sin(frame * Math.PI / 30);
  const breatheY = breathe * 3;

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
          background: `radial-gradient(ellipse at 50% 50%, ${theme.colors.accent}08 0%, transparent 60%)`,
        }}
      />

      {/* ═══ PHASE 1: Product Categories (fullscreen) ═══ */}
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
        {/* Section label */}
        <span
          style={{
            position: "absolute",
            top: 60,
            fontSize: 26,
            fontWeight: 900,
            color: theme.colors.accent,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: interpolate(frame, [5, 25], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          What we've shipped
        </span>

        {/* 3 category cards */}
        <div
          style={{
            display: "flex",
            gap: 40,
            height: "55%",
            width: "85%",
            maxWidth: 1600,
          }}
        >
          {CATEGORIES.map((cat, i) => {
            const cardProgress = interpolate(
              frame - cat.delay,
              [0, 30],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.19, 1, 0.22, 1),
              },
            );
            const cardY = interpolate(cardProgress, [0, 1], [40, 0]);
            const cardBreathe = Math.sin((frame + i * 20) * Math.PI / 30) * 3;
            const nextDelay = CATEGORIES[i + 1]?.delay ?? 270;
            const isActive = frame >= cat.delay && frame < nextDelay;

            return (
              <div
                key={cat.label}
                style={{
                  flex: 1,
                  background: theme.colors.surface,
                  borderRadius: 24,
                  border: `2px solid ${isActive ? cat.color + "66" : theme.colors.border}`,
                  opacity: cardProgress,
                  transform: `translateY(${cardY + cardBreathe}px)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 28,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: isActive ? `0 0 40px ${cat.color}22` : "none",
                }}
              >
                {/* Top accent bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${interpolate(cardProgress, [0, 1], [0, 100])}%`,
                    height: 4,
                    background: cat.color,
                    borderRadius: "24px 24px 0 0",
                  }}
                />

                {/* Active glow */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(circle at 50% 35%, ${cat.color}15 0%, transparent 65%)`,
                    }}
                  />
                )}

                {/* Category-specific large icon */}
                {i === 0 && (
                  /* Video/AI — Film reel + neural sparkles */
                  <div style={{ position: "relative", width: 140, height: 140 }}>
                    <svg width="140" height="140" viewBox="0 0 140 140"
                      style={{ filter: `drop-shadow(0 0 16px ${cat.color}55)` }}
                    >
                      {/* Film reel circle */}
                      <circle cx="70" cy="70" r="55" fill="none" stroke={cat.color} strokeWidth="3" opacity="0.6" />
                      <circle cx="70" cy="70" r="45" fill="none" stroke={cat.color} strokeWidth="1.5" opacity="0.3" />
                      {/* Reel holes */}
                      {[0, 60, 120, 180, 240, 300].map((a) => {
                        const rad = (a * Math.PI) / 180;
                        return (
                          <circle key={a} cx={70 + Math.cos(rad) * 35} cy={70 + Math.sin(rad) * 35}
                            r="6" fill="none" stroke={cat.color} strokeWidth="2" opacity="0.5" />
                        );
                      })}
                      {/* Center play button */}
                      <polygon points="60,50 60,90 90,70" fill={cat.color} opacity="0.8" />
                      {/* AI sparkle paths */}
                      {[0, 1, 2, 3].map((s) => {
                        const sparkAngle = ((frame * 2.5 + s * 90) % 360) * (Math.PI / 180);
                        const sr = 58;
                        return (
                          <g key={s}>
                            <circle cx={70 + Math.cos(sparkAngle) * sr} cy={70 + Math.sin(sparkAngle) * sr}
                              r="4" fill={cat.color} opacity="0.8" />
                            <line x1={70 + Math.cos(sparkAngle) * (sr - 8)} y1={70 + Math.sin(sparkAngle) * (sr - 8)}
                              x2={70 + Math.cos(sparkAngle) * (sr + 8)} y2={70 + Math.sin(sparkAngle) * (sr + 8)}
                              stroke={cat.color} strokeWidth="1" opacity="0.4" />
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                )}

                {i === 1 && (
                  /* Health — Heart with ECG pulse + stethoscope */
                  <div style={{ position: "relative", width: 140, height: 140 }}>
                    <svg width="140" height="140" viewBox="0 0 140 140"
                      style={{ filter: `drop-shadow(0 0 16px ${cat.color}55)` }}
                    >
                      {/* Heart shape */}
                      <path d="M70 120 C30 90 5 65 5 40 C5 20 20 8 40 8 C52 8 63 16 70 28 C77 16 88 8 100 8 C120 8 135 20 135 40 C135 65 110 90 70 120Z"
                        fill={`${cat.color}25`} stroke={cat.color} strokeWidth="3" />
                      {/* Heartbeat cross */}
                      <line x1="55" y1="55" x2="85" y2="55" stroke={cat.color} strokeWidth="3" opacity="0.7" />
                      <line x1="70" y1="40" x2="70" y2="70" stroke={cat.color} strokeWidth="3" opacity="0.7" />
                    </svg>
                    {/* ECG line below */}
                    <svg style={{ position: "absolute", bottom: -5, left: 0, width: 140, height: 30 }}
                      viewBox="0 0 140 30">
                      <polyline
                        points="0,15 30,15 45,5 55,25 65,15 80,15 95,8 105,22 115,15 140,15"
                        fill="none" stroke={cat.color} strokeWidth="2.5"
                        strokeDasharray="160"
                        strokeDashoffset={interpolate(frame - cat.delay, [0, 50], [160, 0], {
                          extrapolateLeft: "clamp", extrapolateRight: "clamp",
                        })}
                      />
                    </svg>
                    {/* Pulse ring */}
                    <div style={{
                      position: "absolute", top: "40%", left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 80 + breathe * 10, height: 80 + breathe * 10,
                      borderRadius: "50%", border: `2px solid ${cat.color}44`,
                      opacity: isActive ? 0.4 : 0,
                    }} />
                  </div>
                )}

                {i === 2 && (
                  /* Fintech — Rising chart with coin/dollar */
                  <div style={{ position: "relative", width: 140, height: 140 }}>
                    <svg width="140" height="140" viewBox="0 0 140 140"
                      style={{ filter: `drop-shadow(0 0 16px ${cat.color}55)` }}
                    >
                      {/* Chart background grid */}
                      {[0, 1, 2, 3].map((l) => (
                        <line key={l} x1="20" y1={30 + l * 25} x2="120" y2={30 + l * 25}
                          stroke={cat.color} strokeWidth="0.5" opacity="0.15" />
                      ))}
                      {/* Rising bars */}
                      {[0.35, 0.5, 0.7, 0.55, 0.85, 0.65, 1].map((h, j) => {
                        const barH = interpolate(frame - cat.delay, [j * 6, j * 6 + 25], [0, h * 80], {
                          extrapolateLeft: "clamp", extrapolateRight: "clamp",
                        });
                        return (
                          <rect key={j} x={25 + j * 14} y={120 - barH} width="10" height={barH}
                            fill={j === 6 ? cat.color : `${cat.color}77`}
                            rx="2" />
                        );
                      })}
                      {/* Rising arrow line */}
                      <polyline points="25,105 50,85 70,90 95,55 120,35"
                        fill="none" stroke={cat.color} strokeWidth="2.5" opacity="0.7"
                        strokeDasharray="120"
                        strokeDashoffset={interpolate(frame - cat.delay, [10, 60], [120, 0], {
                          extrapolateLeft: "clamp", extrapolateRight: "clamp",
                        })}
                      />
                      {/* Arrow tip */}
                      <polygon points="118,28 125,38 115,40" fill={cat.color} opacity="0.7" />
                      {/* Dollar sign */}
                      <text x="70" y="25" textAnchor="middle" fill={cat.color} fontSize="18"
                        fontWeight="800" opacity="0.5">$</text>
                    </svg>
                  </div>
                )}

                {/* Category label */}
                <span
                  style={{
                    fontSize: 30,
                    fontWeight: 900,
                    color: cat.color,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                  }}
                >
                  {cat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ PHASE 2: Real Products, Real Users (fullscreen) ═══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 50,
          opacity: phase2,
        }}
      >
        {/* Large app mockup screens */}
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {/* Phone mockup */}
          <div style={{
            width: 160, height: 280, borderRadius: 24,
            border: `3px solid ${theme.colors.border}`,
            background: theme.colors.surface,
            position: "relative", overflow: "hidden",
            transform: `translateY(${breatheY}px) rotate(-5deg)`,
            boxShadow: `0 20px 50px rgba(0,0,0,0.4)`,
            opacity: interpolate(frame, [271, 290], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            {/* Status bar */}
            <div style={{ height: 24, background: theme.colors.accent, opacity: 0.8 }} />
            {/* Content lines */}
            {[0.6, 0.8, 0.5, 0.7, 0.4, 0.9].map((w, j) => (
              <div key={j} style={{
                margin: `${8 + j * 2}px 12px 0`,
                height: 8, width: `${w * 100}%`,
                background: theme.colors.border, borderRadius: 4,
              }} />
            ))}
            {/* Chart placeholder */}
            <div style={{ margin: "12px", height: 60, borderRadius: 8,
              background: `linear-gradient(135deg, ${theme.colors.accent}22, ${theme.colors.green}22)` }} />
            {/* Active indicator */}
            <div style={{
              position: "absolute", top: 8, right: 8,
              width: 10, height: 10, borderRadius: "50%",
              background: theme.colors.green,
              boxShadow: `0 0 8px ${theme.colors.green}`,
              opacity: 0.5 + Math.sin(frame * 0.15) * 0.5,
            }} />
          </div>

          {/* Center — user count + metric */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
            transform: `translateY(${breatheY * 0.5}px)`,
          }}>
            {/* User avatars stacked */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const avatarDelay = 275 + i * 4;
                const avatarProgress = interpolate(frame - avatarDelay, [0, 15], [0, 1], {
                  extrapolateLeft: "clamp", extrapolateRight: "clamp",
                  easing: Easing.bezier(0.19, 1, 0.22, 1),
                });
                return (
                  <div key={i} style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: [theme.colors.accent, theme.colors.green, theme.colors.blue,
                      "#8b5cf6", theme.colors.accent, theme.colors.green][i],
                    opacity: avatarProgress * 0.85,
                    transform: `scale(${interpolate(avatarProgress, [0, 1], [0.3, 1])})`,
                    border: `3px solid ${theme.colors.bg}`,
                    marginLeft: i > 0 ? -12 : 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="5" fill={theme.colors.bg} opacity="0.7" />
                      <path d="M4 22 C4 16 8 13 12 13 C16 13 20 16 20 22" fill={theme.colors.bg} opacity="0.5" />
                    </svg>
                  </div>
                );
              })}
            </div>

            {/* Metric number */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 64, fontWeight: 900, color: theme.colors.accent,
                lineHeight: 1, letterSpacing: "-2px",
              }}>
                {Math.min(1000, Math.floor(interpolate(frame, [280, 320], [0, 1000], {
                  extrapolateLeft: "clamp", extrapolateRight: "clamp",
                })))}+
              </div>
              <span style={{
                fontSize: 22, fontWeight: 800, color: theme.colors.textMuted,
                letterSpacing: 3, textTransform: "uppercase",
              }}>
                Active Users
              </span>
            </div>
          </div>

          {/* Desktop mockup */}
          <div style={{
            width: 240, height: 160, borderRadius: 12,
            border: `3px solid ${theme.colors.border}`,
            background: theme.colors.surface,
            position: "relative", overflow: "hidden",
            transform: `translateY(${-breatheY}px) rotate(3deg)`,
            boxShadow: `0 20px 50px rgba(0,0,0,0.4)`,
            opacity: interpolate(frame, [278, 296], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            <div style={{ height: 18, background: theme.colors.surfaceLight, display: "flex",
              alignItems: "center", padding: "0 8px", gap: 4 }}>
              {[0, 1, 2].map((d) => (
                <div key={d} style={{ width: 6, height: 6, borderRadius: "50%",
                  background: d === 0 ? theme.colors.accent : theme.colors.textMuted, opacity: 0.5 }} />
              ))}
            </div>
            <div style={{ display: "flex", height: "calc(100% - 18px)" }}>
              <div style={{ width: 50, background: theme.colors.surfaceLight, opacity: 0.5 }} />
              <div style={{ flex: 1, padding: 8 }}>
                {[0.7, 0.5, 0.8, 0.4].map((w, j) => (
                  <div key={j} style={{ height: 6, width: `${w * 100}%`,
                    background: theme.colors.border, borderRadius: 3, marginTop: 6 }} />
                ))}
              </div>
            </div>
            <div style={{
              position: "absolute", top: 8, right: 8,
              width: 10, height: 10, borderRadius: "50%",
              background: theme.colors.green,
              boxShadow: `0 0 8px ${theme.colors.green}`,
              opacity: 0.5 + Math.sin(frame * 0.12) * 0.5,
            }} />
          </div>
        </div>

        {/* Label */}
        <span style={{
          fontSize: 28, fontWeight: 900, color: theme.colors.textSecondary,
          letterSpacing: 4, textTransform: "uppercase",
        }}>
          Real products · Real users
        </span>
      </div>

      {/* ═══ PHASE 3: Weeks Not Months (fullscreen) ═══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          opacity: phase3,
        }}
      >
        {/* Large calendar → rocket animation */}
        <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
          {/* Calendar */}
          <div style={{
            position: "relative",
            opacity: interpolate(frame, [340, 355], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `scale(${1 + breathe * 0.03})`,
          }}>
            <svg width="160" height="160" viewBox="0 0 160 160"
              style={{ filter: `drop-shadow(0 0 20px ${theme.colors.accent}33)` }}
            >
              {/* Calendar body */}
              <rect x="10" y="30" width="140" height="120" rx="12" fill={theme.colors.surface}
                stroke={theme.colors.accent} strokeWidth="2.5" />
              {/* Header */}
              <rect x="10" y="30" width="140" height="30" rx="12" fill={theme.colors.accent} opacity="0.8" />
              <rect x="10" y="48" width="140" height="12" fill={theme.colors.accent} opacity="0.8" />
              {/* Calendar pins */}
              <rect x="45" y="22" width="6" height="20" rx="3" fill={theme.colors.accent} />
              <rect x="109" y="22" width="6" height="20" rx="3" fill={theme.colors.accent} />
              {/* Grid of days */}
              {Array.from({ length: 5 }).map((_, row) =>
                Array.from({ length: 5 }).map((_, col) => {
                  const dayIdx = row * 5 + col;
                  const dayProgress = interpolate(frame - 350, [dayIdx * 1.5, dayIdx * 1.5 + 10], [0, 1], {
                    extrapolateLeft: "clamp", extrapolateRight: "clamp",
                  });
                  return (
                    <rect key={`${row}-${col}`}
                      x={22 + col * 26} y={68 + row * 16}
                      width="16" height="10" rx="2"
                      fill={dayIdx < 5 ? theme.colors.accent : theme.colors.textMuted}
                      opacity={dayProgress * (dayIdx < 5 ? 0.7 : 0.25)}
                    />
                  );
                })
              )}
              {/* Checkmark on early days */}
              <path d="M30 75 L36 80 L48 68" fill="none" stroke={theme.colors.green}
                strokeWidth="2.5" opacity={interpolate(frame, [365, 375], [0, 0.8], {
                  extrapolateLeft: "clamp", extrapolateRight: "clamp",
                })} />
            </svg>
          </div>

          {/* Speed arrows */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {[0, 1, 2].map((a) => {
              const arrowProgress = interpolate(frame, [355 + a * 8, 370 + a * 8], [0, 1], {
                extrapolateLeft: "clamp", extrapolateRight: "clamp",
                easing: Easing.bezier(0.19, 1, 0.22, 1),
              });
              return (
                <svg key={a} width="60" height="30" viewBox="0 0 60 30" opacity={arrowProgress}>
                  <polygon points="0,5 40,5 40,0 60,15 40,30 40,25 0,25"
                    fill={theme.colors.accent} opacity={0.4 + a * 0.2} />
                </svg>
              );
            })}
          </div>

          {/* Rocket icon */}
          <div style={{
            opacity: interpolate(frame, [370, 385], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `translateY(${-breatheY * 2}px) rotate(-15deg)`,
          }}>
            <svg width="120" height="150" viewBox="0 0 120 150"
              style={{ filter: `drop-shadow(0 0 20px ${theme.colors.accent}44)` }}
            >
              {/* Rocket body */}
              <path d="M60 10 C40 10 30 50 30 90 L90 90 C90 50 80 10 60 10Z"
                fill={theme.colors.surface} stroke={theme.colors.textSecondary} strokeWidth="2" />
              {/* Nose cone */}
              <path d="M60 10 C50 10 45 30 45 40 L75 40 C75 30 70 10 60 10Z"
                fill={theme.colors.accent} opacity="0.7" />
              {/* Window */}
              <circle cx="60" cy="55" r="12" fill={theme.colors.blue} opacity="0.5"
                stroke={theme.colors.textSecondary} strokeWidth="1.5" />
              {/* Fins */}
              <path d="M30 75 L15 100 L30 90Z" fill={theme.colors.accent} opacity="0.6" />
              <path d="M90 75 L105 100 L90 90Z" fill={theme.colors.accent} opacity="0.6" />
              {/* Flame */}
              <ellipse cx="60" cy={105 + Math.sin(frame * 0.3) * 5}
                rx="15" ry={20 + Math.sin(frame * 0.4) * 8}
                fill={theme.colors.accent} opacity="0.6" />
              <ellipse cx="60" cy={108 + Math.sin(frame * 0.35) * 4}
                rx="8" ry={12 + Math.sin(frame * 0.5) * 5}
                fill="#eab308" opacity="0.7" />
            </svg>
          </div>
        </div>

        {/* Label */}
        <span style={{
          fontSize: 36, fontWeight: 900, color: theme.colors.textSecondary,
          letterSpacing: 5, textTransform: "uppercase",
          transform: `translateY(${breatheY}px)`,
        }}>
          Weeks, not months
        </span>
      </div>
    </AbsoluteFill>
  );
};
