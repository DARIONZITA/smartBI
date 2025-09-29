import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowUpRight, MessageSquare, BarChart3 } from "lucide-react";

const prompts = [
  {
    id: 1,
    text: "What are the best project management tools for remote teams?",
    score: 94,
    mentions: 1247,
    growth: "+23%",
    status: "trending"
  },
  {
    id: 2,
    text: "How to implement AI in customer service workflows?",
    score: 89,
    mentions: 892,
    growth: "+18%",
    status: "rising"
  },
  {
    id: 3,
    text: "Best practices for digital marketing automation",
    score: 85,
    mentions: 756,
    growth: "+15%",
    status: "stable"
  },
  {
    id: 4,
    text: "Software development lifecycle management tools",
    score: 82,
    mentions: 634,
    growth: "+12%",
    status: "rising"
  },
  {
    id: 5,
    text: "Cloud infrastructure security best practices",
    score: 78,
    mentions: 523,
    growth: "+8%",
    status: "stable"
  },
];

export function TopPerformingPrompts() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "trending":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "rising":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <div>
          <CardTitle className="text-xl font-bold">Top Performing Prompts</CardTitle>
          <CardDescription>
            Prompts driving the highest visibility and mentions
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          View All
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="p-4 rounded-lg border border-border hover:shadow-sm transition-all duration-200 bg-card"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 mr-4">
                <p className="text-sm font-medium text-foreground leading-relaxed">
                  {prompt.text}
                </p>
              </div>
              <Badge variant="outline" className={`${getStatusColor(prompt.status)} font-medium`}>
                {prompt.status}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Score</span>
                    <span className="text-sm font-semibold text-foreground">{prompt.score}/100</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Mentions</span>
                    <span className="text-sm font-semibold text-foreground">{prompt.mentions.toLocaleString()}</span>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium">
                  {prompt.growth}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Performance</span>
                  <span className="text-foreground font-medium">{prompt.score}%</span>
                </div>
                <Progress value={prompt.score} className="h-2" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}