---
inclusion: manual
---

# Orquestador Multiagente Exfresso

## Descripción
Sistema de 5 agentes especializados para desarrollo coordinado de Exfresso TMS.

## Agentes

### 1. Frontend Developer (`frontend-developer`)
- **Archivo:** `.claude/agents/frontend-developer.md`
- **Scope:** Componentes, páginas, stores, API routes, lógica de negocio
- **Stack:** Next.js 14+ / shadcn/ui / Tailwind / Zustand / React Query / Zod
- **Invocar:** `/agent frontend-developer "tarea"`

### 2. UX/UI Designer (`ux-ui-designer`)
- **Archivo:** `.claude/agents/ux-ui-designer.md`
- **Scope:** Evaluación visual, specs de diseño, accesibilidad, principios anti-CargoWise
- **Output:** Reportes de evaluación, especificaciones para frontend-developer
- **Invocar:** `/agent ux-ui-designer "tarea"`

### 3. QA Tester (`qa-tester`)
- **Archivo:** `.claude/agents/qa-tester.md`
- **Scope:** Tests Vitest, validación Zod, accesibilidad, responsive, TypeScript
- **Output:** Tests + reportes de QA
- **Invocar:** `/agent qa-tester "tarea"`

### 4. Code Reviewer (`code-reviewer`)
- **Archivo:** `.claude/agents/code-reviewer.md`
- **Scope:** Compliance con rules.yaml, anti-patrones, calidad de código
- **Output:** Reportes de review con veredicto (aprobado/rechazado)
- **Invocar:** `/agent code-reviewer "tarea"`

### 5. Data Architect (`data-architect`)
- **Archivo:** `.claude/agents/data-architect.md`
- **Scope:** Fixtures JSON, consistencia de entidades, datos realistas para demo
- **Output:** Archivos JSON en lib/mock-data/
- **Invocar:** `/agent data-architect "tarea"`

## Flujos de trabajo

### Nueva pantalla completa
```
UX/UI Designer → Data Architect → Frontend Developer → Code Reviewer → QA Tester
```

### Bug fix
```
Frontend Developer → Code Reviewer
```

### Mejora visual
```
UX/UI Designer → Frontend Developer → Code Reviewer
```

### Nuevos datos mock
```
Data Architect → Frontend Developer (integración)
```

## Base de Conocimiento
Todos los agentes leen de `.agents/knowledge/`:
- `project.md` — Producto, stack, restricciones
- `architecture.md` — Specs UX por pantalla
- `technical-decisions.md` — Patrones de código
- `mock-data.md` — Estructura de datos
- `rules.yaml` — Reglas inmutables
