import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { Power3 } from 'gsap';

import { getThemeScheme, type AppTheme } from '../../design/themeSchemes';
import { fonts } from '../../design/typography';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useViewportWidth } from '../../hooks/useViewportWidth';
import HeroChip from './HeroChip';
import { buildBackgroundRings, buildFloaters, HERO_TAGS } from './heroDecorations';
import { useHeroParallax } from './useHeroParallax';

type HeroPosterProps = {
  theme: AppTheme;
};

const HeroPoster = ({ theme }: HeroPosterProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const charWrapRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLImageElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const floatersRef = useRef<(HTMLDivElement | null)[]>([]);

  const isMobile = useIsMobile();
  const viewportWidth = useViewportWidth();

  const scheme = getThemeScheme(theme);
  const floaterData = useMemo(() => buildFloaters(scheme), [scheme]);
  const backgroundRings = useMemo(() => buildBackgroundRings(scheme), [scheme]);
  const visibleFloaters = floaterData.filter((item) => viewportWidth >= item.hideBelowWidth);

  useHeroParallax({ charRef, titleBlockRef, floatersRef });

  // Entrance timeline: title → character → tags → scroll hint → decorations.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(titleBlockRef.current, { y: 20, opacity: 0, duration: 1, ease: Power3.easeOut })
        .from(charWrapRef.current, { y: 60, opacity: 0, scale: 0.95, duration: 1, ease: Power3.easeOut }, '-=0.6')
        .from(
          tagsRef.current?.children ? Array.from(tagsRef.current.children) : [],
          { y: 8, opacity: 0, scale: 0.95, stagger: 0.05, duration: 0.25 },
          '-=0.1'
        )
        .from(scrollRef.current, { opacity: 0, y: 6, duration: 0.25 }, '-=0.05')
        .from(floatersRef.current, { opacity: 0, scale: 0.8, stagger: 0.04, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.3');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-poster"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: isMobile ? '11vh' : '15vh',
        overflow: 'hidden',
        backgroundColor: scheme.bgHero,
      }}
    >
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(${scheme.border} 1px, transparent 1px),
          linear-gradient(90deg, ${scheme.border} 1px, transparent 1px)
        `,
        backgroundSize: '35px 35px',
        opacity: 0.8,
        maskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
      }} />

      {/* Title block */}
      <div
        ref={titleBlockRef}
        className="hero-title-block"
        style={{
          position: 'relative', zIndex: 2, textAlign: 'center',
          pointerEvents: 'none', userSelect: 'none',
          marginBottom: isMobile ? '0.5rem' : '-6.5rem',
          transition: 'all 0.3s ease',
          width: '90vw',
        }}
      >
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          fontFamily: fonts.display,
          fontSize: 'clamp(0.7rem, 1.3vw, 1.0rem)', fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          marginBottom: '0.6rem', position: 'relative', zIndex: 1, lineHeight: 1.3,
        }}>
          <span style={{ transform: isMobile ? 'translateX(-1.2rem)' : 'translateX(-2.5rem)', color: scheme.text }}>Creative Artist</span>
          <span style={{ transform: isMobile ? 'translateX(1.6rem)' : 'translateX(3.5rem)', color: scheme.third1 }}>Software Engineer</span>
          <span style={{ transform: isMobile ? 'translateX(-0.4rem)' : 'translateX(-1rem)', color: scheme.textDim }}>Nerd Aesthetics</span>
        </div>
        <h1 className="hero-title" style={{
          fontFamily: fonts.display,
          fontSize: isMobile ? 'clamp(1.7rem, 9vw, 3rem)' : 'clamp(2.8rem, 8vw, 7rem)', fontWeight: 700,
          letterSpacing: '-0.02em', color: scheme.primary1,
          lineHeight: 0.95, textShadow: '0 4px 24px rgba(0,0,0,0.15)',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
        }}>
          Yonghyuk Choi<span style={{ color: scheme.third1 }}>_</span>
        </h1>
      </div>

      {/* Character */}
      <div
        ref={charWrapRef}
        className="hero-char-wrap"
        style={{
          position: 'relative', zIndex: 3, display: 'flex',
          flex: 1, minHeight: 0, alignItems: 'flex-end', justifyContent: 'center',
          overflow: 'hidden', width: '100%',
          maxWidth: isMobile ? '480px' : '850px',
          WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          marginTop: isMobile ? '0.4rem' : '0',
          transition: 'margin 0.3s ease',
        }}
      >
        <img
          ref={charRef}
          src="/1.png"
          alt="Yonghyuk Choi character"
          className="hero-character"
          style={{
            position: 'relative', width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'bottom center',
            filter: 'drop-shadow(0 8px 30px rgba(0,0,0,0.2))',
            willChange: 'transform',
            transformOrigin: 'bottom center',
          }}
        />
      </div>

      {/* Tags */}
      <div
        ref={tagsRef}
        className="hero-tags"
        style={{
          position: 'relative', zIndex: 4, marginTop: '1.25rem',
          display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', maxWidth: '92vw',
        }}
      >
        {HERO_TAGS.map((tag) => (
          <span
            key={tag}
            style={{
              padding: '0.62rem 1.3rem', borderRadius: '999px',
              fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.11em',
              textTransform: tag.startsWith('#') ? 'none' : 'uppercase', color: scheme.text,
              border: `1.5px solid ${scheme.borderStrong}`,
              background: scheme.bgPanel,
              whiteSpace: 'nowrap', transition: 'all 0.2s ease', cursor: 'default',
              lineHeight: 1,
              fontFamily: fonts.display,
              boxShadow: scheme.shadow,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} style={{
        position: 'absolute', bottom: '1.5rem', left: '50%',
        transform: 'translateX(-50%)', zIndex: 5,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
      }}>
        <span style={{
          fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: scheme.textDim,
          fontFamily: fonts.display,
        }}>Scroll</span>
        <div className="scroll-line-animate" style={{
          width: '2px', height: '24px', borderRadius: '1px',
          background: `linear-gradient(to bottom, ${scheme.textDim}, transparent)`,
        }} />
      </div>

      {/* Floaters — pixel-anchored to horizontal center */}
      {visibleFloaters.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => { floatersRef.current[index] = el; }}
          data-depth={item.depth}
          data-center-shift={item.xOffset}
          style={{
            position: 'absolute',
            left: '50%',
            top: item.top,
            bottom: item.bottom,
            zIndex: item.zIndex !== undefined ? item.zIndex : 2,
            willChange: 'transform, filter',
            // rAF tick overwrites this — initial value keeps the anchor before first frame.
            transform: `translate(calc(-50% + ${item.xOffset}px), 0)`,
          }}
        >
          <HeroChip
            variant={item.variant}
            text={item.text}
            colorProps={item.colorProps}
            fontSize={item.fontSize}
            opacity={item.opacity}
          />
        </div>
      ))}

      {/* Background rings — atmospheric corners */}
      {backgroundRings.map((ring) => (
        <div
          key={ring.id}
          data-depth={ring.depth}
          style={{
            position: 'absolute',
            ...ring.position,
            zIndex: 0,
            pointerEvents: 'none',
            opacity: ring.opacity,
          }}
        >
          <HeroChip variant="circle" colorProps={ring.colorProps} />
        </div>
      ))}

      {/* Corner labels */}
      <span style={{
        position: 'absolute', top: '1.2rem', right: '1.2rem', zIndex: 5,
        fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: scheme.textDim,
        fontFamily: fonts.display,
      }}>ARCHIVE—001</span>

      <span className="hero-corner-name" style={{
        position: 'absolute', top: '1.2rem', left: '1.2rem', zIndex: 5,
        fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em',
        color: scheme.text, fontFamily: fonts.display,
      }}>Yonghyuk Choi</span>
    </section>
  );
};

export default HeroPoster;
