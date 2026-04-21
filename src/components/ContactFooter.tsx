// src/components/ContactFooter.tsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getThemeScheme, type AppTheme } from '../design/themeSchemes';
import { contactData } from '../data/contactData';
import { type LanguageCode } from '../data/i18n';
import { contactCopy } from '../data/introData';

gsap.registerPlugin(ScrollTrigger);

type ContactFooterProps = {
  theme: AppTheme;
  language?: LanguageCode;
};

const ContactFooter = ({ theme }: ContactFooterProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scheme = getThemeScheme(theme);

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
        background: scheme.bgHero,
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
          color: scheme.text, lineHeight: 1.1,
        }}>
          {contactCopy.title}
          <span style={{ color: scheme.third1 }}>!</span>
        </h2>

        <p style={{
          fontSize: '0.85rem',
          fontWeight: 500,
          color: scheme.textMuted,
          fontFamily: "'Nunito', sans-serif",
          maxWidth: '36rem',
          lineHeight: 1.7,
        }}>
          {contactCopy.subtitle}
        </p>

        <a
          href={`mailto:${contactData.email}`}
          style={{
            fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
            color: scheme.third1, textDecoration: 'none',
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
                color: scheme.text,
                background: scheme.surface,
                border: `1.5px solid ${scheme.border}`,
                borderRadius: '100px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = scheme.third1;
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = scheme.border;
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
          borderTop: `1px solid ${scheme.border}`,
          width: '100%',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <span style={{
            fontSize: '0.55rem', fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase' as const,
            color: scheme.textDim,
            fontFamily: "'Quicksand', sans-serif",
          }}>
            ARCHIVE—001 // SONAGII_
          </span>
          <span style={{
            fontSize: '0.55rem', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase' as const,
            color: scheme.textDim,
            fontFamily: "'Nunito', sans-serif",
          }}>
            {contactData.footerRights}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
