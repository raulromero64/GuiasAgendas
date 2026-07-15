# MANUAL FUNCIONAL DE LA PLATAFORMA

## School Management Platform (SMP)

> Documento funcional oficial para clientes, rectores, secretarias, docentes, padres y estudiantes.
> Explica que hace la plataforma, como se usa y que resultados produce en la operacion diaria de una institucion educativa.

---

## Como leer este manual

- Este documento explica la plataforma desde el punto de vista funcional, no tecnico.
- No describe programacion, bases de datos ni arquitectura interna.
- Puede usarse como material comercial, de capacitacion y de referencia operativa.
- EL CERVANTISTA ya no se presenta como el producto: ahora es una implementacion o configuracion particular de un cliente dentro de School Management Platform (SMP).

---

## ¿Que es School Management Platform?

School Management Platform (SMP) es una plataforma para organizar y controlar la operacion de un colegio desde un solo lugar.

Su objetivo es ayudar a la institucion a trabajar con menos errores, menos tareas manuales y mayor claridad para cada area. En lugar de manejar procesos separados en hojas de calculo, chats, cuadernos o sistemas aislados, la plataforma conecta la informacion academica y administrativa para que cada rol vea lo que necesita y pueda actuar en el momento correcto.

SMP esta pensada para acompañar el ciclo completo de la vida escolar: acceso seguro, control por perfiles, organizacion academica, matriculas, horarios, asistencia, calificaciones, reportes y comunicacion institucional.

Antes de una plataforma como esta, un colegio suele tener informacion repetida, decisiones lentas, validaciones manuales y poca trazabilidad. Despues de implementar SMP, la institucion trabaja con una base comun, procesos conectados y una operacion mas ordenada.

La plataforma genera informacion clave para la toma de decisiones: estructura academica vigente, usuarios activos, permisos por rol, estado de procesos y, mas adelante, matriculas, asistencia, rendimiento y reportes institucionales.

---

## Vision funcional de la plataforma

SMP se organiza por modulos que se conectan entre si.

- Un modulo prepara informacion para el siguiente.
- Cada area del colegio usa la misma base operativa.
- Cada rol participa en momentos diferentes del proceso.
- La plataforma evita retrabajo y mejora la trazabilidad institucional.

En el estado actual, la plataforma ya cuenta con la base funcional para:

- saber quien entra al sistema;
- validar el acceso de forma segura;
- controlar que puede hacer cada perfil;
- organizar la estructura academica del colegio.

---

## Modulo 1 - Identidad de usuarios

### ¿Que hace?

Permite reconocer a cada persona que entra a la plataforma y asociarla con su perfil dentro del colegio.

### ¿Que problema resuelve?

Evita cuentas compartidas, accesos confusos y acciones sin responsable claro.

### ¿Quien lo utiliza?

- Rectoría
- Secretaría
- Docentes
- Padres
- Estudiantes

### ¿Que sucede antes?

Antes de este modulo, el colegio depende de cuentas informales, poca trazabilidad y validaciones manuales para saber quien realizo una accion.

### ¿Como funciona?

Cada persona entra con una identidad propia. La plataforma reconoce su perfil y lo relaciona con el tipo de acceso que le corresponde.

### ¿Que sucede despues?

La persona puede continuar al sistema con una base clara de identificacion, lo que permite ordenar el acceso y preparar el control por roles.

### ¿Que informacion genera?

- Identidad de la persona usuaria
- Relacion con su perfil dentro de la institucion
- Base de trazabilidad para acciones futuras

### Beneficios por perfil

- Rectoría: mayor control institucional y trazabilidad inicial.
- Secretaría: menos tiempo validando manualmente usuarios.
- Docentes: acceso claro y contexto correcto desde el inicio.
- Padres: mayor confianza sobre privacidad y acceso.
- Estudiantes: menor riesgo de confusiones de cuenta.

### Relacion con otros modulos

Este modulo es la base para inicio de sesion, permisos, estructura academica y todos los procesos posteriores.

---

## Modulo 2 - Inicio de sesion seguro

### ¿Que hace?

