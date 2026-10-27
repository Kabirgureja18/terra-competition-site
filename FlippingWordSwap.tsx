/// <reference lib="es2022.intl" />
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;
const characters = (text: string) => segmenter ? Array.from(segmenter.segment(text), item => item.segment) : Array.from(text);

export function FlippingWordSwap({ word1, word2 }: { word1: string; word2: string }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const reduced = useReducedMotion();
  const swapped = hovered || focused || pinned;
  return <button type="button" className="flipping-word" aria-label={`${word1} / ${word2}`} aria-pressed={swapped}
    onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
    onPointerLeave={() => setHovered(false)}
    onFocus={event => setFocused(event.currentTarget.matches(':focus-visible'))}
    onBlur={() => { setFocused(false); setPinned(false); }}
    onClick={event => { if (event.detail === 0) setFocused(false); setPinned(value => !value); }}>
    {([word1, word2] as const).map((word, layer) => <span key={layer} className="flipping-layer" aria-hidden="true">
      {characters(word).map((character, index) => <motion.span key={index} className="flipping-character" style={{ transformOrigin: layer ? 'center bottom' : 'center top' }}
        initial={false} animate={{ rotateX: layer ? (swapped ? 0 : -82) : (swapped ? 82 : 0), opacity: layer ? Number(swapped) : Number(!swapped) }}
        transition={{ duration: reduced ? 0 : .4, delay: reduced ? 0 : index * .044 + (layer && swapped ? .248 : 0), ease: [.22, 1, .36, 1] }}>
        {character === ' ' ? '\u00a0' : character}
      </motion.span>)}
    </span>)}
  </button>;
}
