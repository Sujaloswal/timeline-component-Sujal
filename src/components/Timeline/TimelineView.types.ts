import { TimelineRow, TimelineTask } from "../../types/timeline.types";

export interface TimelineViewLocalProps {
  rows: TimelineRow[];
  tasks: Record<string, TimelineTask>;
}

