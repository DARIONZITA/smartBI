import React, { useState } from "react";
import { Brain, Database, BarChart3, FileText, Search, Settings, LogOut, Mic, Send, Download, History, Lightbulb, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { QueryInterface } from "./QueryInterface";
import { DataVisualization } from "./DataVisualization";
import { QueryHistory } from "./QueryHistory";
import { DataConnectors } from "./DataConnectors";
import { InsightsDashboard } from "./InsightsDashboard";
import { ExportManager } from "./ExportManager";
import { AdminPanel } from "./AdminPanel";

interface User {
  email: string;
  name: string;
  role: "analyst" | "manager" | "admin";
}

interface SmartBIAssistantProps {
  user: User | null;
  onLogout: () => void;
}

type ActiveTab = "query" | "history" | "connectors" | "insights" | "export" | "admin";

export function SmartBIAssistant({ user, onLogout }: SmartBIAssistantProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("query");
  const [queries, setQueries] = useState<any[]>([]);
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { id: "query", label: "Consultas", icon: Search },
    { id: "history", label: "Histórico", icon: History },
    { id: "connectors", label: "Conectores", icon: Database },
    { id: "insights", label: "Insights", icon: Lightbulb },
    { id: "export", label: "Exportar", icon: Download },
    ...(user?.role === "admin" ? [{ id: "admin", label: "Administração", icon: Settings }] : [])
  ];

  const handleAddQuery = (query: any) => {
    setQueries(prev => [query, ...prev]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "query":
        return <QueryInterface user={user} onAddQuery={handleAddQuery} />;
      case "history":
        return <QueryHistory queries={queries} onRerunQuery={handleAddQuery} />;
      case "connectors":
        return <DataConnectors user={user} />;
      case "insights":
        return <InsightsDashboard user={user} />;
      case "export":
        return <ExportManager queries={queries} user={user} />;
      case "admin":
        return user?.role === "admin" ? <AdminPanel user={user} /> : <QueryInterface user={user} onAddQuery={handleAddQuery} />;
      default:
        return <QueryInterface user={user} onAddQuery={handleAddQuery} />;
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg transition-colors duration-300">
      {/* Header */}
      <header className="bg-theme-card border-b border-theme px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-theme-primary font-bold text-xl">SmartBI Assistant</h1>
              <p className="text-theme-secondary text-sm">Assistente de Business Intelligence com IA</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="text-theme-secondary hover:text-theme-primary hover:bg-theme-hover"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            <Badge variant="outline" className="border-theme text-theme-primary">
              {user?.role === "analyst" ? "Analista" : user?.role === "manager" ? "Gestor" : "Administrador"}
            </Badge>
            <div className="text-right">
              <p className="text-theme-primary font-medium text-sm">{user?.name}</p>
              <p className="text-theme-secondary text-xs">{user?.email}</p>
            </div>
            <Button
              onClick={onLogout}
              variant="ghost"
              size="sm"
              className="text-theme-secondary hover:text-theme-primary hover:bg-theme-hover"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-theme-card border-r border-theme p-4">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "bg-theme-hover text-theme-primary border border-primary" 
                      : "text-theme-secondary hover:text-theme-primary hover:bg-theme-hover"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}