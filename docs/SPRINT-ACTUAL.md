# SPRINT ACTUAL

## 1. Estado vigente

- Fase activa: Phase 1 - Platform Foundation
- Sprint activo: 1.7
- Estado: Cierre tecnico completado

Este documento contiene unicamente el trabajo vigente y no redefine la planificacion.

## 2. Objetivo del sprint

- Consolidar la capa de autorizacion RBAC con motor puro y guard unico.

## 3. Alcance vigente

- Consolidar src/shared/security como modulo unico para autorizacion.
- Mantener permissions.ts como catalogo central y fuente de verdad de permisos.
- Ejecutar authorization.engine.ts como motor puro sin dependencias de UI, rutas o proveedor IAM.
- Operar autorizacion de rutas con AuthorizationGuard como guard unico.
- Eliminar duplicidades de autorizacion fuera del modulo aprobado.

## 4. Reglas especificas del sprint vigente

- No desarrollar logica de negocio.
- No modificar autenticacion base del Sprint 1.6.
- No crear modulos funcionales en este sprint.

## 5. Cierre del sprint anterior

- Sprint 0.2 cerrado.
- Consolidacion documental del OpenDev IA Framework completada.
- Flujo oficial activo: START-HERE -> PLAN-MAESTRO -> ARQUITECTURA -> PLANIFICACION -> SPRINT-ACTUAL.

## 6. Documentos especificos del sprint

- Diseno tecnico IAM Sprint 1.7 (autorizacion):
  - Validacion de permisos centralizada en authorization.engine.ts.
  - AuthorizationGuard es el unico guard del proyecto.
  - Ninguna ruta evalua permisos directamente; solo consume politicas.
  - Politicas vigentes estan utilizadas en router.
  - Permisos write (students.write, academic.write) permanecen definidos y no usados en politicas actuales por alcance de sprint.
