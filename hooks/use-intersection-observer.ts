import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export default function useIntersectionObserver<TElement extends HTMLElement>(
  onIntersect: IntersectionObserverCallback,
  options: IntersectionObserverInit = { threshold: [1] }
): RefObject<any> {
  const elementRef = useRef<TElement>(null);

  useEffect(() => {
    const element = elementRef.current as TElement;
    const observer = new IntersectionObserver(onIntersect, options);

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [elementRef, onIntersect, options]);

  return elementRef;
}
