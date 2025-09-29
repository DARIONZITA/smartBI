"use client";

import * as React from "react";
import { cn } from "./utils";

// Simple chart configuration without Recharts dependency
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  );
}

// Simple legend component without Recharts
function ChartLegendContent({
  className,
  hideIcon = false,
  items,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean;
  items?: Array<{ key: string; color: string; label: string }>;
}) {
  const { config } = useChart();

  if (!items?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 pt-3",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.key}
          className="flex items-center gap-1.5"
        >
          {!hideIcon && (
            <div
              className="h-2 w-2 shrink-0 rounded-[2px]"
              style={{
                backgroundColor: item.color,
              }}
            />
          )}
          <span className="text-sm text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export {
  ChartContainer,
  ChartLegendContent,
  useChart,
};
