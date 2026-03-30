import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import './button.scss';

type ButtonStyle = 'primary' | 'secondary' | 'link';
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  style?: ButtonStyle;
  type?: ButtonType;
  children: ReactNode;
}
export const Button = ({ style = 'primary', type = 'button', children }: ButtonProps) => (
  <button className={clsx(style, 'button')} type={type}>
    {children}
  </button>
);
