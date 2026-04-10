import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { colorScheme } from '../design/colorScheme';
import { Power3 } from 'gsap';

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

  useEffect(() => {
    let isMobile = window.matchMedia('(max-width: 768px)').matches;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (isMobile) return;
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;
      targetCoords.current.x = (x - window.innerWidth / 2) / (window.innerWidth / 2);
      targetCoords.current.y = (y - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    const handleResize = () => {
      isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (isMobile) {
        targetCoords.current = { x: 0, y: 0 };
        mouseCoords.current = { x: 0, y: 0 };
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('resize', handleResize);

    const tick = () => {
      const cur = mouseCoords.current;
      const tg = targetCoords.current;
      cur.x += (tg.x - cur.x) * 0.08;
      cur.y += (tg.y - cur.y) * 0.08;

      const mousePX = window.innerWidth / 2 + cur.x * (window.innerWidth / 2);
      const mousePY = window.innerHeight / 2 + cur.y * (window.innerHeight / 2);

      if (charRef.current) {
        charRef.current.style.transform = `translate(${cur.x * 6}px, ${cur.y * 4}px)`;
        charRef.current.style.filter = `drop-shadow(0 8px 30px rgba(0,0,0,0.2))`;
      }
      if (titleBlockRef.current) {
        titleBlockRef.current.style.transform = `translate(${cur.x * -4}px, ${cur.y * -3}px)`;
      }

      floatersRef.current.forEach((el) => {
        if (!el) return;
        const depth = parseFloat(el.dataset.depth || '1');
        const trX = cur.x * depth * 15;
        const trY = cur.y * depth * 10;

        let blurAmount = 0;
        if (!isMobile) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(mousePX - cx, mousePY - cy);
          blurAmount = Math.max(0, Math.min((dist - 150) / 100, Math.abs(depth) * 2.5 + 4));
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
      window.removeEventListener('resize', handleResize);
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
        paddingTop: '18vh',
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
          pointerEvents: 'none', userSelect: 'none', marginBottom: '-6.5rem',
        }}
      >
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 'clamp(0.75rem, 1.3vw, 1.0rem)', fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          marginBottom: '0.6rem', position: 'relative', zIndex: 1, lineHeight: 1.3,
        }}>
          <span style={{ transform: 'translateX(-2.5rem)', color: colorScheme.text }}>Creative Artist</span>
          <span style={{ transform: 'translateX(3.5rem)', color: colorScheme.third1 }}>Software Engineer</span>
          <span style={{ transform: 'translateX(-1rem)', color: colorScheme.textDim }}>Nerd Aesthetics</span>
        </div>
        <h1 className="hero-title" style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 'clamp(2.8rem, 8vw, 7rem)', fontWeight: 700,
          letterSpacing: '-0.02em', color: colorScheme.primary1,
          lineHeight: 0.95, textShadow: '0 4px 24px rgba(0,0,0,0.15)', whiteSpace: 'nowrap',
        }}>
          Sonagii<span style={{ color: colorScheme.third1 }}>_</span>
        </h1>
      </div>

      {/* LAYER 2: Character */}
      <div
        ref={charWrapRef}
        className="hero-char-wrap"
        style={{
          position: 'relative', zIndex: 3, display: 'flex',
          flex: 1, minHeight: 0, alignItems: 'flex-end', justifyContent: 'center',
          overflow: 'hidden', width: '100%', maxWidth: '850px',
          WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
        }}
      >
        <img
          ref={charRef}
          src="/1.png"
          alt="Sonagii_ character"
          className="hero-character"
          style={{
            position: 'relative', width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'bottom center',
            filter: 'drop-shadow(0 8px 30px rgba(0,0,0,0.2))',
            willChange: 'transform',
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
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = colorScheme.primary3;
              el.style.borderColor = colorScheme.primary1;
              el.style.transform = 'translateY(-3px) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = colorScheme.bgAlt;
              el.style.borderColor = colorScheme.borderStrong;
              el.style.transform = '';
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
      {/* All pills/sparkles are constrained to LEFT (left:0-15%) or RIGHT (right:0-12%) */}

      {/* L1: SYSTEM: ONLINE pill */}
      <div ref={(el) => { floatersRef.current[0] = el; }} data-depth="1.5"
        style={{ position: 'absolute', top: '28%', left: '2%', zIndex: 3, willChange: 'transform, filter' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.62rem 1.3rem', borderRadius: '999px',
          border: `1.5px solid ${colorScheme.borderStrong}`,
          fontFamily: "'Quicksand', sans-serif", fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.08em',
          color: colorScheme.text, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(4px)',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: colorScheme.primary1, boxShadow: `0 0 8px ${colorScheme.primary1}` }} />
          SYSTEM: ONLINE
        </div>
      </div>

      {/* R1: #Nerd_Aesthetics pill — pink filled */}
      <div ref={(el) => { floatersRef.current[1] = el; }} data-depth="3.5"
        style={{ position: 'absolute', bottom: '38%', right: '2%', zIndex: 4, willChange: 'transform, filter' }}>
        <div style={{
          padding: '0.78rem 1.7rem', borderRadius: '999px',
          fontFamily: "'Nunito', sans-serif", fontSize: '0.88rem',
          fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: '#fff', background: colorScheme.third1,
          boxShadow: `0 8px 28px ${colorScheme.third3}`,
        }}>
          #Nerd_Aesthetics
        </div>
      </div>

      {/* R2: small ✦ */}
      <div ref={(el) => { floatersRef.current[2] = el; }} data-depth="-2.5"
        style={{ position: 'absolute', top: '12%', right: '6%', zIndex: 1, willChange: 'transform, filter',
          fontFamily: "'Nunito', sans-serif", fontSize: '1.3rem', fontWeight: 300, color: colorScheme.textDim }}>
        ✦
      </div>

      {/* L2: vertical coords text */}
      <div ref={(el) => { floatersRef.current[3] = el; }} data-depth="-1"
        style={{
          position: 'absolute', bottom: '48%', left: '0.5%', zIndex: 1, willChange: 'transform, filter',
          fontFamily: 'monospace', fontSize: '0.48rem', color: colorScheme.textMuted, opacity: 0.6,
          writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.25em',
        }}>
        LAT: 37.5665 · LON: 126.9780
      </div>

      {/* BG: big outline circle */}
      <div ref={(el) => { floatersRef.current[4] = el; }} data-depth="-4"
        style={{
          position: 'absolute', top: '-15%', right: '-8%', zIndex: 0,
          width: '420px', height: '420px', borderRadius: '50%',
          border: `1px solid ${colorScheme.border}`, opacity: 0.5, pointerEvents: 'none',
          willChange: 'transform, filter',
        }} />

      {/* R3: 創造的エンジニア pill — mint bordered */}
      <div ref={(el) => { floatersRef.current[5] = el; }} data-depth="2"
        style={{ position: 'absolute', top: '20%', right: '2%', zIndex: 2, willChange: 'transform, filter' }}>
        <div style={{
          padding: '0.64rem 1.35rem', borderRadius: '999px',
          border: `1.5px solid ${colorScheme.primary1}`,
          fontFamily: "'Quicksand', sans-serif", fontSize: '0.68rem',
          fontWeight: 700, color: colorScheme.primary2, background: colorScheme.bgAlt,
          boxShadow: `0 4px 12px ${colorScheme.primary3}`,
        }}>
          創造的エンジニア
        </div>
      </div>

      {/* R4: medium ✦ mint */}
      <div ref={(el) => { floatersRef.current[6] = el; }} data-depth="5"
        style={{ position: 'absolute', top: '52%', right: '4%', zIndex: 5, willChange: 'transform, filter',
          fontFamily: "'Nunito', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: colorScheme.primary2, opacity: 0.8 }}>
        ✦
      </div>

      {/* L3: クリエイター pill — dark bordered */}
      <div ref={(el) => { floatersRef.current[7] = el; }} data-depth="-3"
        style={{ position: 'absolute', bottom: '30%', left: '1.5%', zIndex: 1, willChange: 'transform, filter' }}>
        <div style={{
          padding: '0.62rem 1.35rem', borderRadius: '999px',
          border: `1.5px solid ${colorScheme.borderStrong}`,
          fontFamily: "'Quicksand', sans-serif", fontSize: '0.68rem', fontWeight: 700,
          letterSpacing: '0.05em', color: colorScheme.textMuted, background: colorScheme.bgAlt,
        }}>
          クリエイター // VER.01
        </div>
      </div>

      {/* L4: big ✦ pink */}
      <div ref={(el) => { floatersRef.current[8] = el; }} data-depth="2.5"
        style={{ position: 'absolute', top: '8%', left: '4%', zIndex: 4, willChange: 'transform, filter',
          fontFamily: "'Nunito', sans-serif", fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 300, color: colorScheme.third1 }}>
        ✦
      </div>

      {/* R5: big ✦ mint bottom */}
      <div ref={(el) => { floatersRef.current[9] = el; }} data-depth="-3"
        style={{ position: 'absolute', bottom: '10%', right: '3%', zIndex: 2, willChange: 'transform, filter',
          fontFamily: "'Nunito', sans-serif", fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 300, color: colorScheme.primary2, opacity: 0.8 }}>
        ✦
      </div>

      {/* L5: medium ✦ dim */}
      <div ref={(el) => { floatersRef.current[10] = el; }} data-depth="4"
        style={{ position: 'absolute', bottom: '14%', left: '7%', zIndex: 5, willChange: 'transform, filter',
          fontFamily: "'Nunito', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300, color: colorScheme.textDim, opacity: 0.7 }}>
        ✦
      </div>

      {/* L6: tiny ✦ */}
      <div ref={(el) => { floatersRef.current[11] = el; }} data-depth="-1.5"
        style={{ position: 'absolute', top: '44%', left: '3%', zIndex: 1, willChange: 'transform, filter',
          fontFamily: "'Nunito', sans-serif", fontSize: '1rem', fontWeight: 300, color: colorScheme.textDim, opacity: 0.35 }}>
        ✦
      </div>

      {/* R6: small ✦ mint upper */}
      <div ref={(el) => { floatersRef.current[12] = el; }} data-depth="3"
        style={{ position: 'absolute', top: '34%', right: '2%', zIndex: 4, willChange: 'transform, filter',
          fontFamily: "'Nunito', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 300, color: colorScheme.primary1, opacity: 0.65 }}>
        ✦
      </div>

      {/* L7: WARNING pill — pink dashed */}
      <div ref={(el) => { floatersRef.current[13] = el; }} data-depth="-5"
        style={{ position: 'absolute', top: '38%', left: '2%', zIndex: 2, willChange: 'transform, filter' }}>
        <div style={{
          padding: '0.56rem 1.1rem', borderRadius: '999px',
          border: `1.5px dashed ${colorScheme.third1}`,
          fontFamily: "'Quicksand', sans-serif", fontSize: '0.62rem',
          fontWeight: 800, letterSpacing: '0.1em', color: colorScheme.third2,
        }}>
          WARNING // OVERLOAD
        </div>
      </div>

      {/* R7: AESTHETIC.EXE pill — dark filled */}
      <div ref={(el) => { floatersRef.current[14] = el; }} data-depth="4.5"
        style={{ position: 'absolute', bottom: '24%', right: '2%', zIndex: 5, willChange: 'transform, filter' }}>
        <div style={{
          padding: '0.64rem 1.3rem', borderRadius: '999px',
          background: colorScheme.secondary1,
          fontFamily: "'Nunito', sans-serif", fontSize: '0.74rem',
          fontWeight: 800, letterSpacing: '0.1em', color: colorScheme.bg,
        }}>
          AESTHETIC.EXE
        </div>
      </div>

      {/* L8: + mark */}
      <div ref={(el) => { floatersRef.current[15] = el; }} data-depth="-2"
        style={{ position: 'absolute', top: '20%', left: '5%', zIndex: 1, willChange: 'transform, filter',
          fontFamily: "'Nunito', sans-serif", fontSize: '1.6rem', fontWeight: 300, color: colorScheme.textDim, opacity: 0.35 }}>
        +
      </div>

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
      }}>Sonagii_</span>
    </section>
  );
};

export default HeroPoster;
