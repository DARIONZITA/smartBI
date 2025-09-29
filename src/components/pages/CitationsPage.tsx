import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, ExternalLink, Unlock, TrendingUp } from "lucide-react";
import React from "react";

const citationsData = [
  {
    dr: 87,
    domain: "techcrunch.com",
    pa: 92,
    url: "/article/ai-tools-comparison-2024",
    sentiment: 85,
    visibility: 94,
    firstSeen: "2024-01-20"
  },
  {
    dr: 78,
    domain: "forbes.com",
    pa: 89,
    url: "/digital-transformation-leaders",
    sentiment: 78,
    visibility: 87,
    firstSeen: "2024-01-18"
  },
  {
    dr: 65,
    domain: "medium.com",
    pa: 72,
    url: "/productivity-tools-review",
    sentiment: 92,
    visibility: 76,
    firstSeen: "2024-01-22"
  },
  {
    dr: 82,
    domain: "wired.com",
    pa: 85,
    url: "/ai-business-automation",
    sentiment: 68,
    visibility: 89,
    firstSeen: "2024-01-19"
  },
  {
    dr: 59,
    domain: "businessinsider.com",
    pa: 76,
    url: "/startup-tools-guide",
    sentiment: 88,
    visibility: 72,
    firstSeen: "2024-01-21"
  },
  {
    dr: 74,
    domain: "venturebeat.com",
    pa: 79,
    url: "/enterprise-software-trends",
    sentiment: 75,
    visibility: 83,
    firstSeen: "2024-01-17"
  }
];

const CircularIndicator = ({ value, type }: { value: number; type: 'sentiment' | 'visibility' }) => {
  const getColor = (val: number, indicatorType: string) => {
    if (indicatorType === 'sentiment') {
      if (val >= 80) return { bg: 'bg-green-100', text: 'text-green-700', ring: 'stroke-green-500' };
      if (val >= 60) return { bg: 'bg-yellow-100', text: 'text-yellow-700', ring: 'stroke-yellow-500' };
      return { bg: 'bg-red-100', text: 'text-red-700', ring: 'stroke-red-500' };
    } else {
      if (val >= 80) return { bg: 'bg-blue-100', text: 'text-blue-700', ring: 'stroke-blue-500' };
      if (val >= 60) return { bg: 'bg-purple-100', text: 'text-purple-700', ring: 'stroke-purple-500' };
      return { bg: 'bg-gray-100', text: 'text-gray-700', ring: 'stroke-gray-500' };
    }
  };

  const colors = getColor(value, type);
  const circumference = 2 * Math.PI * 12;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-10 h-10">
      <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r="12"
          stroke="#e5e7eb"
          strokeWidth="3"
          fill="transparent"
        />
        <circle
          cx="16"
          cy="16"
          r="12"
          className={colors.ring}
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center ${colors.bg} rounded-full`}>
        <span className={`text-xs font-semibold ${colors.text}`}>{value}</span>
      </div>
    </div>
  );
};

export function CitationsPage() {
  return (
    <>
      {/* Header */}
      <header className="bg-background border-b border-border px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Citations</h1>
            <p className="text-sm text-muted-foreground mt-1">Track how AI models cite your content</p>
          </div>
          <Button variant="outline" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            Export Citations
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 bg-background">
        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search citations..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Citations Table */}
        <Card className="rounded-xl border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle>Citations Overview</CardTitle>
            <CardDescription>
              Domains and pages where AI models reference your brand
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="font-semibold text-foreground">DR</TableHead>
                    <TableHead className="font-semibold text-foreground">Domain</TableHead>
                    <TableHead className="font-semibold text-foreground">PA</TableHead>
                    <TableHead className="font-semibold text-foreground">URL</TableHead>
                    <TableHead className="font-semibold text-foreground text-center">Sentiment</TableHead>
                    <TableHead className="font-semibold text-foreground text-center">Visibility</TableHead>
                    <TableHead className="font-semibold text-foreground">First Seen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {citationsData.map((citation, index) => (
                    <TableRow 
                      key={index}
                      className="border-border hover:bg-muted/50 transition-colors"
                    >
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={`font-medium ${
                            citation.dr >= 80 ? 'bg-green-100 text-green-700' :
                            citation.dr >= 60 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}
                        >
                          {citation.dr}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-muted rounded-sm flex items-center justify-center">
                            <span className="text-xs font-medium text-muted-foreground">
                              {citation.domain.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium text-foreground">{citation.domain}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium text-foreground">{citation.pa}</span>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <span className="text-sm text-primary hover:text-primary/80 cursor-pointer truncate block">
                          {citation.url}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <CircularIndicator value={citation.sentiment} type="sentiment" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <CircularIndicator value={citation.visibility} type="visibility" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(citation.firstSeen).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Insight Footer */}
        <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-r from-muted/30 to-muted/50">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <Unlock className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    See all the citations that AI is using to speak about you
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get complete citation analytics, source tracking, and competitive intelligence
                  </p>
                </div>
              </div>
              <Button className="px-8">
                Upgrade
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}