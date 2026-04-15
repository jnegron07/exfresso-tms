# 🚀 Guía de Inicio Rápido — Exfresso + Antigravity

## ¿Qué es esto?

Tu **fuente única de verdad** para el proyecto Exfresso. Una estructura `.agents` completa compatible con **Google Antigravity** que contiene:

- ✅ Contexto global del proyecto
- ✅ Especificaciones UX pantalla por pantalla
- ✅ Decisiones técnicas y patrones
- ✅ Datos mock realistas
- ✅ Reglas para agentes de IA

---

## 📂 Estructura

```
.agents/
├── knowledge/              # 🧠 Fuente única de verdad
│   ├── INDEX.md           # ⭐ COMIENZA AQUÍ
│   ├── project.md         # Contexto: qué es Exfresso, por qué, para quién
│   ├── architecture.md    # Especificaciones UX: pantalla por pantalla
│   ├── technical-decisions.md  # Stack, patrones, código, convenciones
│   └── mock-data.md       # Ejemplos de datos, fixtures, IDs
├── rules.yaml             # Restricciones para agentes de Antigravity
└── missions/              # (futuro: planes de sprint)
```

---

## 🎯 Antes de Usar con Claude Code / Antigravity

### 1. Lee el Índice
Abre: `.agents/knowledge/INDEX.md`

(Este archivo es tu brújula — explica toda la estructura y cómo navegar)

### 2. Entiende el Producto
Lee: `.agents/knowledge/project.md` (10-15 min)

Aprenderás:
- Qué es Exfresso (TMS para freight forwarding)
- Por qué es diferente (motor de ruteo de 7 segundos)
- A quién le vendemos (inversionistas vs ingeniería)
- Principios de diseño (qué SÍ, qué NO)

### 3. Revisa el Stack
Lee: `.agents/knowledge/technical-decisions.md` (inicio) (5 min)

Aprenderás:
- Next.js 14+, Tailwind, shadcn/ui, Zustand, etc.
- Estructura de carpetas exacta
- Convenciones de nombres y código
- Dónde van los archivos

### 4. Copia el Prompt a Antigravity
Cuando uses Claude Code en modo Plan, copia esto:

```
Eres desarrollador senior de Exfresso, una plataforma TMS 
para freight forwarding. Tu fuente única de verdad está en 
.agents/knowledge/:

1. Para contexto global: .agents/knowledge/project.md
2. Para diseño/UI: .agents/knowledge/architecture.md
3. Para código: .agents/knowledge/technical-decisions.md
4. Para datos: .agents/knowledge/mock-data.md
5. Para reglas: .agents/rules.yaml

Nunca hagas suposiciones. Si no encuentras la respuesta, 
busca en estos documentos. Si no está, pregunta.

RESTRICCIONES CRÍTICAS:
- NO modifiques backend Haskell
- NO uses código del PureScript anterior
- USA Zustand (no Redux), shadcn/ui (no Material-UI), Tailwind (no CSS inline)
- SIGUE paleta de colores: Teal #0D9488, Navy #1B2A4A
- EVITA: modales superpuestos, pestañas anidadas, densidad de info extrema
- CUMPLE: revelación progresiva, entrada aumentada con IA, CTAs claros
```

---

## 💡 Cómo Usarlo Paso a Paso

### Escenario 1: "Quiero crear el dashboard"

1. Abre `.agents/knowledge/architecture.md` → Sección "Dashboard"
2. Lee especificaciones exactas: 4 KPI cards, mapa Mapbox, alerts, feed
3. Revisa `.agents/knowledge/technical-decisions.md` → Zustand, React Query
4. Consulta `.agents/knowledge/mock-data.md` → Ejemplos de datos
5. Implementa usando patrones en `technical-decisions.md`

### Escenario 2: "¿Cómo valido un formulario?"

