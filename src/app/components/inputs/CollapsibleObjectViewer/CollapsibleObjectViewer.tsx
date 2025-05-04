'use client';

import React, { useState } from "react";
import { useExistingClasses } from "@/nihon/app/utilities";
import "./index.css";

export interface ICollapsibleObjectViewerProps {
  data: any; // Data to display
  overriddenStyles?: {
    container?: React.CSSProperties;
    label?: React.CSSProperties;
    collapsible?: React.CSSProperties;
  };
  overriddenStylesClassNames?: {
    container?: string;
    label?: string;
    collapsible?: string;
  };
  isCollapsedInitially?: boolean;
}

const CollapsibleObjectViewer: React.FC<ICollapsibleObjectViewerProps> = ({
  data,
  overriddenStyles,
  overriddenStylesClassNames,
  isCollapsedInitially = true,
}) => {
  const CollapsibleItem: React.FC<{
    label: string;
    children?: React.ReactNode;
  }> = ({ label, children }) => {
    const [collapsed, setCollapsed] = useState(isCollapsedInitially);

    return (
      <div
        style={{
          marginLeft: "20px",
          ...overriddenStyles?.collapsible,
        }}
        className={useExistingClasses({
          existingClasses: "collapsible-item",
          newClasses: overriddenStylesClassNames?.collapsible,
        })}
      >
        <span
          style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "[+]" : "[-]"} {label}
        </span>
        {!collapsed && <div>{children}</div>}
      </div>
    );
  };

  const renderData = (obj: any, label = "root") => {
    if (typeof obj !== "object" || obj === null) {
      return <span>{String(obj)}</span>;
    }

    if (Array.isArray(obj)) {
      return (
        <CollapsibleItem label={`${label} (Array)`}>
          <ul>
            {obj.map((item, index) => (
              <li key={index}>{renderData(item, `Index ${index}`)}</li>
            ))}
          </ul>
        </CollapsibleItem>
      );
    }

    return (
      <CollapsibleItem label={`${label} (Object)`}>
        <ul>
          {Object.entries(obj).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {renderData(value, key)}
            </li>
          ))}
        </ul>
      </CollapsibleItem>
    );
  };

  return (
    <div
      style={{
        ...overriddenStyles?.container,
      }}
      className={useExistingClasses({
        existingClasses: "collapsible-object-viewer",
        newClasses: overriddenStylesClassNames?.container,
      })}
    >
      {renderData(data)}
    </div>
  );
};
export default CollapsibleObjectViewer;