import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/**
 * AUTHORITY — 16.5–29.5s (390 frames)
 * Logo reveal → animated stats counters → world-map dots.
 * VO says: "We're Nativewit, product engineering studio, 5+ years,
 * 30+ products, clients across AU/US/Asia."
 */

/* Map dot positions (approximate screen %, top/left) */
const MAP_DOTS = [
  { label: "AU", top: 72, left: 80, delay: 281 },
  { label: "US", top: 38, left: 18, delay: 281 },
  { label: "Asia", top: 42, left: 72, delay: 300 },
];

export const Authority: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Transitions ────────────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const exitFade = interpolate(frame, [360, 390], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 1: Logo + brand name (frames 0-100) ─────────── */
  const logoProgress = spring({ frame, fps, config: { damping: 100, mass: 0.5 } });
  const logoScale = interpolate(logoProgress, [0, 1], [0.7, 1]);

  const nameReveal = interpolate(frame, [1, 40], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Subtitle (VO "product engineering studio" at frame 43) */
  const subtitleProgress = spring({
    frame: frame - 43,
    fps,
    config: { damping: 120 },
  });

  /* ── Phase 1→2 cross: brand fades up, stats appear below ── */
  const brandLift = interpolate(frame, [130, 180], [0, -80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Phase 2: Animated counters (frame 164 = "5+ years") ── */
  const yearsCount = Math.min(
    5,
    Math.floor(
      interpolate(frame, [164, 200], [0, 5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );
  const yearsOpacity = interpolate(frame, [164, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const productsCount = Math.min(
    30,
    Math.floor(
      interpolate(frame, [219, 260], [0, 30], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );
  const productsOpacity = interpolate(frame, [219, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 3: World map dots (frame 281 = "clients across") */
  const mapOpacity = interpolate(frame, [270, 290], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Device icons (mobile + web) — VO "mobile and web" at f108 */
  const deviceProgress = spring({
    frame: frame - 95,
    fps,
    config: { damping: 100 },
  });

  /* ── Continuous 2-second breathing cycle ─────────────────── */
  const breathe = Math.sin(frame * Math.PI / 30);
  const breatheY = breathe * 3;
  const breatheScale = 1 + breathe * 0.01;

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: Math.min(entryFade, exitFade),
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}12 0%, transparent 70%)`,
          filter: "blur(60px)",
          opacity: logoProgress,
        }}
      />

      {/* Floating ambient particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const px = 10 + (i * 37) % 80;
        const py = 15 + (i * 53) % 70;
        const drift = Math.sin((frame + i * 40) * 0.03) * 15;
        const particleOpacity = interpolate(frame, [20, 60], [0, 0.15], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={`ap-${i}`}
            style={{
              position: "absolute",
              top: `${py + drift * 0.3}%`,
              left: `${px}%`,
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              borderRadius: "50%",
              background: theme.colors.accent,
              opacity: particleOpacity,
              transform: `translateY(${drift}px)`,
            }}
          />
        );
      })}

      {/* ─── Brand block (lifts up to make space for stats) ─── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translateY(${brandLift}px)`,
        }}
      >
        {/* Logo with shimmer + pulse ring */}
        <div
          style={{
            opacity: logoProgress,
            transform: `scale(${logoScale})`,
            marginBottom: 20,
            position: "relative",
          }}
        >
          {/* Pulse ring around logo */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 130,
              height: 130,
              borderRadius: "50%",
              border: `1px solid ${theme.colors.accent}22`,
              opacity: 0.5 + Math.sin(frame * 0.08) * 0.3,
            }}
          />
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 8,
            }}
          >
            <Img
              src={staticFile("logo.png")}
              style={{ width: 90, height: "auto" }}
            />
            {/* Shimmer sweep */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)`,
                transform: `translateX(${interpolate(frame, [5, 35], [-100, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
              }}
            />
          </div>
        </div>

        {/* Brand name */}
        <h1
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: theme.colors.textPrimary,
            margin: 0,
            letterSpacing: "-2px",
            clipPath: `inset(0 ${100 - nameReveal}% 0 0)`,
            transform: `translateY(${breatheY * 0.5}px)`,
          }}
        >
          We're{" "}
          <span style={{ color: theme.colors.accent }}>Nativewit.</span>
        </h1>

        {/* Subtitle + device icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 16,
            opacity: subtitleProgress,
          }}
        >
          {/* Phone icon */}
          <div
            style={{
              width: 16,
              height: 26,
              borderRadius: 4,
              border: `2px solid ${theme.colors.textMuted}`,
              opacity: deviceProgress,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 2,
                left: "50%",
                transform: "translateX(-50%)",
                width: 6,
                height: 2,
                borderRadius: 1,
                background: theme.colors.textMuted,
              }}
            />
          </div>

          <span
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: theme.colors.textSecondary,
              letterSpacing: 1,
            }}
          >
            Product Engineering Studio
          </span>

          {/* Laptop icon */}
          <div
            style={{
              opacity: deviceProgress,
              position: "relative",
              width: 28,
              height: 20,
            }}
          >
            <div
              style={{
                width: 26,
                height: 16,
                borderRadius: 3,
                border: `2px solid ${theme.colors.textMuted}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: -2,
                width: 30,
                height: 2,
                borderRadius: 1,
                background: theme.colors.textMuted,
              }}
            />
          </div>
        </div>
      </div>

      {/* ─── Stats row ────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "58%",
          display: "flex",
          gap: 80,
          alignItems: "center",
          transform: `translateY(${breatheY}px) scale(${breatheScale})`,
        }}
      >
        {/* Years counter */}
        <div style={{ textAlign: "center", opacity: yearsOpacity }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: theme.colors.accent,
              lineHeight: 1,
              letterSpacing: "-1px",
            }}
          >
            {yearsCount}+
          </div>
          <p
            style={{
              fontSize: 22,
              color: theme.colors.textMuted,
              margin: "10px 0 0",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2.5,
            }}
          >
            Years
          </p>
        </div>

        {/* Products counter */}
        <div style={{ textAlign: "center", opacity: productsOpacity }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: theme.colors.accent,
              lineHeight: 1,
              letterSpacing: "-1px",
            }}
          >
            {productsCount}+
          </div>
          <p
            style={{
              fontSize: 22,
              color: theme.colors.textMuted,
              margin: "10px 0 0",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2.5,
            }}
          >
            Products shipped
          </p>
        </div>
      </div>

      {/* ─── World map region circles with orbital animation ──── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: mapOpacity,
        }}
      >
        {/* Large orbital ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 420,
            height: 420,
            borderRadius: "50%",
            border: `2px solid ${theme.colors.border}`,
            opacity: interpolate(frame, [275, 295], [0, 0.3], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        {/* Inner ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 280,
            height: 280,
            borderRadius: "50%",
            border: `1px solid ${theme.colors.accent}22`,
            opacity: interpolate(frame, [280, 300], [0, 0.2], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />

        {/* Rotating region circles on orbital path */}
        {MAP_DOTS.map((dot, i) => {
          const dotProgress = interpolate(frame - dot.delay, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.19, 1, 0.22, 1),
          });

          /* Orbital animation — each region orbits around the ring */
          const baseAngle = [0, 120, 240][i]; /* 120° apart */
          const orbitAngle = baseAngle + (frame - dot.delay) * 0.35;
          const orbitRad = (orbitAngle * Math.PI) / 180;
          const orbitRadius = 190;
          const cx = 960 + Math.cos(orbitRad) * orbitRadius;
          const cy = 540 + Math.sin(orbitRad) * orbitRadius;

          return (
            <div key={dot.label}>
              {/* Region circle — orbiting */}
              <div
                style={{
                  position: "absolute",
                  left: cx,
                  top: cy,
                  transform: `translate(-50%, -50%) scale(${interpolate(dotProgress, [0, 1], [0.3, 1])})`,
                  opacity: dotProgress,
                }}
              >
                {/* Outer glow ring */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 80 + breathe * 6,
                    height: 80 + breathe * 6,
                    borderRadius: "50%",
                    border: `2px solid ${theme.colors.accent}44`,
                    opacity: 0.4 + breathe * 0.2,
                  }}
                />
                {/* Main circle */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 40% 40%, ${theme.colors.accent}55, ${theme.colors.accent}22)`,
                    border: `2px solid ${theme.colors.accent}88`,
                    boxShadow: `0 0 24px ${theme.colors.accent}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 900,
                      color: theme.colors.textPrimary,
                      letterSpacing: 1.5,
                    }}
                  >
                    {dot.label}
                  </span>
                </div>
              </div>

              {/* Connection arc to center */}
              {dotProgress > 0.5 && (
                <div
                  style={{
                    position: "absolute",
                    left: 960,
                    top: 540,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: theme.colors.accent,
                    opacity: 0.3,
                    transform: `translate(${(cx - 960) * 0.5 - 3}px, ${(cy - 540) * 0.5 - 3}px)`,
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Center globe icon */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${interpolate(frame, [285, 305], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            })})`,
          }}
        >
          <svg width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="22" fill="none" stroke={theme.colors.accent}
              strokeWidth="1.5" opacity="0.4" />
            <ellipse cx="25" cy="25" rx="10" ry="22" fill="none" stroke={theme.colors.accent}
              strokeWidth="1" opacity="0.3" />
            <line x1="3" y1="25" x2="47" y2="25" stroke={theme.colors.accent}
              strokeWidth="1" opacity="0.3" />
            <circle cx="25" cy="25" r="4" fill={theme.colors.accent} opacity="0.5" />
          </svg>
        </div>

        {/* Connection arcs between regions (SVG) */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        >
          {MAP_DOTS.map((dot, i) => {
            const nextDot = MAP_DOTS[(i + 1) % MAP_DOTS.length];
            const dP = interpolate(frame - dot.delay, [0, 20], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });
            const nP = interpolate(frame - nextDot.delay, [0, 20], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });

            if (dP < 0.5 || nP < 0.5) return null;

            const a1 = ([0, 120, 240][i] + (frame - dot.delay) * 0.35) * Math.PI / 180;
            const a2 = ([0, 120, 240][(i + 1) % 3] + (frame - nextDot.delay) * 0.35) * Math.PI / 180;
            const r = 190;
            const x1 = 960 + Math.cos(a1) * r;
            const y1 = 540 + Math.sin(a1) * r;
            const x2 = 960 + Math.cos(a2) * r;
            const y2 = 540 + Math.sin(a2) * r;

            return (
              <line key={`arc-${i}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={theme.colors.accent}
                strokeWidth="1"
                opacity="0.15"
                strokeDasharray="6 4"
              />
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
