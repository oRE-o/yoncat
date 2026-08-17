import { useState } from 'react';

import { getLocalizedText, type LanguageCode } from '../../data/i18n';
import type { Project } from '../../data/projectData';
import { projectShowcaseCopy } from '../../data/projectShowcaseCopy';
import type { ThemeScheme } from '../../design/themeSchemes';
import { bodyFontFor, fonts, localizedWrap } from '../../design/typography';

const categoryColor = (scheme: ThemeScheme, category: Project['category']) => {
  if (category === 'Game') return scheme.game;
  if (category === 'Services') return scheme.services;
  return scheme.engineering;
};

type ProjectCardProps = {
  project: Project;
  scheme: ThemeScheme;
  language: LanguageCode;
};

const ProjectCard = ({ project, scheme, language }: ProjectCardProps) => {
  const [hovered, setHovered] = useState(false);
  const catColor = categoryColor(scheme, project.category);
  const bodyFont = bodyFontFor(language);
  const wrap = localizedWrap(language);

  return (
    <div
      style={{
        borderRadius: '18px',
        overflow: 'hidden',
        background: scheme.bgPanel,
        border: `1.5px solid ${hovered ? scheme.primary1 : scheme.border}`,
        boxShadow: hovered ? scheme.shadowStrong : scheme.shadow,
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        cursor: 'default',
        minWidth: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover */}
      <div
        style={{
          height: '150px',
          background: `linear-gradient(135deg, ${catColor}18, ${catColor}08)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {project.images[0] && (
          <img
            src={project.images[0]}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        <span
          style={{
            position: 'absolute',
            top: '0.7rem',
            left: '0.7rem',
            padding: '0.22rem 0.6rem',
            fontSize: '0.58rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontFamily: fonts.display,
            color: catColor,
            background: `${catColor}12`,
            border: `1px solid ${catColor}28`,
            borderRadius: '100px',
            backdropFilter: 'blur(8px)',
          }}
        >
          {projectShowcaseCopy.filters[project.category]}
        </span>
        <span
          style={{
            position: 'absolute',
            top: '0.7rem',
            right: '0.7rem',
            fontSize: '0.58rem',
            fontWeight: 700,
            color: scheme.textDim,
            letterSpacing: '0.08em',
            fontFamily: fonts.display,
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '1.1rem', minWidth: 0 }}>
        <h3
          style={{
            fontFamily: fonts.display,
            fontSize: '1.05rem',
            fontWeight: 700,
            color: scheme.text,
            marginBottom: '0.15rem',
            ...wrap,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: scheme.textMuted,
            marginBottom: '0.5rem',
            fontFamily: bodyFont,
            ...wrap,
          }}
        >
          {project.role}
        </p>

        <p
          style={{
            fontSize: '0.7rem',
            fontWeight: 500,
            lineHeight: 1.7,
            color: scheme.textMuted,
            marginBottom: '0.5rem',
            fontFamily: bodyFont,
            textWrap: 'pretty',
            ...wrap,
          }}
        >
          {getLocalizedText(project.description, language).split('\n')[0]}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.3rem' }}>
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                padding: '0.18rem 0.5rem',
                fontSize: '0.58rem',
                fontWeight: 700,
                color: scheme.textMuted,
                background: scheme.surface,
                borderRadius: '8px',
                fontFamily: fonts.display,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              marginTop: '0.6rem',
              paddingTop: '0.6rem',
              borderTop: `1px solid ${scheme.border}`,
            }}
          >
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: scheme.primary1,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'opacity 0.2s',
                  fontFamily: fonts.display,
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.opacity = '0.7';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.opacity = '1';
                }}
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

export default ProjectCard;
