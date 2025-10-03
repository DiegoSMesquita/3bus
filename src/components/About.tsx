import { Shield, Award, Users, Clock } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Garantia de Qualidade",
      description: "Todos os veículos passam por rigorosa inspeção e revisão completa"
    },
    {
      icon: Award,
      title: "Experiência Comprovada",
      description: "Mais de 15 anos de expertise no mercado de veículos pesados"
    },
    {
      icon: Users,
      title: "Atendimento Personalizado",
      description: "Equipe especializada pronta para encontrar a solução ideal"
    },
    {
      icon: Clock,
      title: "Entrega Rápida",
      description: "Documentação em dia e veículos prontos para uso imediato"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Por que escolher a <span className="text-primary">3bus</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Somos referência no mercado de veículos comerciais, oferecendo qualidade, confiança e suporte completo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex gap-6 p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para encontrar seu próximo veículo?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para ajudá-lo a encontrar a solução perfeita para o seu negócio. 
              Entre em contato e descubra as melhores ofertas do mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
              >
                Fale com um Especialista
              </a>
              <a 
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
