/**
 * Nativewit brand themes.
 * Switch the active theme by changing `activeTheme` below.
 */

const font = "'Nunito', 'Inter', 'Helvetica Neue', Arial, sans-serif";

export const darkTheme = {
  colors: {
    bg: "#0a0a0a",
    surface: "#141414",
    surfaceLight: "#1a1a1a",
    border: "rgba(255,255,255,0.1)",
    textPrimary: "#ffffff",
    textSecondary: "rgba(255,255,255,0.5)",
    textMuted: "rgba(255,255,255,0.35)",
    accent: "#e63434",
    accentSoft: "#ff6b6b",
    green: "#22c55e",
    blue: "#3b82f6",
  },
  font,
} as const;

export const whiteTheme = {
  colors: {
    bg: "#ffffff",
    surface: "#f0f0f0",
    surfaceLight: "#e8e8e8",
    border: "rgba(0,0,0,0.12)",
    textPrimary: "#000000",
    textSecondary: "#1a1a1a",
    textMuted: "#333333",
    accent: "#e63434",
    accentSoft: "#ff6b6b",
    green: "#22c55e",
    blue: "#3b82f6",
  },
  font,
} as const;

// ── Active theme ─────────────────────────────────────────────
// Change to `darkTheme` to switch back to the dark version.
export const theme = whiteTheme;
