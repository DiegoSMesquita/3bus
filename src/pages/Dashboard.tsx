import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Truck, TrendingUp, Users, Eye, DollarSign, Calendar } from 'lucide-react';

interface Stats {
  totalVehicles: number;
  availableVehicles: number;
  soldVehicles: number;
  totalValue: number;
  monthlyViews: number;
}

const Dashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    totalVehicles: 0,
    availableVehicles: 0,
    soldVehicles: 0,
    totalValue: 0,
    monthlyViews: 0,
  });
  const [vehiclesByType, setVehiclesByType] = useState<any[]>([]);
  const [vehiclesByStatus, setVehiclesByStatus] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    try {
      const { data: vehicles, error } = await supabase
        .from('vehicles')
        .select('*');

      if (error) throw error;

      const total = vehicles?.length || 0;
      const available = vehicles?.filter(v => v.status === 'disponivel').length || 0;
      const sold = vehicles?.filter(v => v.status === 'vendido').length || 0;
      const totalValue = vehicles?.reduce((sum, v) => sum + (v.price || 0), 0) || 0;

      setStats({
        totalVehicles: total,
        availableVehicles: available,
        soldVehicles: sold,
        totalValue,
        monthlyViews: Math.floor(Math.random() * 5000) + 1000, // Simulado
      });

      // Veículos por tipo
      const typeGroups = vehicles?.reduce((acc: any, vehicle) => {
        const type = vehicle.vehicle_type;
        const typeName = 
          type === 'onibus_urbano' ? 'Ônibus Urbano' :
          type === 'onibus_rodoviario' ? 'Ônibus Rodoviário' :
          type === 'caminhao' ? 'Caminhão' : 'Especial';
        
        if (!acc[typeName]) acc[typeName] = 0;
        acc[typeName]++;
        return acc;
      }, {});

      setVehiclesByType(
        Object.entries(typeGroups || {}).map(([name, value]) => ({
          name,
          quantidade: value,
        }))
      );

      // Veículos por status
      const statusGroups = vehicles?.reduce((acc: any, vehicle) => {
        const status = vehicle.status === 'disponivel' ? 'Disponível' :
                      vehicle.status === 'vendido' ? 'Vendido' : 'Reservado';
        if (!acc[status]) acc[status] = 0;
        acc[status]++;
        return acc;
      }, {});

      setVehiclesByStatus(
        Object.entries(statusGroups || {}).map(([name, value]) => ({
          name,
          value,
        }))
      );

      // Dados mensais simulados
      setMonthlyData([
        { mes: 'Jan', vendas: 4, visualizacoes: 450 },
        { mes: 'Fev', vendas: 3, visualizacoes: 380 },
        { mes: 'Mar', vendas: 6, visualizacoes: 520 },
        { mes: 'Abr', vendas: 5, visualizacoes: 490 },
        { mes: 'Mai', vendas: 7, visualizacoes: 610 },
        { mes: 'Jun', vendas: 8, visualizacoes: 680 },
      ]);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    }
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

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
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do desempenho e estatísticas
        </p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Veículos</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVehicles}</div>
            <p className="text-xs text-muted-foreground">no estoque</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponíveis</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableVehicles}</div>
            <p className="text-xs text-muted-foreground">prontos para venda</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendidos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.soldVehicles}</div>
            <p className="text-xs text-muted-foreground">este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(stats.totalValue / 1000).toFixed(0)}k
            </div>
            <p className="text-xs text-muted-foreground">em estoque</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyViews}</div>
            <p className="text-xs text-muted-foreground">este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Veículos por Tipo</CardTitle>
            <CardDescription>Distribuição do estoque por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vehiclesByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidade" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status dos Veículos</CardTitle>
            <CardDescription>Distribuição por disponibilidade</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehiclesByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {vehiclesByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Desempenho Mensal</CardTitle>
            <CardDescription>Vendas e visualizações nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="vendas" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="visualizacoes" stroke="hsl(var(--secondary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
