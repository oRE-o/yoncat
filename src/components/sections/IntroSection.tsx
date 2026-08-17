import { type LanguageCode } from '../../data/i18n';
import { introData } from '../../data/introData';
import { getThemeScheme, type AppTheme, type ThemeScheme } from '../../design/themeSchemes';
import { bodyFontFor, fonts, localizedWrap } from '../../design/typography';
import { useIsMobile } from '../../hooks/useIsMobile';
import Section from '../layout/Section';
import SectionHeading from '../layout/SectionHeading';

type IntroSectionProps = {
  language: LanguageCode;
  theme: AppTheme;
  onSectionSelect: (id: string) => void;
};

const DOMAINS: Array<{ label: string; colorKey: 'game' | 'services' | 'engineering' }> = [
  { label: 'Game', colorKey: 'game' },
  { label: 'Services', colorKey: 'services' },
  { label: 'Engineering', colorKey: 'engineering' },
];

/** Small colored-dot pill for one of the three working domains. */
const DomainPill = ({
  label,
  color,
  scheme,
}: {
  label: string;
  color: string;
  scheme: ThemeScheme;
}) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.45rem',
      padding: '0.4rem 0.85rem',
      borderRadius: '100px',
      border: `1.5px solid ${scheme.border}`,
      background: scheme.bgPanel,
      fontFamily: fonts.display,
      fontSize: '0.66rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: scheme.text,
      boxShadow: scheme.shadow,
    }}
  >
    <span
      aria-hidden="true"
      style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }}
    />
    {label}
  </span>
);

const IntroSection = ({ language, theme, onSectionSelect }: IntroSectionProps) => {
  const isMobile = useIsMobile();
  const scheme = getThemeScheme(theme);
  const paragraphs = introData.paragraphs[language] ?? introData.paragraphs.kr;
  const paragraphFont = bodyFontFor(language);

  const ctaStyle = {
    padding: '0.55rem 1.1rem',
    fontSize: '0.78rem',
    fontWeight: 700,
    fontFamily: fonts.display,
    color: scheme.text,
    background: scheme.surface,
    border: `1.5px solid ${scheme.border}`,
    borderRadius: '100px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  } as const;

  return (
    <Section
      id="intro-section"
      background={scheme.bg}
      style={{ padding: 'clamp(5.5rem, 14vh, 8.5rem) clamp(1.5rem, 5vw, 4.5rem)' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(240px, 300px)',
          gap: isMobile ? '2.5rem' : 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
        }}
      >
        {/* Main copy */}
        <div>
          <SectionHeading
            index="01"
            title={introData.title}
            subtitle={introData.subtitle}
            scheme={scheme}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '70ch',
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
                  textWrap: 'pretty',
                  ...localizedWrap(language),
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div style={{ marginTop: '1.8rem', display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onSectionSelect('project-showcase')}
              style={ctaStyle}
            >
              {introData.links.projects}
            </button>
            <button
              type="button"
              onClick={() => onSectionSelect('contact-footer')}
              style={ctaStyle}
            >
              {introData.links.contact}
            </button>
          </div>
        </div>

        {/* Poster rail — working domains */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'start', gap: '0.5rem' }}>
          {DOMAINS.map((domain) => (
            <DomainPill
              key={domain.label}
              label={domain.label}
              color={scheme[domain.colorKey]}
              scheme={scheme}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default IntroSection;
