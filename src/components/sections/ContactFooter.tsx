import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { contactData } from '../../data/contactData';
import { contactCopy } from '../../data/introData';
import { getThemeScheme, type AppTheme } from '../../design/themeSchemes';
import { fonts } from '../../design/typography';
import Section from '../layout/Section';

gsap.registerPlugin(ScrollTrigger);

type ContactFooterProps = {
  theme: AppTheme;
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
    <Section
      as="footer"
      id="contact-footer"
      background={scheme.bgHero}
      sectionRef={sectionRef}
      style={{ padding: 'clamp(4rem, 12vh, 7rem) clamp(1.5rem, 5vw, 4.5rem)' }}
    >
      <div
        ref={contentRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1rem',
        }}
      >
        {/* Poster eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <span
            style={{
              fontFamily: fonts.display,
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: scheme.third1,
            }}
          >
            04
          </span>
          <span
            aria-hidden="true"
            style={{ width: '2.2rem', height: '1.5px', background: scheme.borderStrong }}
          />
          <span
            style={{
              fontFamily: fonts.display,
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: scheme.textDim,
            }}
          >
            Contact
          </span>
        </div>

        <h2
          style={{
            fontFamily: fonts.display,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: scheme.text,
            lineHeight: 1.1,
          }}
        >
          {contactCopy.title}
          <span style={{ color: scheme.third1 }}>!</span>
        </h2>

        <p
          style={{
            fontSize: '0.85rem',
            fontWeight: 500,
            color: scheme.textMuted,
            fontFamily: fonts.body,
            maxWidth: '36rem',
            lineHeight: 1.7,
          }}
        >
          {contactCopy.subtitle}
        </p>

        <a
          href={`mailto:${contactData.email}`}
          style={{
            fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
            color: scheme.third1,
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: '0.02em',
            fontFamily: fonts.display,
            transition: 'opacity 0.3s',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.opacity = '1';
          }}
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
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.1rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                fontFamily: fonts.display,
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

        <div
          style={{
            marginTop: '2.5rem',
            paddingTop: '1.2rem',
            borderTop: `1px solid ${scheme.border}`,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span
            style={{
              fontSize: '0.55rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: scheme.textDim,
              fontFamily: fonts.display,
            }}
          >
            ARCHIVE—001 // SONAGII_
          </span>
          <span
            style={{
              fontSize: '0.55rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: scheme.textDim,
              fontFamily: fonts.body,
            }}
          >
            {contactData.footerRights}
          </span>
        </div>
      </div>
    </Section>
  );
};

export default ContactFooter;
