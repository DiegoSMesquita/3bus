import { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";
import VehicleFilters from "./VehicleFilters";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Vehicle {
  id: string;
  title: string;
  description: string;
  vehicle_type: string;
  manufacturer: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  location: string;
  featured: boolean;
  status: string;
  seats: number | null;
  fuel_type: string | null;
  transmission: string | null;
  color: string | null;
  images: string[] | null;
}

const FeaturedVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    vehicle_type: 'all',
    manufacturer: '',
    yearFrom: '',
    yearTo: '',
    priceMax: '',
    search: '',
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [vehicles, filters]);

  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('status', 'disponivel')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error: any) {
      toast.error('Erro ao carregar veículos');
      console.error('Error fetching vehicles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...vehicles];

    if (filters.vehicle_type && filters.vehicle_type !== 'all') {
      filtered = filtered.filter(v => v.vehicle_type === filters.vehicle_type);
    }

    if (filters.manufacturer) {
      filtered = filtered.filter(v => 
        v.manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase())
      );
    }

    if (filters.yearFrom) {
      filtered = filtered.filter(v => v.year >= parseInt(filters.yearFrom));
    }

    if (filters.yearTo) {
      filtered = filtered.filter(v => v.year <= parseInt(filters.yearTo));
    }

    if (filters.priceMax) {
      filtered = filtered.filter(v => v.price <= parseFloat(filters.priceMax));
    }

    if (filters.search) {
      filtered = filtered.filter(v =>
        v.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        v.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        v.model.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredVehicles(filtered);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      vehicle_type: 'all',
      manufacturer: '',
      yearFrom: '',
      yearTo: '',
      priceMax: '',
      search: '',
    });
  };

  const featuredCount = vehicles.filter(v => v.featured).length;


  return (
    <section id="featured" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Veículos em <span className="text-primary">Destaque</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Confira nossa seleção especial de veículos com as melhores condições e preços do mercado
          </p>
        </div>

        <VehicleFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando veículos...</p>
          </div>
        ) : filteredVehicles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredVehicles.map((vehicle, index) => (
                <div key={vehicle.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <VehicleCard
                    title={vehicle.title}
                    description={vehicle.description}
                    image={vehicle.images?.[0] || "/placeholder.svg"}
                    year={vehicle.year.toString()}
                    mileage={`${vehicle.mileage.toLocaleString()} km`}
                    location={vehicle.location}
                    featured={vehicle.featured}
                    price={vehicle.price}
                  />
                </div>
              ))}
            </div>

            {featuredCount > 0 && (
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-6">
                  <span className="text-primary font-bold">{featuredCount} veículos em destaque</span> disponíveis
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhum veículo encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedVehicles;
