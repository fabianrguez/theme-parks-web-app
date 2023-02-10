import type { RefObject } from 'react';
import { useState } from 'react';
import useIntersectionObserver from './use-intersection-observer';

interface UseIsInViewportProps<TElement> {
  initialValue?: boolean;
  once?: boolean;
  offset?: string;
  elementRef?: RefObject<TElement>;
  threshold?: number;
}

export default function useIsInViewport<TElement extends HTMLElement = HTMLElement>({
  initialValue = false,
  once = true,
  offset = '0px',
  elementRef,
  threshold,
}: UseIsInViewportProps<TElement> = {}): [boolean, RefObject<TElement>] {
  const [isInViewport, setIsInViewport] = useState<boolean>(initialValue);
  const ref = useIntersectionObserver<TElement>(onIntersect, {
    rootMargin: offset,
    threshold,
  });

  function onIntersect([entry]: IntersectionObserverEntry[], observer: IntersectionObserver): void {
    setIsInViewport(entry.isIntersecting);

    if (entry.isIntersecting) {
      const reference = elementRef ?? ref;
      const { current: currentElement } = reference ?? {};

      once && observer && observer.unobserve(currentElement as TElement);
    }
  }

  return [isInViewport, ref];
}
