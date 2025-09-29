import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Download, 
  FileText, 
  Table, 
  BarChart3, 
  Calendar, 
  Mail, 
  Share, 
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  Archive
} from "lucide-react";

interface User {
  email: string;
  name: string;
  role: "analyst" | "manager" | "admin";
}

interface ExportManagerProps {
  queries: any[];
  user: User | null;
}

const exportFormats = [
  { id: "excel", name: "Excel (.xlsx)", icon: Table, description: "Formato completo com formatação" },
  { id: "csv", name: "CSV", icon: FileText, description: "Dados tabulares simples" },
  { id: "pdf", name: "PDF Report", icon: FileText, description: "Relatório formatado para impressão" },
  { id: "json", name: "JSON", icon: FileText, description: "Formato estruturado para APIs" },
  { id: "powerbi", name: "Power BI", icon: BarChart3, description: "Template para Power BI" }
];

const exportHistory = [
  {
    id: 1,
    name: "Relatório de Tickets - Janeiro 2024",
    format: "Excel",
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    size: "2.4 MB",
    downloads: 3
  },
  {
    id: 2,
    name: "Análise de Vendas Q4 2023",
    format: "PDF",
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    size: "1.8 MB",
    downloads: 7
  },
  {
    id: 3,
    name: "Dashboard Executivo",
    format: "Power BI",
    status: "processing",
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
    size: "—",
    downloads: 0
  },
  {
    id: 4,
    name: "Dados Documentos DocuWare",
    format: "JSON",
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    size: "5.2 MB",
    downloads: 12
  },
  {
    id: 5,
    name: "Performance Analytics",
    format: "CSV",
    status: "failed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    size: "—",
    downloads: 0
  }
];

