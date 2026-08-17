import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { experiences, type Experience, type ExperienceTrack } from '../../data/experienceData';
import { getLocalizedText, type LanguageCode } from '../../data/i18n';
import { experienceCopy } from '../../data/introData';
import { getThemeScheme, type AppTheme, type ThemeScheme } from '../../design/themeSchemes';
import { bodyFontFor, fonts, localizedWrap } from '../../design/typography';
import { useIsMobile } from '../../hooks/useIsMobile';
import Section from '../layout/Section';
import SectionHeading from '../layout/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const sortedExperiences = [...experiences].sort((a, b) => b.id - a.id);

type ExperienceSectionProps = {
  theme: AppTheme;
  language: LanguageCode;
};

/** The two broad profession tracks the timeline is grouped under. */
const TRACKS: Array<{ key: ExperienceTrack; label: string }> = [
  { key: 'developer', label: 'Developer' },
  { key: 'illustration', label: 'Illustrator & Design' },
];

type TrackColors = { accent: string; soft: string; glow: string };

const trackColors = (scheme: ThemeScheme, track: ExperienceTrack): TrackColors =>
  track === 'illustration'
    ? { accent: scheme.third1, soft: scheme.third3, glow: scheme.third3 }
    : { accent: scheme.primary1, soft: scheme.primary3, glow: scheme.primary4 };

const TimelineItem = ({
  exp,
  isLast,
  scheme,
  language,
  colors,
}: {
  exp: Experience;
  isLast: boolean;
  scheme: ThemeScheme;
  language: LanguageCode;
  colors: TrackColors;
}) => {
  return (
    <div style={{ display: 'flex', gap: '1.4rem', position: 'relative', minHeight: '60px' }}>
      {/* Dot + connector column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          width: '20px',
        }}
      >
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: colors.accent,
            border: `3px solid ${scheme.bgPanel}`,
            boxShadow: `0 0 0 2px ${colors.accent}, ${scheme.shadow}`,
            flexShrink: 0,
            zIndex: 2,
            marginTop: '6px',
          }}
        />
        {!isLast && (
          <div
            style={{
              width: '2px',
              flex: 1,
              background: `linear-gradient(to bottom, ${colors.glow}, ${scheme.border})`,
              marginTop: '4px',
            }}
          />
        )}
      </div>

      {/* Entry content */}
      <div
        style={{
          flex: 1,
          // Without min-width:0 a flex item refuses to shrink below its intrinsic
          // content size; mixed-script JP/KR descriptions then push the row off-screen
          // on narrow viewports.
          minWidth: 0,
          paddingBottom: isLast ? '0' : '1.7rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '0.55rem',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.accent,
              fontFamily: fonts.display,
              background: colors.soft,
              padding: '0.22rem 0.65rem',
              borderRadius: '100px',
            }}
          >
            {exp.period}
          </span>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: scheme.third1,
              fontFamily: fonts.display,
              letterSpacing: '0.04em',
            }}
          >
            {exp.role}
          </span>
        </div>

        <h4
          style={{
            fontFamily: fonts.display,
            fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
            fontWeight: 700,
            color: scheme.text,
            lineHeight: 1.25,
            marginBottom: '0.35rem',
            overflowWrap: 'anywhere',
          }}
        >
          {exp.company}
        </h4>

        <p
          style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            lineHeight: 1.7,
            color: scheme.textMuted,
            fontFamily: bodyFontFor(language),
            maxWidth: '62ch',
            textWrap: 'pretty',
            ...localizedWrap(language),
          }}
        >
          {getLocalizedText(exp.summary, language)}
        </p>
      </div>
    </div>
  );
};

/**
 * Editorial split layout: sticky poster rail (heading + stats) on the left,
 * a roomy timeline on the right.
 */
const ExperienceSection = ({ theme, language }: ExperienceSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const scheme = getThemeScheme(theme);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: railRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      if (timelineRef.current) {
        const items = Array.from(timelineRef.current.querySelectorAll('[data-timeline-item]'));
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              delay: i * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 92%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="experience-section" background={scheme.bgAlt} sectionRef={sectionRef}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'minmax(240px, 320px) minmax(0, 1fr)',
          gap: isMobile ? '2.5rem' : 'clamp(3rem, 6vw, 5.5rem)',
          alignItems: 'start',
        }}
      >
        {/* Poster rail — sticks while the timeline scrolls */}
        <div
          ref={railRef}
          style={{
            position: isMobile ? 'static' : 'sticky',
            top: 'clamp(4rem, 14vh, 8rem)',
          }}
        >
          <SectionHeading
            index="02"
            title={experienceCopy.title}
            subtitle={experienceCopy.subtitle}
            scheme={scheme}
            compact={!isMobile}
          />
        </div>

        <div ref={timelineRef} style={{ display: 'flex', flexDirection: 'column', gap: '3.2rem' }}>
          {TRACKS.map((track) => {
            const items = sortedExperiences.filter((exp) => exp.track === track.key);
            if (items.length === 0) return null;
            const colors = trackColors(scheme, track.key);

            return (
              <div key={track.key}>
                {/* Track header — the big profession grouping */}
                <div
                  data-timeline-item
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                    marginBottom: '1.7rem',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: colors.accent,
                      marginLeft: '5px',
                      flexShrink: 0,
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: fonts.display,
                      fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: scheme.text,
                      lineHeight: 1,
                    }}
                  >
                    {track.label}
                  </h3>
                  <span
                    style={{
                      fontFamily: fonts.display,
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: colors.accent,
                      background: colors.soft,
                      padding: '0.22rem 0.6rem',
                      borderRadius: '100px',
                    }}
                  >
                    {String(items.length).padStart(2, '0')}
                  </span>
                </div>

                {items.map((exp, index) => (
                  <div key={exp.id} data-timeline-item>
                    <TimelineItem
                      exp={exp}
                      isLast={index === items.length - 1}
                      scheme={scheme}
                      language={language}
                      colors={colors}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default ExperienceSection;
