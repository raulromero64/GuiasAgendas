# SPRINT ACTUAL

## 1. Estado vigente

- Fase activa: Phase 1 - Platform Foundation
- Sprint activo: 1.8.1
- Estado: Cierre tecnico auditado

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

- Estructura Academica: certificada con observaciones.
- Decision operativa: habilitada para iniciar Sprint 1.9 si se atienden primero las recomendaciones criticas de integridad referencial y concurrencia.
