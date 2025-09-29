import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

const visibilityData = [
  { date: "Jan 18", visibility: 6.8, presence: 68 },
  { date: "Jan 19", visibility: 7.2, presence: 71 },
  { date: "Jan 20", visibility: 6.9, presence: 69 },
  { date: "Jan 21", visibility: 7.8, presence: 73 },
  { date: "Jan 22", visibility: 8.1, presence: 76 },
  { date: "Jan 23", visibility: 8.4, presence: 74 },
  { date: "Jan 24", visibility: 8.4, presence: 74 },
];

const mentionsData = [
  { date: "Jan 18", mentions: 156, citations: 89 },
  { date: "Jan 19", mentions: 203, citations: 112 },
  { date: "Jan 20", mentions: 178, citations: 95 },
  { date: "Jan 21", mentions: 234, citations: 134 },
  { date: "Jan 22", mentions: 289, citations: 167 },
  { date: "Jan 24", mentions: 298, citations: 172 },
];

export function MetricsChart() {
  return (
    <Card className="dark-card">
      <CardHeader>
        <CardTitle className="text-dark-primary text-lg lg:text-xl font-bold">
          AI Visibility Metrics
        </CardTitle>
        <CardDescription className="text-dark-secondary text-sm lg:text-base font-medium">
          Track how AI models reference and cite your brand across different platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="visibility" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-dark-tag">
            <TabsTrigger 
              value="visibility" 
              className="text-sm font-semibold data-[state=active]:bg-dark-cta data-[state=active]:text-white text-dark-secondary"
            >
              Visibility & Presence
            </TabsTrigger>
            <TabsTrigger 
              value="mentions" 
              className="text-sm font-semibold data-[state=active]:bg-dark-cta data-[state=active]:text-white text-dark-secondary"
            >
              Mentions & Citations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="visibility" className="space-y-4">
            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-sm mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-blue-500"></div>
                <span className="text-dark-secondary">Visibility Score</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span className="text-dark-secondary">Presence Index</span>
              </div>
            </div>

            {/* Chart Data */}
            <div className="space-y-4">
              {visibilityData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-dark-primary">{data.date}</span>
                    <div className="flex space-x-3">
                      <Badge variant="outline" className="text-blue-700 border-blue-500">
                        V: {data.visibility}
                      </Badge>
                      <Badge variant="outline" className="text-green-700 border-green-500">
                        P: {data.presence}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded bg-blue-500"></div>
                      <Progress value={(data.visibility / 10) * 100} className="h-2 flex-1" />
                      <span className="text-xs text-dark-secondary w-8">{data.visibility}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded bg-green-500"></div>
                      <Progress value={data.presence} className="h-2 flex-1" />
                      <span className="text-xs text-dark-secondary w-8">{data.presence}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="mentions" className="space-y-4">
            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-sm mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-yellow-500"></div>
                <span className="text-dark-secondary">Total Mentions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-purple-500"></div>
                <span className="text-dark-secondary">Direct Citations</span>
              </div>
            </div>

            {/* Chart Data */}
            <div className="space-y-4">
              {mentionsData.map((data, index) => {
                const maxValue = Math.max(data.mentions, data.citations);
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-dark-primary">{data.date}</span>
                      <div className="flex space-x-3">
                        <Badge variant="outline" className="text-yellow-700 border-yellow-500">
                          M: {data.mentions}
                        </Badge>
                        <Badge variant="outline" className="text-purple-700 border-purple-500">
                          C: {data.citations}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded bg-yellow-500"></div>
                        <Progress value={(data.mentions / maxValue) * 100} className="h-2 flex-1" />
                        <span className="text-xs text-dark-secondary w-8">{data.mentions}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded bg-purple-500"></div>
                        <Progress value={(data.citations / maxValue) * 100} className="h-2 flex-1" />
                        <span className="text-xs text-dark-secondary w-8">{data.citations}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}