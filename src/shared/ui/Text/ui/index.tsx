import type { ReactNode } from 'react';
import './text.scss';

type Style =
  | 'HeadingGrande'
  | 'Heading'
  | 'MicroHeading'
  | 'UnderHeadingGrande'
  | 'UnderHeading'
  | 'UnderMicroHeading'
  | 'MessageText';

interface TextProps {
  style: Style;
  children: ReactNode;
}

export const Text = ({ style, children }: TextProps) =>
  style === 'HeadingGrande' ? (
    <h1 className="big-heading">{children}</h1>
  ) : style === 'Heading' ? (
    <h3 className="heading">{children}</h3>
  ) : style === 'MicroHeading' ? (
    <h6 className="micro-heading">{children}</h6>
  ) : style === 'UnderHeadingGrande' ? (
    <p className="under-big-heading">{children}</p>
  ) : style === 'UnderHeading' ? (
    <p className="under-heading">{children}</p>
  ) : style === 'UnderMicroHeading' ? (
    <p className="under-micro-heading">{children}</p>
  ) : (
    <p className="message-text">{children}</p>
  );
