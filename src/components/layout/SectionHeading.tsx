import type { Ref } from 'react';

import type { ThemeScheme } from '../../design/themeSchemes';
import { fonts } from '../../design/typography';

type SectionHeadingProps = {
  /** Poster index label, e.g. "01". */
  index: string;
  title: string;
  subtitle: string;
  scheme: ThemeScheme;
  /** Smaller title for narrow columns (e.g. the experience rail). */
  compact?: boolean;
  titleRef?: Ref<HTMLHeadingElement>;
};

/**
 * Editorial poster heading shared by the lower sections:
 * index eyebrow + rule, big display title, uppercase subtitle.
 */
const SectionHeading = ({
  index,
  title,
  subtitle,
  scheme,
  compact = false,
  titleRef,
}: SectionHeadingProps) => (
  <div style={{ position: 'relative' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        marginBottom: '0.9rem',
      }}
    >
      <span
        style={{
          fontFamily: fonts.display,
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          color: scheme.third1,
        }}
      >
        {index}
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
        {subtitle}
      </span>
    </div>

    <h2
      ref={titleRef}
      style={{
        position: 'relative',
        fontFamily: fonts.display,
        fontSize: compact ? 'clamp(2.1rem, 3.4vw, 3rem)' : 'clamp(2.5rem, 6vw, 4rem)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: scheme.primary1,
        lineHeight: 1,
        marginBottom: '1.8rem',
      }}
    >
      {title}
      <span aria-hidden="true" style={{ color: scheme.third1 }}>
        .
      </span>
    </h2>
  </div>
);

export default SectionHeading;
