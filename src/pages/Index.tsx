import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import Categories from "@/components/Categories";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <FeaturedVehicles />
        <Categories />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
