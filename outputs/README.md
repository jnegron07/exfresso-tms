# 🎯 Exfresso — Fuente Única de Verdad (.agents)

Tu estructura completa para desarrollar Exfresso TMS con Google Antigravity.

---

## 📦 Qué Incluye

```
.agents/
├── knowledge/                    ← 🧠 FUENTE ÚNICA DE VERDAD
│   ├── INDEX.md                 ← ⭐ COMIENZA AQUÍ
│   ├── project.md               ← Contexto del producto (qué, por qué, para quién)
│   ├── architecture.md          ← Specs UX pantalla por pantalla
│   ├── technical-decisions.md   ← Stack, patrones, código (Next.js, Tailwind, etc)
│   └── mock-data.md             ← Ejemplos de datos, fixtures realistas
├── rules.yaml                   ← Restricciones para agentes Antigravity
└── artifacts/                   ← (se genera automáticamente)
    ├── task-plans/
    ├── implementation-plans/
    └── decisions.log            ← Documentar excepciones

QUICKSTART.md                     ← Guía de inicio rápido (EMPIEZA AQUÍ)
README.md                         ← Este archivo
```

---

## 🚀 Inicio en 5 Minutos

1. **Lee esto primero:**
   - `QUICKSTART.md` (5 min) — Te orienta en la estructura

2. **Entiende el producto:**
   - `.agents/knowledge/project.md` (10-15 min)

3. **Usa con Claude Code / Antigravity:**
   - Copia el prompt de `QUICKSTART.md` → "Copia el Prompt a Antigravity"
   - Pasa esta carpeta como contexto

4. **Cuando necesites respuestas específicas:**
   - `.agents/knowledge/INDEX.md` — Tabla de decisiones
   - `.agents/knowledge/architecture.md` — Especificaciones de UI
   - `.agents/knowledge/technical-decisions.md` — Código y patrones
   - `.agents/knowledge/mock-data.md` — Datos y ejemplos

---

## 📊 Contenido Rápido

### `.agents/knowledge/project.md` (DEBE LEER)
✅ Qué es Exfresso (TMS para freight forwarding)
✅ Diferenciador: motor de ruteo de 7 segundos
✅ Analogía: red social de forwarders (LinkedIn para logistics)
✅ Anti-patrones a evitar (CargoWise)
✅ Principios de diseño requeridos
✅ Paleta de colores exacta
✅ Stack tecnológico confirmado
✅ Plan de sprints (Semana 1 + Semanas 2-3)

### `.agents/knowledge/architecture.md` (Especificaciones)
✅ Layout global (sidebar, topbar, comando paleta)
✅ Dashboard (KPIs, mapa mundial, alertas, feed)
✅ Búsqueda de rutas ⭐ (formulario, resultados, animación 7s)
✅ Detalle de envío (timeline, rastreo, ledger)
✅ Carga de tarjetas (drag-drop, preview, mapeo)
✅ Red de socios (directorio, conexiones)
✅ Wizard crear envío (4 pasos)
✅ Libro contable, documentos, contactos, etc.

### `.agents/knowledge/technical-decisions.md` (Código)
✅ Stack final (Next.js 14+, Tailwind, shadcn, Zustand, React Query)
✅ Estructura de carpetas (copiar/pegar)
✅ Convenciones TypeScript y React
✅ Patrones: componentes, hooks, stores
✅ API routes (simulación de backend)
✅ Validación con Zod
✅ Animaciones Framer Motion
✅ Deployment (Vercel, Docker)

### `.agents/knowledge/mock-data.md` (Datos)
✅ Estructura JSON de cada entidad
✅ Ejemplos realistas con puertos/transportistas reales
✅ Patrones de datos por pantalla
✅ Convención de IDs
✅ Timestamps realistas

### `.agents/rules.yaml` (Restricciones)
✅ Stack obligatorio (no Redux, no Material-UI)
✅ Anti-patrones bloqueados (modales, pestañas, densidad)
✅ Paleta de colores (inmutable)
✅ Por pantalla: MUST_HAVE vs BLOCKED
✅ Checklist de validación

