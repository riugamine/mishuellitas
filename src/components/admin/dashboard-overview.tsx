"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBox, 
  faShoppingCart, 
  faTags, 
  faDollarSign,
  faChartLine,
  faPlus,
  faEye,
  faCog,
  faArrowUp,
  faArrowDown,
  faCircle
} from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: any;
  iconColor: string;
}

interface RecentOrder {
  id: string;
  customerName: string;
  total: number;
  status: "pending" | "processing" | "shipped";
  createdAt: string;
}

/**
 * Dashboard overview component with modern design using consistent color system
 */
export function DashboardOverview() {
  const stats: StatCard[] = [
    {
      title: "Total Productos",
      value: "156",
      change: "+12% vs mes anterior",
      changeType: "positive",
      icon: faBox,
      iconColor: "text-primary"
    },
    {
      title: "Órdenes Pendientes",
      value: "23",
      change: "+5% vs mes anterior",
      changeType: "positive",
      icon: faShoppingCart,
      iconColor: "text-accent"
    },
    {
      title: "Categorías",
      value: "12",
      change: "+2 vs mes anterior",
      changeType: "positive",
      icon: faTags,
      iconColor: "text-secondary"
    },
    {
      title: "Ingresos del Mes",
      value: "$12,450",
      change: "+18% vs mes anterior",
      changeType: "positive",
      icon: faDollarSign,
      iconColor: "text-highlight"
    }
  ];

  const recentOrders: RecentOrder[] = [
    {
      id: "ORD-001",
      customerName: "María González",
      total: 89.99,
      status: "pending",
      createdAt: "2024-01-15T10:30:00"
    },
    {
      id: "ORD-002",
      customerName: "Juan Pérez",
      total: 45.50,
      status: "processing",
      createdAt: "2024-01-15T09:15:00"
    },
    {
      id: "ORD-003",
      customerName: "Ana López",
      total: 120.00,
      status: "shipped",
      createdAt: "2024-01-15T08:45:00"
    }
  ];

  const getStatusColor = (status: RecentOrder["status"]) => {
    switch (status) {
      case "pending":
        return "bg-accent/20 text-accent border-accent/30";
      case "processing":
        return "bg-primary/20 text-primary border-primary/30";
      case "shipped":
        return "bg-secondary/20 text-secondary border-secondary/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusText = (status: RecentOrder["status"]) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "processing":
        return "Procesando";
      case "shipped":
        return "Enviado";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-2xl p-8 text-primary-foreground shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">¡Bienvenido de vuelta!</h1>
            <p className="text-primary-foreground/80 mt-2 text-lg">Aquí tienes un resumen de tu tienda</p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-2xl flex items-center justify-center">
              <FontAwesomeIcon icon={faChartLine} className="w-8 h-8 text-primary-foreground/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  <div className="flex items-center mt-3">
                    <FontAwesomeIcon 
                      icon={stat.changeType === "positive" ? faArrowUp : faArrowDown} 
                      className={`w-3 h-3 mr-1 ${
                        stat.changeType === "positive" ? "text-secondary" : "text-destructive"
                      }`} 
                    />
                    <span className={`text-sm font-medium ${
                      stat.changeType === "positive" ? "text-secondary" : "text-destructive"
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center`}>
                  <FontAwesomeIcon icon={stat.icon} className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Link href="/admin/productos/nuevo">
                <Button className="w-full h-14 justify-start bg-primary hover:bg-primary/90 text-primary-foreground">
                  <FontAwesomeIcon icon={faPlus} className="w-5 h-5 mr-3" />
                  <span>Agregar Producto</span>
                </Button>
              </Link>
              
              <Link href="/admin/categorias/nueva">
                <Button variant="outline" className="w-full h-14 justify-start border-border hover:bg-accent hover:text-accent-foreground">
                  <FontAwesomeIcon icon={faTags} className="w-5 h-5 mr-3" />
                  <span>Nueva Categoría</span>
                </Button>
              </Link>
              
              <Link href="/admin/ordenes">
                <Button variant="outline" className="w-full h-14 justify-start border-border hover:bg-accent hover:text-accent-foreground">
                  <FontAwesomeIcon icon={faEye} className="w-5 h-5 mr-3" />
                  <span>Ver Órdenes</span>
                </Button>
              </Link>
              
              <Link href="/admin/configuracion">
                <Button variant="outline" className="w-full h-14 justify-start border-border hover:bg-accent hover:text-accent-foreground">
                  <FontAwesomeIcon icon={faCog} className="w-5 h-5 mr-3" />
                  <span>Configuración</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Órdenes Recientes</CardTitle>
              <Link href="/admin/ordenes">
                <Button variant="ghost" size="sm" className="hover:bg-accent hover:text-accent-foreground">
                  Ver todas
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${order.total.toFixed(2)}</p>
                    <Badge className={`${getStatusColor(order.status)} border text-xs`}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Estado del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-4 p-4 bg-secondary/10 rounded-xl border border-secondary/20">
              <FontAwesomeIcon icon={faCircle} className="w-3 h-3 text-secondary" />
              <div>
                <p className="font-medium text-foreground">Sitio Web</p>
                <p className="text-sm text-muted-foreground">Operativo</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-primary/10 rounded-xl border border-primary/20">
              <FontAwesomeIcon icon={faCircle} className="w-3 h-3 text-primary" />
              <div>
                <p className="font-medium text-foreground">Base de Datos</p>
                <p className="text-sm text-muted-foreground">Conectado</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-accent/10 rounded-xl border border-accent/20">
              <FontAwesomeIcon icon={faCircle} className="w-3 h-3 text-accent" />
              <div>
                <p className="font-medium text-foreground">Almacenamiento</p>
                <p className="text-sm text-muted-foreground">75% usado</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 