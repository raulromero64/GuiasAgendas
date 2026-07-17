# LIBRO SCHOOL MANAGEMENT PLATFORM (SMP)

## Guia funcional, operativa y de procesos para instituciones educativas.

> Documento oficial de referencia de School Management Platform (SMP).
> Define el funcionamiento de la plataforma desde el negocio, los procesos y los usuarios.

---

# Presentacion

## Que es SMP

School Management Platform (SMP) es una plataforma institucional para organizar, coordinar y dar continuidad a los procesos escolares y administrativos de un colegio.

## Cual es su objetivo

Su objetivo es brindar una base comun de trabajo para que cada area de la institucion opere con claridad, orden y trazabilidad.

## Que problemas resuelve

- Informacion dispersa en diferentes medios.
- Retrabajo por procesos manuales.
- Falta de continuidad entre areas.
- Dificultad para tomar decisiones con informacion confiable.

## Por que existe

SMP existe para transformar la operacion escolar en un proceso institucional integrado, donde cada usuario entiende su rol, cada proceso tiene un flujo claro y cada decision puede sustentarse en informacion ordenada.

## Como debe leerse este libro

- Este libro se lee desde la operacion, no desde la tecnologia.
- Cada parte responde cuatro preguntas base: que hace, por que existe, como funciona y que beneficio aporta.
- Puede usarse para capacitacion, implementacion, soporte comercial y formacion de nuevos integrantes.

---

# PARTE I - LA PLATAFORMA

## 1. Filosofia

SMP parte de una idea central: primero se ordena la institucion, luego se digitalizan sus procesos.

## 2. Principios

- Claridad de roles.
- Trazabilidad institucional.
- Continuidad operativa.
- Gobernanza por procesos.
- Escalabilidad por modulos.

## 3. Usuarios

- Rectoria.
- Secretaria.
- Docentes.
- Padres de familia.
- Equipo comercial.
- Equipo de implementacion.

## 4. Arquitectura funcional (no tecnica)

La plataforma se organiza en modulos conectados por procesos.

- Un modulo prepara informacion para el siguiente.
- Los procesos institucionales se ejecutan por etapas.
- Cada usuario participa segun su responsabilidad.
- La plataforma garantiza continuidad entre decisiones y acciones.

---

# PARTE II - MODULOS

## Estructura oficial para cada capitulo de modulo

Todo capitulo de modulo debe mantener exactamente esta estructura:

1. Problema que resuelve.
2. Como funciona.
3. Flujo del proceso.
4. Decisiones importantes de negocio.
5. Beneficios para el colegio.
6. Beneficios para cada usuario.
7. Casos comunes.
8. Preguntas frecuentes.
9. Futuras ampliaciones.

## Capitulo de modulo 1 - Identidad de usuarios

1. Problema que resuelve.
2. Como funciona.
3. Flujo del proceso.
4. Decisiones importantes de negocio.
5. Beneficios para el colegio.
6. Beneficios para cada usuario.
7. Casos comunes.
8. Preguntas frecuentes.
9. Futuras ampliaciones.

## Capitulo de modulo 2 - Inicio de sesion seguro

1. Problema que resuelve.
2. Como funciona.
3. Flujo del proceso.
4. Decisiones importantes de negocio.
5. Beneficios para el colegio.
6. Beneficios para cada usuario.
7. Casos comunes.
8. Preguntas frecuentes.
9. Futuras ampliaciones.

## Capitulo de modulo 3 - Control de permisos

1. Problema que resuelve.
2. Como funciona.
3. Flujo del proceso.
4. Decisiones importantes de negocio.
5. Beneficios para el colegio.
6. Beneficios para cada usuario.
7. Casos comunes.
8. Preguntas frecuentes.
9. Futuras ampliaciones.

## Capitulo de modulo 4 - Estructura academica

1. Problema que resuelve.
2. Como funciona.
3. Flujo del proceso.
4. Decisiones importantes de negocio.
5. Beneficios para el colegio.
6. Beneficios para cada usuario.
7. Casos comunes.
8. Preguntas frecuentes.
9. Futuras ampliaciones.

## Capitulo de modulo 5 - Solicitud de matricula

