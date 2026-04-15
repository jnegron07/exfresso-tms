# EXFRESSO — Fuente Única de Verdad (.agents)
**Última actualización:** Abril 2026 | **Versión:** 1.0

---

## 🎯 Para Antigravity / Claude Code

**Cómo usar esta estructura:**

1. **Antes de cualquier tarea:** Lee `project.md` (contexto global)
2. **Para diseño/UI:** Consulta `architecture.md` (especificaciones por pantalla)
3. **Para implementación:** Revisa `technical-decisions.md` (stack, patrones, convenciones)
4. **Para datos:** Accede a `mock-data.md` (ejemplos, seeds, IDs)
5. **Para decisiones:** Busca en la tabla de contents abajo

---

## 📑 Estructura de Archivos

```
.agents/
├── knowledge/
│   ├── project.md                # ⭐ FUENTE ÚNICA DE VERDAD
│   ├── architecture.md           # Especificaciones UX por pantalla
│   ├── technical-decisions.md    # Stack, patrones, código
│   ├── mock-data.md              # Datos, fixtures, ejemplos
│   └── INDEX.md                  # Este archivo
├── missions/
│   ├── sprint-1-shell.md         # Plan Sprint 1
│   ├── sprint-2-depth.md         # Plan Sprint 2
│   └── demo-investor.md          # Guión de demo
├── rules.yaml                    # Restricciones para agentes
└── artifacts/                    # (generado automáticamente)
    ├── task-plans/
    ├── implementation-plans/
    └── screenshots/
```

---

## 🔄 Flujo de Desarrollo

### Paso 1: Planificación (Claude Code - Modo Plan)
1. Lee `project.md` para entender qué se construye
2. Lee `architecture.md` para ver especificaciones de UI
3. Lee `technical-decisions.md` para stack confirmado
4. Genera plan de implementación detallado

### Paso 2: Scaffolding
```bash
npm create next-app@latest exfresso-prototype \
  --typescript \
  --tailwind \
  --eslint
```

Implementar:
- Layout global (sidebar + topbar)
- Auth mock con NextAuth.js
- Estructura de carpetas según `technical-decisions.md`

### Paso 3: Componentes & Pantallas
Construir por prioridad de sprint:
- **Sprint 1 (Semana 1):** Dashboard, Envíos, Búsqueda de Rutas
- **Sprint 2 (Semanas 2-3):** Tarifas, Red, Finanzas, Documentos

Referencia: `architecture.md` para cada pantalla

### Paso 4: Testing & Demo
- Prueba flujos extremo a extremo
- Verifica responsive en móvil/tablet
- Sigue guión de demo en `demo-investor.md`

---

## ❓ Preguntas Frecuentes para Antigravity

### "¿Cuál es el color primario?"
→ Teal `#0D9488` | Ver `project.md` → Paleta de Colores

### "¿Cuál es el stack tecnológico?"
→ Next.js 14+ + Tailwind + shadcn/ui | Ver `technical-decisions.md` → Stack Final

### "¿Cómo hago un wizard de 4 pasos?"
→ Estructura en `architecture.md` → Wizard de Crear Envío | Ejemplo en `mock-data.md`

### "¿Dónde van los datos mock?"
→ `lib/mock-data/` según `technical-decisions.md` → Estructura de Carpetas

### "¿Qué anti-patrones evito?"
→ `project.md` → Principios de Diseño (Anti-PatronesCargoWise)

### "¿Cuál es la prioridad #1 del producto?"
→ Gestión de tarjetas de tarifas (carga + análisis IA) | `project.md` → Sprint 2

### "¿Qué es el motor de 7 segundos?"
→ Caja negra que simularemos | `project.md` → Diferenciador Principal

### "¿Qué roles de usuario existen?"
→ Admin, Operations Manager, Agent | `technical-decisions.md` → Convenciones de Código

### "¿Cómo valido un formulario?"
→ React Hook Form + Zod | `technical-decisions.md` → Validación con Zod

### "¿Qué es la analogía de LinkedIn?"
→ Red social de forwarders que comparten tarifas | `project.md` → Analogía: Red Social

---

## 📊 Tabla de Decisiones Clave

| Decisión | Opción | Razón | Ref |
|----------|--------|-------|-----|
| Framework | Next.js 14+ | SSR, API routes, Vercel | tech-decisions.md |
| Estilos | Tailwind 3.x | Utility-first, performance | tech-decisions.md |
| Componentes | shadcn/ui | Accesible, customizable | tech-decisions.md |
| Estado Global | Zustand | Simplicity vs Redux | tech-decisions.md |
| API Mock | Next.js API routes | Mismo servidor que app | tech-decisions.md |
| Tipografía | Satoshi + Plus Jakarta Sans | No Inter, distinción visual | project.md |
| Animaciones | Framer Motion | Potencia y DX | project.md |
| Mapas | Mapbox GL JS | Interactivo, estilo oscuro | project.md |
| Deploy | Vercel | Integración Next.js | project.md |

