import { TimelineTask } from "../types/timeline.types";

export interface DependencyLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fromTaskId: string;
  toTaskId: string;
}

/**
 * Simple dependency line calculation.
 * Real routing (around tasks) is a TODO for future implementation.
 */
export const calculateDependencyLine = (
  fromTask: TimelineTask,
  toTask: TimelineTask,
  fromPosition: { left: number; width: number; top: number },
  toPosition: { left: number; width: number; top: number }
): DependencyLine => {
  const x1 = fromPosition.left + fromPosition.width;
  const y1 = fromPosition.top + 16;
  const x2 = toPosition.left;
  const y2 = toPosition.top + 16;

  return {
    x1,
    y1,
    x2,
    y2,
    fromTaskId: fromTask.id,
    toTaskId: toTask.id
  };
};

export const getTaskDependencies = (
  taskId: string,
  tasks: Record<string, TimelineTask>
): string[] => {
  const task = tasks[taskId];
  return task?.dependencies ?? [];
};

export const getDependentTasks = (
  taskId: string,
  tasks: Record<string, TimelineTask>
): string[] => {
  return Object.values(tasks)
    .filter((task) => task.dependencies?.includes(taskId))
    .map((t) => t.id);
};

