import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import content from '../data/content.json';

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 text-center md:text-left">
        
        {/* Left Side - Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -150 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2.5, type: "spring", bounce: 0.3 }}
          className="w-full md:w-1/2 flex justify-center md:pr-8 lg:pr-12"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <img 
              src="/logo.png" 
              alt="Logo Principal Guía & Agendas" 
              className="w-full max-w-sm lg:max-w-md object-contain bg-blue-100/50 backdrop-blur-md rounded-[3rem] p-6 lg:p-8 shadow-2xl border-4 border-white rotate-[-2deg] hover:rotate-0 transition-transform duration-300"
            />
          </motion.div>
        </motion.div>

        {/* Right Side - Text & Buttons */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight drop-shadow-sm leading-tight">
              {content.hero.title} <br className="hidden lg:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm">{content.hero.highlight}</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl"
          >
            {content.hero.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button variant="primary" className="text-lg py-3 px-8">Ver Cuentos</Button>
            <Button variant="secondary" className="text-lg py-3 px-8">Explorar Guías</Button>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20"></div>
      </div>
    </section>
  );
};
