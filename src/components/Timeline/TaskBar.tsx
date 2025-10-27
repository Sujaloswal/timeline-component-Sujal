import React, { useState, useRef } from "react";
import { TimelineTask } from "../../types/timeline.types";
import { truncate } from "../../utils/formatting.utils";

interface TaskBarProps {
  task: TimelineTask;
  position: { left: number; width: number; top?: number };
  onDragStart?: (taskId: string) => void;
  onDragEnd?: () => void;
  onClick?: (task: TimelineTask) => void;
}

export const TaskBar: React.FC<TaskBarProps> = React.memo(({
  task,
  position,
  onDragStart,
  onDragEnd,
  onClick
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

  const handlePointerDown = () => {
    onDragStart?.(task.id);
  };

  const handleResizeStart = (_e: React.MouseEvent, type: "start" | "end") => {
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
      onClick={() => {
        if (!isResizing) {
          onClick?.(task);
        }
      }}
      onPointerDown={handlePointerDown}
      className="absolute rounded-lg shadow-card cursor-move hover:shadow-card-hover hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 group"
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
        className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-white opacity-0 group-hover:opacity-60 transition-opacity rounded-l-lg"
        onMouseDown={(e) => handleResizeStart(e, "start")}
        aria-label="Resize start date"
      />

      {/* Task content */}
      <div className="flex items-center justify-between h-full px-3">
        <span className="text-xs font-semibold text-white truncate drop-shadow-sm">
          {truncate(task.title, 25)}
        </span>
        {!task.isMilestone && (
          <span className="text-xs text-white font-medium opacity-90 ml-2 bg-black bg-opacity-20 px-1.5 py-0.5 rounded">
            {task.progress}%
          </span>
        )}
      </div>

      {/* Progress bar overlay */}
      {!task.isMilestone && task.progress > 0 && (
        <div
          className="absolute bottom-0 left-0 h-1.5 bg-white opacity-50 rounded-b-lg transition-all"
          style={{ width: `${task.progress}%` }}
        />
      )}

      {/* Right resize handle */}
      <div
        className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-white opacity-0 group-hover:opacity-60 transition-opacity rounded-r-lg"
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
