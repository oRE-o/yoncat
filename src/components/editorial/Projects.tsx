import Icon from './Icon';
import './SelectedWork.css';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { projects, type Project } from '../../data/projectData';
import { getLocalizedText, type LanguageCode } from '../../data/i18n';
import { Reveal, SplitText } from './Motion';

const categories = [
  { value: 'Game', label: 'Game' },
  { value: 'Services', label: 'Services' },
  { value: 'Engineering', label: 'Engineering' },
];
const titleOf = (project: Project) => project.id === 'shift-up-nikke' ? 'SHIFT UP / NIKKE' : project.title;
const summaryOf = (project: Project, language: LanguageCode) => getLocalizedText(project.description, language).split('\n')[0];

function RollingTitle({ text }: { text: string }) {
  return <span aria-label={text}><span aria-hidden="true">{text.split(' ').map((word, wi) => <span className="board-word" key={wi} style={{ marginLeft: wi ? '.25em' : 0 }}>{Array.from(word).map((letter, i) => <span className="board-letter-mask" key={i}><motion.span variants={{ hidden: { y: '110%', opacity: 0 }, shown: { y: 0, opacity: 1 }, out: { y: '-110%', opacity: 0 } }} transition={{ duration: .48, delay: Math.min(wi * .07 + i * .018, .3), ease: [.22, 1, .36, 1] }}>{letter}</motion.span></span>)}</span>)}</span></span>;
}

function BoardRow({ category, language, paused }: { category: typeof categories[number]; language: LanguageCode; paused: boolean }) {
  const items = projects.filter(project => project.category === category.value);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef(0);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { threshold: .4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (paused || hovered || focused || !visible || items.length < 2) return;
    let frame = 0;
    let previous = 0;
    const tick = (time: number) => {
      const delta = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      if (!document.hidden) {
        elapsedRef.current += delta;
        if (elapsedRef.current >= 5000) {
          elapsedRef.current %= 5000;
          setIndex(current => (current + 1) % items.length);
        }
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${elapsedRef.current / 5000})`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, hovered, focused, visible, items.length]);
  const project = items[index];
  return <Reveal className="work-board-row">
    <div className="board-category"><h3><Link to={'/projects?category=' + category.value}>{category.label}</Link></h3><span className="board-countdown" aria-hidden="true"><span ref={progressRef} /></span></div>
    <div className="work-board-slot" ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      {items.map(item => <div className="board-size-guide" key={item.id} aria-hidden="true"><div className="board-title">{titleOf(item)}</div><p className="board-role">{item.role}</p><p className="board-description" lang={{kr:'ko',en:'en',jp:'ja'}[language]}>{summaryOf(item, language)}</p></div>)}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div className="board-current" key={project.id} initial="hidden" animate="shown" exit="out" variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 }, out: { opacity: 0 } }} transition={{ duration: .35 }}>
          <Link className="board-detail-link" to={'/projects/' + project.id}>
            <h4 className="board-title"><RollingTitle text={titleOf(project)} /><span className="work-board-arrow" aria-hidden="true"><Icon name="up-right" /></span></h4>
            <motion.p className="board-role" variants={{ hidden:{y:10,opacity:0},shown:{y:0,opacity:1},out:{y:-10,opacity:0} }} transition={{duration:.45}}>{project.role}</motion.p>
            <motion.p className="board-description" lang={{kr:'ko',en:'en',jp:'ja'}[language]} variants={{ hidden:{y:12,opacity:0},shown:{y:0,opacity:1},out:{y:-12,opacity:0} }} transition={{duration:.5,delay:.08}}>{summaryOf(project, language)}</motion.p>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  </Reveal>;
}

export default function Projects({ language }: { language: LanguageCode }) {
  const [paused, setPaused] = useState(false);
  return <section className="works-section" id="project-showcase" aria-labelledby="works-title">
    <div className="section-heading"><h2 id="works-title"><SplitText text="Selected work" /></h2><Link className="all-projects-button" to="/projects">All Projects <span aria-hidden="true"><Icon name="up-right" /></span></Link></div>
    <div className="work-board">{categories.map(category => <BoardRow key={category.value} category={category} language={language} paused={paused} />)}</div>
    <button className="board-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume work rotation' : 'Pause work rotation'}>{paused ? 'Play' : 'Pause'} <Icon name={paused ? 'play' : 'pause'} /></button>
  </section>;
}
