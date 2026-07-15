# SPRINT ACTUAL

## 1. Estado vigente

- Fase activa: Phase 1 - Platform Foundation
- Sprint activo: 1.9
- Estado: Sprint 1.8.1 cerrado oficialmente y Sprint 1.9 abierto

Este documento contiene unicamente el trabajo vigente y no redefine la planificacion.

## 2. Objetivo del sprint

- Disenar y preparar el modulo funcional Estructura Academica como primera base operativa del producto.

## 3. Alcance vigente

- Definir modelo de dominio para: PeriodoLectivo, Nivel, Grado, Grupo y Asignatura.
- Establecer al PeriodoLectivo como eje funcional del sistema.
- Separar explicitamente catalogos maestros y datos operativos.
- Incorporar Institucion como entidad raiz para crecimiento futuro.
- Mantener foco exclusivo en Estructura Academica (sin Matriculas, Estudiantes, Calificaciones ni Asistencia).

## 4. Reglas especificas del sprint vigente

- No desarrollar logica de negocio.
- No modificar autenticacion base del Sprint 1.6.
- Priorizar principio operativo: Primero los catalogos, despues los procesos.
- No abrir alcance a modulos fuera de Estructura Academica en este sprint.

## 5. Cierre del sprint anterior

- Sprint 0.2 cerrado.
- Consolidacion documental del OpenDev IA Framework completada.
- Flujo oficial activo: START-HERE -> PLAN-MAESTRO -> ARQUITECTURA -> PLANIFICACION -> SPRINT-ACTUAL.

## 6. Documentos especificos del sprint

- Diseno funcional Sprint 1.8.1 (Estructura Academica):
  - Primer modulo funcional oficial: Estructura Academica.
  - Orden oficial de implementacion: PeriodoLectivo -> Nivel -> Grado -> Grupo -> Asignatura.
  - Principio aplicado: Primero los catalogos, despues los procesos.
  - Eje del sistema: PeriodoLectivo.
  - Preparacion estructural: Institucion como entidad raiz.

## 7. Auditoria integral pre Sprint 1.9 (Estructura Academica)

### 7.1 Hallazgos principales

- La estructura mantiene separacion consistente por capas (dominio, aplicacion, puertos, pruebas) y no incorpora dependencias de UI/API/BD.
- Las entidades PeriodoLectivo, Nivel, Grado, Grupo y Asignatura conservan invariantes explicitas mediante Value Objects y errores de dominio.
- Los casos de uso aplican orquestacion simple y cumplen SRP: crean, actualizan, listan y cambian estado sin logica de infraestructura.
- El alcance multiinstitucion esta modelado por `institucionId` en todos los modulos auditados.
- Existen puntos de preparacion para crecimiento hacia Matriculas, Horarios, Asistencia, Calificaciones y Plan Curricular.

### 7.2 Riesgos tecnicos detectados

- No hay validacion referencial cruzada entre agregados en aplicacion (por ejemplo, existencia y coherencia institucional entre Periodo/Nivel/Grado/Grupo), lo que puede permitir combinaciones huerfanas sin un servicio de dominio transversal.
- No existe contrato de concurrencia/locking en Nivel, Grado, Grupo y Asignatura (solo PeriodoLectivo maneja `version`), con riesgo de lost updates en escenarios concurrentes.
- La preparacion para relaciones futuras esta declarada en metadatos de entidad, pero aun no existe un puerto de integracion de Plan Curricular para gobernar Asignatura <-> Grado/Nivel.

### 7.3 Cobertura y calidad de pruebas

- Suite funcional vigente en verde: 80/80 pruebas.
- La ejecucion de cobertura porcentual no pudo certificarse por dependencia faltante (`@vitest/coverage-v8`) en el script `test:coverage`.
- Escenarios faltantes recomendados: validaciones de borde para normalizacion extrema de codigo/nombre, duplicidad en update por nombre en todos los modulos, y pruebas negativas de transicion redundante en todos los agregados.

### 7.4 Estado de certificacion para Sprint 1.9

- Estructura Academica: certificada para cierre de Sprint 1.8.1.
- Decision operativa: integridad referencial transversal y concurrencia con Optimistic Locking aprobadas como decisiones oficiales de arquitectura.

## 8. Cierre oficial Sprint 1.8.1

- Se aprueba como estandar permanente la integridad referencial transversal entre Institucion, PeriodoLectivo, Nivel, Grado, Grupo y Asignatura.
- Se aprueba como estandar permanente la concurrencia mediante Optimistic Locking con contrato homogeneo de versionado por agregado.
- El Sprint 1.8.1 queda oficialmente cerrado con decisiones criticas resueltas a nivel de arquitectura.

## 9. Apertura oficial Sprint 1.9

- Sprint 1.9 abierto oficialmente bajo las reglas permanentes actualizadas en arquitectura.
- El trabajo de implementacion y documentacion del Sprint 1.9 se define por decision de ChatGPT.

## 10. Foundation del producto SMP

Durante el Sprint 1.9 se realizo trabajo de Foundation del producto SMP para el Proceso de Matriculas.

Este trabajo corresponde a preparacion arquitectonica y de negocio del producto reutilizable SMP.
No representa desarrollo funcional completo del modulo de Matriculas para operacion final.

El cliente (colegio) conserva su implementacion particular de formularios y configuraciones,
mientras que el proceso de negocio y la arquitectura se mantienen en el producto SMP.

## 11. Alcance de Foundation ejecutado en esta sesion

- Definicion de estados y transiciones oficiales de la Solicitud de Matricula.
- Preparacion de configuracion institucional del formulario para campos, catalogos, documentos, grados y ventanas.
- Preparacion de contratos para la conversion de solicitud aprobada en expediente inicial del estudiante.

Este alcance no cambia el estado oficial del sprint y no declara cierre funcional del Proceso de Matriculas.

## 12. Regla funcional oficial para Solicitud de Matricula

La Solicitud de Matricula puede diligenciarse desde computador, tableta o dispositivo movil mediante un codigo de acceso valido suministrado por la institucion o adquirido por los canales autorizados.

El diligenciamiento de la solicitud NO crea automaticamente un estudiante.

Solo cuando el colegio aprueba oficialmente la solicitud, esta se convierte en el expediente inicial del estudiante.

Esta decision garantiza:

- Control institucional.
- Trazabilidad completa.
- Integridad de la informacion.

La aprobacion final corresponde institucionalmente a Secretaria y Rectoria.
