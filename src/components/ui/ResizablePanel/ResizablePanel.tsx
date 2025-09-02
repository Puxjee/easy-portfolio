"use client";

import React from "react";
import { GripVertical } from "lucide-react";
import { ResizeHandleProps, ResizablePanelProps } from "@/types";

const ResizeHandle: React.FC<ResizeHandleProps> = ({
  onMouseDown,
  isResizing,
  position = "right",
}) => {
  return (
    <div
      className={`
        absolute top-0 ${
          position === "right" ? "right-0" : "left-0"
        } h-full w-1 
        cursor-col-resize group hover:bg-purple-500/50 transition-colors
        ${isResizing ? "bg-purple-500" : ""}
      `}
      onMouseDown={onMouseDown}
    >
      <div className="absolute inset-y-0 -inset-x-1 flex items-center justify-center">
        <GripVertical
          className={`
            w-3 h-6 text-white/30 group-hover:text-purple-400 transition-colors
            ${isResizing ? "text-purple-400" : ""}
          `}
        />
      </div>
    </div>
  );
};

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  width,
  onMouseDown,
  isResizing,
  className = "",
  showHandle = true,
  handlePosition = "right",
}) => {
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${width}px`,
        flexShrink: 0,
        transition: isResizing ? "none" : "width 0.2s ease",
      }}
    >
      {children}
      {showHandle && (
        <ResizeHandle
          onMouseDown={onMouseDown}
          isResizing={isResizing}
          position={handlePosition}
        />
      )}
    </div>
  );
};

export default ResizablePanel;
export { ResizeHandle };
