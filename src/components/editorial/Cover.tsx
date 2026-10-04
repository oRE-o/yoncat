import './HeroMotion.css';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { contactData } from '../../data/contactData';

export default function Cover() {
  const coverRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    let observer: IntersectionObserver;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline.from('.cover-scene', { opacity: 0, scaleY: .94, transformOrigin: 'bottom', duration: .9 })
        .from('.cover-art', { opacity: 0, y: 45, duration: 1.1 }, .15)
        .from('.cover-chip', { opacity: 0, scale: .8, y: 18, stagger: .12, duration: .7 }, .4)
        .from('.cover-spark', { opacity: 0, scale: .4, stagger: .16, duration: .8 }, .6)
        .from('#cover-title', { opacity: 0, y: 18, duration: .9 }, .4)
        .from('.cover-next', { opacity: 0, y: -14, duration: .6 }, .9)
        .set('.cover-scene, .cover-art, .cover-chip, .cover-spark, .cover-next, #cover-title', { clearProps: 'transform,translate,rotate,scale,opacity' });
      const light = gsap.fromTo('.cover-light-travel', { left: '-20%' }, { left: '110%', duration: 3.8, ease: 'sine.inOut', repeat: -1, repeatDelay: 2.5, paused: true });
      observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) light.play(); else light.pause(); });
      if (coverRef.current) observer.observe(coverRef.current);
    }, coverRef);
    return () => { observer?.disconnect(); context.revert(); };
  }, []);
  useEffect(() => {
    const cover = coverRef.current;
    if (!cover) return;
    const art = cover.querySelector<HTMLElement>('.cover-art');
    const decorations = Array.from(cover.querySelectorAll<HTMLElement>('.cover-chip, .cover-spark')).map(element => ({ element, blur: 0, targetBlur: 0 }));
    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let focusX = 50;
    let focusY = 32;
    let targetFocusX = focusX;
    let targetFocusY = focusY;
    let blur = 0;
    let targetBlur = 0;
    const render = () => {
      x += (targetX - x) * .08;
      y += (targetY - y) * .08;
      focusX += (targetFocusX - focusX) * .08;
      focusY += (targetFocusY - focusY) * .08;
      blur += (targetBlur - blur) * .08;
      cover.style.setProperty('--cover-x', `${x}px`);
      cover.style.setProperty('--cover-y', `${y}px`);
      cover.style.setProperty('--tilt-axis-x', `${-y || .001}`);
      cover.style.setProperty('--tilt-axis-y', `${x}`);
      cover.style.setProperty('--tilt-angle', `${Math.min(24, Math.hypot(x, y) * 1.35)}deg`);
      cover.style.setProperty('--character-pitch', `${-y * .85}deg`);
      cover.style.setProperty('--character-yaw', `${x * .75}deg`);
      cover.style.setProperty('--character-roll', `${x * .14}deg`);
      cover.style.setProperty('--focus-x', `${focusX}%`);
      cover.style.setProperty('--focus-y', `${focusY}%`);
      cover.style.setProperty('--pointer-blur', `${blur}px`);
      cover.style.setProperty('--focus-color', `${Math.min(1, blur / 4.5)}`);
      let difference = Math.abs(x - targetX) + Math.abs(y - targetY) + Math.abs(focusX - targetFocusX) + Math.abs(focusY - targetFocusY) + Math.abs(blur - targetBlur);
      decorations.forEach(item => {
        item.blur += (item.targetBlur - item.blur) * .08;
        item.element.style.setProperty('--decoration-blur', `${item.blur}px`);
        difference += Math.abs(item.targetBlur - item.blur);
      });
      frame = difference > .03 ? requestAnimationFrame(render) : 0;
    };
    const start = () => { if (!frame) frame = requestAnimationFrame(render); };
    const move = (event: MouseEvent) => {
      // This hero explicitly enables pointer-driven motion, including with OS reduced motion.
      // Touch scrolling does not activate pointer tilt or focus.
      if (('pointerType' in event && event.pointerType === 'touch') || !art) return;
      const bounds = cover.getBoundingClientRect();
      const artBounds = art.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - .5) * 32;
      targetY = ((event.clientY - bounds.top) / bounds.height - .5) * 20;
      targetFocusX = Math.max(0, Math.min(100, (event.clientX - artBounds.left) / artBounds.width * 100));
      targetFocusY = Math.max(0, Math.min(100, (event.clientY - artBounds.top) / artBounds.height * 100));
      targetBlur = 4.5;
      decorations.forEach(item => {
        const rect = item.element.getBoundingClientRect();
        const distance = Math.hypot(event.clientX - rect.left - rect.width / 2, event.clientY - rect.top - rect.height / 2);
        item.targetBlur = Math.min(item.element.tagName === 'A' ? 1.8 : 5, Math.max(0, (distance - 130) / 100));
      });
      start();
    };
    const leave = () => { targetX = targetY = targetBlur = 0; targetFocusX = 50; targetFocusY = 32; decorations.forEach(item => { item.targetBlur = 0; }); start(); };
    cover.addEventListener('pointermove', move);
    cover.addEventListener('mousemove', move);
    cover.addEventListener('pointerleave', leave);
    cover.addEventListener('mouseleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      cover.removeEventListener('pointermove', move);
      cover.removeEventListener('mousemove', move);
      cover.removeEventListener('pointerleave', leave);
      cover.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <section className="cover" id="hero-poster" ref={coverRef} aria-labelledby="cover-title">
      <div className="cover-scene">
        <span className="cover-chip chip-otaku">#OTAKU</span>
        <span className="cover-chip chip-code" lang="ja">ゲーム制作</span>
        <span className="cover-spark spark-back" aria-hidden="true">✦</span>
        <div className="cover-art">
          <div className="character-layer character-blurred"><img src="/art/original-character.png" alt="Upper-body portrait of Sonagii’s original character" width="2929" height="4648" fetchPriority="high" draggable="false" /></div>
          <div className="character-layer character-focused" aria-hidden="true"><img src="/art/original-character.png" alt="" width="2929" height="4648" draggable="false" /></div>
        </div>
        <div className="cover-light-line" aria-hidden="true"><span className="cover-light-travel" /></div>
      </div>
      <a className="cover-chip chip-github" href={contactData.socials[0].url} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
      <a className="cover-chip chip-draw" lang="ja" aria-label="お絵かき — Twitter @oreodraw" href={contactData.socials[1].url} target="_blank" rel="noopener noreferrer">お絵かき <span aria-hidden="true">↗</span></a>
      <span className="cover-spark spark-front" aria-hidden="true">✦</span>
      <h1 id="cover-title">sonagii_</h1>
      <a className="cover-next" href="#project-showcase" aria-label="View selected work"><span aria-hidden="true">↓</span></a>
    </section>
  );
}
