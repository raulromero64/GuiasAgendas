# 04 - DESIGN SYSTEM SMP

Estado: Activo
Version: 1.0
Scope: School Management Platform (SMP)

## 1. Proposito

Definir la base visual oficial del SMP para interfaces administrativas limpias, legibles y consistentes.

## 2. Lineamientos visuales

- Inspiracion en plataformas administrativas modernas.
- Identidad visual basada en verdes institucionales del Colegio Cervantes.
- Lenguaje visual profesional, armonico y de bajo ruido.
- Prioridad de legibilidad para jornadas largas de trabajo.

## 3. Tokens oficiales

Ubicacion: src/shared/constants/tokens/

- colors.ts
- typography.ts
- spacing.ts
- radius.ts
- shadows.ts
- theme.ts

## 4. Integracion tecnica

- Tailwind consume tokens mediante tailwind.config.ts y variables CSS semanticas.
- Los componentes no deben usar colores hexadecimales directos en TSX.
- El tema global se aplica mediante ThemeProvider y themeService.

## 5. Principios de implementacion UI

- Reusable First.
- Single Responsibility.
- Componentes pequenos y desacoplados.
- Helpers puros y hooks reutilizables.
- Services desacoplados.
- Sin logica de negocio en componentes de base.

## 6. Validacion visual

- El Dashboard opera como UI Showcase oficial para validar render de componentes base.
- Toda evolucion visual debe validarse con build + dev antes de cierre de sprint.
