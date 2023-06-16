import {
  Children,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { MasonryItem } from './item';
import { styled } from 'styled-components';
import { useDebounce } from 'usehooks-ts';

type Props = {
  children: React.ReactNode;
};

const maxColumnWidth = 400;
const gutter = 16;

const ItemWrapper = styled(motion.div)<{}>`
  position: absolute;
`;

const Masonry = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<number>(1);
  const [columnWidth, setColumnWidth] = useState<number>(0);
  const [heights, setHeights] = useState<number[]>([]);
  const setHeight = useCallback((index: number, height: number) => {
    setHeights((current) => {
      if (current[index] === height) {
        return current;
      }
      const next = [...current];
      next[index] = height;
      return next;
    });
  }, []);
  const elements = useMemo(() => {
    return Children.toArray(children).map((child, index) => {
      const setItemHeight = (height: number) => {
        setHeight(index, height);
      };
      return (
        <MasonryItem key={index} setHeight={setItemHeight}>
          {child}
        </MasonryItem>
      );
    });
  }, [children, setHeight]);

  const layout = useMemo(() => {
    const columnHeights = Array.from({ length: columns }).map(() => 0);
    return heights.map((height) => {
      const lowestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      const currentHeight = columnHeights[lowestColumn];
      columnHeights[lowestColumn] += height + gutter;
      const y = currentHeight;
      const margin = gutter / 2;
      const marginLeft = lowestColumn === 0 ? 0 : margin;
      const marginRight = lowestColumn === columns - 1 ? 0 : margin;
      const x = lowestColumn * columnWidth + marginLeft;
      const width = columnWidth - marginLeft - marginRight;
      return { x, y, width };
    });
  }, [heights, columns, columnWidth]);

  const updateSize = useCallback(() => {
    if (!ref.current) {
      return;
    }
    const nextWidth = ref.current.getBoundingClientRect().width;
    const nextColumns = Math.max(Math.floor(nextWidth / maxColumnWidth), 1);
    const nextColumnWidth = nextWidth / nextColumns;
    setColumns(nextColumns);
    setColumnWidth(nextColumnWidth);
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new ResizeObserver(() => {
      updateSize();
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [updateSize]);

  const debouncedLayout = useDebounce(layout, 10);

  return (
    <div ref={ref}>
      {elements.map((element, index) => (
        <ItemWrapper
          animate={{
            animationDelay: `${index * 0.05}s`,
            animationDuration: '0.1s',
            transform: `translate(${debouncedLayout[index]?.x}px, ${debouncedLayout[index]?.y}px)`,
            width: debouncedLayout[index]?.width,
            height: heights[index],
          }}
          key={index}
        >
          {element}
        </ItemWrapper>
      ))}
    </div>
  );
};

export { Masonry };
