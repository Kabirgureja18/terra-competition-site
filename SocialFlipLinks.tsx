import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './social-flip-links.css';

const items = [
  { letter: 'T', label: 'Home', href: '#/', icon: 'M3 10 12 3 21 10M5 9v12h5v-7h4v7h5V9' },
  { letter: 'E', label: 'Science', href: '#/science', icon: 'M9 3h6M10 3v7L4 20q0 1 2 1h12q2 0 2-1l-6-10V3M7 16h10' },
  { letter: 'R', label: 'Roadmap', href: '#/roadmap', icon: 'M5 5h10a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h10M5 3v4m14 12v4' },
  { letter: 'R', label: 'Sources', href: '#/sources', icon: 'M12 6v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2z' },
  { letter: 'A', label: 'GitHub repository', href: 'https://github.com/Kabirgureja18/terra-competition-site', icon: 'M9 19c-4 1-4-2-6-2m12 5v-4a3 3 0 0 0-1-2c3-.3 6-1.5 6-6a5 5 0 0 0-1.4-3.5A5 5 0 0 0 18.5 3S17 2.7 15 4a12 12 0 0 0-6 0C7 2.7 5.5 3 5.5 3a5 5 0 0 0-.1 3.5A5 5 0 0 0 4 10c0 4.5 3 5.7 6 6a3 3 0 0 0-1 2v4' },
];

export function SocialFlipLinks() {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const revealed = hovered || focused;
  return <div className="social-flip-links" role="navigation" aria-label="Footer project links" onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <span className="social-flip-border" aria-hidden="true"/>
    {items.map((item, index) => <a key={item.label} className="social-flip-link" href={item.href} aria-label={item.label} {...(item.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <span className="social-flip-tooltip" aria-hidden="true">{item.label}</span>
      <motion.span className="social-flip-rotor" initial={false} animate={{ rotateY: revealed ? 180 : 0 }} transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 15, delay: index * .08 }} aria-hidden="true">
        <span className="social-flip-front">{item.letter}</span><span className="social-flip-back"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon}/></svg></span>
      </motion.span>
    </a>)}
  </div>;
}
