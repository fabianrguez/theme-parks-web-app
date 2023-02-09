import { useIntersectionObserver } from '@/hooks';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';

declare type StickyProps = {
  position: 'top' | 'left' | 'right' | 'bottom';
  stuckClassName?: string;
  unstuckClassName?: string;
  className?: string;
  children: ReactNode;
};

export default function Sticky({
  position,
  stuckClassName = '',
  unstuckClassName = '',
  className = ' ',
  children,
}: StickyProps) {
  const [isStuck, setIsStuck] = useState<boolean>(false);
  const stickyRef = useIntersectionObserver(onIntersect);

  const classNames: string = isStuck ? [className, stuckClassName].join(' ') : [className, unstuckClassName].join(' ');
  const inlineStyle: CSSProperties = {
    position: 'sticky',
    zIndex: 20,
    [position]: -1,
  };

  function onIntersect([entry]: IntersectionObserverEntry[]): void {
    setIsStuck(entry.intersectionRatio < 1);
  }

  return (
    <div ref={stickyRef} data-is-sticky={isStuck} style={inlineStyle} className={classNames}>
      {children}
    </div>
  );
}
