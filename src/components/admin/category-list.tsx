"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faEye,
  faSearch,
  faTags
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  subcategories: string[];
  status: "active" | "inactive";
  createdAt: string;
}

/**
 * Category list component with search and CRUD operations
 */
export function CategoryList() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - replace with actual data fetching
  const categories: Category[] = [
    {
      id: "1",
      name: "Mascotas",
      description: "Productos para mascotas",
      productCount: 25,
      subcategories: ["Perros", "Gatos", "Aves"],
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Accesorios",
      description: "Accesorios para mascotas",
      productCount: 15,
      subcategories: ["Collares", "Correas", "Juguetes"],
      status: "active",
      createdAt: "2024-01-10"
    },
    {
      id: "3",
      name: "Alimentos",
      description: "Alimentos para mascotas",
      productCount: 30,
      subcategories: ["Perros", "Gatos", "Aves"],
      status: "active",
      createdAt: "2024-01-05"
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (categoryId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete category:", categoryId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Categorías</h2>
          <p className="text-gray-600">Gestiona las categorías de productos</p>
        </div>
        <Link href="/admin/categorias/nueva">
          <Button className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            <span>Agregar Categoría</span>
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
            />
            <input
              type="text"
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faTags} className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
                <Badge 
                  variant={category.status === "active" ? "default" : "secondary"}
                  className={category.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {category.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Productos:</span>
                  <span className="font-medium text-gray-900">{category.productCount}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Subcategorías:</span>
                  <span className="font-medium text-gray-900">{category.subcategories.length}</span>
                </div>

                {category.subcategories.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories.slice(0, 3).map((sub, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {sub}
                      </Badge>
                    ))}
                    {category.subcategories.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{category.subcategories.length - 3} más
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Creado: {new Date(category.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <Link href={`/admin/categorias/${category.id}`}>
                      <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <Link href={`/admin/categorias/${category.id}/editar`}>
                      <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 