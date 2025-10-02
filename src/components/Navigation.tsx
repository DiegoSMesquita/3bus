import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="bg-primary px-4 py-2 rounded-md">
                <span className="text-2xl font-bold text-primary-foreground">VeículosPro</span>
              </div>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#featured" className="text-foreground hover:text-primary transition-colors font-medium">
              Veículos em Destaque
            </a>
            <a href="#categories" className="text-foreground hover:text-primary transition-colors font-medium">
              Categorias
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              Sobre Nós
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contato
            </a>
            <Button className="bg-primary hover:bg-primary/90">
              <Phone className="mr-2 h-4 w-4" />
              Fale Conosco
            </Button>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-6 space-y-4 animate-fade-in">
            <a href="#featured" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              Veículos em Destaque
            </a>
            <a href="#categories" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              Categorias
            </a>
            <a href="#about" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              Sobre Nós
            </a>
            <a href="#contact" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              Contato
            </a>
            <Button className="w-full bg-primary hover:bg-primary/90">
              <Phone className="mr-2 h-4 w-4" />
              Fale Conosco
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
