export type LanguageCode = "kr" | "en" | "jp";

export type LocalizedText = Record<LanguageCode, string>;

export const getLocalizedText = (
  text: Partial<LocalizedText>,
  language: LanguageCode,
) => text[language] ?? text.kr ?? "";
