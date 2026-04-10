import React from 'react';

export type FloaterVariant = 'glass' | 'filled' | 'bordered' | 'dashed' | 'sparkle' | 'symbol' | 'vertical-text' | 'circle';

export interface HeroChipProps {
  variant: FloaterVariant;
  text?: React.ReactNode;
  colorProps?: {
    color?: string;
    bg?: string;
    border?: string;
    shadow?: string;
  };
  fontSize?: string;
  opacity?: number;
  style?: React.CSSProperties;
}

const HeroChip: React.FC<HeroChipProps> = ({ variant, text, colorProps = {}, fontSize, opacity = 1, style }) => {
  const baseStyle: React.CSSProperties = {
    opacity,
    ...style,
  };

  switch (variant) {
    case 'glass':
      return (
        <div style={{
          ...baseStyle,
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.62rem 1.3rem', borderRadius: '999px',
          border: `1.5px solid ${colorProps.border || 'rgba(255,255,255,0.4)'}`,
          fontFamily: "'Quicksand', sans-serif", fontSize: fontSize || '0.66rem', fontWeight: 700, letterSpacing: '0.08em',
          color: colorProps.color || '#000', 
          background: colorProps.bg || 'rgba(255, 255, 255, 0.85)', // Slightly more opaque for glass effect
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        }}>
          {text}
        </div>
      );
    case 'filled':
      return (
        <div style={{
          ...baseStyle,
          padding: '0.78rem 1.7rem', borderRadius: '999px',
          fontFamily: "'Nunito', sans-serif", fontSize: fontSize || '0.88rem',
          fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: colorProps.color || '#fff', background: colorProps.bg || '#000',
          boxShadow: colorProps.shadow ? `0 8px 28px ${colorProps.shadow}` : undefined,
        }}>
          {text}
        </div>
      );
    case 'bordered':
      return (
        <div style={{
          ...baseStyle,
          padding: '0.64rem 1.35rem', borderRadius: '999px',
          border: `1.5px solid ${colorProps.border || '#000'}`,
          fontFamily: "'Quicksand', sans-serif", fontSize: fontSize || '0.68rem',
          fontWeight: 700, letterSpacing: '0.05em', color: colorProps.color || '#000', background: colorProps.bg || 'transparent',
          boxShadow: colorProps.shadow ? `0 4px 12px ${colorProps.shadow}` : undefined,
        }}>
          {text}
        </div>
      );
    case 'dashed':
      return (
        <div style={{
          ...baseStyle,
          padding: '0.56rem 1.1rem', borderRadius: '999px',
          border: `1.5px dashed ${colorProps.border || '#000'}`,
          fontFamily: "'Quicksand', sans-serif", fontSize: fontSize || '0.62rem',
          fontWeight: 800, letterSpacing: '0.1em', color: colorProps.color || '#000',
        }}>
          {text}
        </div>
      );
    case 'sparkle':
      return (
        <div style={{
          ...baseStyle,
          fontFamily: "'Nunito', sans-serif", fontSize: fontSize || '1rem', fontWeight: 300, color: colorProps.color || '#000',
        }}>
          {text}
        </div>
      );
    case 'symbol':
      return (
        <div style={{
          ...baseStyle,
          fontFamily: "'Nunito', sans-serif", fontSize: fontSize || '1rem', fontWeight: 300, color: colorProps.color || '#000',
        }}>
          {text}
        </div>
      );
    case 'vertical-text':
      return (
        <div style={{
          ...baseStyle,
          fontFamily: 'monospace', fontSize: fontSize || '0.48rem', color: colorProps.color || '#000',
          writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.25em',
        }}>
          {text}
        </div>
      );
    case 'circle':
      return (
        <div style={{
          ...baseStyle,
          width: '420px', height: '420px', borderRadius: '50%',
          border: `1px solid ${colorProps.border || '#000'}`, pointerEvents: 'none',
        }} />
      );
    default:
      return null;
  }
};

export default HeroChip;
