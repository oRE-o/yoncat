import { Link } from 'react-router-dom';
import { getLocalizedText, type LanguageCode } from '../../data/i18n';
import type { Project } from '../../data/projectData';

const covers = import.meta.glob('/public/images/**/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

export default function ArchiveCard({ project, language }: { project: Project; language: LanguageCode }) {
  const paragraphs = getLocalizedText(project.description, language).split('\n').filter(Boolean);
  const image = covers[`/public${project.images[0]}`];
  const languageTag = { kr: 'ko', en: 'en', jp: 'ja' }[language];
  return (
    <article className="archive-card">
      <div className={`archive-card-cover cover-${project.category.toLowerCase()}`} aria-hidden="true">
        {image ? <img src={image} alt="" loading="lazy" /> : <span className="project-cover-title">{project.title}</span>}
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
    </article>
  );
}
