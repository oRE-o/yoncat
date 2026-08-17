import type React from 'react';

import type { ThemeScheme } from '../../design/themeSchemes';
import type { FloaterVariant } from './HeroChip';

// Each decoration sits at a fixed pixel distance from the horizontal center of the hero
// (the character's anchor) so as the viewport narrows, spacing to the character stays
// constant. When the viewport gets too narrow to comfortably fit a given decoration,
// it hides instead of drifting off-screen.
export type FloaterConfig = {
  id: string;
  depth: number;
  // Signed pixel offset from horizontal center. Negative = left, positive = right.
  xOffset: number;
  // Vertical anchor — mirrors the CSS shorthand: either `top` or `bottom`.
  top?: string;
  bottom?: string;
  variant: FloaterVariant;
  text?: React.ReactNode;
  colorProps?: { color?: string; bg?: string; border?: string; shadow?: string };
  fontSize?: string;
  opacity?: number;
  zIndex?: number;
  // Minimum viewport width (px) to render this decoration.
  hideBelowWidth: number;
};

export const buildFloaters = (scheme: ThemeScheme): FloaterConfig[] => [
  // Inner ring — always fighting for attention with the character
  { id: 'cl1', depth: 1.2, xOffset: -288, top: '42%', variant: 'glass',    text: '#OTAKU',    colorProps: { border: scheme.borderStrong, color: scheme.text }, fontSize: '1rem', zIndex: 3, hideBelowWidth: 720 },
  { id: 'cl2', depth: 2.8, xOffset: -230, top: '50%', variant: 'sparkle',  text: '✦',         colorProps: { color: scheme.third1 }, fontSize: 'clamp(4rem, 10vw, 7rem)', zIndex: 4, hideBelowWidth: 520 },
  { id: 'cl3', depth: -1.2, xOffset: -173, top: '35%', variant: 'symbol',  text: '+',         colorProps: { color: scheme.textDim }, opacity: 0.6, fontSize: '2.5rem', zIndex: 1, hideBelowWidth: 420 },
  { id: 'cl4', depth: 3.5, xOffset: -144, top: '68%', variant: 'bordered', text: '実行力',     colorProps: { border: scheme.borderStrong, color: scheme.text, bg: scheme.bgAlt }, fontSize: '1.1rem', zIndex: 5, hideBelowWidth: 460 },

  { id: 'cr1', depth: 2.2, xOffset: 288, top: '35%', variant: 'bordered', text: 'CREATIVE',   colorProps: { border: scheme.primary1, color: scheme.primary2, bg: scheme.bgAlt }, fontSize: '1.1rem', zIndex: 3, hideBelowWidth: 720 },
  { id: 'cr2', depth: 3.5, xOffset: 216, top: '58%', variant: 'sparkle',  text: '✦',          colorProps: { color: scheme.primary1 }, fontSize: 'clamp(4.5rem, 12vw, 8rem)', zIndex: 4, hideBelowWidth: 500 },
  { id: 'cr3', depth: -2.5, xOffset: 115, top: '45%', variant: 'symbol',  text: '+',          colorProps: { color: scheme.textDim }, opacity: 0.45, fontSize: '2.8rem', zIndex: 1, hideBelowWidth: 320 },
  { id: 'cr4', depth: 4.2, xOffset: 230, top: '72%', variant: 'filled',   text: 'AESTHETIC',  colorProps: { bg: scheme.secondary1, color: scheme.bg }, fontSize: '1.2rem', zIndex: 5, hideBelowWidth: 680 },

  // Enlarged sparkles scattered around
  { id: 's1', depth: 1.8, xOffset: -259, top: '30%', variant: 'sparkle', text: '✦', colorProps: { color: scheme.primary2 }, opacity: 0.8, fontSize: '4rem', zIndex: 2, hideBelowWidth: 600 },
  { id: 's2', depth: -2,  xOffset: -173, top: '75%', variant: 'sparkle', text: '✦', colorProps: { color: scheme.textDim },  opacity: 0.6, fontSize: '3rem', zIndex: 1, hideBelowWidth: 440 },
  { id: 's3', depth: 3,   xOffset: 115,  top: '65%', variant: 'sparkle', text: '✦', colorProps: { color: scheme.third1 },   opacity: 0.9, fontSize: '4.5rem', zIndex: 4, hideBelowWidth: 340 },
  { id: 's4', depth: -1.5, xOffset: 216, top: '28%', variant: 'sparkle', text: '✦', colorProps: { color: scheme.textMuted }, opacity: 0.7, fontSize: '3.8rem', zIndex: 1, hideBelowWidth: 520 },
  { id: 's5', depth: 2.5,  xOffset: -86, top: '45%', variant: 'sparkle', text: '✦', colorProps: { color: scheme.primary1 },  opacity: 0.7, fontSize: '3.2rem', zIndex: 2, hideBelowWidth: 280 },

  // Outer decorations
  { id: 'l1', depth: 1.5, xOffset: -346, top: '32%',    variant: 'sparkle', text: '✦',       colorProps: { color: scheme.third1 },      opacity: 0.6, fontSize: '3rem', zIndex: 2, hideBelowWidth: 780 },
  { id: 'l2', depth: -3,  xOffset: -317, bottom: '30%', variant: 'dashed',  text: 'WARNING', colorProps: { border: scheme.third1, color: scheme.third2 }, zIndex: 1, hideBelowWidth: 760 },
  { id: 'r1', depth: 1.2, xOffset: 317,  top: '25%',    variant: 'sparkle', text: '✦',       colorProps: { color: scheme.textDim },     opacity: 0.7, fontSize: '2.5rem', zIndex: 2, hideBelowWidth: 720 },
  { id: 'r2', depth: 4.5, xOffset: 288,  bottom: '38%', variant: 'filled',  text: '#Nerd',   colorProps: { bg: scheme.third1, color: '#fff' }, zIndex: 5, hideBelowWidth: 660 },
];

// Background rings are decorative frame elements — pinned to viewport corners.
export type BackgroundRing = {
  id: string;
  depth: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  colorProps: { border: string };
  opacity: number;
};

export const buildBackgroundRings = (scheme: ThemeScheme): BackgroundRing[] => [
  { id: 'bg1', depth: -4,   position: { top: '-5%', right: '-5%' },    colorProps: { border: scheme.border }, opacity: 0.15 },
  { id: 'bg2', depth: -3.5, position: { bottom: '-10%', left: '-10%' }, colorProps: { border: scheme.border }, opacity: 0.2 },
];

export const HERO_TAGS = [
  'OTAKU',
  'GAME ENGINEER',
  'ILLUSTRATOR',
  '創造的エンジニア',
  '#Nerd_Aesthetics',
  '#Creative_Coding',
  'VISUAL THINKER',
  'PIXEL HEART',
];
