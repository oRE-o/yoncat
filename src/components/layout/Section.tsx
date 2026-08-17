import type { CSSProperties, ReactNode, Ref } from 'react';

import { CONTENT_MAX_WIDTH, SECTION_PADDING } from '../../design/layout';

type SectionProps = {
  id: string;
  background: string;
  children: ReactNode;
  /** Semantic wrapper element; sections default to <section>. */
  as?: 'section' | 'footer';
  maxWidth?: string;
  sectionRef?: Ref<HTMLElement>;
  style?: CSSProperties;
};

/** Shared shell for below-the-hero sections: consistent padding, background, and content width. */
const Section = ({
  id,
  background,
  children,
  as: Tag = 'section',
  maxWidth = CONTENT_MAX_WIDTH,
  sectionRef,
  style,
}: SectionProps) => (
  <Tag
    ref={sectionRef}
    id={id}
    style={{
      padding: SECTION_PADDING,
      background,
      position: 'relative',
      ...style,
    }}
  >
    <div style={{ maxWidth, margin: '0 auto' }}>{children}</div>
  </Tag>
);

export default Section;
