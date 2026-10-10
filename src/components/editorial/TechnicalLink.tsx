import { useEffect, useRef, useState, type ComponentProps } from 'react';
import Icon from './Icon';

const GLYPHS = '01_<>/{}[]+#';

type TechnicalLinkProps = {
  className: string;
  href: string;
  label: string;
  icon: ComponentProps<typeof Icon>['name'];
  lang?: string;
  ariaLabel?: string;
};

export default function TechnicalLink({ className, href, label, icon, lang, ariaLabel }: TechnicalLinkProps) {
  const [display, setDisplay] = useState(label);
  const frame = useRef(0);
  const hovered = useRef(false);
  const focused = useRef(false);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const scramble = () => {
    cancelAnimationFrame(frame.current);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(label);
      return;
    }
    const letters = Array.from(label);
    const start = performance.now();
    let lastStep = -1;
    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed >= 560) {
        setDisplay(label);
        frame.current = 0;
        return;
      }
      const step = Math.floor(elapsed / 45);
      if (step !== lastStep) {
        const resolved = Math.floor(Math.max(0, (elapsed - 100) / 460) * letters.length);
        setDisplay(letters.map((letter, index) => index < resolved ? letter : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join(''));
        lastStep = step;
      }
      frame.current = requestAnimationFrame(tick);
    };
    tick(start);
  };

  const reset = () => {
    if (hovered.current || focused.current) return;
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    setDisplay(label);
  };

  return (
    <a
      className={`cover-chip technical-link ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      lang={lang}
      aria-label={ariaLabel ?? label}
      onPointerEnter={event => {
        if (event.pointerType === 'touch') return;
        hovered.current = true;
        if (!focused.current) scramble();
      }}
      onPointerLeave={() => { hovered.current = false; reset(); }}
      onFocus={event => {
        focused.current = event.currentTarget.matches(':focus-visible');
        if (focused.current && !hovered.current) scramble();
      }}
      onBlur={() => { focused.current = false; reset(); }}
    >
      <span className="technical-link-label" aria-hidden="true">
        {Array.from(label).map((letter, index) => (
          <span className="technical-link-letter" key={index}>
            <span className="technical-link-measure">{letter}</span>
            <span className="technical-link-glyph" data-scrambled={display[index] !== letter}>{display[index]}</span>
          </span>
        ))}
      </span>
      <Icon name={icon} />
      <span className="technical-link-scan" aria-hidden="true" />
    </a>
  );
}
