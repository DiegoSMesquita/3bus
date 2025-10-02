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
import { LogOut, Plus, Edit, Trash2, Truck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
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

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Truck className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Gerenciar Veículos</h2>
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

        <div className="grid grid-cols-1 gap-6">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{vehicle.title}</h3>
                    {vehicle.featured && (
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        DESTAQUE
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded ${
                      vehicle.status === 'disponivel' ? 'bg-primary/20 text-primary' :
                      vehicle.status === 'vendido' ? 'bg-destructive/20 text-destructive' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {vehicle.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{vehicle.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Fabricante:</span>
                      <p className="font-medium">{vehicle.manufacturer}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Modelo:</span>
                      <p className="font-medium">{vehicle.model}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ano:</span>
                      <p className="font-medium">{vehicle.year}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Km:</span>
                      <p className="font-medium">{vehicle.mileage.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Preço:</span>
                      <p className="font-medium">
                        R$ {vehicle.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Local:</span>
                      <p className="font-medium">{vehicle.location}</p>
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

        {vehicles.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              Nenhum veículo cadastrado. Clique em "Novo Veículo" para adicionar.
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Admin;
