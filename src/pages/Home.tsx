import { SEO } from '../components/SEO';
import { Navbar } from '../sections/Navbar';
import { Hero } from '../sections/Hero';
import { Biblioteca } from '../sections/Biblioteca';
import { Agenda } from '../sections/Agenda';
import { Comunidad } from '../sections/Comunidad';
import { Footer } from '../sections/Footer';

export const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-200">
      <SEO 
        title="Inicio" 
        description="Portal Mágico de Raúl G&A. Cuentos animados, guías de aprendizaje y agendas educativas para niños."
      />
      <Navbar />
      <main>
        <Hero />
        <Biblioteca />
        <Agenda />
        <Comunidad />
      </main>
      <Footer />
    </div>
  );
};
