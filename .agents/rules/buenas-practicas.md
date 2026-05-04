---
trigger: always_on
---

Para que **Google Antigravity** (o cualquier modelo de desarrollo de IA de última generación) transforme el código anterior en una aplicación robusta, escalable y lista para producción, es vital que le proporciones una capa de **"Refinamiento de Ingeniería"**.

Aquí tienes las mejores prácticas estructuradas como instrucciones adicionales para que la IA no solo escriba código, sino que construya una **arquitectura profesional**:

---

### 1. Enfoque en Modularidad (Componentización)
No permitas que la IA meta todo en un solo archivo `App.js`. Pídele lo siguiente:
*   **Separación de Interfases:** "Divide la aplicación en una carpeta `/components` (botones, tarjetas, acordeones) y una carpeta `/sections` (Hero, Biblioteca, Footer)".
*   **Prop-Types o TypeScript:** "Usa TypeScript para definir las interfaces de los datos (ej. `interface BookCardProps`). Esto evita errores de renderizado de datos".

### 2. Optimización de Assets y Multimedia
Para que el portal sea rápido (Core Web Vitals):
*   **Carga de Imágenes:** "Usa el componente `next/image` (si es Next.js) o implementa `loading="lazy"` en todas las imágenes para mejorar el tiempo de carga inicial".
*   **Iconografía Consistente:** "Asegúrate de que todos los iconos de Lucide-React tengan el mismo `strokeWidth={2}` y tamaño base para mantener la armonía visual".

### 3. Accesibilidad (A11y) y UX Infantil
Dado que es un portal para niños y padres:
*   **Contraste y Tamaño:** "Verifica que el contraste de colores cumpla con el estándar **WCAG AA**. El tamaño de fuente base para el cuerpo de texto no debe ser inferior a `16px`".
*   **Estados de Interacción:** "Define estados `:focus-visible` claros con anillos de color (focus rings) para que la navegación por teclado sea intuitiva".
*   **Micro-animaciones:** "Usa la librería **Framer Motion** para las transiciones de los acordeones y la aparición de las tarjetas (efecto *stagger*), aportando esa sensación de 'Magia' de la temática".

### 4. Gestión de Estado y Escalabilidad
*   **Datos Dinámicos:** "Extrae la información de los libros, lecciones y artículos del blog a archivos `JSON` o constantes separadas. No los dejes 'hardcoded' dentro del JSX para facilitar futuras actualizaciones desde un CMS".
*   **Rutas Limpias:** "Configura **React Router** con nombres de rutas semánticos (ej: `/biblioteca`, `/agenda`, `/blog`) y utiliza un componente `ScrollToTop` para que al navegar el scroll regrese al inicio".

### 5. SEO y Performance Técnico
*   **Meta-tags:** "Genera etiquetas SEO dinámicas (Título, Descripción y OpenGraph) para cada sección principal, optimizando la visibilidad en Google".
*   **Tailwind Purge:** "Asegúrate de que la configuración de Tailwind esté optimizada para eliminar el CSS no utilizado en el build final".

---

### Ejemplo de "Instrucción de Cierre" para Google Antigravity:

Para asegurar el éxito, copia y pega esto después del código:

> *"Basado en el código anterior, aplica **Clean Code**: separa los componentes en archivos independientes, utiliza **Framer Motion** para animar la entrada de las Cards con un efecto de 'suavizado', y asegúrate de que el diseño sea **Pixel Perfect** respecto a la estética de React Native Docs. Prioriza el rendimiento de carga (LCP) optimizando los assets visuales."*

¿Quieres que te prepare un archivo `tailwind.config.js` específico con la paleta de colores vibrante para que la IA lo use como base?