import { Button } from "@/components/ui/button";
import { Search, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-vehicles.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Encontre o seu próximo
            <span className="block text-primary mt-2">bom negócio</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Especialistas em ônibus, caminhões e veículos pesados com qualidade garantida e atendimento profissional
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 hover:scale-105 transition-all">
              <Search className="mr-2 h-5 w-5" />
              Ver Estoque Completo
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              <TrendingUp className="mr-2 h-5 w-5" />
              Ofertas Especiais
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Veículos Vendidos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Anos no Mercado</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Suporte</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
