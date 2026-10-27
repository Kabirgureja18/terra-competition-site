import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';

const cards = [
  { title: 'Understand the ground.', label: 'Environmental science', description: 'Site conditions come first. Investigate soil, climate and biological compatibility before proposing a treatment.', href: '#/science', color: '#d8decb', ink: '#18241b' },
  { title: 'Make every input deliberate.', label: 'Environmental robotics', description: 'Explore a compact, serviceable system for environmental observation and carefully controlled delivery.', href: '#/technology', color: '#718363', ink: '#f6f6ec' },
  { title: 'Let the evidence lead.', label: 'Scientific validation', description: 'Compare treated areas with controls. Measure, question and refine before considering deployment.', href: '#/roadmap', color: '#25372e', ink: '#f6f6ec' },
];
const image = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=85&w=2400&auto=format&fit=crop';

export function ScrollSplitCard() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [pointerInside, setPointerInside] = useState(false);
  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 1 });
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 1 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const left = useTransform(scrollYProgress, [0, .35, .75], [0, -38, -18]);
  const right = useTransform(scrollYProgress, [0, .35, .75], [0, 38, 18]);
  const scale = useTransform(scrollYProgress, [0, .35], [1, .88]);
  const cardsY = useTransform(scrollYProgress, [0, .2, .8], [0, 0, -150]);
  const rotateY = useTransform(scrollYProgress, [.32, .75], [0, 180]);
  const rotateL = useTransform(scrollYProgress, [.32, .75], [0, 5]);
  const rotateR = useTransform(scrollYProgress, [.32, .75], [0, -5]);
  const titleOpacity = useTransform(scrollYProgress, [0, .2], [1, 0]);
  const radius = useTransform(scrollYProgress, [0, .25], [0, 14]);
  const captionOpacity = useTransform(scrollYProgress, [.72, .88], [0, 1]);

  return <section ref={ref} className={`scroll-hero${reduced ? ' motion-off' : ''}`} aria-labelledby="terra-hero-title">
    <div className="split-sticky" onPointerEnter={event => {
      if (event.pointerType !== 'mouse' || reduced) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      x.jump(event.clientX - bounds.left);
      y.jump(event.clientY - bounds.top);
      setPointerInside(true);
    }} onPointerMove={event => {
      if (event.pointerType !== 'mouse' || reduced) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      x.set(event.clientX - bounds.left);
      y.set(event.clientY - bounds.top);
    }} onPointerLeave={() => setPointerInside(false)}>
      {!reduced && <motion.div className="hero-pointer" aria-hidden="true" style={{ x, y, opacity: pointerInside ? 1 : 0 }}><span/></motion.div>}
      <div className="hero-topline"><span>Environmental robotics</span><span>Early-stage research concept</span></div>
      <motion.div className="hero-intro" style={{ opacity: reduced ? 1 : titleOpacity }}>
        <p className="hero-kicker">A new approach to degraded land</p>
        <h1 id="terra-hero-title">Regenerating land.<br/><em>Intelligently.</em></h1>
        <p>Exploring the meeting point of environmental science,<br className="desktop-break"/> robotics and algae-based biological processes.</p>
        <a href="#/technology" className="hero-explore">Explore the technology <span aria-hidden="true">↗</span></a>
      </motion.div>
      <motion.div className="split-panels" style={{ scale: reduced ? 1 : scale, y: reduced ? 0 : cardsY }}>
        {cards.map((card, i) => <motion.article className="split-panel" key={card.label} style={{ x: reduced ? 0 : i === 0 ? left : i === 2 ? right : 0, rotateY: reduced ? 0 : rotateY, rotateZ: reduced ? 0 : i === 0 ? rotateL : i === 2 ? rotateR : 0 }}>
          <motion.div className="panel-front" aria-hidden="true" style={{ borderRadius: radius }}><div className="panel-image" style={{ left: `${-100*i}%`, backgroundImage: `linear-gradient(180deg,rgba(7,19,13,.04),rgba(7,19,13,.2)),url(${image})` }}/><span className="panel-coordinate">{['OBSERVE','INVESTIGATE','REGENERATE'][i]}</span></motion.div>
          <motion.div className="panel-back" style={{ backgroundColor: card.color, color: card.ink, borderRadius: radius }}><p>{card.label}</p><div><h2>{card.title}</h2><p>{card.description}</p></div><a href={card.href}>Explore our approach <span aria-hidden="true">↗</span></a></motion.div>
        </motion.article>)}
      </motion.div>
      <div className="hero-bottomline"><span>Terrain-enhancing regeneration via robotic algae</span><motion.span style={{ opacity: reduced ? 1 : captionOpacity }}>An idea is only the beginning. Evidence comes next.</motion.span><span className="scroll-cue">Scroll to explore ↓</span></div>
    </div>
  </section>;
}
