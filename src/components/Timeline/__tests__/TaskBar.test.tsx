import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskBar from "../TaskBar";
import { TimelineTask } from "../../../types/timeline.types";

describe("TaskBar", () => {
  const mockTask: TimelineTask = {
    id: "task-1",
    title: "Test Task",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 5),
    progress: 60,
    rowId: "row-1"
  };

  const position = { left: 100, width: 200 };

  test("renders task title", () => {
    render(<TaskBar task={mockTask} position={position} />);
    expect(screen.getByLabelText(/Test Task/i)).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<TaskBar task={mockTask} position={position} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledWith(mockTask);
  });
});

