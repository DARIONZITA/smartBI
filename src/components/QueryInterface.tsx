import React, { useState } from "react";
import { Send, Mic, Sparkles, Database, FileText, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { DataVisualization } from "./DataVisualization";

interface User {
  email: string;
  name: string;
  role: "analyst" | "manager" | "admin";
}

interface QueryInterfaceProps {
  user: User | null;
  onAddQuery: (query: any) => void;
}

const suggestedQueries = [
  {
    text: "Mostrar pedidos do Primavera com status pendente há mais de 5 dias",
    type: "ERP",
    complexity: "Simples"
  },
  {
    text: "Análise de tickets do GLPI por categoria nos últimos 3 meses",
    type: "GLPI",
    complexity: "Média"
  },
  {
    text: "Documentos aprovados no DocuWare por departamento este ano",
    type: "DocuWare", 
    complexity: "Simples"
  },
  {
    text: "Correlação entre satisfação do cliente e tempo de resposta",
    type: "Analytics",
    complexity: "Avançada"
  }
];

const dataSources = [
  { name: "Primavera ERP", status: "Conectado", icon: Database, count: "15,423 registos" },
  { name: "GLPI", status: "Conectado", icon: AlertCircle, count: "8,901 tickets" },
  { name: "DocuWare", status: "Conectado", icon: FileText, count: "45,123 documentos" },
  { name: "Analytics DB", status: "Conectado", icon: TrendingUp, count: "128,990 eventos" }
];

export function QueryInterface({ user, onAddQuery }: QueryInterfaceProps) {
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResult, setCurrentResult] = useState<any>(null);

  const handleSubmitQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    
    setIsProcessing(true);
    setQuery(queryText);
    
    // Simular processamento da consulta
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simular resultado baseado na consulta
    const mockResult = {
      id: Date.now(),
      query: queryText,
      timestamp: new Date(),
      user: user?.name,
      dataSource: queryText.includes("Primavera") ? "Primavera ERP" : 
                  queryText.includes("GLPI") ? "GLPI" :
                  queryText.includes("DocuWare") ? "DocuWare" : "Analytics DB",
      type: queryText.includes("análise") || queryText.includes("correlação") ? "chart" : "table",
      data: generateMockData(queryText),
      insights: generateMockInsights(queryText)
    };
    
    setCurrentResult(mockResult);
    onAddQuery(mockResult);
    setIsProcessing(false);
    setQuery("");
  };

  const generateMockData = (queryText: string) => {
    if (queryText.includes("pedidos") || queryText.includes("status")) {
      return {
        columns: ["ID", "Cliente", "Data", "Status", "Valor", "Dias Pendente"],
        rows: [
          ["PED-001", "Empresa ABC", "2024-01-10", "Pendente", "€12,450", "8"],
          ["PED-002", "Empresa XYZ", "2024-01-08", "Pendente", "€8,200", "10"], 
          ["PED-003", "Empresa DEF", "2024-01-12", "Pendente", "€15,600", "6"],
          ["PED-004", "Empresa GHI", "2024-01-05", "Pendente", "€22,100", "13"],
          ["PED-005", "Empresa JKL", "2024-01-09", "Pendente", "€9,800", "9"]
        ]
      };
    } else if (queryText.includes("tickets") || queryText.includes("categoria")) {
      return {
        chartType: "bar",
        data: [
          { name: "Hardware", value: 145, trend: "+12%" },
          { name: "Software", value: 89, trend: "-3%" },
          { name: "Rede", value: 67, trend: "+8%" },
          { name: "Acesso", value: 234, trend: "+15%" },
          { name: "Outros", value: 45, trend: "-1%" }
        ]
      };
    } else {
      return {
        chartType: "line",
        data: [
          { month: "Jan", value: 4200, satisfaction: 8.2 },
          { month: "Fev", value: 3800, satisfaction: 7.9 },
          { month: "Mar", value: 5100, satisfaction: 8.7 },
          { month: "Abr", value: 4600, satisfaction: 8.1 },
          { month: "Mai", value: 5400, satisfaction: 9.1 }
        ]
      };
    }
  };

  const generateMockInsights = (queryText: string) => {
    return [
      "13% dos pedidos estão pendentes há mais de 7 dias",
      "Maior volume de pedidos pendentes em Janeiro (+25%)",
      "Cliente Empresa GHI tem maior valor médio de pedidos"
    ];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Query Input Section */}
      <Card className="bg-theme-card border-theme p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-theme-cta" />
          <h2 className="text-theme-primary font-semibold">Faça uma Pergunta aos Seus Dados</h2>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: Mostrar vendas por região nos últimos 6 meses..."
              className="bg-theme-bg border-theme text-theme-primary placeholder:text-theme-secondary min-h-[100px] pr-20"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitQuery(query);
                }
              }}
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-theme-secondary hover:text-theme-primary"
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleSubmitQuery(query)}
                disabled={!query.trim() || isProcessing}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {isProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          
          {isProcessing && (
            <div className="flex items-center gap-2 text-theme-secondary text-sm">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Processando consulta e analisando dados...</span>
            </div>
          )}
        </div>
      </Card>

      {/* Suggested Queries */}
      <Card className="bg-theme-card border-theme p-6">
        <h3 className="text-theme-primary font-semibold mb-4">Consultas Sugeridas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestedQueries.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSubmitQuery(suggestion.text)}
              className="text-left p-3 rounded-lg bg-theme-hover border border-theme hover:border-primary transition-all group"
            >
              <p className="text-theme-primary text-sm group-hover:text-theme-cta mb-2">
                {suggestion.text}
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs border-theme text-theme-secondary">
                  {suggestion.type}
                </Badge>
                <Badge variant="outline" className="text-xs border-theme text-theme-secondary">
                  {suggestion.complexity}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Data Sources Status */}
      <Card className="bg-theme-card border-theme p-6">
        <h3 className="text-theme-primary font-semibold mb-4">Fontes de Dados Disponíveis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dataSources.map((source, index) => {
            const Icon = source.icon;
            return (
              <div key={index} className="bg-theme-hover p-4 rounded-lg border border-theme">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5 text-theme-cta" />
                  <span className="text-theme-primary font-medium text-sm">{source.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs bg-green-100 border-green-200 text-green-800">
                    {source.status}
                  </Badge>
                </div>
                <p className="text-theme-secondary text-xs mt-2">{source.count}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Results */}
      {currentResult && (
        <DataVisualization result={currentResult} />
      )}
    </div>
  );
}