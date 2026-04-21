export type AppTheme = "light" | "dark";

export type ThemeScheme = {
  primary1: string;
  primary2: string;
  primary3: string;
  primary4: string;
  secondary1: string;
  secondary2: string;
  secondary3: string;
  third1: string;
  third2: string;
  third3: string;
  bg: string;
  bgAlt: string;
  bgPanel: string;
  bgHero: string;
  text: string;
  textMuted: string;
  textDim: string;
  surface: string;
  border: string;
  borderStrong: string;
  shadow: string;
  shadowStrong: string;
  heroGlow: string;
  characterGlow: string;
  dockBg: string;
  dockBorder: string;
  dockShadow: string;
  game: string;
  services: string;
  engineering: string;
};

const lightTheme: ThemeScheme = {
  primary1: '#3fd5bf',
  primary2: '#2aad8e',
  primary3: 'rgba(62, 201, 167, 0.12)',
  primary4: 'rgba(62, 201, 167, 0.35)',
  secondary1: '#1a1f24',
  secondary2: '#0b0e14',
  secondary3: 'rgba(26, 31, 36, 0.08)',
  third1: '#ff4c87',
  third2: '#bd2558',
  third3: 'rgba(255, 76, 135, 0.12)',
  bg: '#f8f6f0',
  bgAlt: '#f0ede6',
  bgPanel: 'rgba(255, 255, 255, 0.88)',
  bgHero: '#f8f6f0',
  text: '#1a1f24',
  textMuted: '#52606d',
  textDim: '#8b98a5',
  surface: 'rgba(0, 0, 0, 0.03)',
  border: 'rgba(0, 0, 0, 0.08)',
  borderStrong: 'rgba(0, 0, 0, 0.15)',
  shadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
  shadowStrong: '0 16px 48px rgba(0, 0, 0, 0.08)',
  heroGlow: '0 0 0 rgba(0, 0, 0, 0)',
  characterGlow: 'drop-shadow(0 8px 30px rgba(0, 0, 0, 0.2))',
  dockBg: 'rgba(255, 255, 255, 0.42)',
  dockBorder: 'rgba(26, 31, 36, 0.12)',
  dockShadow: '0 24px 50px rgba(26, 31, 36, 0.1)',
  game: '#3ec9a7',
  services: '#ff4c87',
  engineering: '#1a1f24',
} as const;

const darkTheme: ThemeScheme = {
  primary1: '#75f1da',
  primary2: '#48cbb3',
  primary3: 'rgba(117, 241, 218, 0.16)',
  primary4: 'rgba(117, 241, 218, 0.45)',
  secondary1: '#dce7ef',
  secondary2: '#aebdca',
  secondary3: 'rgba(220, 231, 239, 0.08)',
  third1: '#ff7db0',
  third2: '#ff5e9a',
  third3: 'rgba(255, 125, 176, 0.16)',
  bg: '#0d1117',
  bgAlt: '#121923',
  bgPanel: 'rgba(16, 24, 35, 0.78)',
  bgHero: '#0a1017',
  text: '#edf7ff',
  textMuted: '#b3c0cc',
  textDim: '#7f93a6',
  surface: 'rgba(255, 255, 255, 0.05)',
  border: 'rgba(151, 176, 198, 0.16)',
  borderStrong: 'rgba(117, 241, 218, 0.28)',
  shadow: '0 18px 50px rgba(0, 0, 0, 0.28)',
  shadowStrong: '0 28px 80px rgba(0, 0, 0, 0.4)',
  heroGlow: '0 0 24px rgba(117, 241, 218, 0.18), 0 0 60px rgba(117, 241, 218, 0.1)',
  characterGlow: 'drop-shadow(0 10px 36px rgba(117, 241, 218, 0.14)) drop-shadow(0 18px 50px rgba(0, 0, 0, 0.34))',
  dockBg: 'rgba(12, 18, 28, 0.45)',
  dockBorder: 'rgba(117, 241, 218, 0.22)',
  dockShadow: '0 28px 80px rgba(0, 0, 0, 0.3)',
  game: '#75f1da',
  services: '#ff7db0',
  engineering: '#8aa0b4',
} as const;

export const themeSchemes: Record<AppTheme, ThemeScheme> = {
  light: lightTheme,
  dark: darkTheme,
};

export const getThemeScheme = (theme: AppTheme) => themeSchemes[theme];
