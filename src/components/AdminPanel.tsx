import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Users, 
  Database, 
  Settings, 
  Activity, 
  Shield, 
  BarChart3, 
  Server, 
  Lock,
  UserPlus,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  Plus
} from "lucide-react";
import { Progress } from "./ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Switch } from "./ui/switch";

interface User {
  email: string;
  name: string;
  role: "analyst" | "manager" | "admin";
}

interface AdminPanelProps {
  user: User | null;
}

// Mock data
const systemStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalQueries: 45678,
  avgResponseTime: "1.2s",
  uptime: "99.8%",
  dataProcessed: "2.4TB"
};

const usageData = [
  { month: "Jan", queries: 2400, users: 240, dataProcessed: 180 },
  { month: "Fev", queries: 1398, users: 221, dataProcessed: 220 },
  { month: "Mar", queries: 9800, users: 289, dataProcessed: 290 },
  { month: "Abr", queries: 3908, users: 300, dataProcessed: 340 },
  { month: "Mai", queries: 4800, users: 310, dataProcessed: 380 },
  { month: "Jun", queries: 3800, users: 320, dataProcessed: 420 }
];

const userRoleData = [
  { name: "Analistas", value: 60, color: "#3B82F6" },
  { name: "Gestores", value: 25, color: "#22C55E" },
  { name: "Administradores", value: 15, color: "#F59E0B" }
];

const mockUsers = [
  { id: 1, name: "Ana Costa", email: "ana@empresa.pt", role: "analyst", status: "active", lastLogin: "2 min atrás", queries: 145 },
  { id: 2, name: "Miguel Santos", email: "miguel@empresa.pt", role: "manager", status: "active", lastLogin: "1h atrás", queries: 89 },
  { id: 3, name: "Carlos Ferreira", email: "carlos@empresa.pt", role: "admin", status: "active", lastLogin: "3h atrás", queries: 234 },
  { id: 4, name: "Sofia Oliveira", email: "sofia@empresa.pt", role: "analyst", status: "inactive", lastLogin: "2d atrás", queries: 67 },
  { id: 5, name: "João Silva", email: "joao@empresa.pt", role: "manager", status: "active", lastLogin: "30min atrás", queries: 123 }
];

const mockConnectors = [
  { id: 1, name: "Primavera ERP", type: "Database", status: "connected", lastSync: "5min atrás", records: "15.4K" },
  { id: 2, name: "GLPI", type: "API", status: "connected", lastSync: "2min atrás", records: "8.9K" },
  { id: 3, name: "DocuWare", type: "Document System", status: "warning", lastSync: "1h atrás", records: "45.1K" },
  { id: 4, name: "Analytics DB", type: "Data Warehouse", status: "connected", lastSync: "1min atrás", records: "128.9K" },
  { id: 5, name: "SharePoint", type: "Cloud Storage", status: "error", lastSync: "6h atrás", records: "0" }
];

const systemAlerts = [
  { id: 1, type: "warning", title: "Alto uso de CPU no servidor de análise", time: "5min atrás" },
  { id: 2, type: "error", title: "Falha na conexão com SharePoint", time: "1h atrás" },
  { id: 3, type: "info", title: "Backup diário concluído com sucesso", time: "2h atrás" },
  { id: 4, type: "warning", title: "Limite de consultas quase atingido", time: "3h atrás" }
];

