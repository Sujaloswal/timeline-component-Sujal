import React, { useState, useCallback, useRef, useMemo } from "react";
import { TimelineTask } from "../../types/timeline.types";
import { truncate } from "../../utils/formatting.utils";

interface TaskBarProps {
  task: TimelineTask;
  position: { left: number; width: number; top?: number };
  onDragStart?: (taskId: string) => void;
  onDragEnd?: () => void;
  onClick?: (task: TimelineTask) => void;
  onResize?: (taskId: string, newStartDate?: Date, newEndDate?: Date) => void;
}

export const TaskBar: React.FC<TaskBarProps> = React.memo(({
  task,
  position,
  onDragStart,
  onDragEnd,
  onClick,
  onResize
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeType, setResizeType] = useState<"start" | "end" | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick?.(task);
    } else if (e.key === "Escape") {
      // Handle escape key
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    onDragStart?.(task.id);
  };

  const handleResizeStart = (e: React.MouseEvent, type: "start" | "end") => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeType(type);
  };



  React.useEffect(() => {
    if (!isResizing || !resizeType) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!barRef.current) return;

      const newX = e.clientX;
      const containerRect = barRef.current.closest(".timeline-container")?.getBoundingClientRect();
      
      if (!containerRect) return;

      const relativeX = newX - containerRect.left - 200; // 200 is LEFT_PANEL_WIDTH
      
      if (resizeType === "start") {
        // Resize logic would go here - needs pixelsPerDay from parent
        console.log("Resizing start", relativeX);
      } else {
        // Resize logic would go here - needs pixelsPerDay from parent
        console.log("Resizing end", relativeX);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeType(null);
      onDragEnd?.();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, resizeType, onDragEnd]);

  return (
    <div
      ref={barRef}
      role="button"
      tabIndex={0}
      aria-label={`${task.title}. From ${task.startDate.toDateString()} to ${task.endDate.toDateString()}. Progress: ${task.progress}%. Press Enter to edit.`}
      aria-describedby={`task-${task.id}-details`}
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        if (!isResizing) {
          onClick?.(task);
        }
      }}
      onPointerDown={handlePointerDown}
      className="absolute rounded shadow-sm cursor-move hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      style={{
        left: `${position.left}px`,
        width: `${Math.max(position.width, 24)}px`,
        top: position.top ?? 8,
        height: task.isMilestone ? 24 : 32,
        backgroundColor: task.color ?? "#0ea5e9",
      }}
    >
      {/* Left resize handle */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-white opacity-0 hover:opacity-50 transition-opacity"
        onMouseDown={(e) => handleResizeStart(e, "start")}
        aria-label="Resize start date"
      />

      {/* Task content */}
      <div className="flex items-center justify-between h-full px-2">
        <span className="text-xs font-medium text-white truncate">
          {truncate(task.title, 25)}
        </span>
        {!task.isMilestone && (
          <span className="text-xs text-white opacity-75 ml-1">
            {task.progress}%
          </span>
        )}
      </div>

      {/* Progress bar overlay */}
      {!task.isMilestone && task.progress > 0 && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-white opacity-40 rounded-b"
          style={{ width: `${task.progress}%` }}
        />
      )}

      {/* Right resize handle */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-white opacity-0 hover:opacity-50 transition-opacity"
        onMouseDown={(e) => handleResizeStart(e, "end")}
        aria-label="Resize end date"
      />
    </div>
  );
}, (prev, next) => {
  // Custom comparison for optimization
  return (
    prev.task.id === next.task.id &&
    prev.position.left === next.position.left &&
    prev.position.width === next.position.width &&
    prev.task.progress === next.task.progress
  );
});

TaskBar.displayName = "TaskBar";

export default TaskBar;
