// src/components/AboutStrip.tsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getThemeScheme, type AppTheme, type ThemeScheme } from '../design/themeSchemes';
import { experiences } from '../data/experienceData';
import { getLocalizedText, type LanguageCode } from '../data/i18n';
import { experienceCopy } from '../data/introData';

gsap.registerPlugin(ScrollTrigger);

const sortedExperiences = [...experiences].sort((a, b) => b.id - a.id);

type AboutStripProps = {
  theme: AppTheme;
  language: LanguageCode;
};

const TimelineItem = ({
  exp,
  isLast,
  scheme,
  language,
}: {
  exp: (typeof experiences)[number];
  isLast: boolean;
  scheme: ThemeScheme;
  language: LanguageCode;
}) => {
  const description = getLocalizedText(exp.description, language);
  return (
    <div
      style={{
        display: 'flex',
        gap: '1.2rem',
        position: 'relative',
        minHeight: '60px',
      }}
    >
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
            background: scheme.primary1,
            border: `3px solid ${scheme.bgPanel}`,
            boxShadow: `0 0 0 2px ${scheme.primary1}, ${scheme.shadow}`,
            flexShrink: 0,
            zIndex: 2,
            marginTop: '4px',
          }}
        />
        {!isLast && (
          <div
            style={{
              width: '2px',
              flex: 1,
              background: `linear-gradient(to bottom, ${scheme.primary4}, ${scheme.border})`,
              marginTop: '4px',
            }}
          />
        )}
      </div>

      <div
        style={{
          flex: 1,
          paddingBottom: isLast ? '0' : '1.8rem',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            color: scheme.primary1,
            fontFamily: "'Quicksand', sans-serif",
            background: scheme.primary3,
            padding: '0.2rem 0.6rem',
            borderRadius: '100px',
            marginBottom: '0.45rem',
          }}
        >
          {exp.period}
        </span>

        <h3
          style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '1.05rem',
            fontWeight: 700,
            color: scheme.text,
            lineHeight: 1.3,
            marginBottom: '0.1rem',
          }}
        >
          {exp.company}
        </h3>
        <p
          style={{
            fontSize: '0.78rem',
            fontWeight: 600,
            color: scheme.textMuted,
            fontFamily: "'Nunito', sans-serif",
            marginBottom: '0.35rem',
          }}
        >
          {exp.role}
        </p>

        <p
          style={{
            fontSize: '0.72rem',
            fontWeight: 500,
            lineHeight: 1.7,
            color: scheme.textMuted,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

const AboutStrip = ({ theme, language }: AboutStripProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const scheme = getThemeScheme(theme);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (timelineRef.current) {
        const items = Array.from(
          timelineRef.current.querySelectorAll('[data-timeline-item]')
        );
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
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-strip"
      style={{
        padding: 'clamp(4rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4rem)',
        background: scheme.bg,
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2
          ref={titleRef}
          style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: scheme.primary1,
            marginBottom: '0.3rem',
            lineHeight: 1,
          }}
        >
          {experienceCopy.title}
        </h2>
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: scheme.textDim,
            marginBottom: '2.5rem',
            fontFamily: "'Quicksand', sans-serif",
          }}
        >
          {experienceCopy.subtitle}
        </p>

        <div ref={timelineRef}>
          {sortedExperiences.map((exp, index) => (
            <div key={exp.id} data-timeline-item>
              <TimelineItem
                exp={exp}
                isLast={index === sortedExperiences.length - 1}
                scheme={scheme}
                language={language}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStrip;
