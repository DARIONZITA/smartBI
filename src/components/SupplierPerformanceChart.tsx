import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

const supplierData = [
  { name: "Energia", value: 42, color: "bg-blue-500", textColor: "text-blue-700" },
  { name: "TI", value: 28, color: "bg-green-500", textColor: "text-green-700" },
  { name: "Impressão", value: 18, color: "bg-yellow-500", textColor: "text-yellow-700" },
  { name: "Outros", value: 12, color: "bg-purple-500", textColor: "text-purple-700" },
];

export function SupplierPerformanceChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg lg:text-xl">Distribuição de Fornecedores</CardTitle>
        <CardDescription>
          Fornecedores ativos por categoria e métricas de desempenho
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {supplierData.map((supplier, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${supplier.color}`}></div>
                <span className="text-sm font-medium text-foreground">{supplier.name}</span>
              </div>
              <Badge variant="secondary" className={supplier.textColor}>
                {supplier.value}%
              </Badge>
            </div>
            <Progress value={supplier.value} className="h-2" />
          </div>
        ))}
        
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">4</div>
              <div className="text-muted-foreground">Categorias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div className="text-muted-foreground">Cobertura</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}