import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import './scroll-reveal-cards.css';

const safeguards = [
  { kicker: 'Organism selection', title: 'Local fit comes first.', risk: 'Unsuitable organisms or ecological mismatch', description: 'Evaluate organism identity, local ecology and site compatibility with qualified specialists before designing an application.', bg: '#172c21', ink: '#eef1e4' },
  { kicker: 'Water & nutrients', title: 'Follow every input.', risk: 'Nutrient runoff and downstream effects', description: 'Account for formulation, nutrient loading, runoff pathways and containment. Any proposed trial needs a site-specific assessment.', bg: '#526a42', ink: '#f4f5e9' },
  { kicker: 'Ecological effects', title: 'Protect what is there.', risk: 'Unintended impacts on native communities', description: 'Investigate potential effects on existing soil communities and surrounding habitats. Define safeguards and stopping criteria before proceeding.', bg: '#e7e6d9', ink: '#263e2e' },
  { kicker: 'Evidence & uncertainty', title: 'Let time test the idea.', risk: 'Over-interpreting short-term measurements', description: 'Use controls, repeat observations and independent review. A short-term change does not establish lasting restoration or ecological safety.', bg: '#9c6f48', ink: '#fff4e5' },
];

function RevealPanel({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const card = safeguards[index];
  const start = .08 + index * .215;
  const raw = useTransform(progress, [start, start + .16], [0, 1]);
  const eased = useTransform(raw, value => 1 - (1 - value) ** 3);
  const y = useTransform(eased, value => `${112 * (1 - value)}vh`);
  const x = useTransform(eased, value => `${10 * (1 - value)}vw`);
  const rotate = useTransform(raw, value => -7.5 * (1 - (value < .5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2)));
  const scale = useTransform(eased, [0, 1], [1.05, 1]);
  const opacity = useTransform(eased, [0, .001, 1], [0, .4, 1]);
  return <motion.article className="safeguard-panel" style={{ x, y, rotate, scale, opacity, zIndex: 20 + index, background: card.bg, color: card.ink }}>
    <span className="safeguard-number" aria-hidden="true">0{index + 1}</span><p className="safeguard-kicker">0{index + 1} / {card.kicker}</p>
    <h3>{card.title}</h3><div className="safeguard-description"><p className="safeguard-risk">Risk / {card.risk}</p><p>{card.description}</p><small>Proposed safeguard · requires expert review</small></div>
  </motion.article>;
}

export function ScrollRevealCards() {
  const ref = useRef<HTMLElement>(null);
  const [staticLayout, setStaticLayout] = useState(true);
  useEffect(() => {
    const query = matchMedia('(max-width: 800px), (max-height: 650px), (prefers-reduced-motion: reduce)');
    const update = () => setStaticLayout(query.matches || document.querySelector('[data-reduced-motion="true"]') !== null);
    update(); query.addEventListener('change', update);
    const observer = new MutationObserver(update);
    observer.observe(document.getElementById('root')!, { subtree: true, attributes: true, attributeFilter: ['data-reduced-motion'] });
    return () => { query.removeEventListener('change', update); observer.disconnect(); };
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return <section ref={ref} className={`safeguard-scene${staticLayout ? ' safeguard-static' : ''}`} aria-label="Ecological safeguards">
    <div className="safeguard-sticky"><div className="safeguard-opening"><p className="eyebrow">Ecological guardrails</p><h2>Advance<br/>with care.</h2><p>Four risks to understand before advancing.<br/>{staticLayout ? 'Explore the safeguards below.' : 'Scroll to explore ↓'}</p></div>
      <div className="safeguard-panels">{safeguards.map((card, index) => <RevealPanel key={card.kicker} index={index} progress={scrollYProgress}/>)}</div>
    </div>
  </section>;
}
