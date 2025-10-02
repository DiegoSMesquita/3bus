import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      info: "(11) 99999-9999",
      link: "tel:+5511999999999"
    },
    {
      icon: Mail,
      title: "Email",
      info: "contato@veiculospro.com.br",
      link: "mailto:contato@veiculospro.com.br"
    },
    {
      icon: MapPin,
      title: "Endereço",
      info: "São Paulo, SP - Brasil",
      link: "#"
    },
    {
      icon: Clock,
      title: "Horário",
      info: "Seg-Sex: 8h-18h | Sáb: 8h-12h",
      link: "#"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Entre em <span className="text-primary">Contato</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Estamos prontos para atendê-lo e oferecer as melhores soluções para o seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <Card 
                key={index}
                className="p-6 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <a 
                  href={item.link}
                  className="block group"
                >
                  <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                    {item.title}
                  </h3>
                  <p className="text-foreground group-hover:text-primary transition-colors font-medium">
                    {item.info}
                  </p>
                </a>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center animate-fade-in">
            <p className="text-muted-foreground mb-6">
              Prefere conversar pelo WhatsApp? Clique no botão abaixo!
            </p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
            >
              <Phone className="mr-2 h-5 w-5" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
