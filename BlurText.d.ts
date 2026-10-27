import type { ReactElement } from 'react';
import type { Easing, TargetAndTransition } from 'framer-motion';

export interface BlurTextProps {
  text?: string;
  effect?: 'blur' | 'zoom' | 'tilt' | 'focus' | 'drift';
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  staggerFrom?: 'start' | 'center' | 'end' | 'random';
  trigger?: 'view' | 'load' | 'hover' | 'click';
  delay?: number;
  stepDuration?: number;
  loop?: boolean;
  loopDelay?: number;
  blur?: number;
  distance?: number;
  color?: string;
  fromColor?: string;
  focusOnHover?: boolean;
  threshold?: number;
  rootMargin?: string;
  animationFrom?: TargetAndTransition;
  animationTo?: TargetAndTransition[];
  easing?: Easing | Easing[];
  className?: string;
  onAnimationComplete?: () => void;
}
export default function BlurText(props: BlurTextProps): ReactElement;
