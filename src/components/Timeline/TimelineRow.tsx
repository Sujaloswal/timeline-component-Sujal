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
      className="flex items-center border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
      style={{ minHeight: 56 }}
    >
      <div style={{ width }} className="px-3 py-2 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold shadow-sm" aria-hidden>
          {row.label.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-semibold text-neutral-800">{row.label}</div>
          <div className="text-xs text-neutral-500 font-medium">{row.tasks.length} {row.tasks.length === 1 ? 'task' : 'tasks'}</div>
        </div>
      </div>
      <div className="flex-1">{/* timeline cells placeholder */}</div>
    </div>
  );
});

TimelineRow.displayName = "TimelineRow";

export default TimelineRow;

