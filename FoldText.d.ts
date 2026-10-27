import type { CSSProperties, ReactElement } from 'react';

export interface FoldTextProps {
  text?: string;
  foldStyle?: 'paper' | 'blinds' | 'flip';
  splitBy?: 'char' | 'word' | 'line';
  hinge?: 'top' | 'bottom' | 'left' | 'right';
  foldAngle?: number;
  duration?: number;
  stagger?: number;
  staggerFrom?: 'start' | 'center' | 'end' | 'edges' | 'random';
  ease?: string;
  perspective?: number;
  creaseShading?: number;
  trigger?: 'mount' | 'hover' | 'scroll' | 'loop';
  loopDelay?: number;
  hoverRefold?: boolean;
  refoldRadius?: number;
  refoldAngle?: number;
  fontSize?: string | number;
  fontWeight?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}
export default function FoldText(props: FoldTextProps): ReactElement;
