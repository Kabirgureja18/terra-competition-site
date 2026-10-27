import type { CSSProperties } from 'react';
import './generate-link.css';

export function GenerateLink({ href, children, hue = 100 }: { href: string; children: string; hue?: number }) {
  return <a href={href} className="generate-link" style={{ '--highlight-hue': `${hue}deg` } as CSSProperties} aria-label={children}>
    <span className="generate-letters" aria-hidden="true">{Array.from(children).map((letter, index) => <span key={index} style={{ '--letter-delay': `${index * .045}s` } as CSSProperties}>{letter === ' ' ? '\u00a0' : letter}</span>)}</span>
    <span className="generate-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M5 5h14v14"/></svg></span>
  </a>;
}
