import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Lightbulb, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target, 
  Clock, 
  Users, 
  BarChart3,
  PieChart,
  Eye,
  Share,
  Bookmark
} from "lucide-react";
import { Progress } from "./ui/progress";

interface User {
  email: string;
  name: string;
  role: "analyst" | "manager" | "admin";
}

interface InsightsDashboardProps {
  user: User | null;
}

const COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"];

const mockInsights = [
  {
    id: 1,
    type: "trend",
    priority: "high",
    title: "Aumento significativo em tickets de hardware",
    description: "Tickets relacionados a hardware aumentaram 45% nos últimos 30 dias, principalmente devido a problemas de memória RAM.",
    impact: "Alto",
    confidence: 92,
    category: "ITSM",
    dataSource: "GLPI",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    metrics: {
      current: 145,
      previous: 100,
      change: "+45%"
    },
    recommendations: [
      "Verificar fornecedores de hardware atual",
      "Implementar monitoramento preventivo de memória",
      "Negociar contrato de manutenção expandido"
    ]
  },
  {
    id: 2,
    type: "anomaly",
    priority: "medium",
    title: "Padrão incomum de vendas por região",
    description: "Vendas na região Norte estão 20% abaixo da média histórica, enquanto Centro apresenta crescimento atípico de 35%.",
    impact: "Médio",
    confidence: 87,
    category: "Vendas",
    dataSource: "Primavera ERP",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    metrics: {
      north: "€245K (-20%)",
      center: "€380K (+35%)",
      south: "€290K (+5%)"
    },
    recommendations: [
      "Investigar mudanças de equipe na região Norte",
      "Analisar campanhas de marketing específicas do Centro",
      "Realocar recursos comerciais entre regiões"
    ]
  },
  {
    id: 3,
    type: "opportunity",
    priority: "medium",
    title: "Oportunidade de otimização de aprovações",
    description: "73% dos documentos são aprovados automaticamente após 5 dias de espera. Sugerimos implementar aprovação automática inteligente.",
    impact: "Médio",
    confidence: 94,
    category: "Processos",
    dataSource: "DocuWare",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    metrics: {
      autoApproved: "73%",
      avgWaitTime: "5.2 dias",
      potentialSaving: "32h/semana"
    },
    recommendations: [
      "Implementar regras de auto-aprovação baseadas em valor",
      "Configurar alertas para documentos pendentes",
      "Criar dashboard de SLA para aprovações"
    ]
  },
  {
    id: 4,
    type: "performance",
    priority: "low",
    title: "Performance consistente do sistema analytics",
    description: "O sistema de analytics mantém performance estável com 99.2% de uptime e tempos de resposta médios de 1.8s.",
    impact: "Baixo",
    confidence: 98,
    category: "Infraestrutura",
    dataSource: "Analytics DB",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    metrics: {
      uptime: "99.2%",
      avgResponse: "1.8s",
      errorRate: "0.1%"
    },
    recommendations: [
      "Manter configurações atuais",
      "Planejar capacidade para próximo trimestre",
      "Documentar melhores práticas implementadas"
    ]
  }
];

const trendingData = [
  { month: "Out", tickets: 120, vendas: 450, docs: 890 },
  { month: "Nov", tickets: 135, vendas: 520, docs: 920 },
  { month: "Dez", tickets: 165, vendas: 480, docs: 1100 },
  { month: "Jan", tickets: 145, vendas: 620, docs: 1250 }
];

const categoryData = [
  { name: "ITSM", value: 35, color: "#3B82F6" },
  { name: "Vendas", value: 25, color: "#22C55E" },
  { name: "Processos", value: 20, color: "#F59E0B" },
  { name: "Infraestrutura", value: 15, color: "#EF4444" },
  { name: "Outros", value: 5, color: "#8B5CF6" }
];

