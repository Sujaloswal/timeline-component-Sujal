import React from "react";
import { DependencyLine as DepLine } from "../../utils/dependency.utils";

/** Basic SVG path rendering of a straight dependency line */
interface DependencyLineProps {
  line: DepLine;
}

export const DependencyLine: React.FC<DependencyLineProps> = ({ line }) => {
  const { x1, y1, x2, y2 } = line;
  const d = `M ${x1} ${y1} L ${x2} ${y2}`;
  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
        </marker>
      </defs>
      <path d={d} stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
    </svg>
  );
};

export default DependencyLine;

