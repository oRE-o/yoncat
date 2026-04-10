// src/components/MarqueeBand.tsx
import { colorScheme } from '../design/colorScheme';

const ITEMS = [
  'GAME DEVELOPMENT',
  'WEB SYSTEMS',
  'CREATIVE ENGINEERING',
  'NERD AESTHETICS',
  'PLAYABLE INTERACTION',
  'TASTEFUL INTERFACES',
];

const MarqueeBand = () => {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <section
      id="marquee-band"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '1rem 0',
        background: colorScheme.primary2,
        transform: 'rotate(-1.5deg) scale(1.04)',
        zIndex: 5,
        boxShadow: '0 4px 30px rgba(62, 201, 167, 0.4)',
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          gap: '2rem',
          width: 'max-content',
          animation: 'marquee-scroll 22s linear infinite',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              whiteSpace: 'nowrap',
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.92)',
            }}
          >
            {item}
            <span style={{
              display: 'inline-block',
              width: '5px', height: '5px',
              borderRadius: '50%',
              background: colorScheme.third1,
              flexShrink: 0,
            }} />
          </span>
        ))}
      </div>
    </section>
  );
};

export default MarqueeBand;
