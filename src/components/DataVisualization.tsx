import React from "react";
import { Progress } from "./ui/progress";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Download, Share, Bookmark, TrendingUp, TrendingDown, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface DataVisualizationProps {
  result: {
    id: number;
    query: string;
    timestamp: Date;
    user: string;
    dataSource: string;
    type: "chart" | "table";
    data: any;
    insights: string[];
  };
}

const COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"];

export function DataVisualization({ result }: DataVisualizationProps) {
  const renderVisualization = () => {
    if (result.type === "table" && result.data.columns) {
      return (
        <div className="border border-theme rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-theme-hover border-theme">
                {result.data.columns.map((column: string, index: number) => (
                  <TableHead key={index} className="text-theme-primary font-semibold">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.data.rows.map((row: string[], rowIndex: number) => (
                <TableRow 
                  key={rowIndex} 
                  className="border-theme hover:bg-theme-hover"
                >
                  {row.map((cell: string, cellIndex: number) => (
                    <TableCell key={cellIndex} className="text-theme-secondary">
                      {cellIndex === 4 && cell.startsWith("€") ? (
                        <span className="text-theme-positive font-medium">{cell}</span>
                      ) : cellIndex === 5 && parseInt(cell) > 7 ? (
                        <span className="text-theme-negative font-medium">{cell} dias</span>
                      ) : (
                        cell
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    } else if (result.data.chartType === "bar") {
      const maxValue = Math.max(...result.data.data.map((item: any) => item.value));
      return (
        <div className="space-y-4">
          {result.data.data.map((item: any, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{item.name}</span>
                <span className="text-sm font-semibold text-foreground">{item.value}</span>
              </div>
              <Progress value={(item.value / maxValue) * 100} className="h-3" />
            </div>
          ))}
        </div>
      );
    } else if (result.data.chartType === "line") {
      const maxValue = Math.max(...result.data.data.map((item: any) => Math.max(item.value || 0, item.satisfaction || 0)));
      return (
        <div className="space-y-6">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-blue-500"></div>
              <span className="text-muted-foreground">Value</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-green-500"></div>
              <span className="text-muted-foreground">Satisfaction</span>
            </div>
          </div>

          {/* Chart Data */}
          <div className="space-y-4">
            {result.data.data.map((item: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">{item.month}</span>
                  <div className="flex space-x-3 text-xs">
                    <span className="text-blue-600">V: {item.value || 0}</span>
                    <span className="text-green-600">S: {item.satisfaction || 0}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded bg-blue-500"></div>
                    <Progress value={((item.value || 0) / maxValue) * 100} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground w-8">{item.value || 0}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded bg-green-500"></div>
                    <Progress value={((item.satisfaction || 0) / maxValue) * 100} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground w-8">{item.satisfaction || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <Card className="bg-theme-card border-theme p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-theme-primary font-semibold mb-2">Resultado da Consulta</h3>
          <p className="text-theme-secondary text-sm mb-3">{result.query}</p>
          <div className="flex items-center gap-3 text-xs text-theme-secondary">
            <span>Por: {result.user}</span>
            <span>•</span>
            <span>{result.timestamp.toLocaleString("pt-PT")}</span>
            <span>•</span>
            <Badge variant="outline" className="border-theme text-theme-secondary">
              {result.dataSource}
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-theme-secondary hover:text-theme-primary">
            <Bookmark className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-theme-secondary hover:text-theme-primary">
            <Share className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-theme-secondary hover:text-theme-primary">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Visualization */}
      <div className="mb-6">
        {renderVisualization()}
      </div>

      {/* Quick Stats for Charts */}
      {result.data.chartType === "bar" && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {result.data.data.map((item: any, index: number) => (
            <div key={index} className="bg-theme-hover p-3 rounded-lg">
              <p className="text-theme-secondary text-xs mb-1">{item.name}</p>
              <p className="text-theme-primary font-semibold">{item.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {item.trend.startsWith("+") ? (
                  <TrendingUp className="w-3 h-3 text-theme-positive" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-theme-negative" />
                )}
                <span className={`text-xs ${item.trend.startsWith("+") ? "text-theme-positive" : "text-theme-negative"}`}>
                  {item.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Insights */}
      <div className="bg-theme-hover p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-theme-cta" />
          <h4 className="text-theme-primary font-medium">Insights Automáticos</h4>
        </div>
        <div className="space-y-2">
          {result.insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-theme-cta mt-2 flex-shrink-0"></div>
              <p className="text-theme-secondary text-sm">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}