import { useEffect, useState } from 'react';
import TechText from './TechText';
import './tech-wordmark.css';

export function TechWordmark() {
  const [staticText, setStaticText] = useState(true);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)');
    const update = () => setStaticText(query.matches || document.querySelector('[data-reduced-motion="true"]') !== null);
    update();
    query.addEventListener('change', update);
    const observer = new MutationObserver(update);
    observer.observe(document.getElementById('root')!, { subtree: true, attributes: true, attributeFilter: ['data-reduced-motion'] });
    return () => { query.removeEventListener('change', update); observer.disconnect(); };
  }, []);
  return <section className="tech-wordmark-section" aria-label="Interactive project wordmark">
    <p className="eyebrow">Explore the letterforms</p>
    <div className="tech-wordmark-stage">{staticText ? <p className="tech-wordmark-static">T.E.R.R.A.</p> : <TechText text="T.E.R.R.A." fontFamily="Manrope, sans-serif" fontWeight={700} fontSize={170} reveal="letter" dashLength={4} dashGap={2} specks={15} intro="none" clickKick guides={false} sweep={false} accentColor="#a7c58e"/>}</div>
    <p className="tech-wordmark-hint">{staticText ? 'Terrain-enhancing regeneration via robotic algae.' : 'Move over a letter to inspect its outline. Drag or click to explore its spring response.'}</p>
  </section>;
}
