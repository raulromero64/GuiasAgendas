# 06 - Historial

## 2026-07-20 - Continuidad Sprint 1.9: Acceso centrado y avance Wizard Matricula Nivel 2

### Resumen de la sesion

- Se aplico primero el ajuste visual acordado en la pantalla de acceso al formulario:
  - centrado completo de la experiencia en viewport,
  - tipografia publica amigable alineada a Quicksand,
  - sin romper el layout ni el Design System vigente.
- Se continuo la replicacion del formulario fisico en el wizard publico:
  - el campo de referencia de foto del estudiante en inscripcion queda obligatorio,
  - en Salud se reforzo validacion local condicional limpiando detalles cuando la respuesta binaria cambia a `No`.
- Se preservo el alcance tecnico del sprint:
  - sin persistencia,
  - sin APIs,
  - sin cambios de logica de negocio,
  - sin alteraciones de arquitectura.

### Validaciones realizadas

- Verificacion de errores de editor: sin errores.
- Compilacion TypeScript en verde (`npx tsc -b --pretty false`).

### Estado al cierre

- Sprint 1.9 continua activo en frente `Wizard de Solicitud de Matricula - Nivel 2`.
- App Publica con acceso por PIN centrado y consistente con identidad tipografica aprobada.
- Wizard mantiene compatibilidad de flujo y validaciones por paso.

## 2026-07-17 - Cierre revision funcional del Formulario de Solicitud de Matricula

### Resumen de la sesion

- Se completo la revision funcional integral del wizard publico de Solicitud de Matricula.
- Se establecio como regla operativa obligatoria que todos los campos del formulario son obligatorios por paso.
- Se bloqueo el avance del wizard cuando existen campos pendientes y se limito el salto a pasos futuros sin validacion del paso actual.
- Se incorporo retroalimentacion inmediata de validacion: mensaje claro, resaltado visual de campos incompletos y foco automatico al primer campo invalido.
- Se formalizo que el paso `Verificar Informacion` es exclusivamente de lectura y control previo al envio.
- Se elimino el espacio funcional de fotografia del estudiante para esta fase.
- Se incorporo la seccion `Datos del acudiente` con campos iniciales de nombre completo, parentesco y telefono.
- Se corrigio la nomenclatura visible del campo `I.P.S.`.
- Se alineo identidad visual de acciones clave del flujo publico (pantalla PIN y botones principales) al color institucional del logotipo.

### Validaciones realizadas

- Validacion funcional del bloqueo de avance por campos pendientes en todos los pasos.
- Validacion visual de resaltado de errores y foco en primer campo invalido.
- Compilacion de produccion en verde (`npm run build`).

### Estado al cierre

- Solicitud de Matricula: revision funcional cerrada para esta fase.
- Flujo publico: consistente con control institucional y requisitos de completitud.
- Build de produccion: exitoso.

## 2026-07-17 - A-030 Portal Publico Institucional y flujo de Matricula con PIN

### Resumen de la sesion

- Se implemento el Portal Publico Institucional del colegio como capa separada del dashboard administrativo.
- Se consolido la separacion operacional: Plataforma SMP interna != Portal Publico del colegio.
- Se estructuro la nueva capa publica en `src/public/portal/` con layout, componentes, paginas y secciones.
- Se implemento Navbar institucional con menu publico y navegacion responsive con hamburguesa movil.
- Se incorporo el acceso por PIN previo al wizard de Solicitud de Matricula.
- Se formalizo el flujo publico: `Portal (/) -> Acceso Matricula (/acceso-matricula) -> Validacion PIN -> Wizard (/solicitud-matricula)`.
- Se agrego navegacion de retorno para garantizar salida segura hacia el portal institucional.
- Se ajusto UX de acceso para enfocar la pantalla en validacion de PIN sin enlaces distractores.

### Validaciones realizadas

- Validacion funcional de rutas publicas:
  - `/` (portal institucional)
  - `/acceso-matricula` (control de acceso por PIN)
  - `/solicitud-matricula` (wizard publico)
- Validacion visual de elementos clave:
  - Enlace de retorno al inicio en acceso por PIN.
  - Boton flotante `Volver al inicio` visible durante todo el wizard.
