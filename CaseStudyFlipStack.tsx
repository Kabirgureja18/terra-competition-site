import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from 'framer-motion';
import './flip-stack.css';

const TextType = lazy(() => import('./TextType'));

const stages = [
  { status: 'Completed · concept framing', title: 'Start with a question.', description: 'Problem definition, project identity and an initial system narrative. This establishes the concept, not its effectiveness.', color: '#dce3cf', ink: '#203b2b', label: 'CONCEPT / FRAMED', detail: 'What would restoration need here?' },
  { status: 'Ongoing · design development', title: 'Make the idea testable.', description: 'Refining architecture, research questions, safeguards and measurement choices. Cultivation and delivery remain proposed designs.', color: '#344d3c', ink: '#edf0df', label: 'DESIGN / IN DEVELOPMENT', detail: 'Inputs → process → observations' },
  { status: 'Future · controlled testing', title: 'Let the controls speak.', description: 'Design laboratory or supervised trials with untreated controls, matched conditions and documented methods. No completed trials are claimed.', color: '#c6a878', ink: '#302e24', label: 'TRIALS / NOT YET CONDUCTED', detail: 'Treated and untreated. Measured over time.' },
  { status: 'Future · independent review', title: 'Invite the hard questions.', description: 'Seek scientific, ecological, engineering and user feedback. Review uncertainty and unintended effects before considering advancement.', color: '#273c42', ink: '#e4eadf', label: 'REVIEW / FUTURE PLAN', detail: 'Safety. Evidence. Practicality.' },
  { status: 'Future · pilot decisions', title: 'Earn the next step.', description: 'Assess a limited pilot only if safety, evidence, cost and demand justify it. Advancement may mean revising the system—or deciding not to proceed.', color: '#e4e3d5', ink: '#293e31', label: 'PILOT / CONDITIONAL', detail: 'Proceed only when the evidence supports it.' },
];

function StageCard({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const stage = stages[index];
  const start = index / stages.length;
  const end = (index + 1) / stages.length;
  const exit = useTransform(progress, [start, end], [0, -118]);
  const offset = useTransform(progress, [start, end], [0, index * 18]);
  const y = useMotionTemplate`calc(${exit}% + ${offset}px)`;
  const rotateX = useTransform(progress, [start, end], [0, 22]);
  const scale = useTransform(progress, [Math.max(0, start - .2), Math.max(.0001, start)], [index ? .97 : 1, 1]);
  return <motion.article className="flip-stage" style={{ y, rotateX, zIndex: stages.length - index }}>
    <motion.div className="flip-surface" style={{ scale, background: stage.color, color: stage.ink }}>
      <div className="flip-copy"><span className="flip-number">0{index + 1}</span><div><p className="flip-status">{stage.status}</p><h2>{stage.title}</h2><p>{stage.description}</p></div></div>
      <div className="flip-art" aria-hidden="true"><span>{stage.label}</span><svg viewBox="0 0 360 360" fill="none" stroke="currentColor"><circle cx="180" cy="180" r="130" opacity=".2"/><circle cx="180" cy="180" r={42 + index * 16} strokeWidth="2"/><path d="M180 20V340M20 180H340" opacity=".25"/>{Array.from({ length: index + 2 }, (_, n) => <circle key={n} cx={100 + n * 35} cy={180 + Math.sin(n * 2) * 60} r="5" fill="currentColor"/>)}</svg><small>{stage.detail}</small></div>
    </motion.div>
  </motion.article>;
}

export function CaseStudyFlipStack() {
  const ref = useRef<HTMLDivElement>(null);
  const [staticLayout, setStaticLayout] = useState(true);
  useEffect(() => {
    const query = matchMedia('(max-width: 760px), (max-height: 600px), (prefers-reduced-motion: reduce)');
    const update = () => setStaticLayout(query.matches || document.querySelector('[data-reduced-motion="true"]') !== null);
    update();
    query.addEventListener('change', update);
    const observer = new MutationObserver(update);
    observer.observe(document.getElementById('root')!, { subtree: true, attributes: true, attributeFilter: ['data-reduced-motion'] });
    return () => { query.removeEventListener('change', update); observer.disconnect(); };
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return <section className={`roadmap-flip${staticLayout ? ' is-static' : ''}`} aria-label="Project development stages">
    <div className="flip-intro"><p className="eyebrow">Five stages · evidence at every gate</p>{staticLayout ? <p>Explore the development stages below.</p> : <Suspense fallback={<p>Scroll to explore the development stages ↓</p>}><TextType as="p" className="flip-typing" text="Scroll to explore the development stages ↓" typingSpeed={35} typeEffect="fade" mistakes={0} loop={false} cursorStyle="bar" cursorGlide showCursor startOnVisible/></Suspense>}</div>
    <div ref={ref} className="flip-track"><div className="flip-sticky"><div className="flip-deck">{stages.map((stage, index) => <StageCard key={stage.title} index={index} progress={scrollYProgress}/>)}</div><p className="flip-end">No fixed launch date. The evidence sets the pace.</p></div></div>
  </section>;
}