Valida de forma segura que la persona que intenta entrar realmente es quien dice ser.

### ¿Que problema resuelve?

Reduce riesgo de suplantacion, accesos inseguros y sobrecarga administrativa por problemas de ingreso.

### ¿Quien lo utiliza?

- Rectoría
- Secretaría
- Docentes
- Padres
- Estudiantes

### ¿Que sucede antes?

Sin este modulo, el acceso depende de practicas informales y el colegio pierde confianza en la seguridad de la informacion.

### ¿Como funciona?

La persona se autentica y la plataforma confirma su ingreso para permitir una sesion valida y estable.

### ¿Que sucede despues?

Con el acceso ya validado, la plataforma puede decidir que areas mostrar y que acciones permitir segun el perfil.

### ¿Que informacion genera?

- Sesion validada
- Evidencia de acceso seguro
- Continuidad de uso sin reingresos innecesarios

### Beneficios por perfil

- Rectoría: menor riesgo reputacional y mejor gobierno digital.
- Secretaría: menos tickets y menos apoyo manual para ingreso.
- Docentes: experiencia de acceso mas estable.
- Padres: confianza en el resguardo de la informacion.
- Estudiantes: acceso mas seguro y confiable.

### Relacion con otros modulos

Prepara el camino para permisos, consultas, registros academicos y procesos administrativos.

---

## Modulo 3 - Control de permisos

### ¿Que hace?

Define que puede ver o hacer cada perfil dentro de la plataforma.

### ¿Que problema resuelve?

Evita que una persona acceda a informacion o acciones que no le corresponden.

### ¿Quien lo utiliza?

- Rectoría
- Secretaría
- Docentes
- Padres
- Estudiantes

### ¿Que sucede antes?

Sin control de permisos, el sistema genera desorden operativo, riesgo de privacidad y decisiones inconsistentes entre areas.

### ¿Como funciona?

La plataforma reconoce el perfil de la persona y habilita solo las secciones y acciones permitidas para su rol.

### ¿Que sucede despues?

Cada usuario trabaja dentro de un entorno coherente con sus responsabilidades reales.

### ¿Que informacion genera?

- Permisos aplicados por perfil
- Control de acceso a secciones y acciones
- Mayor consistencia institucional

### Beneficios por perfil

- Rectoría: control claro del gobierno institucional.
- Secretaría: acceso ordenado a sus funciones operativas.
- Docentes: experiencia enfocada en sus tareas reales.
- Padres: acceso protegido a informacion familiar.
- Estudiantes: consulta limitada a su informacion correspondiente.

### Relacion con otros modulos

Es la puerta de control para matriculas, estructura academica, asistencia, calificaciones y reportes.

---

## Modulo 4 - Estructura Academica

### ¿Que hace?

Organiza el mapa academico del colegio mediante Periodo Lectivo, Nivel, Grado, Grupo y Asignatura.

### ¿Que problema resuelve?

Evita improvisacion, datos duplicados, grupos mal relacionados y desorden academico al preparar la operacion escolar.

### ¿Quien lo utiliza?

- Rectoría
- Secretaría
- Docentes

### ¿Que sucede antes?

Antes de este modulo, un colegio suele definir su organizacion academica en archivos separados, con nombres inconsistentes y poca trazabilidad.

### ¿Como funciona?

La institucion crea primero su periodo lectivo, luego sus niveles, despues los grados, los grupos y finalmente las asignaturas. Esa secuencia ordena la oferta academica y prepara todos los procesos que vienen despues.

### ¿Que sucede despues?

Con la estructura academica completa, el colegio queda listo para procesos como matriculas, horarios, asistencia, calificaciones y reportes.

### ¿Que informacion genera?

- Periodo lectivo vigente y su estado
- Niveles academicos definidos por institucion
- Grados vinculados al periodo y al nivel
- Grupos organizados por grado
- Asignaturas disponibles para la oferta academica

### Submodulo - Periodo Lectivo

Define el marco temporal oficial del trabajo academico del colegio.

