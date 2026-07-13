# OpenDev IA Framework - Constitucion

## 1. Proposito del Framework

OpenDev IA Framework establece un marco operativo comun para coordinar trabajo entre personas y agentes de IA en proyectos de software. Su fin es asegurar decisiones trazables, ejecucion ordenada, calidad verificable y continuidad entre sprints, equipos y repositorios. Es la metodologia oficial del proyecto.

## 2. Mision

Definir una forma estandar, clara y auditable de planificar, construir, revisar y mantener productos digitales asistidos por IA, reduciendo ambiguedad y maximizando valor de negocio.

## 3. Vision

Consolidar un modelo de trabajo replicable en cualquier proyecto, donde colaboracion humano-IA produzca resultados predecibles, documentados, mantenibles y escalables.

## 4. Principios Fundamentales

- Claridad antes que velocidad.
- Trazabilidad antes que suposicion.
- Modularidad antes que acoplamiento.
- Reutilizacion antes que duplicacion.
- Evidencia antes que opinion.
- Consistencia documental, tecnica y operativa.
- Mejora continua basada en retrospectiva y datos.

## 5. Roles Oficiales

- Director del Proyecto: Define prioridades, aprueba arquitectura, valida alcance y autoriza decisiones criticas.
- Arquitecto de Solucion: Disena lineamientos tecnicos, contratos de integracion y evolucion estructural.
- Implementador de Codigo: Ejecuta cambios en codigo segun sprint, respetando estandares y pruebas.
- Auditor Tecnico: Evalua riesgos, calidad, cumplimiento y coherencia de decisiones.
- Gestor Documental: Mantiene indice, historial, versionado y no duplicacion de documentos.

Un mismo actor puede cubrir multiples roles, pero las responsabilidades deben permanecer explicitas.

## 5.1 Protocolo de Coordinacion entre IAs

La coordinacion operativa entre ChatGPT, Copilot y Codex se rige por el documento AI/FRAMEWORK/02-PROTOCOLO-COORDINACION.md, que forma parte del OpenDev IA Framework y es de cumplimiento obligatorio.

## 6. Autoridad del Director del Proyecto

El Director del Proyecto es la autoridad final sobre:

- Vision y direccion del producto.
- Priorizacion de backlog y objetivos de sprint.
- Aprobacion de cambios de arquitectura.
- Aceptacion de entregables.
- Excepciones a normas operativas.

Ninguna decision estructural de alto impacto se considera valida sin su aprobacion explicita.

## 7. Reglas Inquebrantables

- No iniciar trabajo sin contexto minimo obligatorio del sprint activo.
- El Framework nunca reemplaza la planificacion.
- La planificacion es la fuente de verdad del proyecto.
- El Sprint solo representa el trabajo vigente.
- El historial unicamente conserva el registro de cambios.
- Ninguna IA debe inferir objetivos fuera de la planificacion.
- Las nuevas funcionalidades deben incorporarse al roadmap y a la planificacion antes de iniciar su desarrollo.
- Una vez aprobado Framework v1.0, queda congelado y no puede modificarse durante el desarrollo normal.
- Cualquier mejora detectada debe registrarse como propuesta para una futura version, sin alterar la version vigente.
- No ejecutar cambios fuera de alcance aprobado.
- No duplicar documentacion ni crear fuentes paralelas de verdad.
- No alterar politicas del framework sin autorizacion formal.
- No omitir registro de decisiones tecnicas relevantes.
- No integrar cambios sin verificacion de calidad definida.
- No cerrar tareas sin evidencia de estado actualizado.

## 8. Ciclo Oficial de Desarrollo

1. Contexto: revisar estado del proyecto, documentacion clave y rama activa.
2. Planificacion: definir objetivo, alcance, riesgos y criterios de aceptacion.
3. Ejecucion: implementar cambios dentro del sprint y del marco aprobado.
4. Verificacion: validar funcionalidad, calidad tecnica y cumplimiento de criterios.
5. Documentacion: registrar decisiones, cambios, impactos y pendientes.
6. Cierre: consolidar estado final y preparar continuidad para siguiente ciclo.

## 9. Gestion Documental

- Toda documentacion oficial debe vivir en rutas definidas por el framework.
- Cada documento debe tener proposito unico y ubicacion canonica.
- PLANIFICACION.md define la verdad permanente del proyecto.
- SPRINT-ACTUAL.md define el trabajo vigente.
- HISTORIAL.md conserva el registro cerrado de cambios.
- START-HERE.md define el orden obligatorio de recuperacion del contexto.
- Jerarquia oficial del contenido: OpenDev IA Framework > PLANIFICACION.md > SPRINT-ACTUAL.md > codigo fuente > HISTORIAL.md.
- El Protocolo de Coordinacion entre IAs es parte del OpenDev IA Framework y tiene prioridad sobre cualquier instruccion operativa de menor nivel.
- Historial de cambios y sprints debe mantenerse actualizado.
- Indices maestros deben reflejar siempre el estado real.
- Contenido obsoleto debe marcarse o retirarse de forma controlada.

## 10. Gestion de Git

- Cada cambio debe vincularse a una tarea o sprint activo.
- Ramas deben tener intencion clara y nombre consistente.
- Commits deben ser pequenos, trazables y semanticamente claros.
- Integraciones a ramas principales requieren validacion previa.
- No se permite mezclar cambios no relacionados en una misma entrega.

## 11. Gestion de Calidad

- Definir criterios de calidad antes de implementar.
- Ejecutar verificaciones tecnicas acordes al tipo de cambio.
- Priorizar prevencion de regresiones y control de deuda tecnica.
- Registrar hallazgos, riesgos y acciones correctivas.
- Asegurar coherencia entre codigo, documentacion y estado operativo.

## 12. Orden de Implementacion y Congelacion

1. Actualizar la documentacion.
2. Validar coherencia.
3. Realizar commit de estabilidad del Framework IA.
4. A partir de ese commit, el Framework queda congelado.

## 13. Vigencia del Framework

Esta Constitucion entra en vigencia desde su publicacion y aplica a todo proyecto que adopte OpenDev IA Framework.

Se mantiene vigente hasta su reemplazo por una version superior aprobada formalmente por la autoridad del proyecto.

---

Version: 1.0.0
Estado: Congelado
Naturaleza: Generica y reutilizable
