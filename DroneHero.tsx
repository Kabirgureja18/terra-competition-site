import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import './drone-hero.css';

function Drone() {
  return <svg viewBox="0 0 500 330" role="img" aria-label="Conceptual quadcopter drone illustration">
    <defs><linearGradient id="drone-shell" x2=".7" y2="1"><stop stopColor="#e6ebe0"/><stop offset=".45" stopColor="#8a9b87"/><stop offset="1" stopColor="#34493c"/></linearGradient><linearGradient id="drone-arm"><stop stopColor="#26392e"/><stop offset=".5" stopColor="#a6b6a0"/><stop offset="1" stopColor="#3b5040"/></linearGradient></defs>
    <g stroke="url(#drone-arm)" strokeWidth="22" strokeLinecap="round"><path d="M230 176 132 121M272 176 369 121M232 193 116 244M269 193 385 244"/></g>
    <g fill="#1d3025" stroke="#809978" strokeWidth="3">{[[132,121],[369,121],[116,244],[385,244]].map(([x,y])=><ellipse key={x} cx={x} cy={y+9} rx="24" ry="13"/>)}</g>
    <g fill="none" stroke="#b9cba8" strokeWidth="1" opacity=".4">{[[132,114],[369,114],[116,237],[385,237]].map(([x,y])=><ellipse key={x} cx={x} cy={y} rx="75" ry="26"/>)}</g>
    {[[132,114],[369,114],[116,237],[385,237]].map(([x,y],i)=><g key={x} transform={`translate(${x} ${y}) scale(1 .36)`}><g className={`drone-rotor rotor-${i}`}><path d="M-68-7Q-35-23 0-3Q35-23 68-7L68 7Q35 23 0 3Q-35 23-68 7Z" fill="#b7c6aa"/><circle r="12" fill="#d8e4cd"/></g></g>)}
    <path d="M205 178 199 237 220 244M293 178 302 237 280 244" fill="none" stroke="#a8b79f" strokeWidth="6" strokeLinecap="round"/>
    <path d="M207 158Q250 133 293 158L305 190Q250 222 195 190Z" fill="url(#drone-shell)" stroke="#b6c5ac" strokeWidth="1.5"/>
    <path d="M217 158 250 147 282 158 276 180 225 180Z" fill="#253c2d"/><path d="M231 154 233 178M242 151 243 180M254 151 254 180M266 153 265 179" stroke="#64865c" strokeWidth="2"/>
    <path d="M228 195 272 195 268 218 232 218Z" fill="#24362c"/><ellipse cx="250" cy="216" rx="11" ry="8" fill="#0c1811" stroke="#8ea580" strokeWidth="3"/><circle cx="253" cy="213" r="2" fill="#cce5b2"/>
    <path d="M204 182 216 186M285 186 297 182" stroke="#d3edb5" strokeWidth="4" strokeLinecap="round"/>
  </svg>;
}

export function DroneHero() {
  const arena = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [airborne, setAirborne] = useState(false);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 65, damping: 19 });
  const smoothY = useSpring(y, { stiffness: 65, damping: 19 });
  const bank = useTransform(smoothX, [-220, 220], [-9, 9]);
  useEffect(() => { setAirborne(false); const timer = window.setTimeout(() => setAirborne(true), reduced ? 0 : 2300); return () => clearTimeout(timer); }, [reduced]);
  function follow(event: React.PointerEvent<HTMLDivElement>) {
    if (!airborne || reduced || event.pointerType === 'touch' || !arena.current) return;
    const bounds = arena.current.getBoundingClientRect();
    x.set(Math.max(-bounds.width*.25, Math.min(bounds.width*.25, event.clientX-bounds.left-bounds.width/2)));
    y.set(Math.max(-90, Math.min(75, (event.clientY-bounds.top-bounds.height*.43)*.65)));
  }
  return <section className="drone-hero">
    <div className="drone-copy"><p className="eyebrow">T.E.R.R.A. / Environmental robotics</p><h1>New ground.<br/><em>New perspective.</em></h1><p>Exploring how robotics and algae-based biological processes could support the restoration of degraded land.</p><div className="drone-actions"><a href="#/technology">Explore the technology <span aria-hidden="true">↗</span></a><a href="#/science">Our scientific approach</a></div><span className="drone-stage">Early-stage concept · Designed to be tested</span></div>
    <div ref={arena} className={`drone-arena${airborne ? ' airborne' : ''}`} onPointerMove={follow} onPointerLeave={() => {x.set(0); y.set(0);}}>
      <div className="flight-grid" aria-hidden="true"/><div className="flight-orbit" aria-hidden="true"/>
      <motion.div className="drone-shadow" aria-hidden="true" initial={false} animate={{scale:airborne?.65:1,opacity:airborne?.22:.6}} transition={{duration:1.8}}/>
      <motion.div className="drone-tracking" style={{x:reduced?0:smoothX,y:reduced?0:smoothY,rotate:reduced?0:bank}}>
        <motion.div className="drone-liftoff" initial={{y:reduced?0:165}} animate={{y:0}} transition={{duration:reduced?0:2,delay:reduced?0:.3,ease:[.22,1,.36,1]}}><Drone/></motion.div>
      </motion.div>
      <div className="flight-top"><span>Concept / aerial platform</span><span aria-hidden="true">TERRA—AIR</span></div>
      <div className="flight-instruction"><span className="flight-dot"/><span>{reduced?'Drone concept illustration':airborne?'Move your pointer to guide the drone':'Preparing for takeoff…'}</span></div>
      <button className="drone-reset" type="button" onClick={()=>{x.set(0);y.set(0);}}>Centre drone ↙</button>
      <p className="flight-disclaimer">Interactive concept illustration. Flight and restoration capabilities are proposed.</p>
    </div>
  </section>;
}
