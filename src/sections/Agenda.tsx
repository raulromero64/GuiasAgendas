import { Calendar } from 'lucide-react';
import content from '../data/content.json';

export const Agenda = () => {
  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">Agenda Educativa Inteligente</h2>
          <p className="text-slate-400 text-lg mb-8">
            Inspirada en el sistema de organización ágil, nuestra agenda ayuda a los niños a estructurar su día de forma visual y divertida.
          </p>
          <div className="space-y-4">
            {content.agendaFeatures.map((text, i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                <Calendar className="text-blue-400" />
                <span className="font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="bg-blue-600 absolute -inset-4 blur-3xl opacity-20 rounded-full"></div>
          <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="text-blue-400 text-sm font-mono leading-relaxed overflow-x-auto p-2">
              {`// Estructura de la Misión Diaria\nconst MiDia = ${JSON.stringify(content.agendaMission, null, 2)};\n\nreturn <Agenda data={MiDia} />`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