---

## 🎨 Quick Reference: Diseño

### Paleta de Colores
```
Azul marino (dark):  #1B2A4A  (sidebar, encabezados)
Teal (primary):      #0D9488  (botones, acentos)
Gris (bg):           #FAFAFA  (fondos)
Éxito:               #10B981  (checkmarks, positivo)
Alerta:              #F59E0B  (warnings)
Error:               #EF4444  (errors)
```

### Principios de Diseño
✅ Motor de ruteo al frente
✅ Revelación progresiva
✅ Entrada aumentada con IA
✅ UI de nivel consumidor (aireado, limpio)
✅ Pensamiento de red
✅ Sin callejones sin salida

❌ Densidad extrema de info
❌ Fatiga de pestañas
❌ Modales superpuestos
❌ Cero progresión revelación
❌ Entrada anticuada

---

## 🛠️ Quick Reference: Código

### Crear un Componente
```typescript
// Archivo: components/[feature]/component-name.tsx
interface IComponentNameProps {
  prop1: string;
  prop2?: boolean;
}

export const ComponentName: React.FC<IComponentNameProps> = ({ 
  prop1, 
  prop2 = false 
}) => {
  return <div>{prop1}</div>;
};
```

Ver: `technical-decisions.md` → Componentes React

### Crear un Store (Zustand)
```typescript
// Archivo: lib/stores/feature-store.ts
interface IFeatureStore {
  state: any;
  action: () => void;
}

export const useFeatureStore = create<IFeatureStore>(set => ({
  // ...
}));
```

Ver: `technical-decisions.md` → Gestión de Estado

### Crear una Ruta API
```typescript
// Archivo: app/api/resource/route.ts
export async function GET(request: Request) {
  // Simular latencia
  await new Promise(r => setTimeout(r, 500));
  return Response.json({ success: true, data: [] });
}
```

Ver: `technical-decisions.md` → API Routes

### Validar con Zod
```typescript
import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

const parsed = schema.safeParse(data);
```

Ver: `technical-decisions.md` → Validación con Zod

---

## 📋 Checklist de Completitud

### Sprint 1 (Semana 1)
- [ ] Scaffolding Next.js
- [ ] Auth mock (login, logout, sesión)
- [ ] Layout global (sidebar + topbar)
- [ ] Dashboard (KPIs, mapa, alertas, feed)
- [ ] Lista + detalle de envíos
- [ ] Búsqueda de rutas (formulario + resultados)
- [ ] Mapa global de rastreo
- [ ] Pulido responsive + animaciones
- [ ] Recorrido de demo funcional

### Sprint 2 (Semanas 2-3)
- [ ] Carga de tarjetas (drag & drop + preview)
- [ ] Constructor de tarjetas (wizard 5 pasos)
- [ ] Biblioteca de tarjetas (filtros)
- [ ] Red de socios (directorio + conexiones)
- [ ] Wizard crear envío (4 pasos)
- [ ] Libro contable (costos vs ingresos)
- [ ] Generación de facturas
- [ ] Dashboard financiero
- [ ] Gestión de documentos
- [ ] Contactos + configuración
- [ ] Log de auditoría
- [ ] Portal de cliente (read-only)
- [ ] Integración E2E
- [ ] Script de demo pulido

---

## 🚀 Deployment

### Vercel (Prototipo)
1. Push código a GitHub
2. Conectar repositorio en Vercel
3. Vercel auto-detecta Next.js
4. Deploy automático en merge a `main`

### Docker (Producción - Futuro)
Ver `technical-decisions.md` → Deployment

---

## 🔐 Restricciones Técnicas

✅ **Permitido:**
- Generar código con IA en aplicación
- Simular motor de ruteo con JSON
- Reemplazar completamente frontend PureScript

❌ **NO permitido:**
- Modificar backend Haskell
- Referenciar código propietario Haskell
- Usar datos reales de motor (simulados en prototipo)

Ver: `project.md` → Restricciones Técnicas

---

## 📞 Contacto / Escalar

Si hay ambigüedad:
1. Busca en los archivos `.md` de `knowledge/`
2. Sigue el patrón documentado
3. Documenta tu decisión en `decisions.log` (crear si no existe)

---

## 📚 Referencias Completas

- **Producto:** `project.md`
- **Diseño:** `architecture.md`
- **Código:** `technical-decisions.md`
- **Datos:** `mock-data.md`
- **Sprints:** `missions/*.md`

---

**Última revisión:** 2024-04-22
**Estado:** Ready for Claude Code
**Completitud:** 100% (documento base del PDF)
