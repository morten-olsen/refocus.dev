import { useLayoutEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  setHeight: (height: number) => void;
};

const MasonryItem: React.FC<Props> = ({ children, setHeight }) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    const height = ref.current.getBoundingClientRect().height;
    setHeight(height);
    const observer = new ResizeObserver((entries) => {
      setHeight(entries[0].contentRect.height);
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [setHeight]);

  return <div ref={ref}>{children}</div>;
};

export { MasonryItem };
