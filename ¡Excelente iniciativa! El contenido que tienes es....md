¡Excelente estructura\! Has diseñado un **System Prompt** de manual: claro, con jerarquía técnica y una visión estética muy bien definida. Entiendo perfectamente la misión: fusionar la limpieza profesional de la documentación de **React Native** con la calidez de un entorno **Infantil/Educativo**.

Como Ingeniero Frontend Senior, aquí tienes la implementación completa de la aplicación. He estructurado el código para que sea modular, escalable y visualmente impactante.

JavaScript

import React, { useState } from 'react';  
import {   
  BookOpen,   
  Calendar,   
  Users,   
  ChevronRight,   
  ChevronDown,   
  PlayCircle,   
  Map,   
  Star,   
  Instagram,   
  Youtube,   
  Facebook,   
  Globe,  
  Mail,  
  Phone,  
  Clock,  
  Menu,  
  X  
} from 'lucide-react';

// \--- COMPONENTES ATÓMICOS \---

const Button \= ({ children, variant \= 'primary', className \= "" }) \=\> {  
  const base \= "px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2";  
  const variants \= {  
    primary: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg",  
    secondary: "bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:shadow-lg",  
    outline: "border-2 border-slate-200 text-slate-600 hover:bg-slate-50"  
  };  
  return \<button className\={\`${base} ${variants\[variant\]} ${className}\`}\>{children}\</button\>;  
};

const Accordion \= ({ title, lessons }) \=\> {  
  const \[isOpen, setIsOpen\] \= useState(false);  
  return (  
    \<div className\="border-t border-slate-100 first:border-0"\>  
      \<button   
        onClick\={() \=\> setIsOpen(\!isOpen)}  
        className="w-full py-4 flex justify-between items-center text-slate-700 hover:text-blue-600 font-medium"  
      \>  
        \<span\>{title}\</span\>  
        {isOpen ? \<ChevronDown size\={18} /\> : \<ChevronRight size\={18} /\>}  
      \</button\>  
      {isOpen && (  
        \<div className\="pb-4 space-y-2 animate-fade-in"\>  
          {lessons.map((lesson, idx) \=\> (  
            \<div key\={idx} className\="flex items-center gap-3 text-sm text-slate-500 hover:bg-blue-50 p-2 rounded-lg cursor-pointer"\>  
              \<PlayCircle size\={16} className\="text-blue-400" /\>  
              {lesson}  
            \</div\>  
          ))}  
        \</div\>  
      )}  
    \</div\>  
  );  
};

// \--- SECCIONES \---

export default function MagicPortal() {  
  const \[isMenuOpen, setIsMenuOpen\] \= useState(false);

  return (  
    \<div className\="min-h-screen bg-white font-sans text-slate-900"\>  
        
      {/\* NAVBAR ESTILO DOCS \*/}  
      \<nav className\="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50"\>  
        \<div className\="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center"\>  
          \<div className\="flex items-center gap-2"\>  
            \<div className\="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center overflow-hidden"\>  
               {/\* Simulación del logo Membrete Raúl G\&A\_2.jpg \*/}  
               \<img src\="/api/placeholder/40/40" alt\="Logo" className\="object-cover" /\>  
            \</div\>  
            \<span className\="font-bold text-xl tracking-tight text-slate-800"\>Raúl \<span className\="text-blue-500"\>G\&A\</span\>\</span\>  
          \</div\>  
            
          \<div className\="hidden md:flex gap-8 text-sm font-medium text-slate-600"\>  
            \<a href\="\#" className\="hover:text-blue-600"\>Home\</a\>  
            \<a href\="\#" className\="hover:text-blue-600"\>Nuestros Cuentos\</a\>  
            \<a href\="\#" className\="hover:text-blue-600"\>Libros Guía\</a\>  
            \<a href\="\#" className\="hover:text-blue-600"\>Agenda\</a\>  
            \<a href\="\#" className\="hover:text-blue-600"\>Contacto\</a\>  
          \</div\>

          \<button className\="md:hidden" onClick\={() \=\> setIsMenuOpen(\!isMenuOpen)}\>  
            {isMenuOpen ? \<X /\> : \<Menu /\>}  
          \</button\>  
        \</div\>  
      \</nav\>

      {/\* HERO SECTION \*/}  
      \<section className\="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white"\>  
        \<div className\="max-w-4xl mx-auto text-center"\>  
          \<h1 className\="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight"\>  
            Cuentos Animados: \<span className\="text-blue-600"\>Imagina, Juega, Aprende\</span\>  
          \</h1\>  
          \<p className\="text-xl text-slate-600 mb-10 leading-relaxed"\>  
            Una guía interactiva de cuentos mágicos y agendas de aprendizaje para niños.  
            Diseñado para despertar la curiosidad y fomentar hábitos positivos.  
          \</p\>  
          \<div className\="flex flex-col sm:flex-row justify-center gap-4"\>  
            \<Button variant\="primary"\>Ver Cuentos\</Button\>  
            \<Button variant\="secondary"\>Explorar Guías\</Button\>  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* BIBLIOTECA DE LIBROS (GRID) \*/}  
      \<section className\="py-20 max-w-7xl mx-auto px-4"\>  
        \<div className\="mb-12"\>  
          \<h2 className\="text-3xl font-bold mb-2"\>Biblioteca de Libros Guía\</h2\>  
          \<p className\="text-slate-500"\>Material educativo interactivo para cada etapa.\</p\>  
        \</div\>  
          
        \<div className\="grid md:grid-cols-3 gap-8"\>  
          {\[  
            {   
              title: "Aventuras de la Letra Viva",   
              desc: "Iniciación a la lectoescritura creativa.",  
              lessons: \["El baile de las vocales", "Consonantes mágicas", "Mi primera palabra"\],  
              icon: \<BookOpen className\="text-blue-500" /\>,  
              action: "Abrir Libro Mágico"  
            },  
            {   
              title: "El Explorador de Números",   
              desc: "Matemáticas iniciales a través del juego.",  
              lessons: \["Contando estrellas", "Sumas de caramelos", "Formas en el espacio"\],  
              icon: \<Star className\="text-orange-500" /\>,  
              action: "Ir al Desafío"  
            },  
            {   
              title: "Guardián del Planeta",   
              desc: "Ciencias, ecología y respeto animal.",  
              lessons: \["El ciclo del agua", "Reciclar es un juego", "Amigos del bosque"\],  
              icon: \<Map className\="text-green-500" /\>,  
              action: "Empezar Misión"  
            }  
          \].map((item, i) \=\> (  
            \<div key\={i} className\="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl transition-shadow flex flex-col h-full"\>  
              \<div className\="mb-6 p-3 bg-slate-50 w-fit rounded-2xl"\>{item.icon}\</div\>  
              \<h3 className\="text-xl font-bold mb-2"\>{item.title}\</h3\>  
              \<p className\="text-slate-500 text-sm mb-6"\>{item.desc}\</p\>  
                
              \<div className\="flex-grow mb-6"\>  
                \<Accordion title\="Índice interactivo" lessons\={item.lessons} /\>  
              \</div\>  
                
              \<Button variant\="outline" className\="w-full justify-center text-sm"\>{item.action}\</Button\>  
            \</div\>  
          ))}  
        \</div\>  
      \</section\>

      {/\* SECCIÓN AGENDA (FAST REFRESH STYLE) \*/}  
      \<section className\="py-20 bg-slate-900 text-white overflow-hidden"\>  
        \<div className\="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center"\>  
          \<div\>  
            \<h2 className\="text-4xl font-bold mb-6"\>Agenda Educativa Inteligente\</h2\>  
            \<p className\="text-slate-400 text-lg mb-8"\>  
              Inspirada en el sistema de organización ágil, nuestra agenda ayuda a los niños a estructurar su día de forma visual y divertida.  
            \</p\>  
            \<div className\="space-y-4"\>  
              {\['Organización Visual', 'Gestión de Tareas', 'Refuerzo de Hábitos'\].map((text, i) \=\> (  
                \<div key\={i} className\="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700"\>  
                  \<Calendar className\="text-blue-400" /\>  
                  \<span className\="font-semibold"\>{text}\</span\>  
                \</div\>  
              ))}  
            \</div\>  
          \</div\>  
          \<div className\="relative"\>  
            \<div className\="bg-blue-600 absolute \-inset-4 blur-3xl opacity-20 rounded-full"\>\</div\>  
            \<div className\="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl"\>  
              \<div className\="flex gap-2 mb-4"\>  
                \<div className\="w-3 h-3 rounded-full bg-red-500"\>\</div\>  
                \<div className\="w-3 h-3 rounded-full bg-yellow-500"\>\</div\>  
                \<div className\="w-3 h-3 rounded-full bg-green-500"\>\</div\>  
              \</div\>  
              \<pre className\="text-blue-400 text-sm font-mono leading-relaxed"\>  
                {\`// Estructura de la Misión Diaria  
const MiDia \= {  
  mañana: "Aventura Escolar",  
  tarde: \["Lectura Mágica", "Deporte"\],  
  habito: "Cuidar mi Planta",  
  recompensa: "10 min de Cuento Extra"  
};

return \<Agenda data\={MiDia} /\>\`}  
              \</pre\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* COMUNIDAD Y BLOG \*/}  
      \<section className\="py-20 max-w-7xl mx-auto px-4"\>  
        \<div className\="text-center mb-16"\>  
          \<h2 className\="text-3xl font-bold mb-4"\>Nuestra Comunidad Digital\</h2\>  
          \<div className\="flex justify-center gap-6"\>  
            \<Instagram className\="text-pink-500 cursor-pointer hover:scale-110 transition-transform" /\>  
            \<Youtube className\="text-red-500 cursor-pointer hover:scale-110 transition-transform" /\>  
            \<Facebook className\="text-blue-600 cursor-pointer hover:scale-110 transition-transform" /\>  
          \</div\>  
        \</div\>

        \<h3 className\="text-2xl font-bold mb-8 flex items-center gap-2"\>  
          \<BookOpen className\="text-blue-500" /\> Rincón para Crecer  
        \</h3\>  
        \<div className\="grid md:grid-cols-3 gap-8"\>  
          {\[  
            "El poder de los cuentos animados en el desarrollo cognitivo.",  
            "¿Cómo usar la Agenda Educativa sin que sea aburrido?",  
            "De la pantalla al papel: El puente de los Libros Guía."  
          \].map((title, i) \=\> (  
            \<article key\={i} className\="group cursor-pointer"\>  
              \<div className\="bg-slate-100 aspect-video rounded-2xl mb-4 overflow-hidden"\>  
                \<img src\={\`/api/placeholder/400/225\`} alt\="Blog" className\="object-cover group-hover:scale-105 transition-transform duration-500" /\>  
              \</div\>  
              \<h4 className\="font-bold text-lg hover:text-blue-600 transition-colors"\>{title}\</h4\>  
              \<p className\="text-slate-500 text-sm mt-2"\>Leer más...\</p\>  
            \</article\>  
          ))}  
        \</div\>  
      \</section\>

      {/\* FOOTER \*/}  
      \<footer className\="bg-slate-50 border-t border-slate-200 pt-16 pb-8"\>  
        \<div className\="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 mb-12"\>  
          \<div\>  
            \<h4 className\="font-bold mb-4 text-slate-800"\>Contenidos\</h4\>  
            \<ul className\="space-y-2 text-slate-600 text-sm"\>  
              \<li\>\<a href\="\#" className\="hover:text-blue-600"\>Biblioteca Virtual\</a\>\</li\>  
              \<li\>\<a href\="\#" className\="hover:text-blue-600"\>Libros Guía PDF\</a\>\</li\>  
              \<li\>\<a href\="\#" className\="hover:text-blue-600"\>Blog Educativo\</a\>\</li\>  
            \</ul\>  
          \</div\>  
          \<div\>  
            \<h4 className\="font-bold mb-4 text-slate-800"\>Soporte\</h4\>  
            \<ul className\="space-y-2 text-slate-600 text-sm"\>  
              \<li\>\<a href\="\#" className\="hover:text-blue-600"\>Preguntas Frecuentes\</a\>\</li\>  
              \<li\>\<a href\="\#" className\="hover:text-blue-600"\>Términos de Uso\</a\>\</li\>  
              \<li\>\<a href\="\#" className\="hover:text-blue-600"\>Privacidad Infantil\</a\>\</li\>  
            \</ul\>  
          \</div\>  
          \<div\>  
            \<h4 className\="font-bold mb-4 text-slate-800"\>Contacto Raúl G\&A\</h4\>  
            \<ul className\="space-y-3 text-slate-600 text-sm"\>  
              \<li className\="flex items-center gap-2"\>\<Globe size\={16} /\> Ciudad del Saber, Edif. 2026\</li\>  
              \<li className\="flex items-center gap-2"\>\<Phone size\={16} /\> \+54 123 456 789\</li\>  
              \<li className\="flex items-center gap-2"\>\<Mail size\={16} /\> hola@raulga.com\</li\>  
              \<li className\="flex items-center gap-2"\>\<Clock size\={16} /\> Lun \- Vie: 09:00 \- 18:00\</li\>  
            \</ul\>  
          \</div\>  
        \</div\>  
        \<div className\="text-center text-slate-400 text-xs border-t border-slate-200 pt-8"\>  
          © 2026 Raúl G\&A \- Hecho con magia y React para niños del mundo.  
        \</div\>  
      \</footer\>  
    \</div\>  
  );  
}

### **Notas Técnicas de Configuración:**

1. **Tailwind CSS:** Asegúrate de incluir la fuente 'Inter' o 'Quicksand' en tu tailwind.config.js para ese toque "infantil-profesional".  
2. **Responsividad:** El diseño utiliza un sistema **Mobile-First** (apilamiento vertical en móviles y grid-cols-3 en pantallas grandes).  
3. **Interacciones:** He añadido clases de transition y transform (hover:scale-105) para que los botones y tarjetas se sientan vivos al tocarlos, ideal para niños.  
4. **Icons:** Se utiliza lucide-react para mantener una consistencia visual de líneas finas (estilo Docs).

¿Deseas que profundice en la lógica de algún componente específico o que añada más lecciones a los libros?