1. Abre `.agents/knowledge/technical-decisions.md`
2. Busca "Validación con Zod"
3. Copia patrón
4. Aplica a tu formulario

### Escenario 3: "¿Qué colores uso?"

1. Abre `.agents/knowledge/project.md` → "Paleta de Colores"
2. Usa exactamente: Teal `#0D9488`, Navy `#1B2A4A`
3. Nunca hagas excepciones sin documentar

### Escenario 4: "¿Cuál es la prioridad #1?"

1. Abre `.agents/knowledge/project.md` → "Sprint 2"
2. Respuesta: **Gestión de tarjetas de tarifas** (carga + análisis IA mock)

---

## 🔄 Flujo de Desarrollo Recomendado

### Fase 1: Planificación
```
Claude Code (Modo Plan)
↓
Lee .agents/knowledge/project.md
↓
Lee .agents/knowledge/architecture.md
↓
Crea plan detallado de implementación
↓
Guarda como artifact
```

### Fase 2: Scaffolding
```
next-app (boilerplate)
↓
Copia estructura de carpetas de technical-decisions.md
↓
Configura Tailwind + shadcn/ui
↓
Copia auth mock de technical-decisions.md
```

### Fase 3: Sprint 1 (Semana 1)
```
Día 1-2: Layout global (sidebar + topbar)
Día 2-3: Dashboard (4 KPIs + mapa + alerts)
Día 3-4: Lista + detalle de envíos
Día 4-5: Búsqueda de rutas (UI estrella)
Día 5: Mapa de rastreo + pulido
```

Ver `.agents/knowledge/INDEX.md` → "Checklist de Completitud"

---

## 🤝 Usando con Antigravity Específicamente

### En la Interfaz de Antigravity

1. **Mission Control** → Nueva misión: "Construir Exfresso Prototipo"
2. **En el prompt inicial, copia el contexto:**
   ```
   Construir TMS Exfresso usando este documento de verdad única:
   .agents/knowledge/project.md (contexto)
   .agents/knowledge/architecture.md (diseño)
   .agents/knowledge/technical-decisions.md (código)
   ```

3. **En cada task subsecuente:**
   ```
   Implementar [feature]. Ref: .agents/knowledge/architecture.md → [section]
   Stack: Ver .agents/knowledge/technical-decisions.md
   Datos: Ver .agents/knowledge/mock-data.md
   ```

4. **Si hay ambigüedad:**
   ```
   Revisar .agents/rules.yaml para restricciones
   Verificar decisión anterior en .agents/artifacts/decisions.log
   ```

---

## 📊 Contenido de Cada Archivo

### `project.md` (MUST READ)
- Qué es Exfresso, a quién le vendemos
- Motor de 7 segundos (analogía LinkedIn)
- Anti-patrones (qué NO hacer como CargoWise)
- Principios de diseño (qué SÍ hacer)
- Paleta de colores exacta
- Stack tecnológico recomendado
- Estructura de sprints

**Tiempo:** 10-15 min | **Criticidad:** ⭐⭐⭐⭐⭐

### `architecture.md`
- Especificaciones UX de cada pantalla
- Layout global (sidebar, topbar, comando paleta)
- Dashboard (KPIs, mapa, alertas, feed)
- Búsqueda de rutas (formulario, resultados, animación 7s)
- Detalle de envío (timeline, rastreo, ledger, documentos)
- Carga de tarjetas (drag-drop, preview, mapeo)
- Red de socios (directorio, conexiones, perfil)
- Y más...

**Tiempo:** 20-30 min | **Criticidad:** ⭐⭐⭐⭐

### `technical-decisions.md`
- Stack final (Next.js, Tailwind, shadcn, Zustand, etc.)
- Estructura de carpetas exacta (copiar/pegar)
- Convenciones de código TypeScript
- Patrones React (componentes, hooks)
- Gestión de estado con Zustand (ejemplos)
- API routes (simulación de backend)
- React Query (TanStack)
- Validación con Zod
- Tailwind + shadcn/ui
- Animaciones Framer Motion
- Deployment (Vercel, Docker)

