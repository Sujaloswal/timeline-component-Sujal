export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US");
};

/** Return days difference (float) */
export const daysBetween = (a: Date, b: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  return (b.getTime() - a.getTime()) / msPerDay;
};

export interface TimeScaleLabel {
  date: Date;
  label: string;
  columnWidth: number;
}

/**
 * Generate time scale labels for timeline header
 */
export const generateTimeScale = (
  startDate: Date,
  endDate: Date,
  viewMode: "day" | "week" | "month"
): TimeScaleLabel[] => {
  const scale: TimeScaleLabel[] = [];
  const current = new Date(startDate);

  let columnWidth = 40;
  if (viewMode === "week") {
    columnWidth = 80;
  } else if (viewMode === "month") {
    columnWidth = 120;
  }

  while (current <= endDate) {
    let label = "";
    
    if (viewMode === "day") {
      label = current.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric"
      });
      scale.push({ date: new Date(current), label, columnWidth });
      current.setDate(current.getDate() + 1);
    } else if (viewMode === "week") {
      const weekNumber = getWeekNumber(current);
      label = `Week ${weekNumber}`;
      scale.push({ date: new Date(current), label, columnWidth });
      current.setDate(current.getDate() + 7);
    } else {
      label = current.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
      });
      scale.push({ date: new Date(current), label, columnWidth });
      current.setMonth(current.getMonth() + 1);
    }
  }

  return scale;
};

/**
 * Get week number for a date
 */
const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

/**
 * Get current date position in timeline
 */
export const getCurrentDatePosition = (
  startDate: Date,
  pixelsPerDay: number
): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysSinceStart = (today.getTime() - startDate.getTime()) / msPerDay;
  return Math.round(daysSinceStart * pixelsPerDay);
};

/**
 * Check if a date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

