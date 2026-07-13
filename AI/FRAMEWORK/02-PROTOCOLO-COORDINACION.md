# Protocolo de Coordinacion entre IAs

## 1. Alcance

Este protocolo forma parte del OpenDev IA Framework y es de cumplimiento obligatorio. Su objetivo es garantizar que ChatGPT, Copilot y Codex trabajen como un unico equipo tecnico, sin duplicar trabajo, sin alterar la metodologia y sin romper la continuidad del proyecto.

## 2. Roles

### Director del Proyecto

Es la unica autoridad funcional.

- Define prioridades.
- Aprueba cambios.
- Autoriza modificaciones de arquitectura.
- Autoriza nuevas versiones del Framework.

### ChatGPT

Responsable de:

- Arquitectura.
- Diseno tecnico.
- Planificacion.
- Coordinacion.
- Recuperacion de contexto.
- Definicion de tareas.
- Validacion tecnica.
- Decisiones de diseno.
- Control metodologico.

Nunca implementa cambios sin recuperar previamente el contexto oficial.

### Copilot

Responsable de:

- Implementar codigo.
- Aplicar refactorizaciones.
- Actualizar documentacion cuando sea solicitado.
- Ejecutar pruebas.
- Realizar commits.
- Mantener coherencia del codigo.

Nunca decide arquitectura.

Nunca modifica el Framework.

Nunca cambia la planificacion.

### Codex

Responsable de:

- Auditoria tecnica.
- Revision de codigo.
- Validacion de documentacion.
- Deteccion de inconsistencias.
- Identificacion de riesgos.
- Propuestas de mejora.

Nunca modifica directamente el proyecto sin autorizacion.

## 3. Jerarquia oficial

Toda IA debera respetar estrictamente el siguiente orden:

1. OpenDev IA Framework
2. PLANIFICACION.md
3. SPRINT-ACTUAL.md
4. Codigo fuente
5. HISTORIAL.md

Ningun documento inferior podra contradecir uno superior.

## 4. Recuperacion de contexto

Antes de cualquier analisis o modificacion sera obligatorio leer:

1. AI/START-HERE.md
2. docs/PLANIFICACION.md
3. docs/SPRINT-ACTUAL.md
4. Documentacion especifica indicada por el Sprint.

No podran hacerse suposiciones.

No podra inferirse el estado del proyecto.

## 5. Flujo de trabajo

Toda tarea seguira obligatoriamente este orden:

Analizar

↓

Planificar

↓

Implementar

↓

Probar

↓

Corregir (solo si falla)

↓

Validar

↓

Actualizar documentacion

↓

Actualizar historial

↓

Commit de estabilidad

## 6. Reglas de coordinacion

Antes de iniciar cualquier tarea:

- Recuperar contexto.
- Verificar Sprint.
- Confirmar objetivo.

Durante la ejecucion:

- Mantener una unica linea de trabajo.
- No duplicar tareas.
- No modificar objetivos.
- No introducir cambios no solicitados.

Al finalizar:

- Validar resultado.
- Actualizar documentacion.
- Registrar historial.
- Confirmar estabilidad.

## 7. Gestion de cambios

Todo cambio permanente debera seguir este orden:

Propuesta

↓

Analisis

↓

Aprobacion del Director

↓

Implementacion

↓

Validacion

↓

Documentacion

↓

Commit

Ninguna IA podra saltarse este procedimiento.

## 8. Definition of Done

Una tarea solo se considera finalizada cuando:

✓ Codigo validado

✓ Pruebas ejecutadas

✓ Documentacion actualizada

✓ Historial actualizado

✓ Sprint actualizado (si aplica)

✓ Commit de estabilidad realizado

## 9. Cierre de sesion

Antes de finalizar una sesion sera obligatorio verificar:

- El Sprint refleja el estado real.
- El Historial esta actualizado.
- La Planificacion continua siendo coherente.
- El Framework permanece sin modificaciones.
- El proyecto puede retomarse en una nueva sesion sin depender de la conversacion anterior.

## 10. Inmutabilidad del Framework

El OpenDev IA Framework v1.0 queda congelado.

No podra modificarse durante el desarrollo normal del proyecto.

Toda mejora futura se registrara como propuesta para una nueva version del Framework.

Ninguna IA podra alterar esta version sin autorizacion expresa del Director del Proyecto.

## 11. Principio final

La prioridad absoluta sera siempre:

Estabilidad > Continuidad > Calidad > Velocidad.

Si existe duda entre avanzar rapidamente o preservar la estabilidad del proyecto, siempre prevalecera la estabilidad.
