import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Eye, EyeOff, Lock, Mail, Sun, Moon, Monitor, ArrowRight, Shield, Brain } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import rcsLogo from 'figma:asset/475eb8db9bfa84fda5f9b1a93c78983a9a89885d.png';

interface LoginPageProps {
  onLogin: (credentials: {
    email: string;
    password: string;
  }) => void;
  isSmartBI?: boolean;
}

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const demoCredentials = [
  {
    role: "Usuário",
    email: "usuario@rcs.pt",
    password: "demo123",
    description:
      "Portal do Cliente - Pesquisa de produtos e cotações",
    color: "bg-blue-600",
  },
  {
    role: "Administrador",
    email: "admin@rcs.pt",
    password: "demo123",
    description:
      "Painel Administrativo - Gestão completa do sistema",
    color: "bg-indigo-600",
  },
];

const smartBIDemoCredentials = [
  {
    role: "Analista",
    email: "analista@smartbi.pt",
    password: "demo123",
    description:
      "Consultas e análises de dados empresariais",
    color: "bg-blue-600",
  },
  {
    role: "Gestor",
    email: "gestor@smartbi.pt",
    password: "demo123",
    description:
      "Gestão e supervisão de análises",
    color: "bg-indigo-600",
  },
  {
    role: "Administrador",
    email: "admin@smartbi.pt",
    password: "demo123",
    description:
      "Configuração completa do sistema",
    color: "bg-purple-600",
  },
];

const SpiderWebBackground = ({ containerId }: { containerId: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = document.getElementById(containerId);
    if (!canvas || !container) return;

    containerRef.current = container as HTMLDivElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Initialize points only within the left container
      pointsRef.current = [];
      const numPoints = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < numPoints; i++) {
        pointsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      };
    };

    const animate = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update points
      pointsRef.current.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
      });

      // Draw points
      pointsRef.current.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fill();
        
        ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connections
      const maxDistance = 120;
      const mouseDistance = 200;
      
      pointsRef.current.forEach((point, i) => {
        // Connect to mouse
        const distToMouse = Math.sqrt(
          Math.pow(point.x - mouseRef.current.x, 2) +
            Math.pow(point.y - mouseRef.current.y, 2),
        );
        
        if (distToMouse < mouseDistance) {
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          const opacity = 1 - distToMouse / mouseDistance;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
          ctx.lineWidth = 2;
          ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
          
          // Draw pulsing circle at mouse
          ctx.beginPath();
          ctx.arc(mouseRef.current.x, mouseRef.current.y, 8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, 0.8)`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Connect to nearby points
        pointsRef.current.slice(i + 1).forEach((otherPoint) => {
          const distance = Math.sqrt(
            Math.pow(point.x - otherPoint.x, 2) +
              Math.pow(point.y - otherPoint.y, 2),
          );
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    container.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      container.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [containerId]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export function LoginPage({ onLogin, isSmartBI = false }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      onLogin({ email, password });
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = (credentials: {
    email: string;
    password: string;
  }) => {
    setEmail(credentials.email);
    setPassword(credentials.password);
    setTimeout(() => {
      onLogin(credentials);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-theme-bg transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <motion.button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-theme-card border border-theme shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-theme-primary" />
          ) : (
            <Moon className="w-5 h-5 text-theme-primary" />
          )}
        </motion.button>
      </div>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-0 bg-theme-card rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Left Side - Branding */}
          <div className="relative bg-gradient-to-br from-primary via-primary to-blue-700 p-8 lg:p-12 flex items-center justify-center">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 text-center text-white max-w-md">
              {/* Logo */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="inline-flex p-4 rounded-3xl bg-white/20 backdrop-blur-sm border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(255, 255, 255, 0.2)",
                      "0 0 40px rgba(255, 255, 255, 0.3)",
                      "0 0 20px rgba(255, 255, 255, 0.2)",
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 3, repeat: Infinity }
                  }}
                >
                  <img
                    src={rcsLogo}
                    alt="RCS Angola"
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  {isSmartBI ? "SmartBI Assistant" : "SmartQuote RCS"}
                </h1>
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  {isSmartBI 
                    ? "Assistente inteligente de Business Intelligence para análise e consulta de dados empresariais com IA."
                    : "Plataforma inteligente de Cotações com IA para automação completa de procurement e gestão de fornecedores."
                  }
                </p>

                {/* Features */}
                <div className="space-y-3 text-left">
                  {(isSmartBI ? [
                    { icon: Brain, text: "Consultas em Linguagem Natural" },
                    { icon: Shield, text: "Conexão Segura com Múltiplas Fontes" },
                    { icon: ArrowRight, text: "Insights Automáticos com IA" }
                  ] : [
                    { icon: Brain, text: "Processamento Automático com IA" },
                    { icon: Shield, text: "Gestão Inteligente de Fornecedores" },
                    { icon: ArrowRight, text: "Fluxos de Aprovação Configuráveis" }
                  ]).map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.text}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      >
                        <div className="p-2 rounded-full bg-white/20">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-white/90">{feature.text}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-8 lg:p-12 flex items-center justify-center">
            <div className="w-full max-w-sm">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-theme-primary mb-2">
                    Bem-vindo de volta
                  </h2>
                  <p className="text-theme-secondary">
                    {isSmartBI 
                      ? "Acesse o assistente de Business Intelligence"
                      : "Acesse a plataforma de cotações inteligente"
                    }
                  </p>
                </div>

                {/* Demo Credentials */}
                <div className="mb-6 p-4 bg-theme-hover rounded-xl">
                  <h4 className="text-sm font-semibold text-theme-primary mb-3">Credenciais de Demonstração:</h4>
                  <div className="space-y-2 text-xs">
                    {(isSmartBI ? smartBIDemoCredentials : demoCredentials).map((cred, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Badge variant="outline" className={`${cred.color} text-white border-none text-xs`}>
                          {cred.role}
                        </Badge>
                        <span className="text-theme-secondary">{cred.email}</span>
                      </div>
                    ))}
                    <p className="text-theme-secondary mt-2">Senha: <code className="bg-theme-bg px-1 rounded">demo123</code></p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-theme-primary font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-secondary" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 bg-theme-bg border-theme text-theme-primary placeholder:text-theme-secondary focus:border-primary focus:ring-primary/20"
                        placeholder={isSmartBI ? "analista@smartbi.pt" : "usuario@rcs.pt"}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-theme-primary font-medium">
                      Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-secondary" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-12 h-12 bg-theme-bg border-theme text-theme-primary placeholder:text-theme-secondary focus:border-primary focus:ring-primary/20"
                        placeholder="Digite sua senha"
                        required
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-theme-secondary hover:text-theme-primary transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-theme-secondary">
                      <input
                        type="checkbox"
                        id="remember"
                        className="rounded border-theme bg-theme-bg text-primary focus:ring-primary/20"
                      />
                      Lembrar-me
                    </label>
                    <a href="#" className="text-primary hover:underline">
                      Esqueceu a senha?
                    </a>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Entrando...</span>
                        </div>
                      ) : (
                        <>
                          {isSmartBI ? "Acessar SmartBI" : "Acessar SmartQuote"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-theme-secondary">
                  <p>&copy; 2024 RCS Angola. Todos os direitos reservados.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}