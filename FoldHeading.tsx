import { lazy, Suspense, useEffect, useState } from 'react';

const FoldText = lazy(() => import('./FoldText'));

export function FoldHeading({ text }: { text: string }) {
  const [staticText, setStaticText] = useState(true);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setStaticText(query.matches || document.querySelector('[data-reduced-motion="true"]') !== null);
    update(); query.addEventListener('change', update);
    const observer = new MutationObserver(update);
    observer.observe(document.getElementById('root')!, { subtree: true, attributes: true, attributeFilter: ['data-reduced-motion'] });
    return () => { query.removeEventListener('change', update); observer.disconnect(); };
  }, []);
  return <h2>{staticText ? text : <Suspense fallback={text}><FoldText text={text} foldStyle="paper" splitBy="char" hinge="top" trigger="scroll" foldAngle={92} duration={.65} stagger={.045} staggerFrom="start" ease="power3.out" hoverRefold refoldRadius={140} refoldAngle={30} perspective={700} creaseShading={.55} fontSize="inherit" fontWeight="inherit"/></Suspense>}</h2>;
}
