import { useEffect, useState } from 'react';

interface SizeState {
  width: number;
  height: number;
}

export default function useWindowSize(): SizeState {
  const [size, setSize] = useState<SizeState>({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