- Validacion tecnica con compilacion de produccion en verde (`npm run build`).

### Estado al cierre

- Portal Publico Institucional: implementado y operativo.
- Matricula publica: protegida por PIN demo (`1234`) con redireccion controlada.
- Logica del `StudentEnrollmentWizard`: preservada sin modificaciones.
- Build de produccion: exitoso.

## 2026-07-17 - A-028 Fase 2 - Quicksand para la App Publica

### Resumen de la sesion

- Se implemento `Quicksand` como fuente oficial de toda la App Publica.
- La configuracion se realizo desde el sistema central de tipografia y desde el layout publico para asegurar herencia automatica.
- Se mantuvo `Montserrat` exclusivamente para el branding institucional del logo.
- No se introdujeron cambios en logica del Wizard ni en reglas de negocio.

### Estado al cierre

- Fase 2 de A-028: completada y validada.
- Compilacion: exitosa.
- App Publica: alineada con la decision tipografica aprobada.

## 2026-07-17 - Decision A-029 sobre estructura profesional del Libro Oficial

### Resumen de la sesion

- Se aprueba que `docs/08-PROYECTO-EXPLICADO.md` mantenga estructura de libro profesional.
- Se incorpora Indice General por capitulos.
- Se incorpora Indice Alfabetico para localizacion rapida de temas.
- Se incorporan referencias cruzadas entre capitulos relacionados.
- Se formaliza que toda decision importante registrada en el Libro debe quedar ubicada en su capitulo correspondiente y, cuando aplique, reflejada tambien en el indice alfabetico.

### Estado al cierre

- Libro Oficial: reorganizado como manual profesional de referencia.
- Lenguaje: mantenido para publico no tecnico.
- Trazabilidad documental: actualizada.

## 2026-07-17 - A-028 Fase 1 - Consolidacion de branding y tipografias

### Resumen de la sesion

- Se consolido el branding institucional en `src/client/` como fuente compartida para App Publica y dashboard.
- Se creo un encabezado institucional unico para evitar duplicacion entre capas.
- Se formalizo el uso de `Montserrat SemiBold` para branding y `Plus Jakarta Sans` para interfaz.
- Se elimino la duplicacion de encabezados institucionales anteriores ya aprobados como obsoletos.
- Se actualizo la constante visible del sprint para mantener consistencia operativa.

### Estado al cierre

- Fase 1 de A-028: completada y validada.
- Compilacion: exitosa.
- Wizard de Solicitud de Matricula: sin modificaciones de logica.
- Dashboard administrativo: estable.

## 2026-07-17 - Politica permanente de calidad y consolidacion obligatoria

### Resumen de la sesion

- Se aprueba como politica permanente que toda implementacion finalice con una fase obligatoria de consolidacion.
- Se formaliza que antes de cerrar cualquier trabajo se debe verificar arquitectura, limpieza, buenas practicas, ausencia de duplicacion, ausencia de obsoletos, imports correctos, compilacion exitosa y documentacion sincronizada.
- Se establece que ningun Sprint puede cerrarse sin completar esta verificacion.
- Se actualizan Framework IA, Sprint Actual, Arquitectura SMP y Libro Explicativo para mantener trazabilidad completa.

### Estado al cierre

- Politica permanente de calidad: vigente.
- Regla de cierre de Sprint: reforzada y documentada.
- Sin cambios funcionales en codigo fuente.

## 2026-07-17 - Decision A-024 y primera implementacion de la separacion platform / client / public

### Resumen de la sesion

- Se aprobo e implemento la base tecnica de la arquitectura oficial `platform / client / public`.
- Se formalizo que el nucleo del producto SMP debe vivir en `src/platform/`.
- Se formalizo que la personalizacion institucional por colegio debe vivir en `src/client/`.
- Se formalizo que la App Publica del Colegio debe vivir en `src/public/` y permanecer desacoplada del dashboard administrativo.
- Se implemento una nueva entrada publica para Solicitud de Matricula con acceso por PIN sin logica de validacion.
- Se habilito una ruta publica dedicada para consumir el wizard existente sin modificar su logica funcional.
- Se mantuvo compatibilidad con rutas actuales y se preservo el comportamiento del dashboard administrativo.

### Justificacion arquitectonica

