import type { ElementType, HTMLAttributes, ReactElement, ReactNode } from 'react';

export interface TextTypeProps extends HTMLAttributes<HTMLElement> {
  text: string | string[];
  as?: ElementType;
  prefix?: string;
  prefixColor?: string;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  deleteMode?: 'backspace' | 'select';
  typeEffect?: 'none' | 'fade' | 'blur' | 'rise';
  mistakes?: number;
  variableSpeed?: { min: number; max: number };
  loop?: boolean;
  showCursor?: boolean;
  cursorStyle?: 'character' | 'bar' | 'block' | 'underscore';
  cursorCharacter?: ReactNode;
  cursorColor?: string;
  cursorBlinkDuration?: number;
  cursorGlide?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorClassName?: string;
  textColors?: string[];
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}
export default function TextType(props: TextTypeProps): ReactElement;
