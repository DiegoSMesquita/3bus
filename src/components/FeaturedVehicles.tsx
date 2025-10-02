import VehicleCard from "./VehicleCard";
import bus1 from "@/assets/bus-1.jpg";
import bus2 from "@/assets/bus-2.jpg";
import truck1 from "@/assets/truck-1.jpg";
import truck2 from "@/assets/truck-2.jpg";

const FeaturedVehicles = () => {
  const vehicles = [
    {
      title: "Ônibus Mascarello Gran Midi Urbano",
      description: "Ônibus urbano único dono, com acessibilidade, mecânica Volvo MWM, 47 lugares, revisado e pronto para uso imediato.",
      image: bus1,
      year: "2019",
      mileage: "200.000 km",
      location: "SP",
      featured: true
    },
    {
      title: "Caminhão Mercedes-Benz Atego 2430",
      description: "Caminhão truck em excelente estado de conservação, motor Mercedes OM 926, cabine leito, ideal para longas distâncias.",
      image: truck1,
      year: "2020",
      mileage: "180.000 km",
      location: "RJ"
    },
    {
      title: "Ônibus Rodoviário Marcopolo Paradiso",
      description: "Ônibus rodoviário de luxo, ar condicionado, banheiro, poltrona reclinável, perfeito para viagens intermunicipais.",
      image: bus2,
      year: "2018",
      mileage: "250.000 km",
      location: "MG"
    },
    {
      title: "Caminhão Volvo FH 540 6x4",
      description: "Cavalo mecânico premium, motor I-Shift automatizado, freio motor VEB, ideal para operações de alto desempenho.",
      image: truck2,
      year: "2021",
      mileage: "150.000 km",
      location: "PR"
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {vehicles.map((vehicle, index) => (
            <div key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              <VehicleCard {...vehicle} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Apenas <span className="text-primary font-bold">5 unidades disponíveis</span> do veículo em destaque
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