export function InsightsDashboard({ user }: InsightsDashboardProps) {
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "trend":
        return TrendingUp;
      case "anomaly":
        return AlertTriangle;
      case "opportunity":
        return Target;
      case "performance":
        return BarChart3;
      default:
        return Lightbulb;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-dark-negative/10 border-dark-negative text-dark-negative";
      case "medium":
        return "bg-dark-cta/10 border-dark-cta text-dark-cta";
      case "low":
        return "bg-dark-positive/10 border-dark-positive text-dark-positive";
      default:
        return "bg-dark-secondary/10 border-dark-secondary text-dark-secondary";
    }
  };

  const filteredInsights = filterPriority === "all" 
    ? mockInsights 
    : mockInsights.filter(insight => insight.priority === filterPriority);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 60) return `${minutes}min atrás`;
    return `${hours}h atrás`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-dark-primary-text font-bold text-xl">Insights Automáticos</h2>
          <p className="text-dark-secondary">Descobertas e recomendações baseadas em IA</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {["all", "high", "medium", "low"].map((priority) => (
              <Button
                key={priority}
                variant={filterPriority === priority ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterPriority(priority)}
                className={filterPriority === priority 
                  ? "bg-dark-cta text-white" 
                  : "border-dark-border text-dark-secondary hover:text-dark-primary-text"
                }
              >
                {priority === "all" ? "Todos" : 
                 priority === "high" ? "Alta" :
                 priority === "medium" ? "Média" : "Baixa"}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dark-card">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-dark-cta/10 p-2 rounded-lg">
                <Lightbulb className="w-5 h-5 text-dark-cta" />
              </div>
              <div>
                <p className="text-dark-secondary text-sm">Total Insights</p>
                <p className="text-dark-primary-text font-bold text-xl">{mockInsights.length}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="dark-card">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-dark-negative/10 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-dark-negative" />
              </div>
              <div>
                <p className="text-dark-secondary text-sm">Prioridade Alta</p>
                <p className="text-dark-primary-text font-bold text-xl">
                  {mockInsights.filter(i => i.priority === "high").length}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="dark-card">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-dark-positive/10 p-2 rounded-lg">
                <Target className="w-5 h-5 text-dark-positive" />
              </div>
              <div>
                <p className="text-dark-secondary text-sm">Oportunidades</p>
                <p className="text-dark-primary-text font-bold text-xl">
                  {mockInsights.filter(i => i.type === "opportunity").length}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="dark-card">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-dark-cta/10 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-dark-cta" />
              </div>
              <div>
                <p className="text-dark-secondary text-sm">Confiança Média</p>
                <p className="text-dark-primary-text font-bold text-xl">
                  {Math.round(mockInsights.reduce((sum, i) => sum + i.confidence, 0) / mockInsights.length)}%
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Insights List */}
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-dark-primary-text font-semibold">Insights Recentes</h3>
          
          {filteredInsights.map((insight) => {
            const IconComponent = getInsightIcon(insight.type);
            return (
              <Card 
                key={insight.id} 
                className={`dark-card cursor-pointer transition-all hover:bg-dark-hover ${
                  selectedInsight === insight.id ? "border-dark-cta" : ""
                }`}
                onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-dark-cta/10 p-2 rounded-lg">
                      <IconComponent className="w-5 h-5 text-dark-cta" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-dark-primary-text font-semibold">{insight.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getPriorityColor(insight.priority)}>
                            {insight.priority === "high" ? "Alta" : 
                             insight.priority === "medium" ? "Média" : "Baixa"}
                          </Badge>
                          <span className="text-dark-secondary text-xs">{insight.confidence}%</span>
                        </div>
                      </div>
                      
                      <p className="text-dark-secondary text-sm mb-3">{insight.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-dark-secondary">
                        <div className="flex items-center gap-4">
                          <span>{insight.category}</span>
                          <span>•</span>
                          <span>{insight.dataSource}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(insight.createdAt)}</span>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="text-dark-secondary hover:text-dark-primary-text">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-dark-secondary hover:text-dark-primary-text">
                            <Bookmark className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-dark-secondary hover:text-dark-primary-text">
                            <Share className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {selectedInsight === insight.id && (
                        <div className="mt-4 pt-4 border-t border-dark-border space-y-4">
                          {/* Metrics */}
                          <div>
                            <h5 className="text-dark-primary-text font-medium mb-2">Métricas</h5>
                            <div className="bg-dark-bg p-3 rounded-lg">
                              {Object.entries(insight.metrics).map(([key, value]) => (
                                <div key={key} className="flex justify-between text-sm mb-1 last:mb-0">
                                  <span className="text-dark-secondary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                  <span className="text-dark-primary-text font-medium">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Recommendations */}
                          <div>
                            <h5 className="text-dark-primary-text font-medium mb-2">Recomendações</h5>
                            <div className="space-y-2">
                              {insight.recommendations.map((rec, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-dark-cta mt-2 flex-shrink-0"></div>
                                  <p className="text-dark-secondary text-sm">{rec}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {/* Trending Metrics */}
          <Card className="dark-card">
            <div className="p-4">
              <h4 className="text-dark-primary-text font-medium mb-4">Tendências Recentes</h4>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-blue-500"></div>
                  <span className="text-dark-secondary">Tickets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-green-500"></div>
                  <span className="text-dark-secondary">Vendas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-yellow-500"></div>
                  <span className="text-dark-secondary">Docs</span>
                </div>
              </div>

              {/* Chart Data */}
              <div className="space-y-4">
                {trendingData.map((data, index) => {
                  const maxValue = Math.max(data.tickets, data.vendas, data.docs);
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-dark-primary-text">{data.month}</span>
                        <div className="flex space-x-2 text-xs">
                          <span className="text-blue-400">T: {data.tickets}</span>
                          <span className="text-green-400">V: {data.vendas}</span>
                          <span className="text-yellow-400">D: {data.docs}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded bg-blue-500"></div>
                          <Progress value={(data.tickets / maxValue) * 100} className="h-2 flex-1" />
                          <span className="text-xs text-dark-secondary w-8">{data.tickets}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded bg-green-500"></div>
                          <Progress value={(data.vendas / maxValue) * 100} className="h-2 flex-1" />
                          <span className="text-xs text-dark-secondary w-8">{data.vendas}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded bg-yellow-500"></div>
                          <Progress value={(data.docs / maxValue) * 100} className="h-2 flex-1" />
                          <span className="text-xs text-dark-secondary w-8">{data.docs}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Categories Distribution */}
          <Card className="dark-card">
            <div className="p-4">
              <h4 className="text-dark-primary-text font-medium mb-4">Insights por Categoria</h4>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-dark-secondary text-sm">{category.name}</span>
                      </div>
                      <span className="text-dark-primary-text font-medium text-sm">{category.value}%</span>
                    </div>
                    <Progress value={category.value} className="h-2" />
                  </div>
                ))}
              </div>
              
              {/* Summary */}
              <div className="pt-4 border-t border-dark-color mt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-dark-primary-text">
                      {categoryData.length}
                    </div>
                    <div className="text-xs text-dark-secondary">Categorias</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-dark-primary-text">
                      {categoryData.reduce((sum, cat) => sum + cat.value, 0)}%
                    </div>
                    <div className="text-xs text-dark-secondary">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}