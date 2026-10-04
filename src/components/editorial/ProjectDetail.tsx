import Icon from './Icon';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../../data/projectData';
import { getLocalizedText, type LanguageCode } from '../../data/i18n';
import { Reveal, SplitText } from './Motion';

const covers = import.meta.glob('/public/images/**/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

export default function ProjectDetail({ language }: { language: LanguageCode }) {
  const { id } = useParams();
  const project = projects.find(item => item.id === id);
  if (!project) return <section className="project-detail" id="project-detail"><h1>Project not found.</h1><Link className="archive-back" to="/projects"><Icon name="left" /> All Projects</Link></section>;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <section className="project-detail" id="project-detail">
    <Link className="archive-back" to="/projects"><Icon name="left" /> All Projects</Link>
    <div className="detail-heading"><p>{project.category === 'Services' ? 'Web' : project.category} / {project.year}</p><h1><SplitText text={project.title} /></h1><p className="detail-role">{project.role}</p></div>
    <Reveal className="detail-body"><aside><h2>Tools & skills</h2><ul className="card-tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><div className="card-links">{project.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.name} <Icon name="up-right" /></a>)}</div></aside><div className="detail-story" lang={{kr:'ko',en:'en',jp:'ja'}[language]}>{getLocalizedText(project.description, language).split('\n').filter(Boolean).map((text, i) => <p key={i}>{text}</p>)}</div></Reveal>
    {project.images.filter(src => covers['/public' + src]).map(src => <Reveal key={src}><img className="detail-image" src={covers['/public' + src]} alt={project.title} loading="lazy" /></Reveal>)}
    <Link className="detail-next" to={'/projects/' + next.id}><span>Next project</span><strong>{next.title}</strong><span aria-hidden="true"><Icon name="up-right" /></span></Link>
  </section>;
}
