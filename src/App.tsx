import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Navbar } from './sections/Navbar';
import { Footer } from './sections/Footer';

// Placeholder pages to satisfy router links
const Placeholder = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-slate-50 flex flex-col">
    <Navbar />
    <main className="flex-grow flex items-center justify-center pt-16">
      <h1 className="text-4xl font-bold text-slate-800 animate-fade-in">{title} (Próximamente)</h1>
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nuestros-cuentos" element={<Placeholder title="Nuestros Cuentos" />} />
          <Route path="/libros-guia" element={<Placeholder title="Libros Guía" />} />
          <Route path="/agenda" element={<Placeholder title="Agenda Educativa" />} />
          <Route path="/contacto" element={<Placeholder title="Contacto" />} />
          <Route path="/biblioteca" element={<Placeholder title="Biblioteca Virtual" />} />
          <Route path="/blog" element={<Placeholder title="Blog Educativo" />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
