# Exfresso — Proyecto TMS para Freight Forwarding
**Versión:** 1.0 | **Última actualización:** Abril 2026

---

## Qué es Exfresso

Sistema de Gestión de Transporte (TMS) de nueva generación para **freight forwarding internacional**. 
Combina motor propietario de ruteo/cotización con UI moderna de nivel consumidor.
Reemplaza software heredado (CargoWise) en el mercado global de freight forwarding.

### Usuarios finales
- Freight forwarders que coordinan movimiento de mercancías internacionalmente
- Modos de transporte: aéreo, marítimo, terrestre
- Gestión de: envíos, rastreo, aduanas, finanzas, documentos, red de socios

---

## Diferenciador Principal: Motor de Ruteo de 7 Segundos

| Aspecto | Exfresso | Manual (CargoWise) |
|---------|----------|-------------------|
| **Tiempo de cálculo** | ~7 segundos | 10 min - 24 horas |
| **Qué hace** | Calcula TODAS las permutaciones de rutas posibles | Selección manual |
| **Datos de entrada** | Origen, destino, carga, fechas | Idem |
| **Output** | 5-8 opciones clasificadas con precios | Opción única |

**Nota técnica:** Es una caja negra. Simularemos respuestas JSON en el prototipo. No modificaremos ni construiremos el motor.

---

## Analogía: Red Social para Freight Forwarders (LinkedIn para Logistics)

Exfresso funciona como plataforma de red donde:
- Empresas se conectan y **comparten datos de precios** (tarifas puerto-a-puerto, contratos terrestre, comisiones)
- Motor de ruteo accede a precios de socios conectados
- **UX debe sentirse colaborativo, no transaccional**
- Cuando un forwarder A se conecta con B: ambos pueden compartir tarifas, motor obtiene precios de ambos

---

## Stack Tecnológico (Prototipo)

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14+ (App Router) + React 18+ |
| Estilos | Tailwind CSS 3.x + shadcn/ui |
| Estado | Zustand + React Query (TanStack) |
| Formularios | React Hook Form + Zod |
| Gráficas | Recharts (finanzas), Mapbox GL (mapas), Chart.js (alternativa) |
| Mapas | Mapbox GL JS o Leaflet |
| Animaciones | Framer Motion |
| Íconos | Lucide React |
| Auth (proto) | NextAuth.js con credenciales mock |
| API Mock | MSW o rutas API de Next.js + fixtures JSON |
| Despliegue | Vercel (prototipo), Docker (producción) |
| Tipografía | Satoshi, Plus Jakarta Sans o similar (NO Inter ni Arial) |

---

## Restricciones Técnicas

✅ **Permitido:**
- Generar código con IA en capa de aplicación (UI, lógica de negocio)
- Simular datos del motor de ruteo con JSON
- Reemplazar completamente frontend PureScript antiguo

❌ **NO permitido:**
- Modificar backend Haskell
- Referenciar/portar código propietario Haskell
- Usar datos reales de motor de ruteo (simulados en prototipo)

---

## Qué Debe Demostrar Este Prototipo

### Para Inversionistas
- Producto **creíble y visualmente pulido**
- Oportunidad de mercado clara vs CargoWise
- UX diferenciado (revelación progresiva, entrada aumentada con IA)

### Para Ingeniería
- Arquitectura sólida para producción
- Patrones reales: componentes, enrutamiento, estado, integración API
- Estructura escalable y mantenible

---

## Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Azul marino | `#1B2A4A` | Sidebar, encabezados, identidad |
| Teal | `#0D9488` | Acciones primarias, acentos, CTAs |
| Gris neutro | `#F5F5F5` - `#333333` | Fondos, textos, bordes |
| Éxito | `#10B981` | Estados positivos, checks |
| Alerta | `#F59E0B` | Advertencias, vencimientos |
| Error | `#EF4444` | Errores, atrasos |

---

## Principios de Diseño (Anti-CargoWise)

### Evitar (Legado)
- ❌ Densidad extrema de información (cientos de campos en una pantalla)
- ❌ Fatiga de pestañas anidadas
- ❌ Trampa de modales (ventana sobre ventana)
- ❌ Cero revelación progresiva (todo visible a la vez)
- ❌ Entrada de datos anticuada (grillas vacías)

### Implementar (Exfresso)
- ✅ **Motor de ruteo al frente y centro** (como Google Flights / Kayak)
- ✅ **Revelación progresiva** (mostrar datos en momento exacto)
- ✅ **Entrada de datos aumentada con IA** (prellenar, revisar, aprobar)
- ✅ **UI empresarial de nivel consumidor** (aireado, limpio, espacio en blanco)
- ✅ **Pensamiento de red primero** (compartir tarifas = social + colaborativo)
- ✅ **Sin callejones sin salida** (CTA clara en cada pantalla)
- ✅ **Diseño para adopción** (usuario de CargoWise siente alivio inmediato)

---

## Dos Audiencias = Dos Demos

### Demo para Inversionistas (5-7 min)
Login → Dashboard → Detalle Envío → **Búsqueda de Rutas** (⭐ ESTRELLA) → Carga Tarjetas → Red → Wizard Crear Envío

### Script Operativo (Ingeniería)
Pruebas de flujo extremo a extremo, completitud de datos, responsive, animaciones pulidas

