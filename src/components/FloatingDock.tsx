import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { type LanguageCode } from '../data/i18n';
import { dockCopy } from '../data/introData';
import { SECTIONS } from '../data/sections';
import { getThemeScheme, type AppTheme, type ThemeScheme } from '../design/themeSchemes';
import { fonts } from '../design/typography';
import { useIsMobile } from '../hooks/useIsMobile';

type FloatingDockProps = {
  activeSection: string;
  language: LanguageCode;
  theme: AppTheme;
  onLanguageCycle: () => void;
  onSectionSelect: (id: string) => void;
  onThemeToggle: () => void;
};

const pillStyle: CSSProperties = {
  padding: '0.42rem 0.82rem',
  borderRadius: '999px',
  fontSize: '0.66rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  fontFamily: fonts.display,
  whiteSpace: 'nowrap',
  transition: 'all 0.25s ease',
  cursor: 'pointer',
  flexShrink: 0,
};

const activePillStyle = (scheme: ThemeScheme, active: boolean): CSSProperties => ({
  border: `1px solid ${active ? scheme.primary1 : scheme.border}`,
  background: active ? scheme.primary3 : 'transparent',
  color: active ? scheme.primary1 : scheme.textMuted,
  boxShadow: active ? scheme.heroGlow : 'none',
});

const dockShellStyle = (scheme: ThemeScheme): CSSProperties => ({
  position: 'fixed',
  zIndex: 60,
  border: `1px solid ${scheme.dockBorder}`,
  background: scheme.dockBg,
  boxShadow: scheme.dockShadow,
  backdropFilter: 'blur(22px) saturate(140%)',
  WebkitBackdropFilter: 'blur(22px) saturate(140%)',
});

/** One pill per page section; highlights the active one. */
const SectionButtons = ({
  activeSection,
  scheme,
  onSelect,
}: {
  activeSection: string;
  scheme: ThemeScheme;
  onSelect: (id: string) => void;
}) => (
  <>
    {SECTIONS.map((section) => (
      <button
        key={section.id}
        type="button"
        aria-pressed={activeSection === section.id}
        onClick={() => onSelect(section.id)}
        style={{
          ...pillStyle,
          textAlign: 'center',
          ...activePillStyle(scheme, activeSection === section.id),
        }}
      >
        {section.label}
      </button>
    ))}
  </>
);

const LanguageButton = ({
  language,
  scheme,
  onCycle,
}: {
  language: LanguageCode;
  scheme: ThemeScheme;
  onCycle: () => void;
}) => (
  <button
    type="button"
    aria-label={dockCopy.cycleLanguage}
    onClick={onCycle}
    style={{
      ...pillStyle,
      ...activePillStyle(scheme, true),
      minWidth: '3.7rem',
      textAlign: 'center',
    }}
  >
    {language.toUpperCase()}
  </button>
);

/** Pill-shaped light/dark switch; the knob slides to the dark side when checked. */
const ThemeSwitch = ({
  isDark,
  scheme,
  onToggle,
}: {
  isDark: boolean;
  scheme: ThemeScheme;
  onToggle: () => void;
}) => (
  <button
    type="button"
    role="switch"
    aria-label={dockCopy.themeToggle}
    aria-checked={isDark}
    onClick={onToggle}
    style={{
      border: `1px solid ${isDark ? scheme.primary1 : scheme.border}`,
      background: isDark ? scheme.primary3 : scheme.surface,
      borderRadius: '999px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: isDark ? 'flex-end' : 'flex-start',
      width: '3.2rem',
      minWidth: '3.2rem',
      padding: '0.18rem',
      transition: 'all 0.25s ease',
      boxShadow: isDark ? scheme.heroGlow : 'none',
    }}
  >
    <span
      aria-hidden="true"
      style={{
        width: '1.2rem',
        height: '1.2rem',
        borderRadius: '50%',
        background: isDark ? scheme.primary1 : scheme.bg,
        boxShadow: scheme.shadow,
        transition: 'all 0.25s ease',
      }}
    />
  </button>
);

const FloatingDock = ({
  activeSection,
  language,
  theme,
  onLanguageCycle,
  onSectionSelect,
  onThemeToggle,
}: FloatingDockProps) => {
  const [expanded, setExpanded] = useState(false);
  const dockRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const scheme = getThemeScheme(theme);
  const isDark = theme === 'dark';

  // Collapse the mobile sheet when tapping anywhere outside it.
  useEffect(() => {
    if (!isMobile || !expanded) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!dockRef.current) return;
      if (!dockRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [isMobile, expanded]);

  const handleSection = (id: string) => {
    onSectionSelect(id);
    if (isMobile) setExpanded(false);
  };

  if (isMobile) {
    const collapsedHeight = '2.6rem';

    return (
      <nav
        ref={dockRef}
        aria-label="Floating dock"
        style={{
          ...dockShellStyle(scheme),
          left: '50%',
          bottom: 0,
          transform: `translate(-50%, ${expanded ? '0' : `calc(100% - ${collapsedHeight})`})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.55rem 1rem 1.1rem',
          borderRadius: '1.35rem 1.35rem 0 0',
          borderBottom: 'none',
          width: 'min(94vw, 28rem)',
          maxWidth: 'calc(100vw - 1rem)',
          transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
      >
        <button
          type="button"
          aria-label={expanded ? dockCopy.collapse : dockCopy.expand}
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
          style={{
            border: 'none',
            background: 'transparent',
            padding: '0.45rem 1rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.2rem',
            width: '100%',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: '2.6rem',
              height: '4px',
              borderRadius: '999px',
              background: scheme.border,
            }}
          />
          <span
            style={{
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontFamily: fonts.display,
              color: scheme.textDim,
            }}
          >
            {expanded ? dockCopy.collapse : dockCopy.expand}
          </span>
        </button>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.4rem',
            width: '100%',
          }}
        >
          <SectionButtons activeSection={activeSection} scheme={scheme} onSelect={handleSection} />
        </div>

        <div aria-hidden="true" style={{ width: '80%', height: '1px', background: scheme.border }} />

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
          <LanguageButton language={language} scheme={scheme} onCycle={onLanguageCycle} />
          <ThemeSwitch isDark={isDark} scheme={scheme} onToggle={onThemeToggle} />
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={dockRef}
      aria-label="Floating dock"
      style={{
        ...dockShellStyle(scheme),
        right: '0.9rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '0.38rem',
        padding: '0.6rem 0.55rem',
        borderRadius: '1.1rem',
      }}
    >
      <SectionButtons activeSection={activeSection} scheme={scheme} onSelect={handleSection} />

      <div
        aria-hidden="true"
        style={{
          width: '70%',
          alignSelf: 'center',
          height: '1px',
          background: scheme.border,
          margin: '0.1rem 0',
        }}
      />

      <LanguageButton language={language} scheme={scheme} onCycle={onLanguageCycle} />
      <ThemeSwitch isDark={isDark} scheme={scheme} onToggle={onThemeToggle} />
    </nav>
  );
};

export default FloatingDock;
