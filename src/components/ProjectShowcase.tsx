// src/components/ProjectShowcase.tsx
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colorScheme } from '../design/colorScheme';
import { projects } from '../data/projectData';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_COLORS: Record<string, string> = {
  Game: colorScheme.game,
  Services: colorScheme.services,
  Engineering: colorScheme.engineering,
};

const ProjectShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const filters = ['All', 'Game', 'Services', 'Engineering'];

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { y: 40, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (gridRef.current && gridRef.current.children.length > 0) {
      const cards = Array.from(gridRef.current.children);
      gsap.fromTo(cards,
        { y: 30, autoAlpha: 0, scale: 0.96 },
        {
          y: 0, autoAlpha: 1, scale: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power3.out',
        }
      );
    }
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      id="project-showcase"
      style={{
        padding: 'clamp(4rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4rem)',
        background: colorScheme.bg,
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          Projects
        </h2>
        <p style={{
          fontSize: '0.75rem', fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase' as const,
          color: colorScheme.textDim, marginBottom: '1.8rem',
          fontFamily: "'Quicksand', sans-serif",
        }}>
          Selected works
        </p>

        {/* Filter pills */}
        <div style={{
          display: 'flex', gap: '0.45rem',
          flexWrap: 'wrap', marginBottom: '1.5rem',
        }}>
          {filters.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '0.4rem 1rem',
                  fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  fontFamily: "'Quicksand', sans-serif",
                  color: isActive ? '#fff' : colorScheme.textMuted,
                  background: isActive ? colorScheme.primary1 : colorScheme.bgPanel,
                  border: `1.5px solid ${isActive ? colorScheme.primary1 : colorScheme.border}`,
                  borderRadius: '100px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? colorScheme.shadow : 'none',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Grid */}
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
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: (typeof projects)[number] }) => {
  const [hovered, setHovered] = useState(false);
  const catColor = CATEGORY_COLORS[project.category] || colorScheme.primary1;

  return (
    <div
      style={{
        borderRadius: '18px',
        overflow: 'hidden',
        background: colorScheme.bgPanel,
        border: `1.5px solid ${hovered ? colorScheme.primary1 : colorScheme.border}`,
        boxShadow: hovered ? colorScheme.shadowStrong : colorScheme.shadow,
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        height: '150px',
        background: `linear-gradient(135deg, ${catColor}18, ${catColor}08)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {project.images[0] && (
          <img
            src={project.images[0]}
            alt={project.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
        <span style={{
          position: 'absolute', top: '0.7rem', left: '0.7rem',
          padding: '0.22rem 0.6rem',
          fontSize: '0.58rem', fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase' as const,
          fontFamily: "'Quicksand', sans-serif",
          color: catColor,
          background: `${catColor}12`,
          border: `1px solid ${catColor}28`,
          borderRadius: '100px',
          backdropFilter: 'blur(8px)',
        }}>
          {project.category}
        </span>
        <span style={{
          position: 'absolute', top: '0.7rem', right: '0.7rem',
          fontSize: '0.58rem', fontWeight: 700,
          color: colorScheme.textDim, letterSpacing: '0.08em',
          fontFamily: "'Quicksand', sans-serif",
        }}>
          {project.year}
        </span>
      </div>

      <div style={{ padding: '1.1rem' }}>
        <h3 style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: '1.05rem', fontWeight: 700,
          color: colorScheme.text, marginBottom: '0.15rem',
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: '0.72rem', fontWeight: 600,
          color: colorScheme.textMuted, marginBottom: '0.5rem',
          fontFamily: "'Nunito', sans-serif",
        }}>
          {project.role}
        </p>

        {/* Description — always visible, no hover animation */}
        <p style={{
          fontSize: '0.7rem', fontWeight: 500,
          lineHeight: 1.7, color: colorScheme.textMuted,
          marginBottom: '0.5rem', fontFamily: "'Nunito', sans-serif",
        }}>
          {project.description.split('\n')[0]}
        </p>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.3rem',
        }}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              padding: '0.18rem 0.5rem',
              fontSize: '0.58rem', fontWeight: 700,
              color: colorScheme.textMuted,
              background: colorScheme.surface,
              borderRadius: '8px',
              fontFamily: "'Quicksand', sans-serif",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div style={{
            display: 'flex', gap: '0.6rem', marginTop: '0.6rem',
            paddingTop: '0.6rem',
            borderTop: `1px solid ${colorScheme.border}`,
          }}>
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.68rem', fontWeight: 700,
                  color: colorScheme.primary1, textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  transition: 'opacity 0.2s',
                  fontFamily: "'Quicksand', sans-serif",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.7'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
              >
                {link.name} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectShowcase;