export function ExportManager({ queries, user }: ExportManagerProps) {
  const [selectedQueries, setSelectedQueries] = useState<number[]>([]);
  const [exportFormat, setExportFormat] = useState("");
  const [exportName, setExportName] = useState("");
  const [exportDescription, setExportDescription] = useState("");
  const [scheduleExport, setScheduleExport] = useState(false);
  const [emailRecipients, setEmailRecipients] = useState("");

  const handleQuerySelection = (queryId: number) => {
    setSelectedQueries(prev => 
      prev.includes(queryId) 
        ? prev.filter(id => id !== queryId)
        : [...prev, queryId]
    );
  };

  const handleSelectAll = () => {
    if (selectedQueries.length === queries.length) {
      setSelectedQueries([]);
    } else {
      setSelectedQueries(queries.map(q => q.id));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-dark-positive" />;
      case "processing":
        return <Clock className="w-4 h-4 text-dark-cta" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-dark-negative" />;
      default:
        return <Clock className="w-4 h-4 text-dark-secondary" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "processing":
        return "Processando";
      case "failed":
        return "Falhou";
      default:
        return "Pendente";
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}min atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days}d atrás`;
  };

  const handleCreateExport = () => {
    if (selectedQueries.length === 0 || !exportFormat) {
      alert("Selecione pelo menos uma consulta e um formato de exportação.");
      return;
    }

    // Simular criação de exportação
    alert(`Exportação criada com sucesso! ${selectedQueries.length} consulta(s) serão exportadas em formato ${exportFormat}.`);
    
    // Reset form
    setSelectedQueries([]);
    setExportFormat("");
    setExportName("");
    setExportDescription("");
    setEmailRecipients("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-dark-primary-text font-bold text-xl">Gestão de Exportações</h2>
          <p className="text-dark-secondary">Exporte e partilhe os resultados das suas análises</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-dark-tag border-dark-border text-dark-primary-text">
            {queries.length} consultas disponíveis
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Export Creation */}
        <div className="xl:col-span-2 space-y-6">
          {/* Query Selection */}
          <Card className="dark-card">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-dark-primary-text font-semibold">Seleccionar Consultas</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  className="border-dark-border text-dark-secondary hover:text-dark-primary-text"
                >
                  {selectedQueries.length === queries.length ? "Desseleccionar Todas" : "Seleccionar Todas"}
                </Button>
              </div>
              
              {queries.length === 0 ? (
                <div className="text-center py-8">
                  <Archive className="w-12 h-12 text-dark-secondary mx-auto mb-4" />
                  <p className="text-dark-secondary">Nenhuma consulta disponível para exportação.</p>
                  <p className="text-dark-secondary text-sm mt-1">Execute algumas consultas primeiro.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {queries.map((query) => (
                    <div 
                      key={query.id}
                      className="flex items-start gap-3 p-3 rounded-lg border border-dark-border hover:bg-dark-hover cursor-pointer"
                      onClick={() => handleQuerySelection(query.id)}
                    >
                      <Checkbox
                        checked={selectedQueries.includes(query.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <h4 className="text-dark-primary-text font-medium text-sm line-clamp-1">
                          {query.query}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-dark-secondary">
                          <span>{query.dataSource}</span>
                          <span>•</span>
                          <span>{query.timestamp.toLocaleDateString("pt-PT")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Export Configuration */}
          <Card className="dark-card">
            <div className="p-6">
              <h3 className="text-dark-primary-text font-semibold mb-4">Configuração da Exportação</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-dark-primary-text font-medium text-sm mb-2 block">
                    Nome da Exportação
                  </label>
                  <Input
                    value={exportName}
                    onChange={(e) => setExportName(e.target.value)}
                    placeholder="Ex: Relatório Mensal de Análise"
                    className="bg-dark-bg border-dark-border text-dark-primary-text"
                  />
                </div>

                <div>
                  <label className="text-dark-primary-text font-medium text-sm mb-2 block">
                    Formato de Exportação
                  </label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger className="bg-dark-bg border-dark-border text-dark-primary-text">
                      <SelectValue placeholder="Selecionar formato" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-dark-border">
                      {exportFormats.map((format) => {
                        const Icon = format.icon;
                        return (
                          <SelectItem 
                            key={format.id} 
                            value={format.id}
                            className="text-dark-primary-text hover:bg-dark-hover"
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-dark-cta" />
                              <div>
                                <div className="font-medium">{format.name}</div>
                                <div className="text-xs text-dark-secondary">{format.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-dark-primary-text font-medium text-sm mb-2 block">
                    Descrição (opcional)
                  </label>
                  <Textarea
                    value={exportDescription}
                    onChange={(e) => setExportDescription(e.target.value)}
                    placeholder="Adicione uma descrição para esta exportação..."
                    className="bg-dark-bg border-dark-border text-dark-primary-text"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="email-notification"
                    checked={scheduleExport}
                    onCheckedChange={setScheduleExport}
                  />
                  <label htmlFor="email-notification" className="text-dark-primary-text font-medium text-sm">
                    Enviar por email quando concluída
                  </label>
                </div>

                {scheduleExport && (
                  <div>
                    <label className="text-dark-primary-text font-medium text-sm mb-2 block">
                      Destinatários (separados por vírgula)
                    </label>
                    <Input
                      value={emailRecipients}
                      onChange={(e) => setEmailRecipients(e.target.value)}
                      placeholder="email1@empresa.pt, email2@empresa.pt"
                      className="bg-dark-bg border-dark-border text-dark-primary-text"
                    />
                  </div>
                )}

                <Button
                  onClick={handleCreateExport}
                  disabled={selectedQueries.length === 0 || !exportFormat}
                  className="w-full bg-dark-cta hover:bg-blue-600 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Criar Exportação
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Export History & Stats */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="dark-card">
            <div className="p-4">
              <h4 className="text-dark-primary-text font-medium mb-4">Estatísticas</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-dark-secondary text-sm">Total Exportações</span>
                  <span className="text-dark-primary-text font-medium">{exportHistory.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-secondary text-sm">Concluídas</span>
                  <span className="text-dark-positive font-medium">
                    {exportHistory.filter(e => e.status === "completed").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-secondary text-sm">Em Processamento</span>
                  <span className="text-dark-cta font-medium">
                    {exportHistory.filter(e => e.status === "processing").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-secondary text-sm">Total Downloads</span>
                  <span className="text-dark-primary-text font-medium">
                    {exportHistory.reduce((sum, e) => sum + e.downloads, 0)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Export History */}
          <Card className="dark-card">
            <div className="p-4">
              <h4 className="text-dark-primary-text font-medium mb-4">Histórico de Exportações</h4>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {exportHistory.map((export_item) => (
                  <div key={export_item.id} className="border border-dark-border rounded-lg p-3 hover:bg-dark-hover">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="text-dark-primary-text font-medium text-sm line-clamp-1">
                        {export_item.name}
                      </h5>
                      {getStatusIcon(export_item.status)}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-dark-secondary mb-2">
                      <Badge variant="outline" className="bg-dark-tag border-dark-border text-dark-secondary text-xs">
                        {export_item.format}
                      </Badge>
                      <span>•</span>
                      <span>{getStatusText(export_item.status)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-dark-secondary">
                      <span>{formatTimeAgo(export_item.createdAt)}</span>
                      <div className="flex items-center gap-3">
                        {export_item.size !== "—" && <span>{export_item.size}</span>}
                        {export_item.status === "completed" && (
                          <Button variant="ghost" size="sm" className="text-dark-cta hover:text-dark-primary-text h-6 px-2">
                            <Download className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}