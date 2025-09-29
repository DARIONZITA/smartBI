import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Eye, Download, Clock } from "lucide-react";

const recentQuotes = [
  {
    id: "RCS-2024-0892",
    client: "Energia Verde Lda", 
    amount: "€2.450.000",
    status: "pending_approval",
    time: "há 2 horas"
  },
  {
    id: "RCS-2024-0891",
    client: "TechFlow Solutions",
    amount: "€450.000", 
    status: "processed",
    time: "há 4 horas"
  },
  {
    id: "RCS-2024-0890",
    client: "Impressões Digitais",
    amount: "€85.000",
    status: "sent",
    time: "há 1 dia"
  },
  {
    id: "RCS-2024-0889", 
    client: "Industrial Power Corp",
    amount: "€1.200.000",
    status: "processing",
    time: "há 3 horas"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "processing":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Processando</Badge>;
    case "processed":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Processada</Badge>;
    case "pending_approval":
      return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Pendente</Badge>;
    case "sent":
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Enviada</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function RecentQuotes() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <div>
          <CardTitle className="text-lg lg:text-xl">Cotações Recentes</CardTitle>
          <CardDescription>
            Atividade mais recente de processamento de cotações
          </CardDescription>
        </div>
        <Button variant="outline" size="sm">Ver Todas</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentQuotes.map((quote) => (
          <div key={quote.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg border border-border hover:shadow-sm transition-all duration-200 space-y-3 lg:space-y-0">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-2">
                <span className="font-mono text-sm font-medium text-foreground">{quote.id}</span>
                {getStatusBadge(quote.status)}
              </div>
              <div className="text-sm text-foreground mb-1 font-medium">{quote.client}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {quote.time}
              </div>
            </div>
            <div className="flex items-center justify-between lg:justify-end lg:text-right space-x-4">
              <div className="font-bold text-foreground text-lg lg:text-xl">{quote.amount}</div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}