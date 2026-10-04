import './AboutStatus.css';
import { experiences } from '../../data/experienceData';
import { getLocalizedText, type LanguageCode } from '../../data/i18n';
import { posterCopy } from '../../data/posterCopy';
import { contactData } from '../../data/contactData';
import { Reveal, SplitText } from './Motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About({ language }: { language: LanguageCode }) {
  const currentWork = { kr: 'Peptide 개발 · 기획하고, 코드 짜고, 그림 그리는 중', en: 'Building Peptide · game design, code & illustration', jp: 'Peptide制作中 · 企画も、コードも、イラストも。' }[language];
  const cooking = { kr: '완성까지… 일단 계속 만드는 중', en: 'Almost there… probably.', jp: '完成まで…とりあえず作り続ける。' }[language];
  const tag = { kr: 'ko', en: 'en', jp: 'ja' }[language];
  const section = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const sorted = [...experiences].sort((a, b) => b.id - a.id);
  const years = [...new Set([...experiences].sort((a, b) => b.id - a.id).map(item => item.period.match(/\d{4}/)?.[0] ?? ''))];
  const recentYears = ['2026', '2025', '2024'];
  const toggleLabel = { kr: expanded ? '접기' : '펼치기', en: expanded ? 'Show less' : 'Show all', jp: expanded ? '閉じる' : 'すべて見る' }[language];
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo('.experience-progress', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.experience-timeline', start: 'top 70%', end: 'bottom 70%', scrub: 1.2 } });
      gsap.fromTo('.about-art img', { y: 24 }, { y: -24, ease: 'none', scrollTrigger: { trigger: '.about-art', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.from('.about-links a', { opacity: 0, y: 15, stagger: .12, duration: .6, scrollTrigger: { trigger: '.about-links', start: 'top 92%' } });
    }, section);
    return () => context.revert();
  }, []);
  return (
    <section ref={section} className="about-section" id="intro-section" aria-labelledby="about-title">
      <Reveal className="about-spread">
        <div className="about-text"><h2 id="about-title"><SplitText text="About" /><br /><span className="about-accent"><SplitText text="me." /></span></h2><div className="about-bio" lang={tag}><p className="bio-intro">{posterCopy[language].intro}</p><div className="about-now">
          <p className="about-now-work">{currentWork}</p>
          <div className="about-now-track" aria-hidden="true"><span /></div>
          <p className="about-now-caption">{cooking}<span aria-hidden="true">…</span></p>
        </div><p>{posterCopy[language].bio}</p></div><div className="about-links" aria-label="Personal links">{contactData.socials.map(item => <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer">{item.name.split('/')[0]} ↗</a>)}<a href={`mailto:${contactData.email}`}>Email ↗</a></div></div>
        <div className="about-art"><span className="about-outline" aria-hidden="true">ソナギ</span><img src="/art/original-character.png" alt="Upper-body portrait of Sonagii’s original character making a peace sign" width="2929" height="4648" loading="lazy" /><span className="about-signature" aria-hidden="true">sonagii_</span></div>
      </Reveal>
      <div className="experience-block" aria-labelledby="experience-title">
        <div className="experience-heading"><h3 id="experience-title"><SplitText text="Experience" /><span aria-hidden="true">↘</span></h3></div>
        <div><div className="experience-timeline" id="experience-list"><span className="experience-progress" aria-hidden="true" />
          <AnimatePresence initial={false}>{years.filter(year => expanded || recentYears.includes(year)).map(year => <motion.div key={year} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .75, ease: [.22, 1, .36, 1] }} onAnimationComplete={() => ScrollTrigger.refresh()}>
          <div className="experience-year-group">
            <h4 className="experience-year">{year}</h4>
            <div className="experience-year-entries"><AnimatePresence initial={false}>{sorted.filter(item => item.period.match(/\d{4}/)?.[0] === year).filter((_, index) => expanded || index < 2).map(item => <motion.div key={item.id} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }} transition={{ duration: .75, ease: [.22, 1, .36, 1] }} onAnimationComplete={() => ScrollTrigger.refresh()}>
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .95, ease: [.22, 1, .36, 1] }}>
              <article className={'experience-entry' + (item.id === 8 ? ' experience-entry-featured' : '')}>
                <p className="experience-period">{item.period}</p>
                <h5>{item.company}</h5>
                <p className="experience-position">{item.role}</p>
                <p className="experience-summary" lang={tag}>{getLocalizedText(item.summary, language)}</p>
              </article>
              </motion.div>
            </motion.div>)}</AnimatePresence></div>
          </div></motion.div>)}</AnimatePresence>
        </div><button className="experience-toggle" type="button" aria-expanded={expanded} aria-controls="experience-list" onClick={() => setExpanded(value => !value)} lang={tag}>{toggleLabel}<motion.span aria-hidden="true" animate={{ rotate: expanded ? 180 : 0 }} transition={{duration:.5}}>↓</motion.span></button></div>
      </div>
    </section>
  );
}
