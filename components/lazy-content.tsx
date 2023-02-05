import { useNearScreen } from '@/hooks';
import type { ReactNode } from 'react';

interface LazyContentProps {
  children: ReactNode;
  rootMargin?: string;
  placeholder: string | JSX.Element;
  height: number;
}

export default function LazyContent({ children, rootMargin = '100px 0px 0px', placeholder, height }: LazyContentProps) {
  const [isInViewport, elementRef] = useNearScreen<HTMLDivElement>({ offset: rootMargin });

  let content: any;

  if (isInViewport) {
    content = children;
  } else if (placeholder) {
    content = (
      <div ref={elementRef} className="lazy-content__placeholder">
        {placeholder}
      </div>
    );
  } else {
    content = <div ref={elementRef} style={{ height: `${height}px`, marginBottom: '1px' }}></div>;
  }

  return content;
}
