# 03 - ARQUITECTURA SMP

Estado: Permanente
Version: 1.0
Ambito: School Management Platform (SMP)

## 1. Proposito

Este documento define las reglas permanentes de arquitectura del SMP.

- Es la fuente oficial para decisiones de estructura tecnica.
- Sus reglas aplican a todas las phases y todos los sprints.
- Ninguna regla permanente debe vivir en SPRINT-ACTUAL.md.

## 2. Principios permanentes

- Reusable First.
- Single Responsibility.
- Desarrollo Just-in-Time.
- Componentes reutilizables.
- Helpers puros.
- Hooks reutilizables.
- Services desacoplados.
- Types centralizados.
- Constantes compartidas.
- Eliminacion inmediata de codigo obsoleto.
- No duplicacion de logica.
- Una unica arquitectura vigente.
- Toda decision permanente debe quedar documentada.
- Cada Phase debe finalizar con limpieza arquitectonica.
- Todo componente debe tener una unica responsabilidad.

## 2.1 Politica permanente: Desarrollo Just-in-Time

- No crear archivos, carpetas o documentacion sin uso inmediato en el sprint vigente.
- Todo archivo nuevo debe ser usado dentro del mismo sprint en que se crea.
- Crear types, tests, helpers o documentacion solo cuando exista una necesidad real.
- Si un componente o modulo requiere un conjunto minimo de archivos, crear solo ese minimo.
- Si una refactorizacion deja archivos sin uso, migrar lo necesario, eliminarlos y validar build.

Objetivo operativo: mantener un repositorio limpio, pequeno y sin infraestructura muerta.

## 3. Protocolo obligatorio de implementacion

Antes de construir cualquier pantalla o modulo se define, en este orden:

1. Componentes reutilizables necesarios.
2. Hooks reutilizables.
3. Helpers (utils) necesarios.
4. Services necesarios.
5. Types necesarios.
6. Constantes necesarias.

Solo despues de completar esta base se ensambla la pantalla.

## 4. Ciclo obligatorio de entrega

Construir -> Consolidar -> Limpiar -> Visualizar -> Documentar -> Commit

## 5. Reglas de limpieza y consolidacion

- No dejar estructuras duplicadas.
- Remover de inmediato cualquier estructura obsoleta desplazada por la arquitectura vigente.
- Corregir imports afectados por migraciones o limpieza.
- Validar compilacion y ejecucion visual antes de cierre de entrega.

## 6. Relacion documental

Flujo oficial de contexto:

START-HERE
-> PLAN-MAESTRO
-> ARQUITECTURA
-> PLANIFICACION
-> SPRINT-ACTUAL

## 7. Gobernanza

- Este documento se actualiza solo por decisiones permanentes de arquitectura.
- Todo cambio aqui debe reflejarse en PLANIFICACION y START-HERE cuando afecte jerarquia o flujo.
