import React, { useState, useCallback, useEffect } from "react";
import { TimelineTask } from "../../types/timeline.types";
import Modal from "../primitives/Modal";
import Slider from "../primitives/Slider";

interface SidebarProps {
  isOpen: boolean;
  task?: TimelineTask;
  onClose: () => void;
  onUpdate?: (updates: Partial<TimelineTask>) => void;
}

export const TaskDetailSidebar: React.FC<SidebarProps> = ({
  isOpen,
  task,
  onClose,
  onUpdate
}) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setStartDate(task.startDate.toISOString().split("T")[0]);
      setEndDate(task.endDate.toISOString().split("T")[0]);
      setProgress(task.progress);
    }
  }, [task]);

  const handleSave = useCallback(() => {
    if (!task) return;

    const updates: Partial<TimelineTask> = {
      title,
      progress
    };

    if (startDate) {
      updates.startDate = new Date(startDate);
    }
    if (endDate) {
      updates.endDate = new Date(endDate);
    }

    onUpdate?.(updates);
    onClose();
  }, [task, title, startDate, endDate, progress, onUpdate, onClose]);

  const handleDelete = useCallback(() => {
    if (!task) return;
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onUpdate?.({ title: task.title + " [DELETED]" });
      onClose();
    }
  }, [task, onUpdate, onClose]);

  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details">
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="task-title" className="block text-sm font-medium text-neutral-700 mb-1">
            Title
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Task title"
          />
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="task-start" className="block text-sm font-medium text-neutral-700 mb-1">
            Start Date
          </label>
          <input
            id="task-start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Start date"
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="task-end" className="block text-sm font-medium text-neutral-700 mb-1">
            End Date
          </label>
          <input
            id="task-end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="End date"
          />
        </div>

        {/* Progress */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Progress: {progress}%
          </label>
          <Slider
            value={progress}
            onChange={(value) => setProgress(value)}
            min={0}
            max={100}
          />
        </div>

        {/* Assignee */}
        {task.assignee && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Assignee
            </label>
            <div className="text-sm text-neutral-600">{task.assignee}</div>
          </div>
        )}

        {/* Dependencies */}
        {task.dependencies && task.dependencies.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Dependencies
            </label>
            <div className="text-sm text-neutral-600">{task.dependencies.length} task(s)</div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-neutral-200">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailSidebar;
