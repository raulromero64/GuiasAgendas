import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import content from '../data/content.json';

export const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const cursoSlug = searchParams.get('curso');
  
  const [cursoNombre, setCursoNombre] = useState('tu curso');
  
  useEffect(() => {
    if (cursoSlug) {
      const foundBook = content.books.find(b => b.slug === cursoSlug);
      if (foundBook) {
        setCursoNombre(foundBook.title);
      }
    }
  }, [cursoSlug]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect to course content
    alert(`Iniciando sesión para: ${cursoNombre}... (Esta es una simulación)`);
    navigate('/'); // Just go home for now after alert
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-blue-200">
      <SEO title="Acceso a Libros" description="Inicia sesión para ver tus libros guía y lecciones." />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden relative"
      >
        <motion.button 
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="absolute top-6 left-6 flex items-center gap-2 px-5 py-3 bg-yellow-400 text-amber-900 rounded-full focus-visible:ring-offset-2 outline-none z-10 font-black text-xl shadow-[0_4px_0_rgb(217,119,6)] hover:bg-yellow-300"
          aria-label="Volver a la biblioteca"
        >
          <motion.div
            animate={{ x: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            <ArrowLeft size={28} strokeWidth={4} />
          </motion.div>
          <span>¡Atrás!</span>
        </motion.button>

        <div className="bg-sky-400 px-8 pt-24 pb-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-sky-300 rounded-full blur-2xl opacity-50 translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-50 -translate-x-10 translate-y-10"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-md">¡Hola de nuevo!</h1>
            <p className="text-sky-100 text-lg md:text-xl font-medium">Ingresa para explorar los libros de <br/><strong className="text-white bg-blue-600/40 px-3 py-1 rounded-xl inline-block mt-3 shadow-inner">{cursoNombre}</strong>.</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="p-8 md:p-10 space-y-8">
          <div>
            <label className="block text-lg font-bold text-slate-700 mb-3">Correo o Usuario</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={28} />
              <input 
                type="text" 
                required
                className="w-full pl-14 pr-6 py-4 text-lg md:text-xl bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-200 focus:border-sky-400 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700"
                placeholder="estudiante@escuela.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-bold text-slate-700 mb-3">Contraseña Mágica</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={28} />
              <input 
                type="password" 
                required
                className="w-full pl-14 pr-6 py-4 text-lg md:text-xl bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-200 focus:border-sky-400 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button variant="primary" className="w-full justify-center text-xl md:text-2xl mt-8 py-5 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all" type="submit">
            Entrar al Portal
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
