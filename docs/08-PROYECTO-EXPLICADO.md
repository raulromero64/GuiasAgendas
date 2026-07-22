# PROYECTO EXPLICADO

## Presentacion

Este libro es la referencia oficial del proyecto en lenguaje claro para directivos, personal administrativo, clientes y usuarios no tecnicos.

Su objetivo es explicar de forma ordenada que es School Management Platform (SMP), como se integra con cada colegio, como se organiza la App Publica y hacia donde evoluciona el proyecto.

## Indice General

1. Capitulo 1 - Que es School Management Platform (SMP)
2. Capitulo 2 - Que es la App Publica del Colegio
3. Capitulo 3 - Que es la personalizacion por colegio
4. Capitulo 4 - Como se integra un colegio con la plataforma
5. Capitulo 5 - Escenarios que soporta la plataforma
6. Capitulo 6 - Como se organiza el proyecto
7. Capitulo 7 - Como se protege la calidad del proyecto
8. Capitulo 8 - Hacia donde va el proyecto
9. Indice Alfabetico

## Capitulo 1 - Que es School Management Platform (SMP)

School Management Platform (SMP) es una plataforma pensada para ayudar a los colegios a organizar, controlar y dar continuidad a sus procesos academicos y administrativos.

No es solo un formulario de matricula.

Su objetivo es convertirse progresivamente en la base operativa de Secretaria Academica y Administrativa para que el colegio pueda trabajar con mayor orden, menos errores y mejor seguimiento de cada proceso.

SMP esta disenado para crecer por etapas.

Hoy ya prepara y organiza procesos como la Solicitud de Matricula. En fases futuras puede cubrir Agenda, Noticias, Certificados, Pagos, PQRS, Actualizacion de Datos, Reinscripciones y otras funciones institucionales.

Referencia cruzada:
Ver tambien Capitulo 2 sobre App Publica y Capitulo 8 sobre evolucion del proyecto.

## Capitulo 2 - Que es la App Publica del Colegio

La App Publica es la parte visible para padres de familia, estudiantes u otros usuarios externos al colegio.

No es el dashboard administrativo.

Es una aplicacion separada, conectada con SMP, que permite ofrecer servicios publicos del colegio sin exponer la parte interna de administracion.

Hoy su primera funcion es servir como punto de entrada para:

- Acceso por PIN.
- Solicitud de Matricula.

En el futuro, la misma App Publica podra reunir mas servicios institucionales en un solo lugar.

Actualizacion funcional relevante (Sprint 1.9, continuidad Nivel 2):

- La pantalla de acceso por PIN fue ajustada para quedar completamente centrada y con apariencia mas amigable para familias,
  manteniendo la identidad visual institucional y la tipografia publica oficial.
- La Solicitud de Matricula continua su replica campo por campo del formato fisico del colegio para asegurar coherencia entre documento institucional y captura digital.
- En la continuidad del Nivel 2 se ajustaron etiquetas, ayudas visuales y orden de lectura por seccion para que el diligenciamiento digital sea mas fiel al formato institucional.

Decision importante registrada en este capitulo:

- La App Publica debe permanecer desacoplada del dashboard administrativo.

Referencia cruzada:
Ver Capitulo 4 para entender como un portal externo llega a la App Publica y Capitulo 6 para la separacion `platform / client / public`.

## Capitulo 3 - Que es la personalizacion por colegio

Cada colegio tiene identidad propia.

Por eso el proyecto separa la personalizacion institucional del nucleo de la plataforma.

La capa `client` permite adaptar para cada colegio:

- Logo.
- Nombre institucional.
- Colores.
- Imagenes.
- Tipografias.
- Enlaces de regreso al sitio del colegio.
- Configuraciones institucionales necesarias para presentar la experiencia publica.

Esto significa que varios colegios pueden usar la misma plataforma SMP sin perder su identidad visual ni su contexto institucional.

Decision importante registrada en este capitulo:

- La identidad institucional debe centralizarse en un unico espacio del cliente y no quedar repartida entre modulos o pantallas duplicadas.

Referencia cruzada:
Ver Capitulo 6 para la organizacion del proyecto y Capitulo 7 para la politica de calidad y consolidacion.

## Capitulo 4 - Como se integra un colegio con la plataforma

Un colegio no necesita reemplazar su sitio web actual para usar SMP.

Si ya tiene un portal institucional o una pagina propia, puede integrar solamente un boton o enlace con el texto:

"Solicitud de Matricula"

Ese boton puede dirigir al usuario hacia la App Publica del colegio dentro de SMP.

Desde ese punto:

1. El usuario ingresa a una pantalla de acceso institucional.
2. Digita el PIN suministrado por el colegio.
3. Accede al flujo de Solicitud de Matricula.

De esta forma, el colegio mantiene su portal actual y al mismo tiempo aprovecha el proceso estructurado de SMP.

Decision importante registrada en este capitulo:

- El Portal Institucional y SMP pueden venderse e implementarse de forma independiente.

Referencia cruzada:
Ver Capitulo 2 para la definicion de App Publica y Capitulo 5 para los escenarios de integracion soportados.

## Capitulo 5 - Escenarios que soporta la plataforma

La arquitectura del proyecto fue pensada para tres escenarios principales:

1. Colegio con Portal Institucional desarrollado por nosotros.
2. Colegio con portal propio o sitio web ya existente.
3. Colegio sin sitio web.

En los tres casos, SMP puede ofrecer el acceso a la Solicitud de Matricula sin depender de que el colegio use exactamente el mismo portal.

