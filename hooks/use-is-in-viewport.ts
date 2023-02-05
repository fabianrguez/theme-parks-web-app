import type { MutableRefObject, RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

interface UseIsInViewportProps<TElement> {
  initialValue?: boolean;
  once?: boolean;
  offset?: string;
  elementRef?: RefObject<TElement>;
  threshold?: number;
}

type UseIsInViewportResult<TElement> = [boolean, RefObject<TElement>];

export default function useIsInViewport<TElement extends HTMLElement = HTMLElement>({
  initialValue = false,
  once = true,
  offset = '0px',
  elementRef,
  threshold,
}: UseIsInViewportProps<TElement> = {}): UseIsInViewportResult<TElement> {
  const [isInViewport, setIsInViewport] = useState<boolean>(initialValue);
  const ref = useRef<TElement>(null);

  useEffect(() => {
    const reference = elementRef ?? ref;
    const { current: currentElement } = reference ?? {};
    let observer: IntersectionObserver;

    observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);

        if (entry.isIntersecting) {
          once && observer && observer.unobserve(currentElement as TElement);
        }
      },
      {
        rootMargin: offset,
        threshold,
      }
    );

    observer.observe(currentElement as TElement);

    return () => observer.unobserve(currentElement as TElement);
  }, [elementRef, once, offset, threshold]);

  return [isInViewport, ref];
}
