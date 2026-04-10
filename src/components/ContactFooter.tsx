// src/components/ContactFooter.tsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colorScheme } from '../design/colorScheme';
import { contactData } from '../data/contactData';

gsap.registerPlugin(ScrollTrigger);

const ContactFooter = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 35,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="contact-footer"
      style={{
        padding: 'clamp(4rem, 12vh, 7rem) clamp(1.5rem, 5vw, 4rem)',
        background: colorScheme.bgHero,
        position: 'relative',
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
          gap: '1rem',
        }}
      >
        <h2 style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700, letterSpacing: '-0.02em',
          color: colorScheme.text, lineHeight: 1.1,
        }}>
          Let's Connect<span style={{ color: colorScheme.third1 }}>!</span>
        </h2>

        <a
          href={`mailto:${contactData.email}`}
          style={{
            fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
            color: colorScheme.third1, textDecoration: 'none',
            fontWeight: 700, letterSpacing: '0.02em',
            fontFamily: "'Quicksand', sans-serif",
            transition: 'opacity 0.3s',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.8'; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
        >
          {contactData.email}
        </a>

        <div style={{ display: 'flex', gap: '0.7rem', marginTop: '0.4rem' }}>
          {contactData.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.55rem 1.1rem',
                fontSize: '0.78rem', fontWeight: 700,
                fontFamily: "'Quicksand', sans-serif",
                color: colorScheme.text,
                background: colorScheme.surface,
                border: `1.5px solid ${colorScheme.border}`,
                borderRadius: '100px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = colorScheme.surface;
                el.style.borderColor = colorScheme.third1;
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = colorScheme.surface;
                el.style.borderColor = colorScheme.border;
                el.style.transform = 'translateY(0)';
              }}
            >
              <social.icon size={16} />
              {social.name}
            </a>
          ))}
        </div>

        <div style={{
          marginTop: '2.5rem', paddingTop: '1.2rem',
          borderTop: `1px solid ${colorScheme.border}`,
          width: '100%',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <span style={{
            fontSize: '0.55rem', fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase' as const,
            color: colorScheme.textDim,
            fontFamily: "'Quicksand', sans-serif",
          }}>
            ARCHIVE—001 // SONAGII_
          </span>
          <span style={{
            fontSize: '0.55rem', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase' as const,
            color: colorScheme.textDim,
            fontFamily: "'Nunito', sans-serif",
          }}>
            © 2026 Sonagii_. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
