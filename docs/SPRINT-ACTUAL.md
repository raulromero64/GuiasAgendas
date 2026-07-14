# SPRINT ACTUAL

## 1. Estado vigente

- Fase activa: Phase 1 - Platform Foundation
- Sprint activo: 1.6
- Estado: En progreso

Este documento contiene unicamente el trabajo vigente y no redefine la planificacion.

## 2. Objetivo del sprint

- Integrar autenticacion real con Auth0 manteniendo arquitectura IAM por contrato.

## 3. Alcance vigente

- Implementar Auth0Provider cumpliendo IAuthProvider.
- Registrar Auth0 como proveedor IAM oficial en factory por configuracion.
- Mantener DevelopmentAuthProvider solo para pruebas y entornos locales.
- Preparar y documentar variables de entorno IAM necesarias.
- Mantener alcance limitado a autenticacion (sin autorizacion funcional).

## 4. Reglas especificas del sprint vigente

- No desarrollar logica de negocio.
- No implementar autorizacion funcional.
- No crear modulos funcionales en este sprint.

## 5. Cierre del sprint anterior

- Sprint 0.2 cerrado.
- Consolidacion documental del OpenDev IA Framework completada.
- Flujo oficial activo: START-HERE -> PLAN-MAESTRO -> ARQUITECTURA -> PLANIFICACION -> SPRINT-ACTUAL.

## 6. Documentos especificos del sprint

- Diseno tecnico IAM Sprint 1.6 (autenticacion):
  - AuthService se mantiene desacoplado y depende del contrato IAuthProvider.
  - Auth0Provider se define como proveedor IAM oficial.
  - DevelopmentAuthProvider permanece disponible solo para pruebas.
  - La seleccion de proveedor se resuelve por configuracion en factory.
  - Variables de entorno IAM documentadas para despliegue local y continuo.
