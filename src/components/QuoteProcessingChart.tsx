import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

const processingData = [
  { date: "18 Jan", received: 12, processed: 11, pending: 1 },
  { date: "19 Jan", received: 15, processed: 14, pending: 2 },
  { date: "20 Jan", received: 8, processed: 8, pending: 2 },
  { date: "21 Jan", received: 18, processed: 16, pending: 4 },
  { date: "22 Jan", received: 22, processed: 20, pending: 6 },
  { date: "23 Jan", received: 14, processed: 13, pending: 7 },
  { date: "24 Jan", received: 16, processed: 12, pending: 11 },
];

export function QuoteProcessingChart() {
  const maxValue = Math.max(...processingData.map(d => Math.max(d.received, d.processed, d.pending)));
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg lg:text-xl">Tendências de Processamento</CardTitle>
        <CardDescription>
          Volume diário de processamento e desempenho da automação IA
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-blue-500"></div>
            <span className="text-foreground">Recebidas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span className="text-foreground">Processadas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-yellow-500"></div>
            <span className="text-foreground">Pendentes</span>
          </div>
        </div>

        {/* Chart Data */}
        <div className="space-y-4">
          {processingData.map((data, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{data.date}</span>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="text-blue-700 border-blue-500">
                    R: {data.received}
                  </Badge>
                  <Badge variant="outline" className="text-green-700 border-green-500">
                    P: {data.processed}
                  </Badge>
                  <Badge variant="outline" className="text-yellow-700 border-yellow-500">
                    Pend: {data.pending}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded bg-blue-500"></div>
                  <Progress value={(data.received / maxValue) * 100} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground w-8">{data.received}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded bg-green-500"></div>
                  <Progress value={(data.processed / maxValue) * 100} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground w-8">{data.processed}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded bg-yellow-500"></div>
                  <Progress value={(data.pending / maxValue) * 100} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground w-8">{data.pending}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {processingData.reduce((sum, d) => sum + d.received, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total Recebidas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {processingData.reduce((sum, d) => sum + d.processed, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total Processadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {processingData.reduce((sum, d) => sum + d.pending, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total Pendentes</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}