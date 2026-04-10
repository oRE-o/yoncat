import { archiveTheme, themePalette } from "./theme.config";

export const editorialPalette = {
  paper: themePalette.background,
  paperStrong: themePalette.backgroundStrong,
  paperMuted: "#ebe3d5",
  ink: themePalette.ink,
  muted: themePalette.muted,
  accent: themePalette.primaryStrong,
  accentStrong: themePalette.primary,
  accentSoft: "#ffd8e4",
  cobalt: themePalette.secondary,
  teal: themePalette.tertiary,
  border: themePalette.border,
  panel: themePalette.surface,
  shadow: "0 24px 80px rgba(41, 28, 22, 0.14)",
} as const;

export const siteTheme = {
  brand: {
    name: "yon.cat",
    label: "editorial portfolio",
    descriptor: "Games, services, and engineered objects with taste.",
  },
  archive: archiveTheme,
  assets: {
    heroPortrait: "/editorial/characters/hero-kita.png",
    alternatePortrait: "/editorial/characters/hero-hitori.png",
    posters: [
      {
        src: "/editorial/references/tsumiki-blue.jpg",
        title: "Tsumiki",
        accent: "Cobalt",
      },
      {
        src: "/editorial/references/misono-trinity.jpg",
        title: "Trinity",
        accent: "Pink",
      },
      {
        src: "/editorial/references/serina-glasses.jpg",
        title: "Glasses",
        accent: "Rose",
      },
      {
        src: "/editorial/references/miyabi-teal.jpg",
        title: "Miyabi",
        accent: "Teal",
      },
      {
        src: "/editorial/references/hitori-birthday.jpg",
        title: "Birthday",
        accent: "Paper",
      },
      {
        src: "/editorial/references/kita-red.jpg",
        title: "Kita",
        accent: "Scarlet",
      },
    ],
  },
  featuredProjectIds: ["project-mt", "sparcs-clubs", "pmm-intern"],
  quickFacts: [
    { value: "9+", label: "years making interactive things" },
    { value: "3", label: "domains kept alive in parallel" },
    { value: "1", label: "tasteful visual language across routes" },
  ],
  homeNotes: [
    {
      title: "Poster logic",
      description:
        "Large display type, restrained color blocking, and compact data labels pull directly from the reference set.",
    },
    {
      title: "Replaceable character slot",
      description:
        "The center stage is intentionally isolated so your future personal character can be dropped in with minimal code changes.",
    },
    {
      title: "Information first where needed",
      description:
        "Projects and contact views keep the editorial mood without letting the character dominate dense content.",
    },
  ],
  marquee: [
    "Game Development",
    "Web Systems",
    "Creative Engineering",
    "Tasteful Interfaces",
    "Playable Interaction",
    "Nerd Aesthetics",
  ],
  filters: ["All", "Game", "Services", "Engineering"] as const,
} as const;

export const projectFallbacks: Record<string, string> = {
  "project-mt": "/editorial/references/tsumiki-blue.jpg",
  "voice-rigs": "/editorial/references/miyabi-teal.jpg",
  "pmm-intern": "/editorial/references/miyabi-teal.jpg",
  "natural-selection": "/editorial/references/serina-glasses.jpg",
  "sparcs-clubs": "/editorial/references/hitori-birthday.jpg",
  "kaist-taxi": "/editorial/references/serina-glasses.jpg",
  mannayo: "/editorial/references/misono-trinity.jpg",
  "purin-keyboard": "/editorial/references/kita-red.jpg",
};

export const categoryThemeClass: Record<
  "Game" | "Services" | "Engineering",
  string
> = {
  Game: "border-[#3ec9a7]/20 bg-[#3ec9a7]/10 text-[#3ec9a7]",
  Services: "border-[#e87098]/20 bg-[#e87098]/10 text-[#d45a82]",
  Engineering: "border-[#2d3748]/20 bg-[#2d3748]/10 text-[#2d3748]",
};
