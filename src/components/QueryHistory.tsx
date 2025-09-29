import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, Clock, RotateCcw, Download, Share, Filter, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface QueryHistoryProps {
  queries: any[];
  onRerunQuery: (query: any) => void;
}

export function QueryHistory({ queries, onRerunQuery }: QueryHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredQueries = queries
    .filter(query => 
      query.query.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterSource === "all" || query.dataSource === filterSource)
    )
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
      return 0;
    });

  const dataSources = [...new Set(queries.map(q => q.dataSource))];

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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-dark-primary-text font-bold text-xl">Histórico de Consultas</h2>
          <p className="text-dark-secondary">Gerencie e reutilize consultas anteriores</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-dark-tag border-dark-border text-dark-primary-text">
            {queries.length} consultas
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="dark-card">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-secondary" />
                <Input
                  placeholder="Pesquisar consultas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-dark-bg border-dark-border text-dark-primary-text"
                />
              </div>
            </div>
            
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-48 bg-dark-bg border-dark-border text-dark-primary-text">
                <SelectValue placeholder="Filtrar por fonte" />
              </SelectTrigger>
              <SelectContent className="bg-dark-card border-dark-border">
                <SelectItem value="all" className="text-dark-primary-text hover:bg-dark-hover">
                  Todas as fontes
                </SelectItem>
                {dataSources.map(source => (
                  <SelectItem key={source} value={source} className="text-dark-primary-text hover:bg-dark-hover">
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-dark-bg border-dark-border text-dark-primary-text">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent className="bg-dark-card border-dark-border">
                <SelectItem value="recent" className="text-dark-primary-text hover:bg-dark-hover">
                  Mais recente
                </SelectItem>
                <SelectItem value="oldest" className="text-dark-primary-text hover:bg-dark-hover">
                  Mais antiga
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Query List */}
      <div className="space-y-4">
        {filteredQueries.length === 0 ? (
          <Card className="dark-card">
            <div className="p-8 text-center">
              <Clock className="w-12 h-12 text-dark-secondary mx-auto mb-4" />
              <h3 className="text-dark-primary-text font-medium mb-2">
                {queries.length === 0 ? "Nenhuma consulta encontrada" : "Nenhuma consulta corresponde aos filtros"}
              </h3>
              <p className="text-dark-secondary text-sm">
                {queries.length === 0 
                  ? "Faça sua primeira consulta para ver o histórico aqui." 
                  : "Tente ajustar os filtros de pesquisa."}
              </p>
            </div>
          </Card>
        ) : (
          filteredQueries.map((query, index) => (
            <Card key={query.id} className="dark-card hover:bg-dark-hover transition-colors">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-dark-primary-text font-medium line-clamp-1">
                        {query.query}
                      </h4>
                      <Badge variant="outline" className="bg-dark-tag border-dark-border text-dark-secondary text-xs">
                        {query.dataSource}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-dark-secondary mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimeAgo(query.timestamp)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{query.timestamp.toLocaleDateString("pt-PT")}</span>
                      </div>
                      <span>Por: {query.user}</span>
                    </div>

                    {/* Insights Preview */}
                    {query.insights && query.insights.length > 0 && (
                      <div className="bg-dark-bg p-3 rounded-lg">
                        <p className="text-dark-secondary text-sm line-clamp-2">
                          <strong className="text-dark-primary-text">Insights:</strong> {query.insights[0]}
                          {query.insights.length > 1 && <span className="text-dark-cta"> +{query.insights.length - 1} mais</span>}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRerunQuery(query)}
                      className="text-dark-secondary hover:text-dark-primary-text hover:bg-dark-bg"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-dark-secondary hover:text-dark-primary-text hover:bg-dark-bg"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-dark-secondary hover:text-dark-primary-text hover:bg-dark-bg"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}