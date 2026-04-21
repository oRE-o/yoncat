import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Power3 } from 'gsap';
import HeroChip, { type FloaterVariant } from './HeroChip';
import { getThemeScheme, type AppTheme, type ThemeScheme } from '../design/themeSchemes';

// Each decoration sits at a fixed pixel distance from the horizontal center of the hero
// (the character's anchor) so as the viewport narrows, spacing to the character stays
// constant. When the viewport gets too narrow to comfortably fit a given decoration,
// it hides instead of drifting off-screen.
type FloaterConfig = {
  id: string;
  depth: number;
  // Signed pixel offset from horizontal center. Negative = left, positive = right.
  xOffset: number;
  // Vertical anchor — mirrors the CSS shorthand: either `top` or `bottom`.
  top?: string;
  bottom?: string;
  variant: FloaterVariant;
  text?: React.ReactNode;
  colorProps?: { color?: string; bg?: string; border?: string; shadow?: string };
  fontSize?: string;
  opacity?: number;
  zIndex?: number;
  // Minimum viewport width (px) to render this decoration.
  hideBelowWidth: number;
};

const buildFloaters = (scheme: ThemeScheme): FloaterConfig[] => [
  // Inner ring — always fighting for attention with the character
  { id: 'cl1', depth: 1.2, xOffset: -288, top: '42%', variant: 'glass',    text: '#OTAKU',    colorProps: { border: scheme.borderStrong, color: scheme.text }, fontSize: '1rem', zIndex: 3, hideBelowWidth: 720 },
  { id: 'cl2', depth: 2.8, xOffset: -230, top: '50%', variant: 'sparkle',  text: '✦',         colorProps: { color: scheme.third1 }, fontSize: 'clamp(4rem, 10vw, 7rem)', zIndex: 4, hideBelowWidth: 520 },
  { id: 'cl3', depth: -1.2, xOffset: -173, top: '35%', variant: 'symbol',  text: '+',         colorProps: { color: scheme.textDim }, opacity: 0.6, fontSize: '2.5rem', zIndex: 1, hideBelowWidth: 420 },
  { id: 'cl4', depth: 3.5, xOffset: -144, top: '68%', variant: 'bordered', text: '実行力',     colorProps: { border: scheme.borderStrong, color: scheme.text, bg: scheme.bgAlt }, fontSize: '1.1rem', zIndex: 5, hideBelowWidth: 460 },

  { id: 'cr1', depth: 2.2, xOffset: 288, top: '35%', variant: 'bordered', text: 'CREATIVE',   colorProps: { border: scheme.primary1, color: scheme.primary2, bg: scheme.bgAlt }, fontSize: '1.1rem', zIndex: 3, hideBelowWidth: 720 },
  { id: 'cr2', depth: 3.5, xOffset: 216, top: '58%', variant: 'sparkle',  text: '✦',          colorProps: { color: scheme.primary1 }, fontSize: 'clamp(4.5rem, 12vw, 8rem)', zIndex: 4, hideBelowWidth: 500 },
  { id: 'cr3', depth: -2.5, xOffset: 115, top: '45%', variant: 'symbol',  text: '+',          colorProps: { color: scheme.textDim }, opacity: 0.45, fontSize: '2.8rem', zIndex: 1, hideBelowWidth: 320 },
  { id: 'cr4', depth: 4.2, xOffset: 230, top: '72%', variant: 'filled',   text: 'AESTHETIC',  colorProps: { bg: scheme.secondary1, color: scheme.bg }, fontSize: '1.2rem', zIndex: 5, hideBelowWidth: 680 },

  // Enlarged sparkles scattered around
  { id: 's1', depth: 1.8, xOffset: -259, top: '30%', variant: 'sparkle', text: '✦', colorProps: { color: scheme.primary2 }, opacity: 0.8, fontSize: '4rem', zIndex: 2, hideBelowWidth: 600 },
  { id: 's2', depth: -2,  xOffset: -173, top: '75%', variant: 'sparkle', text: '✦', colorProps: { color: scheme.textDim },  opacity: 0.6, fontSize: '3rem', zIndex: 1, hideBelowWidth: 440 },
  { id: 's3', depth: 3,   xOffset: 115,  top: '65%', variant: 'sparkle', text: '✦', colorProps: { color: scheme.third1 },   opacity: 0.9, fontSize: '4.5rem', zIndex: 4, hideBelowWidth: 340 },
  { id: 's4', depth: -1.5, xOffset: 216, top: '28%', variant: 'sparkle', text: '✦', colorProps: { color: scheme.textMuted }, opacity: 0.7, fontSize: '3.8rem', zIndex: 1, hideBelowWidth: 520 },
  { id: 's5', depth: 2.5,  xOffset: -86, top: '45%', variant: 'sparkle', text: '✦', colorProps: { color: scheme.primary1 },  opacity: 0.7, fontSize: '3.2rem', zIndex: 2, hideBelowWidth: 280 },

  // Outer decorations
  { id: 'l1', depth: 1.5, xOffset: -346, top: '32%',    variant: 'sparkle', text: '✦',       colorProps: { color: scheme.third1 },      opacity: 0.6, fontSize: '3rem', zIndex: 2, hideBelowWidth: 780 },
  { id: 'l2', depth: -3,  xOffset: -317, bottom: '30%', variant: 'dashed',  text: 'WARNING', colorProps: { border: scheme.third1, color: scheme.third2 }, zIndex: 1, hideBelowWidth: 760 },
  { id: 'r1', depth: 1.2, xOffset: 317,  top: '25%',    variant: 'sparkle', text: '✦',       colorProps: { color: scheme.textDim },     opacity: 0.7, fontSize: '2.5rem', zIndex: 2, hideBelowWidth: 720 },
  { id: 'r2', depth: 4.5, xOffset: 288,  bottom: '38%', variant: 'filled',  text: '#Nerd',   colorProps: { bg: scheme.third1, color: '#fff' }, zIndex: 5, hideBelowWidth: 660 },
];

