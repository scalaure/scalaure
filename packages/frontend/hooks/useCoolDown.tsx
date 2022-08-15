import { useEffect, useRef, useState } from 'react';

export const useCoolDown = (ms = 1000) => {
  const [isCoolDown, setIsCoolDown] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const setCoolDown = () => {
    setIsCoolDown(true);
    timeoutRef.current = setTimeout(() => setIsCoolDown(false), ms);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return [isCoolDown, setCoolDown] as const;
};
