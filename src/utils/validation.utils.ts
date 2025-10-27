import { TimelineTask } from "../types/timeline.types";

export const validateTaskDates = (task: TimelineTask): boolean => {
  return task.startDate.getTime() <= task.endDate.getTime();
};