- SMP debe operar como producto independiente del portal institucional del colegio.
- El colegio puede tener portal propio, portal desarrollado por nosotros o no tener sitio web.
- La App Publica debe poder integrarse desde cualquier enlace o boton externo.
- La identidad visual y los datos institucionales no deben contaminar el nucleo funcional reutilizable del producto.

### Estado al cierre

- Arquitectura oficial: actualizada con el modelo `platform / client / public`.
- App Publica: base inicial creada para acceso y continuidad hacia Solicitud de Matricula.
- Dashboard administrativo: sin regresiones funcionales detectadas.
- Build de produccion: ejecutado satisfactoriamente.

## 2026-07-15 - Decision clave de arquitectura y negocio sobre Solicitud de Matricula

### Resumen de la sesion

- Se formalizo que el trabajo ejecutado corresponde a Foundation del producto SMP y no a desarrollo funcional completo del modulo de Matriculas.
- Se establecio como regla funcional oficial:
  - La Solicitud de Matricula puede diligenciarse desde computador, tableta o dispositivo movil mediante un codigo de acceso valido suministrado por la institucion o adquirido por los canales autorizados.
  - El diligenciamiento de la solicitud NO crea automaticamente un estudiante.
  - Solo la aprobacion oficial del colegio convierte la solicitud en expediente inicial del estudiante.
- Se formalizo como decision de arquitectura y negocio:
  - El formulario visible pertenece al cliente (colegio), mientras que el proceso de negocio y la arquitectura pertenecen al producto SMP.
  - El formulario puede variar entre clientes, pero el proceso de negocio permanece estandarizado en SMP.
- Se ratifico que la aprobacion final institucional corresponde a Secretaria y Rectoria.

### Estado al cierre

- Sprint 1.9: sin cambio de estado oficial.
- Trazabilidad documental: actualizada y sincronizada para Sprint, Historial y Manual Funcional.
- Filosofia vigente: producto reutilizable, cliente configurable, control institucional y estudiante creado solo despues de aprobacion oficial.

## 2026-07-15 - Cierre oficial Sprint 1.8.1 y apertura Sprint 1.9

### Resumen de la sesion

- Se aprobó como estandar permanente la integridad referencial transversal entre Institucion, PeriodoLectivo, Nivel, Grado, Grupo y Asignatura.
- Se aprobó como estandar permanente la concurrencia con Optimistic Locking y contrato homogeneo de versionado por agregado.
- Se declaro oficialmente cerrado el Sprint 1.8.1.
- Se declaro oficialmente abierto el Sprint 1.9.
- Se ordeno mantener el Libro Oficial del Proyecto como explicacion funcional completa en lenguaje sencillo para audiencias no tecnicas.

### Estado al cierre

- Sprint 1.8.1: cerrado oficialmente.
- Sprint 1.9: abierto oficialmente.
- Arquitectura permanente: actualizada con los dos estandares aprobados.

## 2026-07-14 - Auditoria completa de Estructura Academica pre Sprint 1.9

### Resumen de la sesion

- Se ejecuto auditoria integral sobre arquitectura, dominio, aplicacion, pruebas y escalabilidad de PeriodoLectivo, Nivel, Grado, Grupo y Asignatura.
- Se confirmo cumplimiento general de Clean Architecture, DDD, SRP y separacion por contratos en capa de aplicacion.
- Se validaron invariantes centrales por entidad y reglas de unicidad por scope institucional/academico.
- Se detectaron riesgos de integridad referencial cruzada entre agregados por ausencia de validaciones inter-modulo en capa de aplicacion.
- Se detecto riesgo de concurrencia por falta de control de version en agregados distintos de PeriodoLectivo.
- Se verifico suite de pruebas en verde (80/80).
- Se registro deuda tecnica de cobertura: script `test:coverage` bloqueado por dependencia faltante `@vitest/coverage-v8`.

### Estado al cierre

- Sprint 1.8.1: cierre tecnico auditado.
- Estructura Academica: certificada con observaciones.
- Condicion para Sprint 1.9: priorizar mitigaciones de integridad referencial y concurrencia antes de ampliar procesos operativos (Matriculas, Horarios, Asistencia, Calificaciones y Reportes).

