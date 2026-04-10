// src/components/AboutStrip.tsx
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colorScheme } from '../design/colorScheme';
import { experiences } from '../data/experienceData';

gsap.registerPlugin(ScrollTrigger);

// Sort experiences: newest first (reverse chronological)
const sortedExperiences = [...experiences].sort((a, b) => b.id - a.id);

const TimelineItem = ({
  exp,
  isLast,
}: {
  exp: (typeof experiences)[number];
  isLast: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const descriptionLength = exp.description.length;
  const isLong = descriptionLength > 80;

  return (
    <div
      style={{
        display: 'flex',
        gap: '1.2rem',
        position: 'relative',
        minHeight: '60px',
      }}
    >
      {/* Timeline line + dot */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          width: '20px',
        }}
      >
        {/* Dot */}
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: colorScheme.primary1,
            border: `3px solid ${colorScheme.bgPanel}`,
            boxShadow: `0 0 0 2px ${colorScheme.primary1}, ${colorScheme.shadow}`,
            flexShrink: 0,
            zIndex: 2,
            marginTop: '4px',
          }}
        />
        {/* Vertical line */}
        {!isLast && (
          <div
            style={{
              width: '2px',
              flex: 1,
              background: `linear-gradient(to bottom, ${colorScheme.primary1}40, ${colorScheme.border})`,
              marginTop: '4px',
            }}
          />
        )}
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          paddingBottom: isLast ? '0' : '1.8rem',
        }}
      >
        {/* Period badge */}
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            color: colorScheme.primary1,
            fontFamily: "'Quicksand', sans-serif",
            background: colorScheme.primary3,
            padding: '0.2rem 0.6rem',
            borderRadius: '100px',
            marginBottom: '0.45rem',
          }}
        >
          {exp.period}
        </span>

        {/* Company & role */}
        <h3
          style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '1.05rem',
            fontWeight: 700,
            color: colorScheme.text,
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
            color: colorScheme.textMuted,
            fontFamily: "'Nunito', sans-serif",
            marginBottom: '0.35rem',
          }}
        >
          {exp.role}
        </p>

        {/* Description — collapsible for long text */}
        <div
          style={{
            overflow: 'hidden',
            maxHeight: !isLong || expanded ? '500px' : '0px',
            opacity: !isLong || expanded ? 1 : 0,
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <p
            style={{
              fontSize: '0.72rem',
              fontWeight: 500,
              lineHeight: 1.7,
              color: colorScheme.textMuted,
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {exp.description}
          </p>
        </div>

        {/* Toggle button for long descriptions */}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              marginTop: '0.3rem',
              fontSize: '0.65rem',
              fontWeight: 700,
              fontFamily: "'Quicksand', sans-serif",
              letterSpacing: '0.05em',
              color: colorScheme.primary1,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.15rem 0',
              transition: 'opacity 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '0.7';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '1';
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                fontSize: '0.7rem',
              }}
            >
              ▸
            </span>
            {expanded ? '접기' : '더 보기'}
          </button>
        )}
      </div>
    </div>
  );
};

const AboutStrip = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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
        background: colorScheme.bg,
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
            color: colorScheme.primary1,
            marginBottom: '0.3rem',
            lineHeight: 1,
          }}
        >
          Experience
        </h2>
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: colorScheme.textDim,
            marginBottom: '2.5rem',
            fontFamily: "'Quicksand', sans-serif",
          }}
        >
          Where I've been & what I've done
        </p>

        {/* Vertical Timeline */}
        <div ref={timelineRef}>
          {sortedExperiences.map((exp, index) => (
            <div key={exp.id} data-timeline-item>
              <TimelineItem
                exp={exp}
                isLast={index === sortedExperiences.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStrip;
