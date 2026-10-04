import { useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

// Short, one-time reveals inspired by React Bits Split Text and Animated Content.
// Motion was explicitly requested; OS reduced motion uses smaller, quicker reveals.
export function SplitText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const letters = element.querySelectorAll('.split-letter');
    const gentle = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let observer: IntersectionObserver;
    const context = gsap.context(() => {
      gsap.set(letters, { opacity: 0, y: gentle ? 7 : 18 });
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        gsap.to(letters, { opacity: 1, y: 0, duration: gentle ? .5 : .9, stagger: .025, ease: 'power3.out', clearProps: 'transform,opacity' });
        observer.disconnect();
      }, { threshold: .15 });
      observer.observe(element);
    }, element);
    return () => { observer?.disconnect(); gsap.killTweensOf(letters); context.revert(); };
  }, [text]);
  return <span className="split-text" ref={ref}><span className="sr-only">{text}</span><span aria-hidden="true">{text.split(' ').map((word, wordIndex) => <span className="split-word" key={wordIndex} style={wordIndex > 0 ? { marginLeft: '.22em' } : undefined}>{Array.from(word).map((letter, index) => <span className="split-letter" key={index}>{letter}</span>)}</span>)}</span></span>;
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const gentle = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let observer: IntersectionObserver;
    const context = gsap.context(() => {
      gsap.set(element, { opacity: 0, y: gentle ? 8 : 20 });
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        gsap.to(element, { opacity: 1, y: 0, duration: gentle ? .55 : 1, ease: 'power3.out', clearProps: 'transform,opacity' });
        observer.disconnect();
      }, { threshold: .01 });
      observer.observe(element);
    }, element);
    return () => { observer?.disconnect(); gsap.killTweensOf(element); context.revert(); };
  }, []);
  return <div className={className} ref={ref}>{children}</div>;
}
