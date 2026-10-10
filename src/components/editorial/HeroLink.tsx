import type { ComponentProps } from 'react';
import Icon from './Icon';

type HeroLinkProps = {
  className: string;
  href: string;
  label: string;
  icon: ComponentProps<typeof Icon>['name'];
  lang?: string;
  ariaLabel?: string;
};

export default function HeroLink({ className, href, label, icon, lang, ariaLabel }: HeroLinkProps) {
  return (
    <a
      className={`cover-chip hero-link ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      lang={lang}
      aria-label={ariaLabel ?? label}
    >
      <span className="hero-link-window" aria-hidden="true">
        <span className="hero-link-line">{label}</span>
        <span className="hero-link-line hero-link-line-next">{label}</span>
      </span>
      <span className="hero-link-icon"><Icon name={icon} /></span>
    </a>
  );
}