## 2026-07-14 - Cierre oficial Sprint 1.7 e inicio Sprint 1.8.1

### Resumen de la sesion

- Se declaro cerrado oficialmente el Sprint 1.7.
- Se inicio formalmente el Sprint 1.8.1.
- Se definio como primer modulo funcional del producto: Estructura Academica.
- Se establecio el orden de implementacion: PeriodoLectivo, Nivel, Grado, Grupo y Asignatura.
- Se adopto el principio operativo: Primero los catalogos, despues los procesos.
- Se establecio PeriodoLectivo como eje del sistema.
- Se separo el diseno entre catalogos maestros y datos operativos.
- Se incorporo Institucion como entidad raiz para crecimiento futuro.
- Se adopto como principio permanente de producto: cada funcionalidad debe ahorrar tiempo, reducir errores o facilitar la toma de decisiones.

### Estado al cierre

- Sprint 1.7: cerrado oficialmente.
- Sprint 1.8.1: activo, en fase de diseno funcional y arquitectura del modulo Estructura Academica.
- Siguiente foco: implementacion incremental del modulo en el orden definido.

## 2026-07-14 - Cierre tecnico Sprint 1.7 (RBAC)

### Resumen de la sesion

- Se consolido el modulo unico de seguridad en src/shared/security para autorizacion.
- Se verifico que authorization.engine.ts concentra la validacion de permisos.
- Se confirmo AuthorizationGuard como unico guard operativo del proyecto.
- Se verifico que las rutas consumen politicas sin evaluar permisos directamente.
- Se detecto que students.write y academic.write estan definidos y aun no usados por politicas vigentes.
- Build y lint ejecutados con resultado exitoso.

### Estado al cierre

- Sprint 1.7: cierre tecnico completado.
- Arquitectura RBAC: consolidada sin duplicidades activas.
- Siguiente foco: cierre funcional/ejecutivo y planificacion del siguiente sprint.

## 2026-07-13 - Protocolo de coordinacion entre IAs

### Resumen de la sesion

- Se incorporo AI/FRAMEWORK/02-PROTOCOLO-COORDINACION.md como documento oficial del OpenDev IA Framework.
- Se reforzo en la Constitucion la jerarquia oficial, la ruta de recuperacion de contexto y la inmutabilidad del Framework v1.0.
- Se actualizo el indice general para incluir el nuevo protocolo dentro de las referencias del Framework IA.

### Estado al cierre

- Framework IA: congelado como version oficial.
- Codigo fuente de la aplicacion: sin cambios.
- Siguiente foco: ninguna modificacion al Framework sin autorizacion expresa del Director del Proyecto.

## 2026-07-13 - Congelacion del Framework IA

### Resumen de la sesion

- Se actualizo la ruta oficial de inicio para exigir PLANIFICACION.md y SPRINT-ACTUAL.md antes de cualquier analisis.
- Se consolidaron las reglas permanentes del OpenDev IA Framework: planificacion como fuente de verdad, sprint como trabajo vigente e historial como registro cerrado.
- Se incorporo la jerarquia oficial de documentacion y el orden de implementacion que conduce al commit de estabilidad.
- Se declaro el Framework IA como congelado tras la version v1.0.

### Estado al cierre

- Framework IA: congelado como version oficial.
- Codigo fuente de la aplicacion: sin cambios.
- Siguiente foco: solo trabajo autorizado por el Director del Proyecto y documentado en la planificacion.

## 2026-07-13 - Cierre de sesión Sprint 0.2

### Resumen de la sesión

- Se completó la auditoría inicial del repositorio (Sprint 0.1) sin modificar código fuente.
- Se crearon las carpetas base del Framework IA: AI y docs.
- Se creó el punto oficial de entrada para agentes y desarrolladores: AI/START-HERE.md.
- Se creó la Constitución del framework: AI/FRAMEWORK/00-CONSTITUCION.md.
- Se creó el documento de filosofía del framework: AI/FRAMEWORK/01-FILOSOFIA.md.
- Se preparó la base documental para continuar con la definición completa del OpenDev IA Framework.

### Estado al cierre

- Framework IA: en construcción (fase de definición documental).
- Código fuente de la aplicación: sin cambios.
- Siguiente foco: completar documentación marco y preparar auditoría para migración a React.
