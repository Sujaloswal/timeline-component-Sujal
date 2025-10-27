// Skeleton for drag-and-drop hook. Implementation of custom drag logic is TODO.
import { useCallback } from "react";

export const useDragAndDrop = () => {
  const onDragStart = useCallback((taskId: string) => {
    /* TODO: implement */
  }, []);

  const onDrag = useCallback((event: PointerEvent) => {
    /* TODO: implement */
  }, []);

  const onDragEnd = useCallback(() => {
    /* TODO: implement */
  }, []);

  return { onDragStart, onDrag, onDragEnd };
};

