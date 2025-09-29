import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { 
  Database, 
  AlertCircle, 
  FileText, 
  TrendingUp, 
  Plus, 
  Settings, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Globe,
  Server,
  Cloud,
  HardDrive
} from "lucide-react";

interface User {
  email: string;
  name: string;
  role: "analyst" | "manager" | "admin";
}

interface DataConnectorsProps {
  user: User | null;
}

interface Connector {
  id: string;
  name: string;
  type: string;
  icon: any;
  status: "connected" | "disconnected" | "error" | "configuring";
  lastSync: Date;
  recordCount: string;
  description: string;
  capabilities: string[];
  connectionString?: string;
  isActive: boolean;
}

const mockConnectors: Connector[] = [
  {
    id: "primavera",
    name: "Primavera ERP",
    type: "ERP System",
    icon: Database,
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    recordCount: "15,423 registos",
    description: "Sistema de gestão empresarial com dados de vendas, compras, stocks e finanças.",
    capabilities: ["SQL Queries", "Real-time", "Batch Export"],
    connectionString: "primavera.empresa.pt:1433",
    isActive: true
  },
  {
    id: "glpi",
    name: "GLPI",
    type: "ITSM Platform",
    icon: AlertCircle,
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
    recordCount: "8,901 tickets",
    description: "Plataforma de gestão de serviços de TI com tickets, inventário e conhecimento.",
    capabilities: ["REST API", "Webhooks", "Custom Fields"],
    connectionString: "glpi.empresa.pt/api",
    isActive: true
  },
  {
    id: "docuware",
    name: "DocuWare",
    type: "Document Management",
    icon: FileText,
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
    recordCount: "45,123 documentos",
    description: "Sistema de gestão documental com workflows de aprovação e arquivo digital.",
    capabilities: ["Document Search", "Metadata", "OCR Content"],
    connectionString: "docuware.empresa.pt/platform",
    isActive: true
  },
  {
    id: "analytics",
    name: "Analytics Database",
    type: "Data Warehouse",
    icon: TrendingUp,
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 2), // 2 min ago
    recordCount: "128,990 eventos",
    description: "Base de dados de analytics com métricas de performance e comportamento.",
    capabilities: ["Time Series", "Aggregations", "Machine Learning"],
    connectionString: "analytics-db.empresa.pt:5432",
    isActive: true
  },
  {
    id: "sharepoint",
    name: "SharePoint Online",
    type: "Collaboration Platform",
    icon: Cloud,
    status: "disconnected",
    lastSync: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    recordCount: "0 registos",
    description: "Plataforma de colaboração Microsoft com documentos, listas e sites.",
    capabilities: ["Graph API", "Site Collections", "List Items"],
    isActive: false
  },
  {
    id: "sql-server",
    name: "SQL Server Legacy",
    type: "Database Server",
    icon: Server,
    status: "error",
    lastSync: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    recordCount: "Unknown",
    description: "Servidor de base de dados legado com dados históricos da empresa.",
    capabilities: ["SQL Queries", "Stored Procedures", "Views"],
    connectionString: "legacy-sql.empresa.pt:1433",
    isActive: false
  }
];

