// src/design/colorScheme.ts
// ─── Swappable Color Scheme ─────────────────────────────────────────
// Based on references 5 & 6 — Cream/off-white background with dark and vibrant accents

export const colorScheme = {
  // ─── Primary (Mint Teal — hair & jacket stripes) ───
  primary1: '#3fd5bfff',          // Main mint teal
  primary2: '#2aad8e',          // Stronger / darker
  primary3: 'rgba(62, 201, 167, 0.10)',  // Soft tint
  primary4: 'rgba(62, 201, 167, 0.35)',  // Glow

  // ─── Secondary (Dark Navy — cuffs & details) ───
  secondary1: '#1a1f24',        // Main dark
  secondary2: '#0b0e14',        // Stronger / darker
  secondary3: 'rgba(26, 31, 36, 0.08)', // Soft tint

  // ─── Third (Blush Pink — accent pop) ───
  third1: '#ff4c87ff',            // Main pink
  third2: '#bd2558ff',            // Stronger
  third3: 'rgba(255, 76, 135, 0.12)',  // Soft tint

  // ─── Fourth (Neutrals & Surfaces) ───
  fourth1: '#f8f6f0',           // Cream base bg
  fourth2: '#f0ede6',           // Slightly deeper cream
  fourth3: '#ffffff',            // White panel
  fourth4: '#1a1f24',           // Dark text
  fourth5: '#52606d',           // Muted text
  fourth6: '#8b98a5',           // Dim text

  // ─── Computed / common aliases ───
  bg: '#f8f6f0',
  bgAlt: '#f0ede6',
  bgPanel: '#ffffff',
  bgHero: '#f8f6f0',
  bgHeroAlt: '#f0ede6',

  text: '#1a1f24',
  textMuted: '#52606d',
  textDim: '#8b98a5',

  heroTitle: '#ff4c87ff', // Vibrant pink title for cream background!
  heroTitleAlt: 'rgba(0,0,0,0.06)',
  textOnHeroAlt: '#52606d',

  surface: 'rgba(0, 0, 0, 0.03)',
  border: 'rgba(0, 0, 0, 0.08)',
  borderStrong: 'rgba(0, 0, 0, 0.15)',

  shadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
  shadowStrong: '0 16px 48px rgba(0, 0, 0, 0.08)',

  // Category accents (use tiers)
  game: '#3ec9a7',
  services: '#ff4c87ff',
  engineering: '#1a1f24',
} as const;

export type ColorScheme = typeof colorScheme;
