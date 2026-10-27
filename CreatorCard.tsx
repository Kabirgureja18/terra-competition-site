import { useState } from 'react';
import './creator-card.css';

export function CreatorCard() {
  const [open, setOpen] = useState(false);
  return <div className="creator-profile">
    <button className="creator-transition" type="button" aria-expanded={open} aria-controls="creator-details" onClick={() => setOpen(!open)}>
      <span className="creator-default" aria-hidden="true"><span className="creator-role">Project creator</span><span className="creator-monogram">KG</span><span className="creator-identity"><strong>Kabir Gureja</strong><span>Exploring the science of land regeneration.</span></span><span className="creator-hint">Explore the person behind the project <span>↗</span></span></span>
      <span className="creator-reveal" aria-hidden="true"><span className="creator-thesis">Bringing environmental questions, robotics and measurable action into one idea worth testing.</span><span className="creator-signature"><strong>Kabir Gureja</strong><span>Creator / T.E.R.R.A.</span></span><span className="creator-hint">Early-stage concept. Evidence comes next. <span>↙</span></span></span>
      <span className="sr-only">About Kabir Gureja. Activate to {open ? 'hide' : 'show'} project details.</span>
    </button>
    <p id="creator-details" className={open ? 'creator-details visible' : 'creator-details'}>Kabir Gureja is the creator of T.E.R.R.A., an early-stage project exploring environmental robotics and algae-based approaches to land regeneration.</p>
  </div>;
}
