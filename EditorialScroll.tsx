import { useEffect, useRef, useState, type CSSProperties } from 'react';
import './editorial-scroll.css';

const cards = [
  { kicker: '01 — The Belief', title: 'Create Without Fear', description: 'A bold space for ideas to rise, move, and become visible without waiting for permission.', background: '#000000', color: '#ffffff' },
  { kicker: '02 — The Mission', title: 'Art First Always', description: 'Every card arrives like a statement, cutting through the page with strong motion and clean contrast.', background: '#1117ff', color: '#ffffff' },
  { kicker: '03 — The Method', title: 'Build Loud Ideas', description: 'Smooth scroll movement, cinematic angles, and bold typography make each section feel alive.', background: '#f2f0e8', color: '#050505' },
  { kicker: '04 — The Future', title: 'No More Limits', description: 'A premium scroll experience designed for portfolios, agencies, artists, and experimental landing pages.', background: '#ff3f00', color: '#ffffff' },
];
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;
const easeOut = (value: number) => 1 - (1 - value) ** 3;
const easeInOut = (value: number) => value < .5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;

export function EditorialScroll() {
  const sceneRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const currentProgress = useRef(0);
  const targetProgress = useRef(0);
  const frameRef = useRef<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    let reduce = false;
    let lastTime = 0;
    let disposed = false;
    const paint = (progress: number) => {
      if (titleRef.current) {
        const lift = clamp(progress / .24);
        titleRef.current.style.transform = `translate3d(0,${-110 * lift}px,0)`;
        titleRef.current.style.opacity = String(1 - .42 * lift);
      }
      if (subtitleRef.current) {
        const fade = clamp(progress / .16);
        subtitleRef.current.style.transform = `translate3d(0,${-45 * fade}px,0)`;
        subtitleRef.current.style.opacity = String(1 - fade);
      }
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const raw = clamp((progress - (.08 + index * .215)) / .22);
        const eased = easeOut(raw);
        card.style.transform = `translate3d(${10 * (1 - eased)}vw,${112 * (1 - eased)}vh,0) rotate(${-7.5 * (1 - easeInOut(raw))}deg) scale(${1.05 - .05 * eased})`;
        card.style.opacity = raw === 0 ? '0' : String(.4 + .6 * eased);
        card.style.filter = `blur(${3 * (1 - eased)}px)`;
      });
    };
    const render = (time: number) => {
      frameRef.current = null;
      if (disposed || reduce) return;
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16.67;
      lastTime = time;
      const alpha = 1 - (1 - .085) ** (elapsed / 16.67);
      currentProgress.current = lerp(currentProgress.current, targetProgress.current, alpha);
      if (Math.abs(currentProgress.current - targetProgress.current) < .00001) currentProgress.current = targetProgress.current;
      paint(currentProgress.current);
      if (currentProgress.current !== targetProgress.current) frameRef.current = requestAnimationFrame(render);
      else lastTime = 0;
    };
    const update = () => {
      if (reduce) return;
      const rect = scene.getBoundingClientRect();
      targetProgress.current = clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(render);
    };
    const updatePreference = () => {
      reduce = query.matches || document.querySelector('[data-reduced-motion="true"]') !== null;
      setReduced(reduce);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTime = 0;
      if (!reduce) update();
    };
    const observer = new MutationObserver(updatePreference);
    observer.observe(document.getElementById('root')!, { subtree: true, attributes: true, attributeFilter: ['data-reduced-motion'] });
    query.addEventListener('change', updatePreference);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(scene);
    updatePreference();
    return () => {
      disposed = true;
      observer.disconnect(); resizeObserver.disconnect();
      query.removeEventListener('change', updatePreference);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, []);

  return <main className={`editorial-scroll${reduced ? ' editorial-reduced' : ''}`}>
    <section ref={sceneRef} className="editorial-scene" aria-label="Creative manifesto">
      <div className="editorial-stage">
        <div className="editorial-hero"><h1 ref={titleRef}>CREATE<br/>WITHOUT<br/>LIMITS</h1><p ref={subtitleRef}>We believe every artist deserves a platform that puts creativity, courage, and expression first.</p></div>
        <div className="editorial-layers">{cards.map((card, index) => <article key={card.kicker} ref={element => { cardRefs.current[index] = element; }} className="editorial-card" style={{ '--editorial-bg': card.background, '--editorial-ink': card.color, zIndex: 20 + index } as CSSProperties}>
          <span className="editorial-number" aria-hidden="true">0{index + 1}</span><p className="editorial-kicker">{card.kicker}</p><h2>{card.title}</h2><p className="editorial-description">{card.description}</p>
        </article>)}</div>
      </div>
    </section>
    <div className="editorial-after" aria-hidden="true"/>
  </main>;
}