- Antes: el colegio puede tener fechas dispersas o criterios distintos entre areas.
- Despues: toda la operacion academica se apoya en un mismo periodo de trabajo.
- Beneficio: ordena matriculas, horarios, asistencia, calificaciones y cierres escolares.

### Submodulo - Nivel

Organiza grandes etapas de la trayectoria escolar, como preescolar, primaria o secundaria.

- Antes: la institucion puede manejar clasificaciones poco consistentes.
- Despues: la oferta academica queda agrupada de forma clara.
- Beneficio: mejora planeacion, filtros, reportes y comunicacion interna.

### Submodulo - Grado

Ubica cada tramo especifico de aprendizaje dentro de un nivel y un periodo lectivo.

- Antes: pueden existir grados repetidos o mal relacionados.
- Despues: cada grado queda definido en el contexto correcto.
- Beneficio: prepara de forma segura grupos, matriculas y distribucion academica.

### Submodulo - Grupo

Representa cada conjunto real de estudiantes dentro de un grado.

- Antes: los grupos pueden quedar mal clasificados o sin capacidad clara.
- Despues: la institucion puede ordenar salones, turnos y carga operativa.
- Beneficio: facilita horarios, asistencia, seguimiento y organizacion docente.

### Submodulo - Asignatura

Define las materias que la institucion ofrece dentro de su estructura academica.

- Antes: los nombres y codigos pueden repetirse o variar sin control.
- Despues: el colegio trabaja con una base comun para planeacion academica y futuras calificaciones.
- Beneficio: da claridad curricular y consistencia en todos los procesos posteriores.

### Beneficios por perfil

- Rectoría: panorama claro de la organizacion academica y mejor control institucional.
- Secretaría: base ordenada para matriculas, reportes y gestion operativa.
- Docentes: contexto claro para saber donde imparten clase y con que grupos trabajan.
- Padres: mejor comprension de la ubicacion academica de sus hijos.
- Estudiantes: trayecto academico mejor organizado y mas coherente.

### Relacion con otros modulos

Este modulo es la base directa para Matriculas, Horarios, Asistencia, Calificaciones, Planeacion Academica y Reportes.

---

## Flujo general de uso de la plataforma

1. La persona ingresa con su identidad.
2. La plataforma valida el acceso.
3. Se aplican permisos segun el perfil.
4. La institucion trabaja sobre su estructura academica oficial.
5. A partir de esa base se ejecutan los procesos operativos del colegio.

---

## Beneficios institucionales de SMP

### Para Rectoría

- Mayor control sobre la operacion del colegio.
- Mejor base para toma de decisiones.
- Menor dependencia de procesos manuales y reportes dispersos.

### Para Secretaría

- Menos retrabajo administrativo.
- Informacion mas ordenada y consistente.
- Mejor soporte para matriculas, listados y seguimiento operativo.

### Para Docentes

- Contexto academico mas claro.
- Menos confusiones sobre grupos, grados y asignaturas.
- Mejor base para procesos futuros de asistencia y calificaciones.

### Para Padres

- Mayor claridad sobre el recorrido escolar de sus hijos.
- Mejor confianza en la organizacion institucional.
- Expectativa de informacion mas ordenada y oportuna.

### Para Estudiantes

- Trayectoria academica mas coherente.
- Menor riesgo de errores administrativos.
- Mejor continuidad entre los procesos escolares.

---

## Relacion entre el producto y sus clientes

School Management Platform (SMP) es el producto principal.

Cada institucion educativa puede tener una implementacion propia, una configuracion particular y una forma de adopcion ajustada a su operacion. En ese contexto, EL CERVANTISTA se entiende como una implementacion o configuracion especifica de cliente dentro de la plataforma, no como el nombre del producto base.

---

## Estado funcional actual

En este momento, SMP ya cuenta con la base funcional necesaria para iniciar los modulos operativos siguientes sobre una estructura academica ordenada.

La plataforma ya resuelve cuatro necesidades clave:

- identidad de usuarios;
- acceso seguro;
- control de permisos;
- estructura academica institucional.

Los siguientes modulos dependeran de esta base para operar con claridad, consistencia y trazabilidad.