### 1. Problema que resuelve

Permite que padres de familia inicien una solicitud de matricula de forma ordenada, estandar y trazable, sin depender de procesos manuales o formularios dispersos.

### 2. Como funciona

La experiencia publica se presta desde un portal institucional del colegio, separado de la plataforma administrativa interna.

- El acudiente ingresa al Portal Publico Institucional.
- Selecciona `Formulario de Matricula`.
- Primero valida un PIN de acceso entregado por la institucion.
- Si el PIN es valido, continua al wizard de solicitud.

### 3. Flujo del proceso

Flujo oficial actual:

`Portal institucional (/) -> Acceso Matricula (/acceso-matricula) -> Validacion PIN -> Wizard (/solicitud-matricula)`

Puntos de control:

- El formulario no se abre directamente.
- El acceso esta condicionado por codigo PIN.
- El usuario puede regresar al portal en cualquier momento.

### 4. Decisiones importantes de negocio

- La solicitud de matricula es un proceso publico controlado, no un alta automatica.
- El modelo comercial permite distribucion institucional de codigos PIN.
- La solicitud diligenciada queda en estado de revision institucional.
- No se crea automaticamente el estudiante hasta aprobacion oficial del colegio.

### 5. Beneficios para el colegio

- Control de acceso previo al formulario.
- Reduccion de solicitudes no autorizadas.
- Estandarizacion del proceso de ingreso.
- Mejor trazabilidad para Secretaria y Rectoria.

### 6. Beneficios para cada usuario

- Padres de familia: acceso guiado y claro desde portal institucional.
- Secretaria: recepcion ordenada de solicitudes.
- Rectoria: control y aprobacion final con criterio institucional.
- Equipo comercial: modelo escalable de PIN por institucion.

### 7. Casos comunes

- PIN valido: el acudiente continua al wizard y completa la solicitud.
- PIN invalido: se bloquea el acceso y se muestra mensaje de error.
- Navegacion de retorno: el usuario puede volver al portal sin perder control de contexto.

### 8. Preguntas frecuentes

- Se crea el estudiante cuando se envia la solicitud?
  - No. La solicitud solo inicia el proceso.
- Quien convierte la solicitud en expediente del estudiante?
  - La institucion, tras aprobacion oficial.
- El portal publico reemplaza el dashboard administrativo?
  - No. Son capas separadas con responsabilidades distintas.

### 9. Futuras ampliaciones

- Gestion de PIN desde SMP administrativo (creacion, vigencia, revocacion, auditoria).
- Politicas de expiracion y limite de intentos por codigo.
- Integracion de notificaciones de estado de solicitud para familias.

---

# PARTE III - PROCESOS COMPLETOS

En esta parte se documentan procesos completos de punta a punta, con enfoque operativo y de gobernanza institucional.

## Procesos prioritarios

- Solicitud de matricula.
- Matricula.
- Promocion.
- Boletines.
- Pagos.
- Otros procesos institucionales definidos por la institucion.

## Estructura recomendada para cada proceso completo

1. Objetivo del proceso.
2. Actores que participan.
3. Etapas del proceso.
4. Reglas de negocio.
5. Riesgos comunes y controles.
6. Resultados esperados.

---

# PARTE IV - ADMINISTRACION

## 1. Roles

Define responsabilidades institucionales y alcance operativo por perfil.

## 2. Permisos

Define que puede ver y hacer cada rol en cada etapa de los procesos.

## 3. Configuraciones

Define parametros institucionales para adaptar formularios, flujos y reglas de operacion segun la realidad del colegio.

---

# PARTE V - ANEXOS

## 1. Glosario

Terminos clave del libro para garantizar lenguaje comun entre usuarios, equipo comercial e implementacion.

## 2. Preguntas frecuentes

Respuestas estandar para adopcion, operacion y acompanamiento institucional.

## 3. Buenas practicas

Lineamientos para operar con orden, mantener trazabilidad y sostener mejora continua en la institucion.

---

## Nota editorial

Este libro se mantendra vivo y versionado como referencia oficial de School Management Platform (SMP).
Toda ampliacion futura debe respetar su enfoque funcional, operativo y de procesos.
