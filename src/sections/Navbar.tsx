import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-blue-500/95 backdrop-blur-md border-b border-blue-600 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 focus-visible:ring-offset-2 rounded-lg p-1 outline-none">
          <img src="/logo.png" alt="Logo Raúl G&A" className="h-12 w-auto object-contain bg-white/80 rounded-xl px-2 py-1" />
        </Link>
          
        <div className="hidden md:flex gap-8 text-sm font-medium text-white">
          <Link to="/" className="hover:text-blue-100 transition-colors focus-visible:ring-offset-2 rounded outline-none px-2 py-1">Home</Link>
          <Link to="/nuestros-cuentos" className="hover:text-blue-100 transition-colors focus-visible:ring-offset-2 rounded outline-none px-2 py-1">Nuestros Cuentos</Link>
          <Link to="/libros-guia" className="hover:text-blue-100 transition-colors focus-visible:ring-offset-2 rounded outline-none px-2 py-1">Libros Guía</Link>
          <Link to="/agenda" className="hover:text-blue-100 transition-colors focus-visible:ring-offset-2 rounded outline-none px-2 py-1">Agenda</Link>
          <Link to="/contacto" className="hover:text-blue-100 transition-colors focus-visible:ring-offset-2 rounded outline-none px-2 py-1">Contacto</Link>
        </div>

        <button 
          className="md:hidden p-2 rounded-lg text-white hover:bg-blue-600 outline-none focus-visible:ring-offset-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 py-4 px-4 flex flex-col gap-4 shadow-lg animate-fade-in">
          <Link to="/" className="font-medium text-slate-600 hover:text-blue-600 p-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/nuestros-cuentos" className="font-medium text-slate-600 hover:text-blue-600 p-2" onClick={() => setIsMenuOpen(false)}>Nuestros Cuentos</Link>
          <Link to="/libros-guia" className="font-medium text-slate-600 hover:text-blue-600 p-2" onClick={() => setIsMenuOpen(false)}>Libros Guía</Link>
          <Link to="/agenda" className="font-medium text-slate-600 hover:text-blue-600 p-2" onClick={() => setIsMenuOpen(false)}>Agenda</Link>
          <Link to="/contacto" className="font-medium text-slate-600 hover:text-blue-600 p-2" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
        </div>
      )}
    </nav>
  );
};