// Background rings are decorative frame elements — pinned to viewport corners.
type BackgroundRing = {
  id: string;
  depth: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  colorProps: { border: string };
  opacity: number;
};

const buildBackgroundRings = (scheme: ThemeScheme): BackgroundRing[] => [
  { id: 'bg1', depth: -4,   position: { top: '-5%', right: '-5%' },    colorProps: { border: scheme.border }, opacity: 0.15 },
  { id: 'bg2', depth: -3.5, position: { bottom: '-10%', left: '-10%' }, colorProps: { border: scheme.border }, opacity: 0.2 },
];

const TAGS = [
  'OTAKU',
  'GAME ENGINEER',
  'ILLUSTRATOR',
  '創造的エンジニア',
  '#Nerd_Aesthetics',
  '#Creative_Coding',
  'VISUAL THINKER',
  'PIXEL HEART',
];

type HeroPosterProps = {
  theme: AppTheme;
};

const HeroPoster: React.FC<HeroPosterProps> = ({ theme }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const charWrapRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLImageElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const floatersRef = useRef<(HTMLDivElement | null)[]>([]);

  const mouseCoords = useRef({ x: 0, y: 0 });
  const targetCoords = useRef({ x: 0, y: 0 });
  const rAF = useRef<number>(0);

  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  const scheme = getThemeScheme(theme);
  const floaterData = React.useMemo(() => buildFloaters(scheme), [scheme]);
  const backgroundRings = React.useMemo(() => buildBackgroundRings(scheme), [scheme]);
  const visibleFloaters = floaterData.filter((item) => viewportWidth >= item.hideBelowWidth);

  useEffect(() => {
    const syncSize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
      setViewportWidth(window.innerWidth);
    };
    syncSize();
    window.addEventListener('resize', syncSize);

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const isMob = window.matchMedia('(max-width: 768px)').matches;
      if (isMob) return;
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;
      targetCoords.current.x = (x - window.innerWidth / 2) / (window.innerWidth / 2);
      targetCoords.current.y = (y - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });

    const tick = () => {
      const isMob = window.matchMedia('(max-width: 768px)').matches;
      const cur = mouseCoords.current;
      const tg = targetCoords.current;
      cur.x += (tg.x - cur.x) * 0.08;
      cur.y += (tg.y - cur.y) * 0.08;

      const mousePX = window.innerWidth / 2 + cur.x * (window.innerWidth / 2);
      const mousePY = window.innerHeight / 2 + cur.y * (window.innerHeight / 2);

      if (charRef.current) {
        const transform = isMob
          ? 'translate(0, 0)'
          : `translate(${cur.x * 12}px, ${cur.y * 8}px)`;
        charRef.current.style.transform = transform;
        charRef.current.style.filter = `drop-shadow(0 8px 30px rgba(0,0,0,0.2))`;
      }
      if (titleBlockRef.current) {
        titleBlockRef.current.style.transform = `translate(${cur.x * -10}px, ${cur.y * -8}px)`;
      }

      floatersRef.current.forEach((el) => {
        if (!el) return;
        const depth = parseFloat(el.dataset.depth || '1');
        const centerShift = parseFloat(el.dataset.centerShift || '0');
        const trX = cur.x * depth * (isMob ? 8 : 25);
        const trY = cur.y * depth * (isMob ? 5 : 18);

        let blurAmount = 0;
        if (!isMob) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(mousePX - cx, mousePY - cy);
          blurAmount = Math.max(0, Math.min((dist - 150) / 100, Math.abs(depth) * 2.5 + 4));
        } else {
          blurAmount = Math.abs(depth) * 0.5;
        }

        // Horizontal anchor offset (calc(50% + Npx)) is folded into the transform so
        // parallax translation composes cleanly with the pixel-fixed offset.
        el.style.transform = `translate(calc(-50% + ${centerShift + trX}px), ${trY}px)`;
        el.style.filter = `blur(${blurAmount}px)`;
      });

      rAF.current = requestAnimationFrame(tick);
    };
    rAF.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('resize', syncSize);
      cancelAnimationFrame(rAF.current);
    };
  }, []);

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
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 'clamp(0.7rem, 1.3vw, 1.0rem)', fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          marginBottom: '0.6rem', position: 'relative', zIndex: 1, lineHeight: 1.3,
        }}>
          <span style={{ transform: isMobile ? 'translateX(-1.2rem)' : 'translateX(-2.5rem)', color: scheme.text }}>Creative Artist</span>
          <span style={{ transform: isMobile ? 'translateX(1.6rem)' : 'translateX(3.5rem)', color: scheme.third1 }}>Software Engineer</span>
          <span style={{ transform: isMobile ? 'translateX(-0.4rem)' : 'translateX(-1rem)', color: scheme.textDim }}>Nerd Aesthetics</span>
        </div>
        <h1 className="hero-title" style={{
          fontFamily: "'Quicksand', sans-serif",
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
        {TAGS.map((tag) => (
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
              fontFamily: "'Quicksand', sans-serif",
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
          fontFamily: "'Quicksand', sans-serif",
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
        fontFamily: "'Quicksand', sans-serif",
      }}>ARCHIVE—001</span>

      <span className="hero-corner-name" style={{
        position: 'absolute', top: '1.2rem', left: '1.2rem', zIndex: 5,
        fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em',
        color: scheme.text, fontFamily: "'Quicksand', sans-serif",
      }}>Yonghyuk Choi</span>
    </section>
  );
};

export default HeroPoster;
