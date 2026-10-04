import { Link, useSearchParams } from 'react-router-dom';
import { projects } from '../../data/projectData';
import type { LanguageCode } from '../../data/i18n';
import ArchiveCard from './ArchiveCard';
import { Reveal, SplitText } from './Motion';

const categories = ['All', 'Game', 'Services', 'Engineering'] as const;

export default function AllProjects({ language }: { language: LanguageCode }) {
  const [params, setParams] = useSearchParams();
  const category = categories.find(item => item === params.get('category')) ?? 'All';
  const visible = projects.filter(project => category === 'All' || project.category === category);
  return (
    <section className="project-archive" id="all-projects" aria-labelledby="archive-title">
      <Link className="archive-back" to="/#project-showcase">← Back to selected work</Link>
      <div className="archive-heading"><h1 id="archive-title"><SplitText text="All Projects" /><span className="archive-period">.</span></h1><span>{projects.length} projects</span></div>
      <div className="archive-filters" role="group" aria-label="Project category">
        {categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setParams(item === 'All' ? {} : { category: item })}>{item}<span>{item === 'All' ? projects.length : projects.filter(project => project.category === item).length}</span></button>)}
      </div>
      <div className="archive-grid">{visible.map(project => <Reveal key={project.id}><ArchiveCard project={project} language={language} /></Reveal>)}</div>
      <p className="sr-only" role="status">{visible.length} projects shown</p>
    </section>
  );
}
