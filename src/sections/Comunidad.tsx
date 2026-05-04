import { Camera, Play, MessageCircle, BookOpen } from 'lucide-react';
import content from '../data/content.json';

export const Comunidad = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Nuestra Comunidad Digital</h2>
        <div className="flex justify-center gap-6">
          <a href="#" className="p-2 rounded-full focus-visible:ring-offset-2 outline-none" aria-label="Instagram">
            <Camera className="text-pink-500 hover:scale-110 transition-transform" />
          </a>
          <a href="#" className="p-2 rounded-full focus-visible:ring-offset-2 outline-none" aria-label="Youtube">
            <Play className="text-red-500 hover:scale-110 transition-transform" />
          </a>
          <a href="#" className="p-2 rounded-full focus-visible:ring-offset-2 outline-none" aria-label="Facebook">
            <MessageCircle className="text-blue-600 hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <BookOpen className="text-blue-500" /> Rincón para Crecer
      </h3>
      <div className="grid md:grid-cols-3 gap-8">
        {content.blogPosts.map((post) => (
          <article key={post.id} className="group cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl outline-none transition-shadow">
            <div className="bg-slate-100 aspect-video rounded-2xl mb-4 overflow-hidden relative">
              <img 
                src={`https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=225`} 
                alt={post.imageAlt} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <h4 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
              <a href="#" className="outline-none">{post.title}</a>
            </h4>
            <p className="text-slate-500 text-sm mt-2">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
