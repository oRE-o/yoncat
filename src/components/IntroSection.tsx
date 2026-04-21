import { useEffect, useState } from 'react';

import { type LanguageCode } from '../data/i18n';
import { introData } from '../data/introData';
import { getThemeScheme, type AppTheme } from '../design/themeSchemes';

type IntroSectionProps = {
  language: LanguageCode;
  theme: AppTheme;
  onSectionSelect: (id: string) => void;
};

const IntroSection = ({ language, theme, onSectionSelect }: IntroSectionProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const scheme = getThemeScheme(theme);
  const paragraphs = introData.paragraphs[language] ?? introData.paragraphs.kr;
  const paragraphFont =
    language === 'jp'
      ? "'M PLUS Rounded 1c', 'Nunito', sans-serif"
      : "'Nunito', sans-serif";

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const sync = () => setIsMobile(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener('change', sync);

    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  return (
    <section
      id="intro-section"
      style={{
        padding: 'clamp(5.5rem, 14vh, 8.5rem) clamp(1.5rem, 5vw, 4rem)',
        background: scheme.bg,
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'minmax(0, 760px) minmax(0, 1fr)',
          gap: 'clamp(2rem, 5vw, 6rem)',
          alignItems: 'start',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: scheme.textDim,
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            {introData.eyebrow}
          </span>

          <h2
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 'clamp(2.9rem, 6vw, 5.1rem)',
              fontWeight: 700,
              color: scheme.primary1,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              marginTop: '0.9rem',
              paddingBottom: '1.2rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {introData.title}
          </h2>

          <p
            style={{
              marginTop: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: scheme.textDim,
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            {introData.subtitle}
          </p>

          <div
            style={{
              marginTop: '1.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '760px',
            }}
          >
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.85,
                  color: scheme.textMuted,
                  fontFamily: paragraphFont,
                  // keep-all stops breaks inside CJK phrases; normal overflow-wrap keeps
                  // "break-word" from chopping words when a line is tight.
                  wordBreak: language === 'en' ? 'normal' : 'keep-all',
                  overflowWrap: 'normal',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div
            style={{
              marginTop: '1.8rem',
              display: 'flex',
              gap: '0.7rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={() => onSectionSelect('project-showcase')}
              style={{
                padding: '0.55rem 1.1rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                fontFamily: "'Quicksand', sans-serif",
                color: scheme.text,
                background: scheme.surface,
                border: `1.5px solid ${scheme.border}`,
                borderRadius: '100px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              {introData.links.projects}
            </button>
            <button
              type="button"
              onClick={() => onSectionSelect('contact-footer')}
              style={{
                padding: '0.55rem 1.1rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                fontFamily: "'Quicksand', sans-serif",
                color: scheme.text,
                background: scheme.surface,
                border: `1.5px solid ${scheme.border}`,
                borderRadius: '100px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              {introData.links.contact}
            </button>
          </div>
        </div>

        {!isMobile && <div aria-hidden="true" />}
      </div>
    </section>
  );
};

export default IntroSection;
