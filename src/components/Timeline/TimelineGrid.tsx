import React from "react";

/**
 * Static TimelineGrid skeleton.
 * TODO: Implement proper time scale generation and virtualization.
 */
interface TimelineGridProps {
  startDate: Date;
  endDate: Date;
  viewMode: "day" | "week" | "month";
  pixelsPerDay: number;
}

export const TimelineGrid: React.FC<TimelineGridProps> = ({ startDate, endDate, viewMode, pixelsPerDay }) => {
  // Placeholder header demonstration.
  return (
    <div className="overflow-auto">
      <div className="flex items-center border-b border-neutral-200">
        <div style={{ width: 200 }} className="flex-shrink-0 p-2">
          {/* left panel placeholder */}
        </div>
        <div className="flex-1 p-2">
          <div className="flex space-x-2">
            {/* Render a few placeholder columns */}
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={`col-${idx}`} className="min-w-[120px] text-sm p-2 text-neutral-500">
                Col
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineGrid;

