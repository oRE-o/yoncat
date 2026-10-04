import { useEffect, useRef, useState } from 'react';
import Cover from './components/editorial/Cover';
import Projects from './components/editorial/Projects';
import About from './components/editorial/About';
import { contactData } from './data/contactData';
import { posterCopy } from './data/posterCopy';
import type { LanguageCode } from './data/i18n';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import AllProjects from './components/editorial/AllProjects';
import ProjectDetail from './components/editorial/ProjectDetail';
import { projects } from './data/projectData';
import { Reveal, SplitText } from './components/editorial/Motion';
import { motion } from 'motion/react';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  const location = useLocation();
  const scrollToSection = useSmoothScroll();
  const previousPath = useRef<string | null>(null);
  const isProjects = location.pathname.startsWith('/projects');
  const detail = projects.find(project => location.pathname === `/projects/${project.id}`);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const activeNav = location.hash === '#intro-section' ? 'About' : location.hash === '#contact-footer' ? 'Contact' : isProjects || location.hash === '#project-showcase' ? 'Work' : 'Main';
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#202126' : '#eeede7');
  }, [theme]);
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try { localStorage.setItem('yoncat-theme', next); } catch { /* Keep the choice for this visit. */ }
  };
  const [language, setLanguage] = useState<LanguageCode>(() => {
    try { const saved = localStorage.getItem('yoncat-language'); return saved === 'en' || saved === 'jp' ? saved : 'kr'; }
    catch { return 'kr'; }
  });
  useEffect(() => {
    document.documentElement.lang = { kr: 'ko', en: 'en', jp: 'ja' }[language];
    try { localStorage.setItem('yoncat-language', language); } catch { /* Language remains available for this visit. */ }
  }, [language]);
  useEffect(() => {
    document.title = detail ? `${detail.title} — SONAGII_` : isProjects ? 'All Projects — SONAGII_' : 'SONAGII_ — Yonghyuk Choi';
    const immediate = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;
    const frame = requestAnimationFrame(() => {
      scrollToSection(location.hash.slice(1), immediate || !location.hash);
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, isProjects, detail, scrollToSection]);

  return (
    <div className="folio">
      <a className="skip-link" href={detail ? '#project-detail' : isProjects ? '#all-projects' : '#project-showcase'}>Skip to work</a>
      <header className="masthead">
        <Link className="masthead-logo" to="/#hero-poster" aria-label="Sonagii home">s<span aria-hidden="true">↗</span></Link>
        <nav aria-label="Main navigation" onMouseLeave={() => setHoveredNav(null)}>{[{name:'Main',to:'/#hero-poster'},{name:'About',to:'/#intro-section'},{name:'Work',to:'/#project-showcase'},{name:'Contact',to:location.pathname + '#contact-footer'}].map(item => <Link key={item.name} to={item.to} aria-current={activeNav === item.name ? 'location' : undefined} onMouseEnter={() => setHoveredNav(item.name)} onFocus={() => setHoveredNav(item.name)} onBlur={() => setHoveredNav(null)}>{(hoveredNav ?? activeNav) === item.name && <motion.span className="nav-marker" layoutId="nav-marker" transition={{ type:'spring', stiffness:380, damping:32 }} />}<span className="nav-label">{item.name}</span></Link>)}</nav>
        <div className="masthead-tools"><select className="language-select" aria-label="Language" value={language} onChange={event => setLanguage(event.target.value as LanguageCode)}><option value="kr">KR</option><option value="en">EN</option><option value="jp">JP</option></select><button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'} title={theme === 'light' ? 'Dark theme' : 'Light theme'}><motion.svg key={theme} initial={{ rotate:-60, opacity:0 }} animate={{rotate:0,opacity:1}} transition={{duration:.3}} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{theme === 'light' ? <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" /> : <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>}</motion.svg></button></div>
      </header>
      <main>
        <Routes><Route path="/projects/:id" element={<ProjectDetail key={location.pathname} language={language} />} /><Route path="/projects" element={<AllProjects language={language} />} /><Route path="*" element={<>
        <Cover />
        <Reveal className="cover-index"><a href={contactData.socials[0].url} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a><a href={contactData.socials[1].url} target="_blank" rel="noopener noreferrer">Twitter <span aria-hidden="true">↗</span></a><a href={`mailto:${contactData.email}`}>Email <span aria-hidden="true">↗</span></a><a href="#project-showcase">Explore work <span aria-hidden="true">↗</span></a></Reveal>
        <About language={language} />
        <Projects language={language} />
        </>} /></Routes>
      </main>
      <footer className="contact" id="contact-footer">
        <div className="contact-title"><h2><SplitText text="Get in touch" /><span className="contact-period">.</span></h2><a href={`mailto:${contactData.email}`} className="contact-arrow" aria-label="Email Yonghyuk Choi">↗</a></div>
        <Reveal className="contact-info"><div><p lang={{kr:'ko',en:'en',jp:'ja'}[language]}>{posterCopy[language].contact}</p><a className="contact-email" href={`mailto:${contactData.email}`}>{contactData.email}</a></div><div className="contact-socials">{contactData.socials.map(item => <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer">{item.name} ↗</a>)}</div></Reveal>
        <div className="colophon"><span>© {new Date().getFullYear()} Yonghyuk Choi</span><a href={detail ? '#project-detail' : isProjects ? '#all-projects' : '#hero-poster'}>Back to top ↑</a></div>
      </footer>
    </div>
  );
}
