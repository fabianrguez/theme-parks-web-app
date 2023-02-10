import { useIntersectionObserver, useScroll } from '@/hooks';
import { combineClassnames } from '@/utils';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';

declare type StickyProps = {
  position: 'top' | 'left' | 'right' | 'bottom';
  className?: string;
  children: ReactNode;
};

export default function Sticky({
  position,

  className = ' ',
  children,
}: StickyProps) {
  const { direction: scrollDirection } = useScroll();

  const inlineStyle: CSSProperties = {
    position: 'sticky',
    zIndex: 20,
    [position]: 0,
  };

  const classNames = combineClassnames(className, { 'is-scrolling-down': scrollDirection === 'UP' });

  return (
    <div style={inlineStyle} className={classNames}>
      {children}
    </div>
  );
}
