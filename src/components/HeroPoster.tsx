import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { colorScheme } from '../design/colorScheme';
import { Power3 } from 'gsap';
import HeroChip, { type FloaterVariant } from './HeroChip';

type FloaterConfig = {
  id: string;
  depth: number;
  position: React.CSSProperties;
  variant: FloaterVariant;
  text?: React.ReactNode;
  colorProps?: { color?: string; bg?: string; border?: string; shadow?: string };
  fontSize?: string;
  opacity?: number;
  zIndex?: number;
  hideOnMobile?: boolean;
};

const FLOATER_DATA: FloaterConfig[] = [
  // --- CENTER CLUSTERS ---
  { id: 'cl1', depth: 1.2, zIndex: 3, position: { top: '42%', left: '30%' }, variant: 'glass', colorProps: { border: colorScheme.borderStrong, color: colorScheme.text }, text: '#OTAKU', fontSize: '1rem' },
  { id: 'cl2', depth: 2.8, zIndex: 4, position: { top: '50%', left: '34%' }, variant: 'sparkle', text: '✦', colorProps: { color: colorScheme.third1 }, fontSize: 'clamp(4rem, 10vw, 7rem)' },
  { id: 'cl3', depth: -1.2, zIndex: 1, position: { top: '35%', left: '38%' }, variant: 'symbol', text: '+', colorProps: { color: colorScheme.textDim }, opacity: 0.6, fontSize: '2.5rem' },
  { id: 'cl4', depth: 3.5, zIndex: 5, position: { top: '68%', left: '40%' }, variant: 'bordered', text: '実行力', colorProps: { border: colorScheme.borderStrong, color: colorScheme.text, bg: colorScheme.bgAlt }, hideOnMobile: true, fontSize: '1.1rem' },

  { id: 'cr1', depth: 2.2, zIndex: 3, position: { top: '35%', right: '30%' }, variant: 'bordered', text: 'CREATIVE', colorProps: { border: colorScheme.primary1, color: colorScheme.primary2, bg: colorScheme.bgAlt }, fontSize: '1.1rem' },
  { id: 'cr2', depth: 3.5, zIndex: 4, position: { top: '58%', right: '35%' }, variant: 'sparkle', text: '✦', colorProps: { color: colorScheme.primary1 }, fontSize: 'clamp(4.5rem, 12vw, 8rem)' },
  { id: 'cr3', depth: -2.5, zIndex: 1, position: { top: '45%', right: '42%' }, variant: 'symbol', text: '+', colorProps: { color: colorScheme.textDim }, opacity: 0.45, fontSize: '2.8rem' },
  { id: 'cr4', depth: 4.2, zIndex: 5, position: { top: '72%', right: '34%' }, variant: 'filled', text: 'AESTHETIC', colorProps: { bg: colorScheme.secondary1, color: colorScheme.bg }, hideOnMobile: true, fontSize: '1.2rem' },

  // --- ADDITIONAL ENLARGED SPARKLES ---
  { id: 's1', depth: 1.8, zIndex: 2, position: { top: '30%', left: '32%' }, variant: 'sparkle', text: '✦', colorProps: { color: colorScheme.primary2 }, opacity: 0.8, fontSize: '4rem' },
  { id: 's2', depth: -2, zIndex: 1, position: { top: '75%', left: '38%' }, variant: 'sparkle', text: '✦', colorProps: { color: colorScheme.textDim }, opacity: 0.6, fontSize: '3rem' },
  { id: 's3', depth: 3, zIndex: 4, position: { top: '65%', right: '42%' }, variant: 'sparkle', text: '✦', colorProps: { color: colorScheme.third1 }, opacity: 0.9, fontSize: '4.5rem' },
  { id: 's4', depth: -1.5, zIndex: 1, position: { top: '28%', right: '35%' }, variant: 'sparkle', text: '✦', colorProps: { color: colorScheme.textMuted }, opacity: 0.7, fontSize: '3.8rem' },
  { id: 's5', depth: 2.5, zIndex: 2, position: { top: '45%', left: '44%' }, variant: 'sparkle', text: '✦', colorProps: { color: colorScheme.primary1 }, opacity: 0.7, fontSize: '3.2rem' },

  // --- OUTER DECORATIONS ---
  { id: 'l1', depth: 1.5, zIndex: 2, position: { top: '32%', left: '26%' }, variant: 'sparkle', text: '✦', colorProps: { color: colorScheme.third1 }, opacity: 0.6, hideOnMobile: true, fontSize: '3rem' },
  { id: 'l2', depth: -3, zIndex: 1, position: { bottom: '30%', left: '28%' }, variant: 'dashed', text: 'WARNING', colorProps: { border: colorScheme.third1, color: colorScheme.third2 }, hideOnMobile: true },

  { id: 'r1', depth: 1.2, zIndex: 2, position: { top: '25%', right: '28%' }, variant: 'sparkle', text: '✦', colorProps: { color: colorScheme.textDim }, opacity: 0.7, hideOnMobile: true, fontSize: '2.5rem' },
  { id: 'r2', depth: 4.5, zIndex: 5, position: { bottom: '38%', right: '30%' }, variant: 'filled', text: '#Nerd', colorProps: { bg: colorScheme.third1, color: '#fff' }, hideOnMobile: true },

  // --- BACKGROUND DETAILS ---
  { id: 'bg1', zIndex: 0, depth: -4, position: { top: '-5%', right: '-5%' }, variant: 'circle', colorProps: { border: colorScheme.border }, opacity: 0.15 },
  { id: 'bg2', zIndex: 0, depth: -3.5, position: { bottom: '-10%', left: '-10%' }, variant: 'circle', colorProps: { border: colorScheme.border }, opacity: 0.2 },
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

const HeroPoster: React.FC = () => {
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

  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

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
        charRef.current.style.transform = `translate(${cur.x * 12}px, ${cur.y * 8}px)`;
        charRef.current.style.filter = `drop-shadow(0 8px 30px rgba(0,0,0,0.2))`;
      }
      if (titleBlockRef.current) {
        titleBlockRef.current.style.transform = `translate(${cur.x * -10}px, ${cur.y * -8}px)`;
      }

      floatersRef.current.forEach((el) => {
        if (!el) return;
        const depth = parseFloat(el.dataset.depth || '1');
        const trX = cur.x * depth * 25;
        const trY = cur.y * depth * 18;

        let blurAmount = 0;
        if (!isMob) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(mousePX - cx, mousePY - cy);
          blurAmount = Math.max(0, Math.min((dist - 150) / 100, Math.abs(depth) * 2.5 + 4));
        } else {
          blurAmount = Math.abs(depth) * 0.8;
        }

        el.style.transform = `translate(${trX}px, ${trY}px)`;
        el.style.filter = `blur(${blurAmount}px)`;
      });

      rAF.current = requestAnimationFrame(tick);
    };
    rAF.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('resize', checkMobile);
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
        paddingTop: isMobile ? '22vh' : '15vh',
        overflow: 'hidden',
        backgroundColor: colorScheme.bgHero,
      }}
    >
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(${colorScheme.border} 1px, transparent 1px),
          linear-gradient(90deg, ${colorScheme.border} 1px, transparent 1px)
        `,
        backgroundSize: '35px 35px',
        opacity: 0.8,
        maskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
      }} />

      {/* LAYER 1: Title block */}
      <div
        ref={titleBlockRef}
        className="hero-title-block"
        style={{
          position: 'relative', zIndex: 2, textAlign: 'center',
          pointerEvents: 'none', userSelect: 'none',
          marginBottom: isMobile ? '-2rem' : '-6.5rem',
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
          <span style={{ transform: isMobile ? 'translateX(-1.5rem)' : 'translateX(-2.5rem)', color: colorScheme.text }}>Creative Artist</span>
          <span style={{ transform: isMobile ? 'translateX(2rem)' : 'translateX(3.5rem)', color: colorScheme.third1 }}>Software Engineer</span>
          <span style={{ transform: isMobile ? 'translateX(-0.6rem)' : 'translateX(-1rem)', color: colorScheme.textDim }}>Nerd Aesthetics</span>
        </div>
        <h1 className="hero-title" style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: isMobile ? 'clamp(1.8rem, 10vw, 3.5rem)' : 'clamp(2.8rem, 8vw, 7rem)', fontWeight: 700,
          letterSpacing: '-0.02em', color: colorScheme.primary1,
          lineHeight: 0.95, textShadow: '0 4px 24px rgba(0,0,0,0.15)',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
        }}>
          {isMobile ? (
            <>
              Yonghyuk<br />Choi<span style={{ color: colorScheme.third1 }}>_</span>
            </>
          ) : (
            <>
              Yonghyuk Choi<span style={{ color: colorScheme.third1 }}>_</span>
            </>
          )}
        </h1>
      </div>

      {/* LAYER 2: Character */}
      <div
        ref={charWrapRef}
        className="hero-char-wrap"
        style={{
          position: 'relative', zIndex: 3, display: 'flex',
          flex: 1, minHeight: 0, alignItems: 'flex-end', justifyContent: 'center',
          overflow: 'hidden', width: '100%',
          maxWidth: isMobile ? '1000px' : '850px', // Increased mobile maxWidth
          WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          marginTop: isMobile ? '4.5rem' : '0', // Moved down slightly more
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
            transform: isMobile ? 'scale(1.5)' : 'none', // Slightly larger scale
          }}
        />
      </div>

      {/* Pill Tags row */}
      <div
        ref={tagsRef}
        className="hero-tags"
        style={{
          position: 'relative', zIndex: 4, marginTop: '1.25rem',
          display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', maxWidth: '92vw',
        }}
      >
        {TAGS.map((tag) => (
          <span
            key={tag}
            style={{
              padding: '0.72rem 1.55rem', borderRadius: '999px',
              fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.11em',
              textTransform: tag.startsWith('#') ? 'none' : 'uppercase', color: colorScheme.text,
              border: `1.5px solid ${colorScheme.borderStrong}`,
              background: 'rgba(240, 237, 230, 0.94)',
              whiteSpace: 'nowrap', transition: 'all 0.2s ease', cursor: 'default',
              lineHeight: 1,
              fontFamily: "'Quicksand', sans-serif",
              boxShadow: '0 10px 28px rgba(26, 31, 36, 0.08)',
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
          textTransform: 'uppercase', color: colorScheme.textDim,
          fontFamily: "'Quicksand', sans-serif",
        }}>Scroll</span>
        <div className="scroll-line-animate" style={{
          width: '2px', height: '24px', borderRadius: '1px',
          background: `linear-gradient(to bottom, ${colorScheme.textDim}, transparent)`,
        }} />
      </div>

      {/* ===================== FLOATERS ===================== */}
      {FLOATER_DATA
        .filter(item => !isMobile || !item.hideOnMobile)
        .map((item, index) => {
          const finalPosition = { ...item.position };
          if (isMobile) {
            // Push towards edges more aggressively (up to 20% shift)
            if (finalPosition.left) {
              const val = parseFloat(finalPosition.left as string);
              finalPosition.left = `${Math.max(2, val - 22)}%`;
            }
            if (finalPosition.right) {
              const val = parseFloat(finalPosition.right as string);
              finalPosition.right = `${Math.max(2, val - 22)}%`;
            }
          }

          return (
            <div
              key={item.id}
              ref={(el) => { floatersRef.current[index] = el; }}
              data-depth={item.depth}
              style={{
                position: 'absolute',
                ...finalPosition,
                zIndex: item.zIndex !== undefined ? item.zIndex : 2,
                willChange: 'transform, filter',
                transform: 'translateZ(0)',
              }}
            >
              <HeroChip
                variant={item.variant}
                text={item.text}
                colorProps={item.colorProps}
                fontSize={item.fontSize} // REVERTED: Do not reduce font size on mobile
                opacity={item.opacity}
                style={item.variant === 'circle' ? { opacity: item.opacity || 0.5 } : {}}
              />
            </div>
          );
        })}
      {/* Corner labels */}
      <span style={{
        position: 'absolute', top: '1.2rem', right: '1.2rem', zIndex: 5,
        fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: colorScheme.textDim,
        fontFamily: "'Quicksand', sans-serif",
      }}>ARCHIVE—001</span>

      <span className="hero-corner-name" style={{
        position: 'absolute', top: '1.2rem', left: '1.2rem', zIndex: 5,
        fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em',
        color: colorScheme.text, fontFamily: "'Quicksand', sans-serif",
      }}>Yonghyuk Choi</span>
    </section>
  );
};

export default HeroPoster;
