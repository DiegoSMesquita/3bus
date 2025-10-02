import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, X } from 'lucide-react';

interface VehicleFiltersProps {
  filters: {
    vehicle_type: string;
    manufacturer: string;
    yearFrom: string;
    yearTo: string;
    priceMax: string;
    search: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

const VehicleFilters = ({ filters, onFilterChange, onClearFilters }: VehicleFiltersProps) => {
  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold">Filtrar Veículos</h3>
        </div>
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          <X className="mr-2 h-4 w-4" />
          Limpar Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Buscar</Label>
          <Input
            id="search"
            placeholder="Buscar por título, modelo..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vehicle_type">Tipo de Veículo</Label>
          <Select
            value={filters.vehicle_type}
            onValueChange={(value) => onFilterChange('vehicle_type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="onibus_urbano">Ônibus Urbano</SelectItem>
              <SelectItem value="onibus_rodoviario">Ônibus Rodoviário</SelectItem>
              <SelectItem value="caminhao">Caminhão</SelectItem>
              <SelectItem value="especial">Especial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="manufacturer">Fabricante</Label>
          <Input
            id="manufacturer"
            placeholder="Ex: Mercedes, Volvo..."
            value={filters.manufacturer}
            onChange={(e) => onFilterChange('manufacturer', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearFrom">Ano de</Label>
          <Input
            id="yearFrom"
            type="number"
            placeholder="2010"
            value={filters.yearFrom}
            onChange={(e) => onFilterChange('yearFrom', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearTo">Ano até</Label>
          <Input
            id="yearTo"
            type="number"
            placeholder="2024"
            value={filters.yearTo}
            onChange={(e) => onFilterChange('yearTo', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priceMax">Preço máximo (R$)</Label>
          <Input
            id="priceMax"
            type="number"
            placeholder="500000"
            value={filters.priceMax}
            onChange={(e) => onFilterChange('priceMax', e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};

export default VehicleFilters;
