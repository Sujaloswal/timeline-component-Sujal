import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import TimelineView from "./TimelineView";
import { sampleRows, sampleTasks } from "../../sample-data";
import { generateSampleData } from "../../sample-data";

const meta: Meta<typeof TimelineView> = {
  title: "Components/Timeline/TimelineView",
  component: TimelineView,
  parameters: {
    layout: "fullscreen",
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    viewMode: {
      control: { type: "select" },
      options: ["day", "week", "month"]
    }
  }
};

export default meta;
type Story = StoryObj<typeof TimelineView>;

// Default story with sample data
export const Default: Story = {
  args: {
    rows: sampleRows,
    tasks: sampleTasks,
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 2, 29),
    viewMode: "week",
    onTaskUpdate: action("task-updated"),
    onTaskMove: action("task-moved")
  },
  parameters: {
    docs: {
      description: {
        story: "Default timeline view with sample tasks across multiple resource rows."
      }
    }
  }
};

// Empty state
export const Empty: Story = {
  args: {
    rows: [],
    tasks: {},
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 2, 29),
    viewMode: "month",
    onTaskUpdate: action("task-updated"),
    onTaskMove: action("task-moved")
  },
  parameters: {
    docs: {
      description: {
        story: "Empty timeline state with no rows or tasks."
      }
    }
  }
};

// With dependencies
export const WithDependencies: Story = {
  args: {
    rows: sampleRows,
    tasks: sampleTasks,
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 2, 29),
    viewMode: "week",
    onTaskUpdate: action("task-updated"),
    onTaskMove: action("task-moved")
  },
  parameters: {
    docs: {
      description: {
        story: "Timeline showing task dependencies with connecting lines between tasks."
      }
    }
  }
};

// Interactive playground
export const InteractivePlayground: Story = {
  render: (args) => {
    const [state, setState] = useState(args);

    return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="p-6 border-b bg-white shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">Interactive Timeline Playground</h3>
          <p className="text-sm text-neutral-600 mb-4">
            Click tasks to edit, drag to move, resize by edges, use keyboard to navigate
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setState({ ...state, viewMode: "day" as const })}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm ${
                state.viewMode === "day" 
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md" 
                  : "bg-white border border-neutral-300 text-neutral-700 hover:border-primary-300 hover:bg-primary-50"
              }`}
            >
              Day View
            </button>
            <button
              onClick={() => setState({ ...state, viewMode: "week" as const })}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm ${
                state.viewMode === "week" 
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md" 
                  : "bg-white border border-neutral-300 text-neutral-700 hover:border-primary-300 hover:bg-primary-50"
              }`}
            >
              Week View
            </button>
            <button
              onClick={() => setState({ ...state, viewMode: "month" as const })}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm ${
                state.viewMode === "month" 
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md" 
                  : "bg-white border border-neutral-300 text-neutral-700 hover:border-primary-300 hover:bg-primary-50"
              }`}
            >
              Month View
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden p-4">
          <TimelineView {...state} onTaskUpdate={action("task-updated")} onTaskMove={action("task-moved")} />
        </div>
      </div>
    );
  },
  args: {
    rows: sampleRows,
    tasks: sampleTasks,
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 2, 29),
    viewMode: "week",
    onTaskUpdate: action("task-updated"),
    onTaskMove: action("task-moved")
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground with view mode controls. Fully functional drag, resize, and edit operations."
      }
    }
  }
};

// View modes demonstration
export const ViewModes: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");

    return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="p-6 border-b bg-white shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">View Modes: {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setViewMode("day")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm ${
                viewMode === "day" 
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md" 
                  : "bg-white border border-neutral-300 text-neutral-700 hover:border-primary-300 hover:bg-primary-50"
              }`}
            >
              Day View (40px/unit)
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm ${
                viewMode === "week" 
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md" 
                  : "bg-white border border-neutral-300 text-neutral-700 hover:border-primary-300 hover:bg-primary-50"
              }`}
            >
              Week View (80px/unit)
            </button>
            <button
              onClick={() => setViewMode("month")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm ${
                viewMode === "month" 
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md" 
                  : "bg-white border border-neutral-300 text-neutral-700 hover:border-primary-300 hover:bg-primary-50"
              }`}
            >
              Month View (120px/unit)
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden p-4">
          <TimelineView
            rows={sampleRows}
            tasks={sampleTasks}
            startDate={new Date(2024, 0, 1)}
            endDate={new Date(2024, 2, 29)}
            viewMode={viewMode}
            onTaskUpdate={action("task-updated")}
            onTaskMove={action("task-moved")}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates different view modes: Day, Week, and Month with varying column widths."
      }
    }
  }
};

// Mobile view
export const MobileView: Story = {
  args: {
    rows: sampleRows.slice(0, 2), // Fewer rows for mobile
    tasks: {
      ...sampleTasks,
      "task-1": {
        ...sampleTasks["task-1"],
        startDate: new Date(2024, 0, 1),
        endDate: new Date(2024, 0, 7)
      }
    },
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 31),
    viewMode: "day",
    onTaskUpdate: action("task-updated"),
    onTaskMove: action("task-moved")
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    },
    docs: {
      description: {
        story: "Mobile-optimized timeline view with fewer rows and condensed layout. Test with browser dev tools to simulate mobile devices."
      }
    }
  }
};

// Large dataset
export const LargeDataset: Story = {
  render: () => {
    const { rows: largeRows, tasks: largeTasks } = generateSampleData(10, 50);

    return (
      <TimelineView
        rows={largeRows}
        tasks={largeTasks}
        startDate={new Date(2024, 0, 1)}
        endDate={new Date(2024, 2, 29)}
        viewMode="week"
        onTaskUpdate={action("task-updated")}
        onTaskMove={action("task-moved")}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Performance test with 50 tasks across 10 resource rows. Demonstrates efficient rendering and smooth interactions."
      }
    }
  }
};

// Accessibility demonstration
export const Accessibility: Story = {
  args: {
    rows: sampleRows,
    tasks: sampleTasks,
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 2, 29),
    viewMode: "week",
    onTaskUpdate: action("task-updated"),
    onTaskMove: action("task-moved")
  },
  parameters: {
    a11y: {
      disable: false
    },
    docs: {
      description: {
        story:
          "Accessibility features demonstrated:\n" +
          "• Keyboard navigation (Tab, Enter, Arrow keys)\n" +
          "• ARIA labels and roles\n" +
          "• Focus-visible indicators\n" +
          "• Screen reader friendly\n\n" +
          "Use Tab to navigate between tasks, Enter/Space to open details, Arrow keys for navigation."
      }
    }
  }
};

// Week view specifically
export const WeekView: Story = {
  args: {
    rows: sampleRows,
    tasks: sampleTasks,
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 2, 29),
    viewMode: "week",
    onTaskUpdate: action("task-updated"),
    onTaskMove: action("task-moved")
  },
  parameters: {
    docs: {
      description: {
        story: "Week-level time scale with 80px column width showing weekly intervals."
      }
    }
  }
};
