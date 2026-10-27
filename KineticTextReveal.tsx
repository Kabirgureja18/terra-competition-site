import { motion, useReducedMotion } from 'framer-motion';

export function KineticTextReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduced = useReducedMotion();
  let wordIndex = 0;
  return <span className="kinetic-text" aria-label={text}>{text.split(/(\s+)/).map((part, i) => {
    if (/^\s+$/.test(part)) return <span key={i} aria-hidden="true">{part}</span>;
    const index = wordIndex++;
    return <span className="kinetic-mask" key={i} aria-hidden="true"><motion.span className="kinetic-segment" initial={reduced ? false : { opacity: 0, y: 24, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : .72, delay: reduced ? 0 : delay + index * .075, ease: [.22, 1, .36, 1] }}>{part}</motion.span></span>;
  })}</span>;
}