---

## 💡 Casos de Uso

| Pregunta | Respuesta | Archivo |
|----------|-----------|---------|
| "¿Cuál es el diferenciador?" | Motor de 7 segundos | project.md |
| "¿Cómo diseño el dashboard?" | Specs exactas | architecture.md |
| "¿Qué stack uso?" | Next.js + Tailwind + Zustand | technical-decisions.md |
| "¿Qué datos ejemplo?" | 15-20 envíos mock realistas | mock-data.md |
| "¿Qué colores?" | Teal #0D9488, Navy #1B2A4A | project.md |
| "¿Puedo usar Redux?" | NO — usa Zustand | rules.yaml |
| "¿Prioridad #1?" | Gestión de tarjetas (carga + análisis) | project.md |
| "¿Cómo valido formularios?" | Zod | technical-decisions.md |
| "¿Puedo hacer modales?" | NO — usa inline expansion | rules.yaml |

---

## 🎯 Para Google Antigravity

**En tu Mission Control, cuando crees una misión:**

```
TASK: Construir prototipo Exfresso TMS

CONTEXT:
- Fuente única de verdad: .agents/knowledge/
- Especificaciones: .agents/knowledge/architecture.md
- Stack: .agents/knowledge/technical-decisions.md
- Restricciones: .agents/rules.yaml

NEVER:
- Modifiques backend Haskell
- Uses Redux, Material-UI, o localStorage
- Hagas modales superpuestos o pestañas anidadas
- Ignores la paleta de colores (Teal #0D9488)

MUST:
- Follows estructura de carpetas de technical-decisions.md
- Usa Zustand, shadcn/ui, Tailwind
- Respeta especificaciones de architecture.md
- Referencia datos de mock-data.md
```

---

## ✅ Checklist de Comenzar

- [ ] He leído `QUICKSTART.md`
- [ ] He leído `.agents/knowledge/INDEX.md`
- [ ] He leído `.agents/knowledge/project.md`
- [ ] Entiendo el diferenciador (motor 7s)
- [ ] Entiendo los anti-patrones a evitar
- [ ] He visto la paleta de colores
- [ ] Sé dónde está la estructura de carpetas
- [ ] Tengo el prompt listo para Antigravity

---

## 📂 Estructura Instalación

### Opción 1: Integrado en Proyecto
```bash
# En tu proyecto Next.js
cp -r .agents ./
```

### Opción 2: Referencia Externa
```bash
# En carpeta separada
mkdir -p ~/exfresso-knowledge
cp -r .agents/* ~/exfresso-knowledge/
```

---

## 🔄 Flujo de Desarrollo

```
1. Lee QUICKSTART.md + project.md
        ↓
2. Abre Claude Code (Modo Plan)
        ↓
3. Copia prompt de QUICKSTART.md
        ↓
4. Pasa contexto (.agents/knowledge/)
        ↓
5. Sigue plan de sprints
        ↓
6. Referencia docs constantemente
        ↓
7. Documenta decisiones en decisions.log
```

---

## 📞 Preguntas?

Busca la respuesta en este orden:
1. `.agents/knowledge/INDEX.md` (Quick reference)
2. `.agents/knowledge/project.md` (Contexto)
3. `.agents/knowledge/architecture.md` (Diseño)
4. `.agents/knowledge/technical-decisions.md` (Código)
5. `.agents/knowledge/mock-data.md` (Datos)
6. `.agents/rules.yaml` (Restricciones)

Si no está, documenta tu decisión en `.agents/artifacts/decisions.log`.

---

## 📈 Cobertura

✅ 100% del PDF de requerimientos (exfresso-requerimientos-desarrollador-v1.pdf)
✅ Compatible con Google Antigravity
✅ Pronto para Claude Code (Modo Plan)
✅ Listo para Vercel deployment

---

**¡Listo para construir Exfresso! 🚀**

*Versión: 1.0 | Última actualización: Abril 2026*
*Autor: DaCodes × Exfresso*
*Licencia: CONFIDENCIAL*
