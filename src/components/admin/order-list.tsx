"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEye, 
  faCheck, 
  faTimes,
  faSearch,
  faFilter,
  faClock,
  faUser,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: number;
  createdAt: string;
  address: string;
}

/**
 * Order list component for managing pending orders
 */
export function OrderList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Mock data - replace with actual data fetching
  const orders: Order[] = [
    {
      id: "ORD-001",
      customerName: "María González",
      customerEmail: "maria@example.com",
      total: 89.99,
      status: "pending",
      items: 3,
      createdAt: "2024-01-15T10:30:00",
      address: "Calle Principal 123, Ciudad"
    },
    {
      id: "ORD-002",
      customerName: "Juan Pérez",
      customerEmail: "juan@example.com",
      total: 45.50,
      status: "processing",
      items: 2,
      createdAt: "2024-01-15T09:15:00",
      address: "Avenida Central 456, Ciudad"
    },
    {
      id: "ORD-003",
      customerName: "Ana López",
      customerEmail: "ana@example.com",
      total: 120.00,
      status: "pending",
      items: 4,
      createdAt: "2024-01-15T08:45:00",
      address: "Calle Secundaria 789, Ciudad"
    }
  ];

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "processing":
        return "Procesando";
      case "shipped":
        return "Enviado";
      case "delivered":
        return "Entregado";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    // TODO: Implement status update functionality
    console.log("Update order status:", orderId, newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Órdenes</h2>
          <p className="text-gray-600">Gestiona las órdenes de productos</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
                />
                <input
                  type="text"
                  placeholder="Buscar órdenes..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faFilter} className="w-4 h-4 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="processing">Procesando</option>
                <option value="shipped">Enviado</option>
                <option value="delivered">Entregado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Order Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{order.id}</span>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{order.customerName}</span>
                      </div>
                      <p className="text-sm text-gray-600">{order.customerEmail}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{order.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Productos: {order.items}</span>
                    <span className="font-medium text-gray-900">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <Link href={`/admin/ordenes/${order.id}`}>
                      <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                    </Link>
                  </Button>
                  
                  {order.status === "pending" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusUpdate(order.id, "processing")}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusUpdate(order.id, "cancelled")}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 