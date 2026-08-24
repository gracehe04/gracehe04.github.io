import { useRef, useState } from "react";

/**
 * Drag-and-drop reordering for a list identified by arbitrary keys.
 *
 * onReorder receives the source and target keys and returns nothing; the
 * caller owns the list state.
 */
export function useDragReorder(onReorder) {
  const dragKey = useRef(null);
  const [dragOverKey, setDragOverKey] = useState(null);

  const onDragStart = (key) => { dragKey.current = key; };
  const onDragOver = (e, key) => { e.preventDefault(); setDragOverKey(key); };
  const onDragEnd = () => { dragKey.current = null; setDragOverKey(null); };
  const onDrop = (targetKey) => {
    const sourceKey = dragKey.current;
    dragKey.current = null;
    setDragOverKey(null);
    if (sourceKey == null || sourceKey === targetKey) return;
    onReorder(sourceKey, targetKey);
  };

  const getDropProps = (key) => ({
    onDragOver: (e) => onDragOver(e, key),
    onDrop: () => onDrop(key),
  });

  const getDragProps = (key) => ({
    draggable: true,
    onDragStart: () => onDragStart(key),
    onDragEnd,
    ...getDropProps(key),
  });

  return { dragOverKey, getDragProps, getDropProps };
}

export const reorder = (list, fromIdx, toIdx) => {
  const next = [...list];
  const [moved] = next.splice(fromIdx, 1);
  next.splice(toIdx, 0, moved);
  return next;
};
