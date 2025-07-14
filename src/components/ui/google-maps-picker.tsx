'use client'
import React, { useState, useCallback, useMemo } from 'react';
import { APIProvider, Map, Marker, MapMouseEvent } from '@vis.gl/react-google-maps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input } from './input';
import { Button } from './button';
import { Card } from './card';
import { toast } from 'sonner';

interface LocationData {
  address: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
}

interface GoogleMapsPickerProps {
  onLocationSelect: (location: LocationData) => void;
  apiKey?: string;
  initialLocation?: {
    lat: number;
    lng: number;
  };
}

export function GoogleMapsPicker({ 
  onLocationSelect, 
  apiKey,
  initialLocation = { lat: 10.4806, lng: -66.9036 } // Caracas, Venezuela
}: GoogleMapsPickerProps) {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(initialLocation);

  // Usar la API key desde las variables de entorno
  const mapsApiKey = apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  /**
   * Función para geocodificar una dirección
   */
  const geocodeAddress = useCallback(async (address: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${mapsApiKey}`
      );
      
      if (!response.ok) {
        throw new Error('Error en la geocodificación');
      }
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const { lat, lng } = result.geometry.location;
        
        // Extraer componentes de la dirección
        const addressComponents = result.address_components;
        let city = '';
        let state = '';
        
        addressComponents.forEach((component: any) => {
          if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
            city = component.long_name;
          }
          if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
          }
        });
        
        return {
          address: result.formatted_address,
          lat,
          lng,
          city: city || 'Ciudad',
          state: state || 'Estado'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error geocodificando:', error);
      return null;
    }
  }, [mapsApiKey]);

  /**
   * Función para geocodificación reversa
   */
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${mapsApiKey}`
      );
      
      if (!response.ok) {
        throw new Error('Error en la geocodificación reversa');
      }
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const addressComponents = result.address_components;
        let city = '';
        let state = '';
        
        addressComponents.forEach((component: any) => {
          if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
            city = component.long_name;
          }
          if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
          }
        });
        
        return {
          address: result.formatted_address,
          lat,
          lng,
          city: city || 'Ciudad',
          state: state || 'Estado'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error en geocodificación reversa:', error);
      return null;
    }
  }, [mapsApiKey]);

  /**
   * Manejar búsqueda de ubicación
   */
  const handleSearchLocation = async () => {
    if (!searchQuery.trim()) {
      toast.error('🐾 Por favor ingresa una dirección');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const location = await geocodeAddress(searchQuery);
      
      if (location) {
        setSelectedLocation(location);
        setMapCenter({ lat: location.lat, lng: location.lng });
        onLocationSelect(location);
        toast.success('🐾 Ubicación encontrada correctamente');
      } else {
        toast.error('🐾 No se pudo encontrar la ubicación');
      }
    } catch (error) {
      toast.error('🐾 Error al buscar la ubicación');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Manejar click en el mapa
   */
  const handleMapClick = useCallback(async (event: MapMouseEvent) => {
    if (!event.detail.latLng) return;
    
    const { lat, lng } = event.detail.latLng;
    setIsLoading(true);
    
    try {
      const location = await reverseGeocode(lat, lng);
      
      if (location) {
        setSelectedLocation(location);
        setMapCenter({ lat, lng });
        onLocationSelect(location);
        toast.success('🐾 Ubicación seleccionada correctamente');
      } else {
        toast.error('🐾 No se pudo obtener la dirección');
      }
    } catch (error) {
      toast.error('🐾 Error al obtener la dirección');
    } finally {
      setIsLoading(false);
    }
  }, [onLocationSelect, reverseGeocode]);

  // Configuración del mapa
  const mapOptions = useMemo(() => ({
    disableDefaultUI: false,
    clickableIcons: false,
    scrollwheel: true,
    zoom: 15,
  }), []);

  // Si no hay API key, mostrar mensaje de configuración
  if (!mapsApiKey) {
    return (
      <Card className="p-6 border-2 border-dashed border-gray-300">
        <div className="text-center text-gray-500 space-y-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-2xl mb-2" />
          <p className="font-medium">Google Maps no configurado</p>
          <p className="text-sm">
            Por favor configura NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en las variables de entorno
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Buscador */}
      <div className="flex gap-2">
        <Input
          placeholder="Buscar dirección en Venezuela..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearchLocation();
            }
          }}
        />
        <Button 
          onClick={handleSearchLocation} 
          disabled={!searchQuery.trim() || isLoading}
        >
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          {isLoading ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>

      {/* Ubicación seleccionada */}
      {selectedLocation && (
        <Card className="p-4 bg-green-50 border-green-200">
          <h4 className="font-medium text-green-800 mb-2">
            📍 Ubicación seleccionada:
          </h4>
          <p className="text-green-700 text-sm">{selectedLocation.address}</p>
          <p className="text-green-600 text-xs mt-1">
            {selectedLocation.city}, {selectedLocation.state}
          </p>
          <p className="text-green-500 text-xs mt-1">
            Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
          </p>
        </Card>
      )}

      {/* Mapa */}
      <Card className="overflow-hidden">
        <APIProvider apiKey={mapsApiKey}>
                     <Map
             style={{ width: '100%', height: '400px' }}
             defaultCenter={mapCenter}
             center={mapCenter}
             defaultZoom={15}
             gestureHandling="greedy"
             onClick={handleMapClick}
             {...mapOptions}
           >
            {selectedLocation && (
              <Marker
                position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                title={selectedLocation.address}
              />
            )}
          </Map>
        </APIProvider>
      </Card>

      {/* Instrucciones */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>💡 <strong>Instrucciones:</strong></p>
        <p>• Busca una dirección en el campo de búsqueda</p>
        <p>• O haz clic directamente en el mapa para seleccionar una ubicación</p>
        <p>• La ubicación seleccionada se mostrará con un marcador rojo</p>
      </div>
    </div>
  );
} 