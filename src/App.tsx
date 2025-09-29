import { useState, useEffect } from "react";
import { SmartBIAssistant } from "./components/SmartBIAssistant";
import { LoginPage } from "./components/LoginPage";
import { ThemeProvider } from "./components/ThemeProvider";

interface User {
  email: string;
  name: string;
  role: "analyst" | "manager" | "admin";
}

const userCredentials = [
  {
    email: "analista@smartbi.pt",
    password: "demo123",
    userData: {
      email: "analista@smartbi.pt",
      name: "Ana Costa",
      role: "analyst" as const
    }
  },
  {
    email: "gestor@smartbi.pt", 
    password: "demo123",
    userData: {
      email: "gestor@smartbi.pt",
      name: "Miguel Santos",
      role: "manager" as const
    }
  },
  {
    email: "admin@smartbi.pt",
    password: "demo123", 
    userData: {
      email: "admin@smartbi.pt",
      name: "Carlos Ferreira",
      role: "admin" as const
    }
  }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se o usuário já está logado (localStorage)
    const savedAuth = localStorage.getItem("smartbi_auth");
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setIsAuthenticated(true);
        setUser(authData.user);
      } catch (error) {
        localStorage.removeItem("smartbi_auth");
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (credentials: { email: string; password: string }) => {
    const validUser = userCredentials.find(
      cred => cred.email === credentials.email && cred.password === credentials.password
    );

    if (validUser) {
      setUser(validUser.userData);
      setIsAuthenticated(true);
      
      // Salvar no localStorage
      localStorage.setItem("smartbi_auth", JSON.stringify({
        user: validUser.userData,
        timestamp: Date.now()
      }));
    } else {
      alert("Credenciais inválidas. Verifique as credenciais de demonstração.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("smartbi_auth");
  };

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-theme-bg flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-theme-secondary">Carregando SmartBI Assistant...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <LoginPage onLogin={handleLogin} isSmartBI={true} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <SmartBIAssistant user={user} onLogout={handleLogout} />
    </ThemeProvider>
  );
}