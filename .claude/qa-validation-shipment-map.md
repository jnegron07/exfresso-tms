# QA Validation Checklist - ShipmentMap Migration (Mapbox → OpenStreetMap)

## Test Execution Date
2026-04-17

## Environment
- Node.js: (run `node -v`)
- Next.js: 16.2.3
- react-leaflet: ^4.2.3
- leaflet: ^1.9.4
- Browser: Chrome/Edge (latest)

---

## 1. Renderizado Básico

- [ ] El mapa se monta sin errores de console (F12 DevTools)
- [ ] Tiles de CartoDB Dark Matter se cargan correctamente
- [ ] No hay errores de CORS en la consola
- [ ] El mapa es responsive en 1920x1080 (desktop)
- [ ] El mapa es responsive en 768x1024 (tablet)
- [ ] El mapa es responsive en 375x667 (móvil)
- [ ] La altura del contenedor respeta 60vh (min 400px)
- [ ] Sin memory leaks evidentes al cargar/descargar el componente

---

## 2. Rutas y Arcos Geodésicos

- [ ] 5 rutas aparecen en el mapa (SHP-092241, SHP-093552, SHP-091102, SHP-094001, SHP-094320)
- [ ] Cada ruta tiene un arco visible con color según el modo:
  - [ ] SEA (SHP-092241, SHP-091102, SHP-094001): teal (#6BD8CB)
  - [ ] AIR (SHP-093552): azul claro (#60A5FA)
  - [ ] ROAD (SHP-094320): púrpura (#A78BFA)
- [ ] Las líneas tienen el patrón de guiones animado (dasharray 8,5)
- [ ] La opacidad es 0.6 (visible pero no invasivo)
- [ ] Los arcos conectan origen a destino correctamente

---

## 3. Marcadores (Origen, Destino, Posición Actual)

- [ ] Cada ruta tiene un marcador pequeño en el origen (r=4px, color del modo)
- [ ] Cada ruta tiene un marcador pequeño en el destino (r=4px, color del modo)
- [ ] Cada ruta tiene un marcador en posición actual (r=6px, color del modo)
- [ ] Los marcadores son diferenciables visualmente (origen/dest = pequeños, actual = más grande)
- [ ] Los marcadores no se superponen indebidamente (excepto si es natural por geografía)

---

## 4. Interactividad: Popups

**Manual Test Steps:**
1. Click en marcador de posición actual (ej: SHP-092241 en el Océano Índico)
2. Verifica que el popup se abre correctamente:

- [ ] El popup contiene el emoji del modo (ej: ⛵ para SEA)
- [ ] El status aparece en mayúsculas y con color del modo (ej: "IN TRANSIT")
- [ ] El ID del shipment es visible en grande y bold (ej: "SHP-092241")
- [ ] La ruta origen → destino es clara (ej: "Shanghai → Rotterdam")
- [ ] El ETA es visible (ej: "Oct 24, 2024")
- [ ] El botón "View Details" apunta a `/shipments/{ID}` (verifica en DevTools)
- [ ] El popup tiene fondo oscuro con borde teal (CartoDB Dark compatible)
- [ ] El popup es closeable con el botón X
- [ ] Al abrir un nuevo popup, el anterior se cierra automáticamente

**Additional Tests:**
- [ ] Click fuera del popup lo cierra
- [ ] Hover sobre "View Details" cambia color (teal → más claro)
- [ ] El popup no se desborda en pantallas pequeñas (mobile)

---

## 5. Badges y Controles

**Top-left Badge (Live Tracking):**
- [ ] Aparece en la esquina superior izquierda
- [ ] Tiene clase "glass" (backdrop-blur)
- [ ] Muestra un punto animado (animate-pulse) en color teal (#0D9488)
- [ ] Texto dice "LIVE TRACKING" en mayúsculas
- [ ] No interfiere con la interacción del mapa

**Top-right Badge (Active Routes):**
- [ ] Aparece en la esquina superior derecha
- [ ] Muestra "5 ACTIVE ROUTES" (o N según cantidad)
- [ ] También tiene clase "glass"
- [ ] No interfiere con la interacción del mapa

---

## 6. Fallback SVG (si Leaflet falla)

- [ ] Si se destruye la librería leaflet, el fallback SVG se renderiza
- [ ] El SVG tiene el mismo contenido visual que antes (outline, rutas, badges)
- [ ] Los controles top-left y top-right funcionan igual

---

## 7. Rendimiento y Optimización

**Load Time:**
- [ ] El mapa inicial load < 2 segundos en connection rápida (3G/4G)
- [ ] Tiles se cargan progresivamente sin lag

**Interactividad:**
- [ ] No hay lag al hacer zoom in/out (con scroll)
- [ ] Los popups abren suavemente (< 100ms)
- [ ] No hay stutter en animaciones (dasharray)

**Memory:**
- [ ] DevTools Performance tab: sin memory spikes al abrir/cerrar popups
- [ ] Al navegar fuera de la página del mapa, memoria se libera correctamente

---

## 8. Compatibilidad de Navegadores

- [ ] Chrome/Edge (latest): OK
- [ ] Firefox (latest): OK
- [ ] Safari (latest): OK
- [ ] Mobile Safari (iOS 15+): OK
- [ ] Chrome Mobile: OK

---

## 9. Accesibilidad

- [ ] Los controles tienen contraste suficiente contra el fondo del mapa
- [ ] Los popups son legibles (font size, color contrast)
- [ ] Al usar tab, el foco se mueve entre elementos interactivos

---

## 10. Dependencias y Versiones

- [ ] `npm list react-leaflet` muestra ^4.2.3
- [ ] `npm list leaflet` muestra ^1.9.4
- [ ] `mapbox-gl` NO aparece en `npm list` (removido correctamente)
- [ ] `@types/mapbox-gl` NO aparece en `npm list` (removido correctamente)
- [ ] `app/layout.tsx` NO contiene link a "mapbox-gl/dist/mapbox-gl.css"
- [ ] `app/layout.tsx` contiene link a leaflet CSS (CDN o node_modules)

---

## 11. Código Base

- [ ] No hay imports referenciando `mapboxgl` (buscar con grep)
- [ ] No hay referencias a `NEXT_PUBLIC_MAPBOX_TOKEN` en shipment-map.tsx
- [ ] ShipmentRoute interface incluye `waypoints?: Waypoint[]`
- [ ] Mock data enriquecido con waypoints realistas
- [ ] Tipos TypeScript son correctos (no `any` salvo donde es unavoidable)

---

## Issues Found

### Critical
(Lista de bugs que bloquean release)

### High
(Funcionalidad perdida o degradada)

### Medium
(Mejoras de UX o rendimiento)

### Low
(Pulido, documentación)

---

## Pass/Fail Summary

**Overall Status:** [ ] PASS [ ] FAIL

**Sign-off:** _____________________ Date: ___________

**Notes:**
```
(Notas adicionales, observaciones)
```

---

## Instrucciones para Testing Manual

1. **Instalar dependencias nuevas:**
   ```bash
   npm install
   ```

2. **Eliminar node_modules si hay conflictos:**
   ```bash
   rm -rf node_modules package-lock.json && npm install
   ```

3. **Correr servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Navegar a la página del dashboard con el mapa:**
   ```
   http://localhost:3000/ (o ruta donde esté ShipmentMap)
   ```

5. **Abrir DevTools (F12) → Console → verificar que no hay errores rojos**

6. **Ejecutar tests de performace:**
   - DevTools → Performance tab
   - Click en Record
   - Interact con mapa (zoom, popup clicks)
   - Stop recording y analizar

7. **Verificar Lighthouse (Mobile):**
   - DevTools → Lighthouse
   - Run Lighthouse (Mobile)
   - Verificar que no hay warnings sobre render-blocking resources

