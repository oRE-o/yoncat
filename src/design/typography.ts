import type { CSSProperties } from 'react';

import type { LanguageCode } from '../data/i18n';

export const fonts = {
  /** Headings, labels, chrome — rounded display face. */
  display: "'Quicksand', sans-serif",
  /** Long-form body copy. */
  body: "'Nunito', sans-serif",
  /** Japanese body copy needs a rounded JP face before falling back. */
  bodyJp: "'M PLUS Rounded 1c', 'Nunito', sans-serif",
} as const;

export const bodyFontFor = (language: LanguageCode): string =>
  language === 'jp' ? fonts.bodyJp : fonts.body;

/**
 * Wrapping rules for localized long-form text.
 * keep-all keeps Korean/Japanese eojeol/phrases together; combined with
 * overflow-wrap:anywhere it still allows breaking a single overlong token
 * so mixed-script lines never push the layout off-screen.
 */
export const localizedWrap = (language: LanguageCode): CSSProperties => ({
  wordBreak: language === 'en' ? 'normal' : 'keep-all',
  overflowWrap: 'anywhere',
});
