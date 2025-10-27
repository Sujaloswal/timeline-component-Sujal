import { TimelineRow, TimelineTask } from "./types/timeline.types";

export const sampleRows: TimelineRow[] = [
  { id: "row-1", label: "Frontend Team", avatar: "", tasks: ["task-1", "task-2"] },
  { id: "row-2", label: "Backend Team", avatar: "", tasks: ["task-3"] },
  { id: "row-3", label: "Design Team", avatar: "", tasks: ["task-4"] }
];

export const sampleTasks: Record<string, TimelineTask> = {
  "task-1": {
    id: "task-1",
    title: "UI Component Development",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 15),
    progress: 60,
    assignee: "Frontend Team",
    rowId: "row-1",
    dependencies: [],
    color: "#3b82f6",
    isMilestone: false
  },
  "task-2": {
    id: "task-2",
    title: "Integration Testing",
    startDate: new Date(2024, 0, 16),
    endDate: new Date(2024, 0, 25),
    progress: 0,
    assignee: "Frontend Team",
    rowId: "row-1",
    dependencies: ["task-1", "task-3"],
    color: "#3b82f6",
    isMilestone: false
  },
  "task-3": {
    id: "task-3",
    title: "API Development",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 14),
    progress: 80,
    assignee: "Backend Team",
    rowId: "row-2",
    dependencies: [],
    color: "#10b981",
    isMilestone: false
  },
  "task-4": {
    id: "task-4",
    title: "Design System Update",
    startDate: new Date(2024, 0, 5),
    endDate: new Date(2024, 0, 12),
    progress: 100,
    assignee: "Design Team",
    rowId: "row-3",
    dependencies: [],
    color: "#f59e0b",
    isMilestone: false
  }
};

/**
 * Generate sample data for testing with large datasets
 */
export const generateSampleData = (
  rowCount: number,
  taskCountPerRow: number
): { rows: TimelineRow[]; tasks: Record<string, TimelineTask> } => {
  const rows: TimelineRow[] = [];
  const tasks: Record<string, TimelineTask> = {};
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6"];

  for (let i = 0; i < rowCount; i++) {
    const rowId = `row-${i + 1}`;
    const taskIds: string[] = [];

    for (let j = 0; j < taskCountPerRow; j++) {
      const taskId = `task-${i + 1}-${j + 1}`;
      const startDate = new Date(2024, 0, Math.floor(Math.random() * 60) + 1);
      const duration = Math.floor(Math.random() * 20) + 5;
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + duration);

      taskIds.push(taskId);
      tasks[taskId] = {
        id: taskId,
        title: `Task ${i + 1}-${j + 1}`,
        startDate,
        endDate,
        progress: Math.floor(Math.random() * 101),
        assignee: `Team ${i + 1}`,
        rowId,
        dependencies: j > 0 ? [`task-${i + 1}-${j}`] : [],
        color: colors[i % colors.length],
        isMilestone: Math.random() > 0.9
      };
    }

    rows.push({
      id: rowId,
      label: `Resource ${i + 1}`,
      avatar: "",
      tasks: taskIds
    });
  }

  return { rows, tasks };
};