Referencia cruzada:
Ver Capitulo 4 para el flujo de integracion y Capitulo 6 para la organizacion interna que permite esa independencia.

## Capitulo 6 - Como se organiza el proyecto

El proyecto se separa en tres partes para que crezca con orden:

### 6.1 Platform

Es el nucleo del producto.

Aqui vive la logica funcional y administrativa del SMP. Es la parte que controla procesos, reglas y funcionamiento del sistema.

### 6.2 Client

Es la personalizacion del colegio.

Aqui vive la identidad institucional de cada cliente: logo, colores, configuracion, tipografias y datos visuales o institucionales propios.

### 6.3 Public

Es la App Publica del colegio.

Aqui viven las pantallas y experiencias a las que acceden usuarios externos, como la entrada por PIN y la Solicitud de Matricula.

Decision importante registrada en este capitulo:

- La arquitectura oficial del proyecto se organiza en `platform / client / public`.

Por que esta separacion es importante:

- SMP sigue siendo un producto reutilizable.
- Cada colegio puede tener su propia identidad.
- La App Publica puede crecer sin depender del dashboard administrativo.
- El portal institucional y la plataforma pueden venderse e implementarse por separado.

Referencia cruzada:
Ver Capitulo 2 para App Publica, Capitulo 3 para personalizacion y Capitulo 7 para la consolidacion de calidad.

## Capitulo 7 - Como se protege la calidad del proyecto

El proyecto no considera terminado un trabajo solo porque ya funciona.

Antes de cerrar cualquier implementacion se realiza una fase obligatoria de consolidacion.

Esa fase verifica que:

- La arquitectura siga siendo coherente.
- No se haya duplicado logica ni archivos innecesarios.
- El codigo conserve buenas practicas.
- La compilacion siga funcionando correctamente.
- La documentacion oficial quede al dia.

Decision importante registrada en este capitulo:

- Ningun Sprint puede cerrarse sin completar la verificacion de consolidacion.

Esto permite que el proyecto crezca con orden y que cada nueva fase no deteriore lo ya construido.

Referencia cruzada:
Ver Capitulo 3 para centralizacion de identidad institucional y Capitulo 6 para la estructura oficial del proyecto.

### 7.1 Por que la proteccion de datos estudiantiles es un pilar fundamental

En esta plataforma se gestionan datos de ninos, ninas, adolescentes y sus familias.

Por eso, la privacidad no puede tratarse como un detalle tecnico opcional.
Debe estar presente desde el diseno de cada pantalla y cada decision funcional.

Principio aplicado: `Privacy by Design`.

En lenguaje sencillo, esto significa:

- Pedir solo la informacion necesaria para el proceso institucional.
- Evitar mostrar o exponer datos personales en lugares inseguros (como URLs o trazas de consola).
- Mantener controles de validacion que ayuden al usuario sin revelar informacion sensible.
- Preparar el sistema para futuras capas de autenticacion, autorizacion y auditoria.

Beneficio para el colegio y las familias:

- Menor riesgo de fuga accidental de informacion.
- Mayor confianza en el uso de la plataforma.
- Base solida para cumplimiento normativo y trazabilidad institucional.

## Capitulo 8 - Hacia donde va el proyecto

La meta del proyecto no es resolver solo un formulario.

La meta es construir una plataforma institucional completa que cubra progresivamente las necesidades de Secretaria Academica y Administrativa.

Eso incluye, con crecimiento por fases:

- Matriculas.
- Estructura Academica.
- Agenda institucional.
- Certificados.
- Pagos.
- PQRS.
- Actualizacion de Datos.
- Reinscripciones.
- Otros procesos publicos y administrativos del colegio.

SMP esta siendo construido para que ese crecimiento ocurra de forma ordenada, reutilizable y sostenible.

Referencia cruzada:
Ver Capitulo 1 para la definicion general de SMP y Capitulo 2 para la evolucion de la App Publica.

## Indice Alfabetico

- Acceso por PIN: Capitulo 2, Capitulo 4
- Acceso por PIN centrado: Capitulo 2
- App Publica: Capitulo 2, Capitulo 6, Capitulo 8
- Arquitectura `platform / client / public`: Capitulo 6
- Calidad del proyecto: Capitulo 7
- Datos estudiantiles (proteccion): Capitulo 7
- Client: Capitulo 3, Capitulo 6
- Colegio con portal propio: Capitulo 4, Capitulo 5
- Dashboard administrativo: Capitulo 2, Capitulo 6
- Documentacion oficial: Capitulo 7
- Estructura del proyecto: Capitulo 6
- Identidad institucional: Capitulo 3, Capitulo 6
- Integracion con portal: Capitulo 4, Capitulo 5
- Matricula: Capitulo 1, Capitulo 2, Capitulo 4, Capitulo 8
- Personalizacion por colegio: Capitulo 3
- Platform: Capitulo 6
- Portal Institucional: Capitulo 4, Capitulo 5
- Public: Capitulo 2, Capitulo 6
- PQRS: Capitulo 8
- Reinscripciones: Capitulo 8
- School Management Platform (SMP): Capitulo 1, Capitulo 6, Capitulo 8
- Secretaria Academica y Administrativa: Capitulo 1, Capitulo 8
- Solicitud de Matricula: Capitulo 1, Capitulo 2, Capitulo 4, Capitulo 8
- Solicitud de Matricula (replica de formato fisico): Capitulo 2, Capitulo 4
- Solicitud de Matricula (etiquetas y ayudas alineadas): Capitulo 2
- Tipografias institucionales: Capitulo 3
- Privacy by Design: Capitulo 7
