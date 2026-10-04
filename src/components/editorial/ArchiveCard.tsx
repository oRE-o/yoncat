import './ArchiveMotion.css';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import type { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { getLocalizedText, type LanguageCode } from '../../data/i18n';
import type { Project } from '../../data/projectData';

const covers = import.meta.glob('/public/images/**/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

export default function ArchiveCard({ project, language }: { project: Project; language: LanguageCode }) {
  const pitch = useMotionValue(0);
  const yaw = useMotionValue(0);
  const lift = useMotionValue(0);
  const spring = { stiffness: 140, damping: 20, mass: .8 };
  const rotateX = useSpring(pitch, spring);
  const rotateY = useSpring(yaw, spring);
  const rise = useSpring(lift, spring);
  const transform = useMotionTemplate`perspective(1000px) translateY(${rise}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const reset = () => { pitch.set(0); yaw.set(0); lift.set(0); };
  const wiggle = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    const strength = matchMedia('(prefers-reduced-motion: reduce)').matches ? .35 : 1;
    const bounds = event.currentTarget.parentElement!.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    pitch.set(-y * 6 * strength); yaw.set(x * 7 * strength); lift.set(-5 * strength);
  };
  const paragraphs = getLocalizedText(project.description, language).split('\n').filter(Boolean);
  const image = covers[`/public${project.images[0]}`];
  const languageTag = { kr: 'ko', en: 'en', jp: 'ja' }[language];
  return (
    <motion.article className="archive-card" style={{ transform }} onPointerMove={wiggle} onPointerLeave={reset} onPointerCancel={reset}>
      <div className={`archive-card-cover cover-${project.category.toLowerCase()}`} aria-hidden="true">
        {image ? <img src={image} alt="" loading="lazy" /> : <span className="project-cover-title">{project.title}</span>}
        <span className="archive-card-star" aria-hidden="true">✦</span>
        <span className="card-category">{project.category}</span>
      </div>
      <div className="archive-card-body">
        <p className="card-year">{project.year}</p>
        <h2>{project.title}</h2>
        <p className="card-role">{project.role}</p>
        <p className="card-description" lang={languageTag}>{paragraphs[0]}</p>
        <Link className="card-read-more" to={`/projects/${project.id}`}>Read more <span aria-hidden="true">↗</span></Link>
        <ul className="card-tags" aria-label="Tools and skills">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        {project.links.length > 0 && <div className="card-links">{project.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.name} <span aria-hidden="true">↗</span></a>)}</div>}
      </div>
    </motion.article>
  );
}
