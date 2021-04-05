import {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react';

export interface DimensionObject {
  width: number;
  height: number;
  x: number;
  y: number;
}

export type UseDimensionsHook = [
  (node: HTMLElement) => void,
  DimensionObject,
  HTMLElement,
];

export interface UseDimensionsArgs {
  liveMeasure?: boolean;
}

function getDimensionObject(node: HTMLElement): DimensionObject {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    x:
      'x' in rect
        ? rect.x
        : ((rect as unknown) as { left: number; top: number }).left,
    y:
      'y' in rect
        ? rect.y
        : ((rect as unknown) as { left: number; top: number }).top,
  };
}

function useDimensions(
  { liveMeasure = true }: UseDimensionsArgs = {},
  deps: Parameters<typeof useEffect>[1] = [],
): UseDimensionsHook {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [node, _setNode] = useState<HTMLElement>(null as any);
  const nodeRef = useRef(node);
  const setNode = (node: HTMLElement) => {
    nodeRef.current = node;
    _setNode(node);
  };

  const ref = useCallback((node) => {
    setNode(node);
  }, []);
  const measure = () => {
    window.requestAnimationFrame(() => {
      const dimensions = nodeRef.current
        ? getDimensionObject(nodeRef.current)
        : {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
          };
      setDimensions(dimensions);
    });
  };

  useLayoutEffect(() => {
    if (node) {
      measure();
    }
  }, [node, ...deps]);

  useEffect(() => {
    if (liveMeasure) {
      window.addEventListener('resize', measure);
      window.addEventListener('scroll', measure, true);

      return () => {
        window.removeEventListener('resize', measure);
        window.removeEventListener('scroll', measure, true);
      };
    }
  }, [liveMeasure]);

  return [ref, dimensions, node];
}

export default useDimensions;
