import { BookOpen, Star, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../types';
import { Accordion } from './Accordion';
import { Button } from './Button';

interface CardProps {
  book: Book;
  index: number;
}

const icons = {
  BookOpen: BookOpen,
  Star: Star,
  Map: Map,
};

const backgrounds = [
  "/bg_fairy_animals_1777845951906.png",
  "/bg_fairy_magic_1777845964389.png",
  "/bg_fairy_space_1777845976413.png"
];

export const Card = ({ book, index }: CardProps) => {
  const Icon = icons[book.iconType];
  const navigate = useNavigate();
  const bgImage = backgrounds[index % backgrounds.length];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
      className="border border-slate-200 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full bg-cover bg-center relative overflow-hidden group"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/90 group-hover:via-white/60 transition-colors duration-500"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 p-3 bg-white/90 backdrop-blur-md w-fit rounded-2xl shadow-sm">
          <Icon className={book.iconColor} strokeWidth={2} size={40} />
        </div>
        <h3 
          className="text-2xl font-black mb-2 text-blue-950 drop-shadow-sm cursor-pointer hover:text-blue-700 transition-colors"
          onClick={() => navigate(`/login?curso=${book.slug}`)}
        >
          {book.title}
        </h3>
        <p className="text-blue-900 text-base mb-6 font-semibold">{book.desc}</p>
          
        <div className="flex-grow mb-6 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-sm">
          <Accordion 
            title="Índice interactivo" 
            lessons={book.lessons} 
            onItemClick={() => navigate(`/login?curso=${book.slug}`)}
          />
        </div>
          
        <Button 
          variant="primary" 
          className="w-full text-lg py-3 rounded-xl shadow-lg"
          onClick={() => navigate(`/login?curso=${book.slug}`)}
        >
          {book.action}
        </Button>
      </div>
    </motion.div>
  );
};