export function DataConnectors({ user }: DataConnectorsProps) {
  const [connectors, setConnectors] = useState<Connector[]>(mockConnectors);
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);
  const [showAddConnector, setShowAddConnector] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-theme-positive" />;
      case "disconnected":
        return <XCircle className="w-4 h-4 text-theme-secondary" />;
      case "error":
        return <XCircle className="w-4 h-4 text-theme-negative" />;
      case "configuring":
        return <RefreshCw className="w-4 h-4 text-theme-cta animate-spin" />;
      default:
        return <XCircle className="w-4 h-4 text-theme-secondary" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "Conectado";
      case "disconnected":
        return "Desconectado";
      case "error":
        return "Erro";
      case "configuring":
        return "Configurando";
      default:
        return "Desconhecido";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 border-green-200 text-green-800";
      case "disconnected":
        return "bg-gray-100 border-gray-200 text-gray-800";
      case "error":
        return "bg-red-100 border-red-200 text-red-800";
      case "configuring":
        return "bg-blue-100 border-blue-200 text-blue-800";
      default:
        return "bg-gray-100 border-gray-200 text-gray-800";
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Agora mesmo";
    if (minutes < 60) return `${minutes}min atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days}d atrás`;
  };

  const handleToggleConnector = (connectorId: string) => {
    setConnectors(prev => prev.map(conn => 
      conn.id === connectorId 
        ? { ...conn, isActive: !conn.isActive, status: !conn.isActive ? "connected" : "disconnected" }
        : conn
    ));
  };

  const connectedCount = connectors.filter(c => c.status === "connected").length;
  const totalRecords = connectors
    .filter(c => c.status === "connected")
    .reduce((sum, c) => {
      const match = c.recordCount.match(/(\d+(?:,\d+)*)/);
      return sum + (match ? parseInt(match[1].replace(/,/g, "")) : 0);
    }, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-theme-primary font-bold text-xl">Conectores de Dados</h2>
          <p className="text-theme-secondary">Gerencie conexões com fontes de dados externas</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right text-sm">
            <p className="text-theme-primary font-medium">{connectedCount}/{connectors.length} Ativos</p>
            <p className="text-theme-secondary">{totalRecords.toLocaleString()} registos</p>
          </div>
          {(user?.role === "admin" || user?.role === "manager") && (
            <Button
              onClick={() => setShowAddConnector(true)}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-theme-card border-theme p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-theme-secondary text-sm">Conectados</p>
              <p className="text-theme-primary font-bold text-xl">{connectedCount}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-theme-card border-theme p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-theme-secondary text-sm">Total Registos</p>
              <p className="text-theme-primary font-bold text-xl">{totalRecords.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-theme-card border-theme p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <RefreshCw className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-theme-secondary text-sm">Última Sincronização</p>
              <p className="text-theme-primary font-bold text-sm">
                {formatTimeAgo(new Date(Math.max(...connectors.filter(c => c.status === "connected").map(c => c.lastSync.getTime()))))}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-theme-card border-theme p-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-theme-secondary text-sm">Com Erro</p>
              <p className="text-theme-primary font-bold text-xl">
                {connectors.filter(c => c.status === "error").length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Connectors List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {connectors.map((connector) => {
          const Icon = connector.icon;
          return (
            <Card key={connector.id} className="bg-theme-card border-theme p-4 hover:bg-theme-hover transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-theme-primary font-semibold">{connector.name}</h3>
                    <p className="text-theme-secondary text-sm">{connector.type}</p>
                  </div>
                </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(connector.status)}>
                      {getStatusIcon(connector.status)}
                      <span className="ml-1">{getStatusText(connector.status)}</span>
                    </Badge>
                    {(user?.role === "admin" || user?.role === "manager") && (
                      <Switch
                        checked={connector.isActive}
                        onCheckedChange={() => handleToggleConnector(connector.id)}
                      />
                    )}
                  </div>
              </div>

              <p className="text-theme-secondary text-sm mb-4">{connector.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-theme-secondary">Registos:</span>
                  <span className="text-theme-primary font-medium">{connector.recordCount}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-theme-secondary">Última Sincronização:</span>
                  <span className="text-theme-primary">{formatTimeAgo(connector.lastSync)}</span>
                </div>

                {connector.connectionString && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-theme-secondary">Conexão:</span>
                    <span className="text-theme-primary font-mono text-xs">{connector.connectionString}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mt-4">
                {connector.capabilities.map((capability, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="border-theme text-theme-secondary text-xs"
                  >
                    {capability}
                  </Badge>
                ))}
              </div>

              {(user?.role === "admin" || user?.role === "manager") && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-theme">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-theme-secondary hover:text-theme-primary flex-1"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-theme-secondary hover:text-theme-primary"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sincronizar
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Add Connector Modal */}
      {showAddConnector && (user?.role === "admin" || user?.role === "manager") && (
        <Card className="bg-theme-card border-theme p-6">
          <h3 className="text-theme-primary font-semibold mb-4">Adicionar Novo Conector</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "MySQL Database", icon: Database, type: "Database" },
              { name: "PostgreSQL", icon: Database, type: "Database" },
              { name: "REST API", icon: Globe, type: "API" },
              { name: "CSV File", icon: FileText, type: "File" },
              { name: "Excel Workbook", icon: FileText, type: "File" },
              { name: "Azure SQL", icon: Cloud, type: "Cloud" },
            ].map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={index}
                  className="p-4 border border-theme rounded-lg hover:border-primary hover:bg-theme-hover transition-colors text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-theme-primary font-medium">{option.name}</span>
                  </div>
                  <p className="text-theme-secondary text-sm">{option.type}</p>
                </button>
              );
            })}
          </div>
          <div className="flex gap-2 mt-6">
            <Button
              onClick={() => setShowAddConnector(false)}
              variant="outline"
              className="border-theme text-theme-secondary hover:text-theme-primary"
            >
              Cancelar
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}