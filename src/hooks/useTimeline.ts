import { useCallback, useState } from "react";

export type ViewMode = "day" | "week" | "month";

export const useTimeline = (initialDate: Date = new Date()) => {
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [startDate, setStartDate] = useState<Date>(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(initialDate.getFullYear(), initialDate.getMonth() + 3, 0)
  );
  const [pixelsPerDay, setPixelsPerDay] = useState<number>(40);

  const zoomIn = useCallback(() => {
    if (viewMode === "month") {
      setViewMode("week");
      setPixelsPerDay(80);
    } else if (viewMode === "week") {
      setViewMode("day");
      setPixelsPerDay(40);
    }
  }, [viewMode]);

  const zoomOut = useCallback(() => {
    if (viewMode === "day") {
      setViewMode("week");
      setPixelsPerDay(80);
    } else if (viewMode === "week") {
      setViewMode("month");
      setPixelsPerDay(120);
    }
  }, [viewMode]);

  const scrollToToday = useCallback(() => {
    const today = new Date();
    setStartDate(new Date(today.getFullYear(), today.getMonth() - 1, 1));
    setEndDate(new Date(today.getFullYear(), today.getMonth() + 2, 0));
  }, []);

  return {
    viewMode,
    startDate,
    endDate,
    pixelsPerDay,
    setViewMode,
    setStartDate,
    setEndDate,
    setPixelsPerDay,
    zoomIn,
    zoomOut,
    scrollToToday
  };
};

