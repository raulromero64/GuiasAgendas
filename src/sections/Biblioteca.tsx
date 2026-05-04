import { Card } from '../components/Card';
import content from '../data/content.json';
import type { Book } from '../types';

export const Biblioteca = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4" id="biblioteca">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-2">Biblioteca de Libros Guía</h2>
        <p className="text-slate-500">Material educativo interactivo para cada etapa.</p>
      </div>
        
      <div className="grid md:grid-cols-3 gap-8">
        {(content.books as Book[]).map((book, i) => (
          <Card key={book.id} book={book} index={i} />
        ))}
      </div>
    </section>
  );
};
