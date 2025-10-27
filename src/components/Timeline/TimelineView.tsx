import React, { useState, useCallback, useMemo, useRef } from "react";
import { TimelineViewProps, TimelineTask } from "../../types/timeline.types";
import TimelineRow from "./TimelineRow";
import TaskBar from "./TaskBar";
import { calculatePosition, calculateDuration, calculateDateFromPosition } from "../../utils/position.utils";
import { generateTimeScale, getCurrentDatePosition } from "../../utils/date.utils";
import { calculateDependencyLine } from "../../utils/dependency.utils";
import { LEFT_PANEL_WIDTH, ROW_HEIGHT, PIXELS_PER_DAY_BY_VIEW_MODE } from "../../constants/timeline.constants";
import TaskDetailSidebar from "./TaskDetailSidebar";

export const TimelineView: React.FC<TimelineViewProps> = ({
  rows,
  tasks,
  startDate,
  endDate,
  viewMode,
  onTaskUpdate,
  onTaskMove
}) => {
  const [selectedTask, setSelectedTask] = useState<TimelineTask | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Calculate pixels per day based on view mode
  const pixelsPerDay = PIXELS_PER_DAY_BY_VIEW_MODE[viewMode];

  // Generate time scale labels
  const timeScale = useMemo(
    () => generateTimeScale(startDate, endDate, viewMode),
    [startDate, endDate, viewMode]
  );

  // Calculate timeline dimensions
  const timelineWidth = useMemo(() => {
    return timeScale.reduce((width, label) => width + label.columnWidth, 0);
  }, [timeScale]);

  // Current date position
  const currentDatePosition = getCurrentDatePosition(startDate, pixelsPerDay);

  // Handle task click
  const handleTaskClick = useCallback((task: TimelineTask) => {
    setSelectedTask(task);
    setIsSidebarOpen(true);
  }, []);

  // Handle task updates
  const handleTaskUpdate = useCallback(
    (updates: Partial<TimelineTask>) => {
      if (selectedTask) {
        onTaskUpdate?.(selectedTask.id, updates);
        setSelectedTask({ ...selectedTask, ...updates });
      }
    },
    [selectedTask, onTaskUpdate]
  );

  // Handle task drag start
  const handleDragStart = useCallback((taskId: string) => {
    setDraggedTaskId(taskId);
  }, []);



  // Add mouse move listener for dragging
  React.useEffect(() => {
    if (!draggedTaskId) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = timelineRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Find which row we're over
      const rowIndex = Math.floor((y - 40) / ROW_HEIGHT);
      if (rowIndex >= 0 && rowIndex < rows.length) {
        const targetRow = rows[rowIndex];
        const task = tasks[draggedTaskId];
        if (task && targetRow.id !== task.rowId) {
          // Calculate new date based on X position
          const newDate = calculateDateFromPosition(x - LEFT_PANEL_WIDTH, startDate, pixelsPerDay);
          onTaskMove?.(draggedTaskId, targetRow.id, newDate);
        }
      }
    };

    const handleMouseUp = () => {
      setDraggedTaskId(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggedTaskId, rows, tasks, startDate, pixelsPerDay, onTaskMove]);

  // Calculate dependency lines
  const dependencyLines = useMemo(() => {
    const lines = [];
    for (const task of Object.values(tasks)) {
      if (!task.dependencies || task.dependencies.length === 0) continue;

      for (const depId of task.dependencies) {
        const depTask = tasks[depId];
        if (!depTask) continue;

        // Calculate positions for both tasks
        const depLeft = calculatePosition(depTask.startDate, startDate, pixelsPerDay);
        const depWidth = calculateDuration(depTask.startDate, depTask.endDate, pixelsPerDay);
        const depRowIndex = rows.findIndex((r) => r.id === depTask.rowId);
        const depTop = depRowIndex * ROW_HEIGHT + 28;

        const taskLeft = calculatePosition(task.startDate, startDate, pixelsPerDay);
        const taskWidth = calculateDuration(task.startDate, task.endDate, pixelsPerDay);
        const taskRowIndex = rows.findIndex((r) => r.id === task.rowId);
        const taskTop = taskRowIndex * ROW_HEIGHT + 28;

        const line = calculateDependencyLine(
          depTask,
          task,
          { left: depLeft, width: depWidth, top: depTop },
          { left: taskLeft, width: taskWidth, top: taskTop }
        );

        lines.push(line);
      }
    }
    return lines;
  }, [tasks, rows, startDate, pixelsPerDay]);

  return (
    <div className="flex flex-col h-full border rounded-lg bg-white overflow-hidden">
      {/* Timeline Container */}
      <div className="flex flex-1 overflow-hidden" ref={timelineRef}>
        {/* Left Fixed Panel */}
        <div style={{ width: LEFT_PANEL_WIDTH }} className="flex-shrink-0 border-r border-neutral-200 bg-neutral-50">
          {/* Header in left panel */}
          <div className="h-10 border-b border-neutral-200 bg-neutral-100 flex items-center px-3">
            <span className="text-sm font-medium text-neutral-700">Resources</span>
          </div>

          {/* Row labels */}
          <div>
            {rows.map((row) => (
              <TimelineRow
                key={row.id}
                row={row}
                width={LEFT_PANEL_WIDTH}
                onRowClick={(rowId) => {
                  console.log("Row clicked:", rowId);
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Scrollable Timeline */}
        <div className="flex-1 overflow-auto relative">
          {/* Time Scale Header */}
          <div className="sticky top-0 bg-white z-20 border-b border-neutral-200">
            <div className="flex" style={{ width: timelineWidth }}>
              {timeScale.map((label, index) => (
                <div
                  key={index}
                  className="border-r border-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-600 px-2"
                  style={{ width: label.columnWidth, minHeight: 40 }}
                >
                  {label.label}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Rows with Tasks */}
          <div style={{ position: "relative", width: timelineWidth, minHeight: ROW_HEIGHT * rows.length }}>
            {/* Dependency Lines */}
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 1 }}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
                </marker>
              </defs>
              {dependencyLines.map((line, index) => (
                <path
                  key={index}
                  d={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`}
                  stroke="#94a3b8"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              ))}
            </svg>

            {/* Grid Lines */}
            {timeScale.map((_, index) => {
              const left = timeScale.slice(0, index).reduce((sum, label) => sum + label.columnWidth, 0);
              return (
                <div
                  key={`grid-${index}`}
                  className="absolute top-0 bottom-0 border-r border-neutral-100"
                  style={{ left: `${left}px` }}
                />
              );
            })}

            {/* Current Date Indicator */}
            {currentDatePosition >= 0 && currentDatePosition <= timelineWidth && (
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-500"
                style={{ left: `${currentDatePosition}px`, zIndex: 10 }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                  Today
                </div>
              </div>
            )}

            {/* Task Bars */}
            {rows.map((row, rowIndex) => {
              const top = rowIndex * ROW_HEIGHT;
              return (
                <div
                  key={row.id}
                  className="absolute w-full border-b border-neutral-100"
                  style={{ top: `${top}px`, height: ROW_HEIGHT }}
                >
                  {row.tasks.map((taskId) => {
                    const task = tasks[taskId];
                    if (!task) return null;

                    const left = calculatePosition(task.startDate, startDate, pixelsPerDay);
                    const width = calculateDuration(task.startDate, task.endDate, pixelsPerDay);

                    return (
                      <TaskBar
                        key={task.id}
                        task={task}
                        position={{ left, width, top: 12 }}
                        onClick={handleTaskClick}
                        onDragStart={handleDragStart}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Task Detail Sidebar */}
      <TaskDetailSidebar
        isOpen={isSidebarOpen}
        task={selectedTask}
        onClose={() => {
          setIsSidebarOpen(false);
          setSelectedTask(undefined);
        }}
        onUpdate={handleTaskUpdate}
      />
    </div>
  );
};

export default TimelineView;
