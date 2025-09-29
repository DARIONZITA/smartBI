import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { AlertTriangle, CheckCircle, XCircle, ArrowRight } from "lucide-react";

const data = [
  { name: 'Passing', value: 23, color: '#10B981' },
  { name: 'Warnings', value: 5, color: '#F59E0B' },
  { name: 'Critical', value: 2, color: '#EF4444' },
];

const issues = [
  { type: "Critical", count: 2, color: "text-ai8-error", bgColor: "bg-ai8-error/10", icon: XCircle },
  { type: "Warnings", count: 5, color: "text-ai8-warning", bgColor: "bg-ai8-warning/10", icon: AlertTriangle },
  { type: "Passing", count: 23, color: "text-ai8-success", bgColor: "bg-ai8-success/10", icon: CheckCircle },
];

export function OptimizationDonut() {
  const score = 74;

  return (
    <Card className="ai8-card border-0">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-bold text-ai8-navy">Site Optimization Score</CardTitle>
        <CardDescription className="text-ai8-gray font-medium">
          LLM visibility optimization status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Score Display */}
        <div className="text-center space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground mb-1">{score}%</div>
                <div className="text-sm font-medium text-muted-foreground">Overall Score</div>
              </div>
            </div>
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2.51 * score} 251.2`}
                className="text-primary"
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          {/* Data breakdown */}
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item.value}</span>
                </div>
                <Progress 
                  value={(item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Issues Breakdown */}
        <div className="space-y-4">
          {issues.map((issue) => {
            const Icon = issue.icon;
            return (
              <div key={issue.type} className="flex items-center justify-between p-4 rounded-xl bg-ai8-light border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${issue.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${issue.color}`} />
                  </div>
                  <span className="text-sm font-semibold text-ai8-navy">{issue.type}</span>
                </div>
                <Badge className="bg-ai8-white text-ai8-navy border-gray-200 font-bold px-3 py-1">
                  {issue.count}
                </Badge>
              </div>
            );
          })}
        </div>

        {/* Priority Action */}
        <div className="pt-6 border-t border-gray-100">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-ai8-navy mb-2">Highest Priority Action</h4>
              <p className="text-sm text-ai8-gray font-medium">
                Optimize heading structure &amp; main content tags for better AI parsing
              </p>
            </div>
            <button className="ai8-button-secondary w-full gap-2 group">
              View All Actions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}