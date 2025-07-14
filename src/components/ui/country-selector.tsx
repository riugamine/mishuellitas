import React from 'react';
import { Label } from './label';
import { Card } from './card';
import { VENEZUELA_CONFIG } from '@/lib/types/checkout.types';

interface CountrySelectorProps {
  className?: string;
}

export function CountrySelector({ className }: CountrySelectorProps) {
  return (
    <div className={className}>
      <Label htmlFor="country">País</Label>
      <Card className="p-3 bg-blue-50 border-blue-200 mt-1">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{VENEZUELA_CONFIG.flag}</span>
          <div>
            <p className="font-medium text-blue-800">
              {VENEZUELA_CONFIG.country}
            </p>
            <p className="text-xs text-blue-600">
              Envíos solo dentro del país
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
} 