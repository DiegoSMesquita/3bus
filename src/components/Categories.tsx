import { Bus, Truck, CircleDot, Package } from "lucide-react";
import { Card } from "@/components/ui/card";

const Categories = () => {
  const categories = [
    {
      icon: Bus,
      title: "Ônibus Urbanos",
      description: "Modelos para transporte urbano com acessibilidade e conforto",
      count: "45+"
    },
    {
      icon: CircleDot,
      title: "Ônibus Rodoviários",
      description: "Veículos para longas distâncias com máximo conforto",
      count: "30+"
    },
    {
      icon: Truck,
      title: "Caminhões",
      description: "Linha completa de caminhões leves, médios e pesados",
      count: "60+"
    },
    {
      icon: Package,
      title: "Veículos Especiais",
      description: "Frotas sob encomenda e veículos customizados",
      count: "20+"
    }
  ];

  return (
    <section id="categories" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossas <span className="text-primary">Categorias</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ampla variedade de veículos comerciais para atender todas as suas necessidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="group p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <category.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {category.description}
              </p>
              <div className="text-primary font-bold text-lg">
                {category.count} veículos
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
