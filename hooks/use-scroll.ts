import { useCallback, useEffect, useState } from 'react';

declare type ScrollDirection = 'DOWN' | 'UP' | 'NO_SET';

const AXIS_MAP: { [key: string]: 'top' | 'left' } = {
  Y: 'top',
  X: 'left',
};

const isClient = typeof window !== 'undefined' && window.document;

export default function useScroll({ axis = 'Y' } = {}): { position: number; direction: ScrollDirection } {
  const boundingKey = AXIS_MAP[axis];
  const [scroll, setScroll] = useState<{ position: number; scrollDirection: ScrollDirection }>({
    position: getBoundingClientRect()[boundingKey],
    scrollDirection: 'NO_SET',
  });

  function getBoundingClientRect(): DOMRect {
    return isClient ? document.body.getBoundingClientRect() : ({} as DOMRect);
  }

  const onScroll = useCallback(() => {
    const currentBounding = getBoundingClientRect();
    const currentPosition = -currentBounding[boundingKey];

    setScroll(({ position: prevPosition }) => ({
      position: currentPosition,
      scrollDirection: prevPosition > currentPosition ? 'DOWN' : 'UP',
    }));
  }, [boundingKey]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []); // eslint-disable-line

  return {
    position: Math.round(scroll.position),
    direction: scroll.scrollDirection,
  };
}
