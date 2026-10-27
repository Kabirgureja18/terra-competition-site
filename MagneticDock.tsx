import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import './magnetic-dock.css';

const links = [
  { path: '/', label: 'Home', icon: 'M3 10 12 3 21 10M5 9v12h5v-7h4v7h5V9' },
  { path: '/technology', label: 'Technology', icon: 'M8 8h8v8H8zM9 3v5m6-5v5M9 16v5m6-5v5M3 9h5m-5 6h5m8-6h5m-5 6h5' },
  { path: '/science', label: 'Science', icon: 'M9 3h6M10 3v7L4 20q0 1 2 1h12q2 0 2-1l-6-10V3M7 16h10' },
  { path: '/feasibility', label: 'Feasibility', icon: 'M4 20h16M7 16v-4m5 4V8m5 8V4' },
  { path: '/roadmap', label: 'Roadmap', icon: 'M5 5h10a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h10M5 3v4m14 12v4' },
  { path: '/team', label: 'Team', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M17 4a4 4 0 0 1 0 7m5 10v-2a4 4 0 0 0-3-3.9' },
  { path: '/sources', label: 'Sources', icon: 'M12 6v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2z' },
];

function DockLink({ item, path, pointer, reduced }: { item: typeof links[number]; path: string; pointer: MotionValue<number>; reduced: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const distance = useTransform(pointer, value => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? value - bounds.left - bounds.width / 2 : 1000;
  });
  const targetScale = useTransform(distance, [-130, 0, 130], [1, 1.35, 1]);
  const scale = useSpring(targetScale, { damping: 20, stiffness: 300, mass: .5 });
  const y = useTransform(scale, value => (value - 1) * -16);
  return <a ref={ref} className="dock-link" href={`#${item.path}`} aria-label={item.label} aria-current={path === item.path ? 'page' : undefined}
    onClick={() => { if (path !== item.path) window.scrollTo({ top: 0, behavior: 'instant' }); }}>
    <motion.span className="dock-tile" style={{ scale: reduced ? 1 : scale, y: reduced ? 0 : y }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon}/></svg>
    </motion.span><span className="dock-label" aria-hidden="true">{item.label}</span><span className="dock-dot" aria-hidden="true"/>
  </a>;
}

export function MagneticDock({ path }: { path: string }) {
  const pointer = useMotionValue(10000);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)');
    const update = () => setReduced(query.matches || document.querySelector('[data-reduced-motion="true"]') !== null);
    update();
    query.addEventListener('change', update);
    const observer = new MutationObserver(update);
    observer.observe(document.getElementById('root')!, { subtree: true, attributes: true, attributeFilter: ['data-reduced-motion'] });
    return () => { query.removeEventListener('change', update); observer.disconnect(); };
  }, []);
  return <div className="magnetic-dock" role="navigation" aria-label="Quick page navigation" onPointerMove={event => { if (!reduced && event.pointerType === 'mouse') pointer.set(event.clientX); }} onPointerLeave={() => pointer.set(10000)}>
    {links.map(item => <DockLink key={item.path} item={item} path={path} pointer={pointer} reduced={reduced}/>)}
  </div>;
}
