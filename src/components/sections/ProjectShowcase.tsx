import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { type LanguageCode } from '../../data/i18n';
import { projects } from '../../data/projectData';
import { projectShowcaseCopy, type ProjectFilterKey } from '../../data/projectShowcaseCopy';
import { getThemeScheme, type AppTheme } from '../../design/themeSchemes';
import { fonts } from '../../design/typography';
import Section from '../layout/Section';
import SectionHeading from '../layout/SectionHeading';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const FILTERS: ProjectFilterKey[] = ['All', 'Game', 'Services', 'Engineering'];

type ProjectShowcaseProps = {
  theme: AppTheme;
  language: LanguageCode;
};

const ProjectShowcase = ({ theme, language }: ProjectShowcaseProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectFilterKey>('All');
  const scheme = getThemeScheme(theme);

  const filtered =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-run the card entrance whenever the filter swaps the grid contents.
  useEffect(() => {
    if (gridRef.current && gridRef.current.children.length > 0) {
      const cards = Array.from(gridRef.current.children);
      gsap.fromTo(
        cards,
        { y: 30, autoAlpha: 0, scale: 0.96 },
        { y: 0, autoAlpha: 1, scale: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out' },
      );
    }
  }, [activeFilter]);

  return (
    <Section id="project-showcase" background={scheme.bg} sectionRef={sectionRef}>
      <SectionHeading
        index="03"
        title={projectShowcaseCopy.title}
        subtitle={projectShowcaseCopy.subtitle}
        scheme={scheme}
        titleRef={headingRef}
      />

      {/* Category filters */}
      <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '0.4rem 1rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: fonts.display,
                color: isActive ? '#fff' : scheme.textMuted,
                background: isActive ? scheme.primary1 : scheme.bgPanel,
                border: `1.5px solid ${isActive ? scheme.primary1 : scheme.border}`,
                borderRadius: '100px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? scheme.shadow : 'none',
              }}
            >
              {projectShowcaseCopy.filters[filter]}
            </button>
          );
        })}
      </div>

      <div
        ref={gridRef}
        className="project-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.1rem',
        }}
      >
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} scheme={scheme} language={language} />
        ))}
      </div>
    </Section>
  );
};

export default ProjectShowcase;