---

## Entidades Principales (Modelo de Datos)

- **Shipment** (Envío): id, número, origen, destino, modo, estado, cliente, tramos, eventos, ledger, documentos
- **Leg** (Tramo): segmento de envío multi-modal (terrestre/aéreo/marítimo)
- **TrackingEvent** (Evento de rastreo): automático (API) + manual (operador)
- **LedgerEntry** (Libro contable): costos vs ingresos, margen
- **RateCard** (Tarjeta de tarifa): puerto-a-puerto, terrestre, comisión, recargo
- **Partner** (Socio): empresa conectada, estado de conexión, tarifas compartidas
- **Contact** (Contacto): cliente, transportista, agente, proveedor
- **User** (Usuario): rol (admin/ops-manager/agent), empresa, sesión

---

## Datos Semilla Mínimos

Para demo convincente:
- **15-20 envíos** (2-3 por estado): draft, quoted, booked, in-transit, arrived, delivered, closed
- **Cada envío:** 2-4 tramos, 5-10 eventos de rastreo, 3-5 entradas ledger, 1-3 documentos
- **5-8 tarjetas de tarifas** (diferentes tipos, estados de validez)
- **4-6 empresas socias** (varios estados de conexión)
- **10-15 contactos** (cliente, transportista, agente)
- **Búsqueda de rutas:** 5-8 opciones por búsqueda con precios realistas
- **Códigos de puerto reales:** USLAX, DEHAM, CNSHA, AEDJB, etc.
- **Aerolíneas/navieras reales:** Lufthansa, Maersk, FedEx, etc.

---

## Estados del Envío (FSM)

```
Borrador → Cotizado → Reservado → En Tránsito → Llegado → Entregado → Cerrado
```

Restricciones:
- No se puede marcar "Entregado" sin pasar por "Llegado"
- Barra de progreso visual en detalle de envío

---

## Restricciones de Seguridad & Roles

### Roles
- **Admin:** Acceso total, gestión de usuarios, auditoría
- **Operations Manager:** Crear/editar envíos, rastreo, finanzas
- **Agent:** Solo lectura de asignados, actualizaciones de estado

### Visibilidad Condicional
- Sidebar y acciones según rol
- Datos financieros solo para admin/ops-manager
- Documentos confidenciales con permisos explícitos

---

## Secuencia de Sprints

### Sprint 1 (Semana 1): Shell Principal + Pantallas Estrella
- Scaffolding Next.js, auth mock, layout global
- Dashboard con KPIs, mapa mundial, alertas
- Lista + detalle de envíos (timeline, rastreo, ledger)
- **Búsqueda de rutas** (⭐ UI estrella)
- Mapa de rastreo global

### Sprint 2 (Semanas 2-3): Profundidad Operativa
- Carga + análisis de tarjetas (IA mock)
- Constructor y biblioteca de tarjetas
- Red de socios (directorio, conexiones, compartir tarifas)
- Wizard crear envío (4 pasos)
- Libro contable, facturas, dashboard financiero
- Gestión documentos, contactos, configuración, auditoría

---

## Requisitos de Implementación para Claude Code

**Modo:** Plan (planificación + ejecución)

**Contexto a pasar:**
- Este documento como fuente única de verdad
- Especificaciones UX por pantalla (ver `./architecture.md`)
- Anti-patrones a evitar (ver arriba)
- Datos mock y estructura (ver `./mock-data.md`)

**Puntos de decisión clave:**
- ¿Zustand o Context? → Zustand por simplicidad
- ¿MSW o route handlers? → Route handlers para menor complejidad
- ¿Mapbox o Leaflet? → Mapbox GL (Exfresso usa Chrome/Google)
- ¿Qué fuentes? → Satoshi + Plus Jakarta Sans (no Inter)
- ¿Animaciones de carga 7s?  → Framer Motion stagger + pulsing globe

---

## Glosario de Freight Forwarding

| Término | Definición |
|---------|-----------|
| **BOL** | Conocimiento de Embarque — documento legal del transportista, describe mercancías |
| **CBM** | Metro cúbico — unidad de volumen para cálculo de costos |
| **Declaración Aduanera** | Forma formal ante aduanas describiendo mercancías importadas/exportadas |
| **ETA/ETD** | Estimated Time of Arrival / Departure |
| **Freight Forwarder** | Empresa que coordina transporte en nombre del embarcador (usuario de Exfresso) |
| **Código HS** | Sistema Armonizado — clasificación internacional de mercancías |
| **Lane** | Ruta específica origen → destino (ej. LAX → HAM) |
| **Leg** | Segmento de envío multi-modal (terrestre al puerto, aéreo, terrestre a destino) |
| **Código de Puerto** | Código estándar para puerto (USLAX = LA, DEHAM = Hamburg, CNSHA = Shanghai) |
| **Rate Card** | Documento/datos con precios de transportista/agente para rutas/servicios |
| **TMS** | Sistema de Gestión de Transporte — software central para operaciones |

---

**Fin del Contexto Global. Refs cruzadas:**
- Arquitectura → `./architecture.md`
- Especificaciones UI → `./ux-specs.md`
- Datos Mock → `./mock-data.md`
- Decisiones Técnicas → `./technical-decisions.md`