**Tiempo:** 30-45 min (referencia durante dev) | **Criticidad:** ⭐⭐⭐⭐

### `mock-data.md`
- Estructura JSON de cada entidad (Shipment, RateCard, Partner, etc.)
- Ejemplos realistas
- Puertos, transportistas, descripciones reales
- Patrones de datos por pantalla (cuántos items, qué estados)
- Convención de IDs
- Timestamps realistas

**Tiempo:** 10 min | **Criticidad:** ⭐⭐⭐

### `rules.yaml`
- Restricciones técnicas obligatorias (stack, estructura)
- Anti-patrones bloqueados (modales, pestañas, etc.)
- Paleta de colores (inmutable)
- Por pantalla: qué MUST_HAVE, qué BLOCKED
- Checklist de validación

**Tiempo:** 5 min (consulta frecuente) | **Criticidad:** ⭐⭐⭐⭐

### `INDEX.md`
- Mapa de navegación de toda la estructura
- Quick reference (colores, código, decisiones)
- FAQs para Antigravity
- Checklist de completitud
- Tabla de decisiones

**Tiempo:** 5 min | **Criticidad:** ⭐⭐

---

## 🛠️ Comandos Rápidos

### Verificar estructura
```bash
tree .agents/
```

### Buscar información
```bash
grep -r "COLOR\|STACK\|DECISION" .agents/knowledge/
```

### Ver progreso de sprint
```bash
grep "^## Sprint" .agents/knowledge/project.md
```

---

## ⚠️ Errores Comunes a Evitar

### ❌ "Voy a usar una librería que no está en el stack"
→ ✅ Primero consulta `.agents/knowledge/technical-decisions.md` → "Stack Final"

### ❌ "Voy a crear un componente custom de botón"
→ ✅ Usa `shadcn/ui` — ver `technical-decisions.md` → "Tailwind + shadcn/ui"

### ❌ "¿Qué datos debería mostrar en dashboard?"
→ ✅ Consulta `.agents/knowledge/architecture.md` → "Dashboard"

### ❌ "¿Puedo usar localStorage para estado?"
→ ✅ NO — usa Zustand — ver `technical-decisions.md` → "Gestión de Estado"

### ❌ "¿Qué color uso para el botón principal?"
→ ✅ Teal `#0D9488` — ver `project.md` → "Paleta de Colores"

---

## 🎯 Próximos Pasos

1. **Descarga esta carpeta** (`.agents/`) a tu proyecto
2. **Abre** `.agents/knowledge/INDEX.md` en tu editor
3. **Lee** `project.md` para entender qué construyes
4. **Abre Claude Code** y pasa el contexto (ver sección arriba)
5. **Comienza con Sprint 1, Día 1: Scaffolding**
6. **Referencia estos documentos constantemente**

---

## 📞 Preguntas Frecuentes

**P: ¿Necesito leer todos los documentos antes de empezar?**
R: No. Lee INDEX.md + project.md primero. Luego consulta los demás según necesites.

**P: ¿Qué hago si la respuesta no está en los docs?**
R: Documenta tu decisión en `.agents/artifacts/decisions.log` (crear si no existe).

**P: ¿Puedo modificar estos archivos?**
R: Sí, pero DOCUMENTA en `decisions.log` y actualiza la fecha de "última revisión".

**P: ¿Cómo paso esto a Claude Code?**
R: Copia el contexto de la sección "Copia el Prompt a Antigravity" arriba.

**P: ¿Y si cambian los requisitos del PDF?**
R: Actualiza `project.md` primero. Luego actualiza los demás docs según sea necesario.

---

**¡Listo para construir Exfresso! 🚀**

*Última actualización: Abril 2026*
*Compatible con: Google Antigravity, Claude Code, Next.js 14+*
