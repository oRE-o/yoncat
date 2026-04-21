import { useEffect, useRef, useState } from 'react';

import { dockCopy } from '../data/introData';
import { type LanguageCode } from '../data/i18n';
import { getThemeScheme, type AppTheme } from '../design/themeSchemes';

type FloatingDockProps = {
  activeSection: string;
  language: LanguageCode;
  theme: AppTheme;
  onLanguageCycle: () => void;
  onSectionSelect: (id: string) => void;
  onThemeToggle: () => void;
};

const sectionButtons = [
  { id: 'intro-section', label: dockCopy.sections.intro },
  { id: 'about-strip', label: dockCopy.sections.experience },
  { id: 'project-showcase', label: dockCopy.sections.projects },
  { id: 'contact-footer', label: dockCopy.sections.contact },
] as const;

const sharedButtonStyle = {
  padding: '0.42rem 0.82rem',
  borderRadius: '999px',
  fontSize: '0.66rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  fontFamily: "'Quicksand', sans-serif",
  whiteSpace: 'nowrap' as const,
  transition: 'all 0.25s ease',
  cursor: 'pointer',
  flexShrink: 0,
};

const FloatingDock = ({
  activeSection,
  language,
  theme,
  onLanguageCycle,
  onSectionSelect,
  onThemeToggle,
}: FloatingDockProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const dockRef = useRef<HTMLElement | null>(null);
  const scheme = getThemeScheme(theme);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const sync = () => setIsMobile(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener('change', sync);

    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

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

  const getButtonStyle = (active: boolean) => ({
    border: `1px solid ${active ? scheme.primary1 : scheme.border}`,
    background: active ? scheme.primary3 : 'transparent',
    color: active ? scheme.primary1 : scheme.textMuted,
    boxShadow: active ? scheme.heroGlow : 'none',
  });

  const currentLanguageLabel = language.toUpperCase();
  const isDark = theme === 'dark';

  const handleSection = (id: string) => {
    onSectionSelect(id);
    if (isMobile) setExpanded(false);
  };

  if (isMobile) {
    const collapsedHeight = '2.6rem';

    return (
      <nav
        ref={dockRef as unknown as React.RefObject<HTMLElement>}
        aria-label="Floating dock"
        style={{
          position: 'fixed',
          zIndex: 60,
          left: '50%',
          bottom: 0,
          transform: `translate(-50%, ${expanded ? '0' : `calc(100% - ${collapsedHeight})`})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.55rem 1rem 1.1rem',
          borderRadius: '1.35rem 1.35rem 0 0',
          border: `1px solid ${scheme.dockBorder}`,
          borderBottom: 'none',
          background: scheme.dockBg,
          boxShadow: scheme.dockShadow,
          backdropFilter: 'blur(22px) saturate(140%)',
          WebkitBackdropFilter: 'blur(22px) saturate(140%)',
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
              fontFamily: "'Quicksand', sans-serif",
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
          {sectionButtons.map((button) => (
            <button
              key={button.id}
              type="button"
              aria-pressed={activeSection === button.id}
              onClick={() => handleSection(button.id)}
              style={{
                ...sharedButtonStyle,
                ...getButtonStyle(activeSection === button.id),
              }}
            >
              {button.label}
            </button>
          ))}
        </div>

        <div
          aria-hidden="true"
          style={{
            width: '80%',
            height: '1px',
            background: scheme.border,
          }}
        />

        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            aria-label={dockCopy.cycleLanguage}
            onClick={onLanguageCycle}
            style={{
              ...sharedButtonStyle,
              ...getButtonStyle(true),
              minWidth: '3.7rem',
              textAlign: 'center',
            }}
          >
            {currentLanguageLabel}
          </button>

          <button
            type="button"
            role="switch"
            aria-label={dockCopy.themeToggle}
            aria-checked={isDark}
            onClick={onThemeToggle}
            style={{
              border: `1px solid ${isDark ? scheme.primary1 : scheme.border}`,
              background: isDark ? scheme.primary3 : scheme.surface,
              color: scheme.textMuted,
              borderRadius: '999px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: isDark ? 'flex-end' : 'flex-start',
              width: '3.3rem',
              minWidth: '3.3rem',
              padding: '0.2rem',
              transition: 'all 0.25s ease',
              boxShadow: isDark ? scheme.heroGlow : 'none',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: '1.25rem',
                height: '1.25rem',
                borderRadius: '50%',
                background: isDark ? scheme.primary1 : scheme.bg,
                boxShadow: scheme.shadow,
                transition: 'all 0.25s ease',
              }}
            />
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={dockRef as unknown as React.RefObject<HTMLElement>}
      aria-label="Floating dock"
      style={{
        position: 'fixed',
        zIndex: 60,
        right: '0.9rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '0.38rem',
        padding: '0.6rem 0.55rem',
        borderRadius: '1.1rem',
        border: `1px solid ${scheme.dockBorder}`,
        background: scheme.dockBg,
        boxShadow: scheme.dockShadow,
        backdropFilter: 'blur(22px) saturate(140%)',
        WebkitBackdropFilter: 'blur(22px) saturate(140%)',
      }}
    >
      {sectionButtons.map((button) => (
        <button
          key={button.id}
          type="button"
          aria-pressed={activeSection === button.id}
          onClick={() => handleSection(button.id)}
          style={{
            ...sharedButtonStyle,
            textAlign: 'center',
            ...getButtonStyle(activeSection === button.id),
          }}
        >
          {button.label}
        </button>
      ))}

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

      <button
        type="button"
        aria-label={dockCopy.cycleLanguage}
        onClick={onLanguageCycle}
        style={{
          ...sharedButtonStyle,
          ...getButtonStyle(true),
          textAlign: 'center',
        }}
      >
        {currentLanguageLabel}
      </button>

      <button
        type="button"
        role="switch"
        aria-label={dockCopy.themeToggle}
        aria-checked={isDark}
        onClick={onThemeToggle}
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
    </nav>
  );
};

export default FloatingDock;
