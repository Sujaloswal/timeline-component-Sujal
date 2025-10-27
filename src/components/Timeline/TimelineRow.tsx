import React from "react";
import { TimelineRow as RowType } from "../../types/timeline.types";

interface TimelineRowProps {
  row: RowType;
  width?: number;
  onRowClick?: (rowId: string) => void;
}

export const TimelineRow: React.FC<TimelineRowProps> = React.memo(({ row, width = 200, onRowClick }) => {
  return (
    <div
      role="region"
      aria-label={`${row.label} timeline. ${row.tasks.length} tasks.`}
      className="flex items-center border-b border-neutral-100"
      style={{ minHeight: 56 }}
    >
      <div style={{ width }} className="px-3 py-2 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-neutral-200" aria-hidden />
        <div>
          <div className="text-sm font-medium">{row.label}</div>
          <div className="text-xs text-neutral-500">{row.tasks.length} tasks</div>
        </div>
      </div>
      <div className="flex-1">{/* timeline cells placeholder */}</div>
    </div>
  );
});

TimelineRow.displayName = "TimelineRow";

export default TimelineRow;

