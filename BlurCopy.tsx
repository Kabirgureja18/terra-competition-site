import { useEffect, useState } from 'react';
import BlurText from './BlurText';

export function BlurCopy({ text, className }: { text: string; className?: string }) {
  const [staticText, setStaticText] = useState(true);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setStaticText(query.matches || document.querySelector('[data-reduced-motion="true"]') !== null);
    update(); query.addEventListener('change', update);
    const observer = new MutationObserver(update);
    observer.observe(document.getElementById('root')!, { subtree: true, attributes: true, attributeFilter: ['data-reduced-motion'] });
    return () => { query.removeEventListener('change', update); observer.disconnect(); };
  }, []);
  return staticText ? <p className={className}>{text}</p> : <BlurText text={text} className={className} effect="blur" animateBy="words" direction="top" staggerFrom="start" trigger="view" delay={65} stepDuration={.35} blur={8} distance={20}/>;
}
