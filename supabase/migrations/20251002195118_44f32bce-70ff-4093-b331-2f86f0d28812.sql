-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create enum for vehicle types
CREATE TYPE public.vehicle_type AS ENUM ('onibus_urbano', 'onibus_rodoviario', 'caminhao', 'especial');

-- Create enum for vehicle status
CREATE TYPE public.vehicle_status AS ENUM ('disponivel', 'vendido', 'reservado');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create vehicles table
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  vehicle_type vehicle_type NOT NULL,
  manufacturer TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  price DECIMAL(12, 2),
  location TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  status vehicle_status DEFAULT 'disponivel',
  seats INTEGER,
  fuel_type TEXT,
  transmission TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on vehicles
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for vehicles
CREATE POLICY "Everyone can view available vehicles"
  ON public.vehicles FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can insert vehicles"
  ON public.vehicles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update vehicles"
  ON public.vehicles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete vehicles"
  ON public.vehicles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for vehicles updated_at
CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample vehicles data
INSERT INTO public.vehicles (title, description, vehicle_type, manufacturer, model, year, mileage, price, location, featured, seats, fuel_type, transmission, color) VALUES
('Ônibus Mascarello Gran Midi Urbano', 'Ônibus urbano único dono, com acessibilidade, mecânica Volvo MWM de 6 cilindros, 47 lugares, revisado e pronto para uso imediato. Documentação em dia, IPVA quitado.', 'onibus_urbano', 'Mascarello', 'Gran Midi', 2019, 200000, 185000.00, 'São Paulo - SP', true, 47, 'Diesel', 'Manual', 'Branco/Verde'),
('Caminhão Mercedes-Benz Atego 2430', 'Caminhão truck em excelente estado de conservação, motor Mercedes OM 926, cabine leito, ideal para longas distâncias. Único dono, revisões em dia.', 'caminhao', 'Mercedes-Benz', 'Atego 2430', 2020, 180000, 245000.00, 'Rio de Janeiro - RJ', false, 2, 'Diesel', 'Manual', 'Branco'),
('Ônibus Rodoviário Marcopolo Paradiso', 'Ônibus rodoviário de luxo, ar condicionado, banheiro, poltronas reclináveis, perfeito para viagens intermunicipais. Sistema de entretenimento completo.', 'onibus_rodoviario', 'Marcopolo', 'Paradiso G7', 2018, 250000, 320000.00, 'Belo Horizonte - MG', false, 46, 'Diesel', 'Automatizado', 'Prata'),
('Caminhão Volvo FH 540 6x4', 'Cavalo mecânico premium, motor I-Shift automatizado, freio motor VEB, ideal para operações de alto desempenho. Baixo consumo e alta potência.', 'caminhao', 'Volvo', 'FH 540', 2021, 150000, 380000.00, 'Curitiba - PR', false, 2, 'Diesel', 'Automatizado', 'Branco'),
('Ônibus Urbano Caio Apache Vip', 'Ônibus urbano com acessibilidade, ar condicionado, motor Mercedes-Benz, 48 lugares, ótimo estado de conservação.', 'onibus_urbano', 'Caio', 'Apache Vip', 2020, 175000, 195000.00, 'Brasília - DF', false, 48, 'Diesel', 'Manual', 'Branco/Azul'),
('Caminhão Scania R 450', 'Caminhão 6x2 com baú, sistema de rastreamento, cabine leito, motor Scania de 450cv, ótimo para transportes de longa distância.', 'caminhao', 'Scania', 'R 450', 2019, 220000, 295000.00, 'Fortaleza - CE', false, 2, 'Diesel', 'Automatizado', 'Vermelho');