import { TimelineTask } from "../types/timeline.types";

/** Calculate pixel position from date */
export const calculatePosition = (
  date: Date,
  startDate: Date,
  pixelsPerDay: number
): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSinceStart = (date.getTime() - startDate.getTime()) / msPerDay;
  return Math.round(daysSinceStart * pixelsPerDay);
};

/** Calculate duration in pixels */
export const calculateDuration = (
  startDate: Date,
  endDate: Date,
  pixelsPerDay: number
): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const durationDays = (endDate.getTime() - startDate.getTime()) / msPerDay;
  return Math.max(1, Math.round(durationDays * pixelsPerDay));
};

/** Calculate date from pixel position */
export const calculateDateFromPosition = (
  position: number,
  startDate: Date,
  pixelsPerDay: number
): Date => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.round(position / pixelsPerDay);
  const result = new Date(startDate);
  result.setTime(result.getTime() + days * msPerDay);
  return result;
};

