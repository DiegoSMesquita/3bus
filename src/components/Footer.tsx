import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="bg-primary px-4 py-2 rounded-md inline-block mb-4">
              <span className="text-xl font-bold text-primary-foreground">VeículosPro</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Especialistas em vendas de ônibus, caminhões e veículos pesados com qualidade garantida.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#featured" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Veículos em Destaque
                </a>
              </li>
              <li>
                <a href="#categories" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Categorias
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Ônibus Urbanos
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Ônibus Rodoviários
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Caminhões
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Veículos Especiais
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary transition-colors flex items-center justify-center group"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary transition-colors flex items-center justify-center group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary transition-colors flex items-center justify-center group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-colors" />
              </a>
              <a 
                href="mailto:contato@veiculospro.com.br" 
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary transition-colors flex items-center justify-center group"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} VeículosPro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
