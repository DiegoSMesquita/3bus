import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

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
}

const VehicleManagement = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    vehicle_type: 'onibus_urbano' | 'onibus_rodoviario' | 'caminhao' | 'especial';
    manufacturer: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
    location: string;
    featured: boolean;
    status: 'disponivel' | 'vendido' | 'reservado';
    seats: number;
    fuel_type: string;
    transmission: string;
    color: string;
  }>({
    title: '',
    description: '',
    vehicle_type: 'onibus_urbano',
    manufacturer: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    price: 0,
    location: '',
    featured: false,
    status: 'disponivel',
    seats: 0,
    fuel_type: 'Diesel',
    transmission: 'Manual',
    color: '',
  });

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchVehicles();
    }
  }, [isAdmin]);

  useEffect(() => {
    filterVehicles();
  }, [searchTerm, filterType, filterStatus, vehicles]);

  const filterVehicles = () => {
    let filtered = [...vehicles];

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(v =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por tipo
    if (filterType !== 'all') {
      filtered = filtered.filter(v => v.vehicle_type === filterType);
    }

    // Filtro por status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(v => v.status === filterStatus);
    }

    setFilteredVehicles(filtered);
  };

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
      setFilteredVehicles(data || []);
    } catch (error: any) {
      toast.error('Erro ao carregar veículos');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingVehicle) {
        const { error } = await supabase
          .from('vehicles')
          .update(formData)
          .eq('id', editingVehicle.id);

        if (error) throw error;
        toast.success('Veículo atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('vehicles')
          .insert([formData]);

        if (error) throw error;
        toast.success('Veículo adicionado com sucesso!');
      }

      setIsDialogOpen(false);
      resetForm();
      fetchVehicles();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar veículo');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este veículo?')) return;

    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Veículo excluído com sucesso!');
      fetchVehicles();
    } catch (error: any) {
      toast.error('Erro ao excluir veículo');
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      title: vehicle.title,
      description: vehicle.description,
      vehicle_type: vehicle.vehicle_type as 'onibus_urbano' | 'onibus_rodoviario' | 'caminhao' | 'especial',
      manufacturer: vehicle.manufacturer,
      model: vehicle.model,
      year: vehicle.year,
      mileage: vehicle.mileage,
      price: vehicle.price,
      location: vehicle.location,
      featured: vehicle.featured,
      status: vehicle.status as 'disponivel' | 'vendido' | 'reservado',
      seats: vehicle.seats || 0,
      fuel_type: vehicle.fuel_type || 'Diesel',
      transmission: vehicle.transmission || 'Manual',
      color: vehicle.color || '',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingVehicle(null);
    setFormData({
      title: '',
      description: '',
      vehicle_type: 'onibus_urbano',
      manufacturer: '',
      model: '',
      year: new Date().getFullYear(),
      mileage: 0,
      price: 0,
      location: '',
      featured: false,
      status: 'disponivel',
      seats: 0,
      fuel_type: 'Diesel',
      transmission: 'Manual',
      color: '',
    });
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      onibus_urbano: 'Ônibus Urbano',
      onibus_rodoviario: 'Ônibus Rodoviário',
      caminhao: 'Caminhão',
      especial: 'Especial',
    };
    return labels[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
      disponivel: 'default',
      reservado: 'secondary',
      vendido: 'destructive',
    };
    const labels: { [key: string]: string } = {
      disponivel: 'Disponível',
      reservado: 'Reservado',
      vendido: 'Vendido',
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gerenciar Veículos</h2>
          <p className="text-muted-foreground">
            Total de {filteredVehicles.length} veículo(s)
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Veículo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingVehicle ? 'Editar Veículo' : 'Novo Veículo'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle_type">Tipo *</Label>
                  <Select
                    value={formData.vehicle_type}
                    onValueChange={(value: 'onibus_urbano' | 'onibus_rodoviario' | 'caminhao' | 'especial') => 
                      setFormData({ ...formData, vehicle_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onibus_urbano">Ônibus Urbano</SelectItem>
                      <SelectItem value="onibus_rodoviario">Ônibus Rodoviário</SelectItem>
                      <SelectItem value="caminhao">Caminhão</SelectItem>
                      <SelectItem value="especial">Especial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Fabricante *</Label>
                  <Input
                    id="manufacturer"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Modelo *</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Ano *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mileage">Km *</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Localização *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Cor</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seats">Lugares</Label>
                  <Input
                    id="seats"
                    type="number"
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuel_type">Combustível</Label>
                  <Input
                    id="fuel_type"
                    value={formData.fuel_type}
                    onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmissão</Label>
                  <Input
                    id="transmission"
                    value={formData.transmission}
                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'disponivel' | 'vendido' | 'reservado') => 
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disponivel">Disponível</SelectItem>
                      <SelectItem value="vendido">Vendido</SelectItem>
                      <SelectItem value="reservado">Reservado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 pt-8">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="featured">Destaque</Label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  {editingVehicle ? 'Atualizar' : 'Adicionar'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título, marca ou modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de veículo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="onibus_urbano">Ônibus Urbano</SelectItem>
              <SelectItem value="onibus_rodoviario">Ônibus Rodoviário</SelectItem>
              <SelectItem value="caminhao">Caminhão</SelectItem>
              <SelectItem value="especial">Especial</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="disponivel">Disponível</SelectItem>
              <SelectItem value="reservado">Reservado</SelectItem>
              <SelectItem value="vendido">Vendido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Lista de veículos */}
      <div className="grid grid-cols-1 gap-4">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold">{vehicle.title}</h3>
                  {vehicle.featured && (
                    <Badge variant="secondary">DESTAQUE</Badge>
                  )}
                  {getStatusBadge(vehicle.status)}
                  <Badge variant="outline">{getTypeLabel(vehicle.vehicle_type)}</Badge>
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">{vehicle.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block">Fabricante</span>
                    <p className="font-medium">{vehicle.manufacturer}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Modelo</span>
                    <p className="font-medium">{vehicle.model}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Ano</span>
                    <p className="font-medium">{vehicle.year}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Km</span>
                    <p className="font-medium">{vehicle.mileage.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Preço</span>
                    <p className="font-medium text-primary">
                      R$ {vehicle.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(vehicle)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(vehicle.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            {vehicles.length === 0 
              ? 'Nenhum veículo cadastrado. Clique em "Novo Veículo" para adicionar.'
              : 'Nenhum veículo encontrado com os filtros selecionados.'}
          </p>
        </Card>
      )}
    </div>
  );
};

export default VehicleManagement;