export function AdminPanel({ user }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
      case "active":
        return <CheckCircle className="w-4 h-4 text-theme-positive" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "error":
      case "inactive":
        return <AlertTriangle className="w-4 h-4 text-theme-negative" />;
      default:
        return <Clock className="w-4 h-4 text-theme-secondary" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "analyst":
        return "Analista";
      case "manager":
        return "Gestor";
      case "admin":
        return "Administrador";
      default:
        return role;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-theme-primary font-bold text-2xl">Painel Administrativo</h2>
          <p className="text-theme-secondary">Gestão completa do sistema SmartBI Assistant</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-theme text-theme-secondary">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Novo Utilizador
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-md bg-theme-card border border-theme">
          <TabsTrigger value="overview" className="text-sm">Visão Geral</TabsTrigger>
          <TabsTrigger value="users" className="text-sm">Utilizadores</TabsTrigger>
          <TabsTrigger value="connectors" className="text-sm">Conectores</TabsTrigger>
          <TabsTrigger value="system" className="text-sm">Sistema</TabsTrigger>
          <TabsTrigger value="settings" className="text-sm">Definições</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <Card className="bg-theme-card border-theme p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-theme-secondary text-sm">Total Utilizadores</p>
                  <p className="text-theme-primary font-bold text-xl">{systemStats.totalUsers}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-theme-card border-theme p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-theme-secondary text-sm">Utilizadores Ativos</p>
                  <p className="text-theme-primary font-bold text-xl">{systemStats.activeUsers}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-theme-card border-theme p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-theme-secondary text-sm">Total Consultas</p>
                  <p className="text-theme-primary font-bold text-xl">{systemStats.totalQueries.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-theme-card border-theme p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-theme-secondary text-sm">Tempo Médio</p>
                  <p className="text-theme-primary font-bold text-xl">{systemStats.avgResponseTime}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-theme-card border-theme p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <Server className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-theme-secondary text-sm">Uptime</p>
                  <p className="text-theme-primary font-bold text-xl">{systemStats.uptime}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-theme-card border-theme p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-100">
                  <Database className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-theme-secondary text-sm">Dados Processados</p>
                  <p className="text-theme-primary font-bold text-xl">{systemStats.dataProcessed}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Usage Trends */}
            <Card className="lg:col-span-2 bg-theme-card border-theme p-6">
              <h3 className="text-theme-primary font-semibold mb-4">Tendências de Uso</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      axisLine={{ stroke: "var(--border)" }}
                    />
                    <YAxis 
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      axisLine={{ stroke: "var(--border)" }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        color: "var(--foreground)"
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="queries" 
                      stackId="1"
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.1}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stackId="1"
                      stroke="#22C55E" 
                      fill="#22C55E" 
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* User Role Distribution */}
            <Card className="bg-theme-card border-theme p-6">
              <h3 className="text-theme-primary font-semibold mb-4">Distribuição de Funções</h3>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userRoleData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {userRoleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {userRoleData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-theme-secondary text-sm">{item.name}</span>
                    </div>
                    <span className="text-theme-primary font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* System Alerts */}
          <Card className="bg-theme-card border-theme p-6">
            <h3 className="text-theme-primary font-semibold mb-4">Alertas do Sistema</h3>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-theme-hover"
                >
                  {alert.type === "error" && <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />}
                  {alert.type === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />}
                  {alert.type === "info" && <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-theme-primary font-medium">{alert.title}</p>
                    <p className="text-theme-secondary text-sm">{alert.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* User Management Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-secondary" />
                <Input
                  placeholder="Pesquisar utilizadores..."
                  className="pl-10 w-80 bg-theme-bg border-theme"
                />
              </div>
              <Button variant="outline" className="border-theme">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Adicionar Utilizador
            </Button>
          </div>

          {/* Users Table */}
          <Card className="bg-theme-card border-theme">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-theme">
                    <TableHead className="text-theme-primary">Nome</TableHead>
                    <TableHead className="text-theme-primary">Email</TableHead>
                    <TableHead className="text-theme-primary">Função</TableHead>
                    <TableHead className="text-theme-primary">Status</TableHead>
                    <TableHead className="text-theme-primary">Último Login</TableHead>
                    <TableHead className="text-theme-primary">Consultas</TableHead>
                    <TableHead className="text-theme-primary">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id} className="border-theme hover:bg-theme-hover">
                      <TableCell className="font-medium text-theme-primary">{user.name}</TableCell>
                      <TableCell className="text-theme-secondary">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-theme text-theme-primary">
                          {getRoleDisplayName(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(user.status)}
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                            {user.status === "active" ? "Ativo" : "Inativo"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-theme-secondary">{user.lastLogin}</TableCell>
                      <TableCell className="text-theme-primary font-medium">{user.queries}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-theme-card border-theme">
                            <DropdownMenuItem className="text-theme-primary hover:bg-theme-hover">
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-theme-primary hover:bg-theme-hover">
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Connectors Tab */}
        <TabsContent value="connectors" className="space-y-6">
          <Card className="bg-theme-card border-theme p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-theme-primary font-semibold">Conectores de Dados</h3>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Novo Conector
              </Button>
            </div>
            
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-theme">
                    <TableHead className="text-theme-primary">Nome</TableHead>
                    <TableHead className="text-theme-primary">Tipo</TableHead>
                    <TableHead className="text-theme-primary">Status</TableHead>
                    <TableHead className="text-theme-primary">Última Sync</TableHead>
                    <TableHead className="text-theme-primary">Registos</TableHead>
                    <TableHead className="text-theme-primary">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockConnectors.map((connector) => (
                    <TableRow key={connector.id} className="border-theme hover:bg-theme-hover">
                      <TableCell className="font-medium text-theme-primary">{connector.name}</TableCell>
                      <TableCell className="text-theme-secondary">{connector.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(connector.status)}
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(connector.status)}`}>
                            {connector.status === "connected" ? "Conectado" : 
                             connector.status === "warning" ? "Aviso" : 
                             connector.status === "error" ? "Erro" : "Desconectado"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-theme-secondary">{connector.lastSync}</TableCell>
                      <TableCell className="text-theme-primary font-medium">{connector.records}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Switch checked={connector.status === "connected"} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-theme-card border-theme p-6">
              <h3 className="text-theme-primary font-semibold mb-4">Performance do Sistema</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-theme-secondary">CPU</span>
                  <span className="text-theme-primary font-medium">45%</span>
                </div>
                <div className="w-full bg-theme-hover rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-theme-secondary">Memória</span>
                  <span className="text-theme-primary font-medium">72%</span>
                </div>
                <div className="w-full bg-theme-hover rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-theme-secondary">Armazenamento</span>
                  <span className="text-theme-primary font-medium">38%</span>
                </div>
                <div className="w-full bg-theme-hover rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "38%" }}></div>
                </div>
              </div>
            </Card>

            <Card className="bg-theme-card border-theme p-6">
              <h3 className="text-theme-primary font-semibold mb-4">Ações do Sistema</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-theme">
                  <Download className="w-4 h-4 mr-2" />
                  Fazer Backup
                </Button>
                <Button variant="outline" className="w-full justify-start border-theme">
                  <Upload className="w-4 h-4 mr-2" />
                  Restaurar Backup
                </Button>
                <Button variant="outline" className="w-full justify-start border-theme">
                  <Activity className="w-4 h-4 mr-2" />
                  Reiniciar Serviços
                </Button>
                <Button variant="outline" className="w-full justify-start border-theme text-red-600 hover:text-red-700">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Modo de Manutenção
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-theme-card border-theme p-6">
              <h3 className="text-theme-primary font-semibold mb-4">Configurações Gerais</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-theme-primary font-medium">Registos de Auditoria</p>
                    <p className="text-theme-secondary text-sm">Manter logs de todas as ações</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-theme-primary font-medium">Auto-backup</p>
                    <p className="text-theme-secondary text-sm">Backup automático diário</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-theme-primary font-medium">Notificações Email</p>
                    <p className="text-theme-secondary text-sm">Alertas por email para administradores</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            <Card className="bg-theme-card border-theme p-6">
              <h3 className="text-theme-primary font-semibold mb-4">Configurações de Segurança</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-theme-primary font-medium text-sm mb-2 block">
                    Tempo de Sessão (minutos)
                  </label>
                  <Input
                    type="number"
                    defaultValue="60"
                    className="bg-theme-bg border-theme"
                  />
                </div>
                <div>
                  <label className="text-theme-primary font-medium text-sm mb-2 block">
                    Tentativas de Login
                  </label>
                  <Input
                    type="number"
                    defaultValue="3"
                    className="bg-theme-bg border-theme"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-theme-primary font-medium">Autenticação 2FA</p>
                    <p className="text-theme-secondary text-sm">Obrigar autenticação dupla</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}