import { useState } from 'react';
import { ChevronRight, ChevronDown, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionProps {
  title: string;
  lessons: string[];
  onItemClick?: () => void;
}

export const Accordion = ({ title, lessons, onItemClick }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-t border-slate-100 first:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-blue-950 hover:text-blue-700 font-bold text-lg rounded-lg focus-visible:ring-offset-white"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-3">
              {lessons.map((lesson, idx) => (
                <div 
                  key={idx} 
                  onClick={onItemClick}
                  className="flex items-center gap-3 text-base font-semibold text-blue-900 hover:bg-blue-100 hover:text-blue-800 p-3 rounded-xl cursor-pointer transition-colors" 
                  tabIndex={0}
                >
                  <PlayCircle size={24} className="text-blue-500" strokeWidth={2.5} />
                  {lesson}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
