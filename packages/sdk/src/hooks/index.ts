import { useCallback, useEffect, useRef } from 'react';
import { useUpdateEffect } from '../widgets';

type AutoUpdateOptions<TReturn> = {
  interval: number;
  action: () => Promise<TReturn>;
  callback?: (next: TReturn, prev?: TReturn) => void;
};
const useAutoUpdate = <T>(
  { interval, action, callback = () => {} }: AutoUpdateOptions<T>,
  deps: any[],
) => {
  const prev = useRef<T>();
  const actionWithCallback = useCallback(action, [...deps]);
  const callbackWithCallback = useCallback(callback, [...deps]);

  const update = useCallback(async () => {
    const next = await actionWithCallback();
    callbackWithCallback(next, prev.current);
    prev.current = next;
  }, [actionWithCallback, callbackWithCallback]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const update = async () => {
      const next = await actionWithCallback();
      callbackWithCallback(next, prev.current);
      prev.current = next;
      intervalId = setTimeout(update, interval);
    };

    update();

    return () => {
      clearTimeout(intervalId);
    };
  }, [interval, actionWithCallback, callbackWithCallback]);

  useUpdateEffect(async () => {
    await update();
  }, [update]);

  return update;
};

export { useAutoUpdate };
