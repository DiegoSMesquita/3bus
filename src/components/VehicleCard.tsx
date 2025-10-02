import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Gauge, MapPin, Phone } from "lucide-react";

interface VehicleCardProps {
  title: string;
  description: string;
  image: string;
  year: string;
  mileage: string;
  location: string;
  featured?: boolean;
  price?: number;
}

const VehicleCard = ({ 
  title, 
  description, 
  image, 
  year, 
  mileage, 
  location, 
  featured = false,
  price
}: VehicleCardProps) => {
  return (
    <Card className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 animate-scale-in">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {featured && (
          <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground font-bold">
            DESTAQUE DO MÊS
          </Badge>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 py-4 border-y border-border">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{year}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Gauge className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{mileage}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{location}</span>
          </div>
        </div>

        {price && (
          <div className="py-3">
            <p className="text-2xl font-bold text-primary">
              R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Button className="flex-1 bg-primary hover:bg-primary/90">
            Ver Detalhes
          </Button>
          <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VehicleCard;
