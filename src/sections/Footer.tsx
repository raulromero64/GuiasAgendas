import { Globe, Mail, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 mb-12">
        <div>
          <h4 className="font-bold mb-4 text-slate-800">Contenidos</h4>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li><Link to="/biblioteca" className="hover:text-blue-600 focus-visible:ring-offset-2 rounded px-1 outline-none">Biblioteca Virtual</Link></li>
            <li><Link to="/libros-guia" className="hover:text-blue-600 focus-visible:ring-offset-2 rounded px-1 outline-none">Libros Guía PDF</Link></li>
            <li><Link to="/blog" className="hover:text-blue-600 focus-visible:ring-offset-2 rounded px-1 outline-none">Blog Educativo</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-slate-800">Soporte</h4>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li><a href="#" className="hover:text-blue-600 focus-visible:ring-offset-2 rounded px-1 outline-none">Preguntas Frecuentes</a></li>
            <li><a href="#" className="hover:text-blue-600 focus-visible:ring-offset-2 rounded px-1 outline-none">Términos de Uso</a></li>
            <li><a href="#" className="hover:text-blue-600 focus-visible:ring-offset-2 rounded px-1 outline-none">Privacidad Infantil</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-slate-800">Contacto Raúl G&A</h4>
          <ul className="space-y-3 text-slate-600 text-sm">
            <li className="flex items-center gap-2"><Globe size={16} /> Ciudad del Saber, Edif. 2026</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +54 123 456 789</li>
            <li className="flex items-center gap-2"><Mail size={16} /> hola@raulga.com</li>
            <li className="flex items-center gap-2"><Clock size={16} /> Lun - Vie: 09:00 - 18:00</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-slate-400 text-xs border-t border-slate-200 pt-8">
        © 2026 Raúl G&A - Hecho con magia y React para niños del mundo.
      </div>
    </footer>
  );
};
