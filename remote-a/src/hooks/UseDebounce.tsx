import { useEffect, useCallback, EffectCallback } from 'react';
import { TodoType } from '../types';

export default function useDebounce(effect: EffectCallback, dependencies: [TodoType[], string], delay: number) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}