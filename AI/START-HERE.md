# 🚀 START HERE

## OpenDev IA Framework

Antes de realizar cualquier acción es obligatorio:

1. Leer docs/01-PLAN-MAESTRO.md.
2. Leer docs/03-ARQUITECTURA.md.
3. Leer docs/PLANIFICACION.md.
4. Leer docs/SPRINT-ACTUAL.md.
5. Si el Sprint lo referencia, leer los documentos tecnicos especificos del sprint activo.
6. Comenzar el trabajo.

No debe asumirse el estado del proyecto sin completar esta secuencia.
START-HERE.md define la unica ruta valida de recuperacion de contexto.

Este proyecto utiliza el OpenDev IA Framework.

## Roles

Director del Proyecto
Raúl

ChatGPT
Arquitecto del proyecto / Ingeniero de Datos

Copilot
Gestor e implementador de código

Codex
Auditor técnico y apoyo de implementación

## Reglas

- Ninguna decisión de arquitectura sin aprobación del Director del Proyecto.
- El Plan Maestro es la referencia jerarquica principal de ruta del proyecto.
- La planificacion operacionaliza el Plan Maestro.
- El Framework nunca reemplaza la planificacion.
- El Sprint solo representa el trabajo vigente.
- El historial unicamente conserva el registro de cambios.
- Ninguna IA debe inferir objetivos fuera de la planificacion.
- Ninguna sesion nueva puede analizar ni modificar codigo antes de completar la recuperacion de contexto.
- No crear documentación duplicada.
- No modificar el Framework IA sin autorización.
- Mantener documentación, Git y código sincronizados.
- Todo cambio debe pertenecer al Sprint activo.
- Las reglas permanentes de arquitectura (incluyendo Desarrollo Just-in-Time) viven en docs/03-ARQUITECTURA.md.
- Ningun trabajo puede darse por terminado sin fase obligatoria de consolidacion.
- La consolidacion final debe verificar: arquitectura consistente, codigo limpio, buenas practicas, ausencia de duplicacion, ausencia de archivos obsoletos, imports correctos, compilacion exitosa y documentacion sincronizada.
- Mantener respuestas y reportes concisos para ahorrar contexto.
- Mantener separacion estricta entre Portal Publico Institucional (`src/public/portal/`) y plataforma administrativa SMP (`/app`).
- No mezclar componentes, layouts o navegacion de administracion dentro del flujo publico del colegio.

## Estado funcional vigente - Solicitud de Matricula (2026-07-20)

- Todos los campos del wizard son obligatorios por paso y no se permite avanzar con informacion pendiente.
- `Siguiente` valida el paso actual, muestra mensaje de campos pendientes y enfoca el primer error.
- El paso final de verificacion consume el documento oficial de matricula (`RegistroMatricula`) para vista previa institucional.
- Se incorporo referencia de foto del estudiante en inscripcion y se amplio la seccion completa del acudiente.
- Se ajustaron etiquetas, ayudas visuales y placeholders en los pasos del wizard para mayor fidelidad con el orden del formato fisico del colegio.
- Se mantuvo la nomenclatura visible `I.P.S.` y la compatibilidad del flujo actual del wizard.
- La pantalla de acceso por PIN se centra completamente en viewport y hereda tipografia publica `Quicksand` para experiencia amigable.
- Se adopta `Privacy by Design` como criterio activo del sprint: minimizacion de datos, sin logs de datos personales, sin datos sensibles en URL y sin almacenamiento temporal fuera del estado del formulario.
- No hay persistencia, APIs ni cambios de logica de negocio en este alcance.

Fin del documento.
