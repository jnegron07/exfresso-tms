"use client";

import { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";

interface Waypoint {
  lng: number;
  lat: number;
  name?: string;
  arrival?: string;
}

interface ShipmentRoute {
  id: string;
  origin: { name: string; lng: number; lat: number };
  destination: { name: string; lng: number; lat: number };
  currentPosition: { lng: number; lat: number };
  eta: string;
  status: "In Transit" | "Arriving Soon" | "Delayed" | "Delivered";
  mode: "air" | "ocean" | "rail" | "road";
  waypoints?: Waypoint[];
  distance?: number;
  estimatedDays?: number;
  animatePosition?: boolean;
}

const mockRoutes: ShipmentRoute[] = [
  {
    id: "SHP-092241",
    mode: "ocean",
    status: "In Transit",
    origin: { name: "Shanghai", lng: 121.47, lat: 31.23 },
    destination: { name: "Rotterdam", lng: 4.47, lat: 51.92 },
    currentPosition: { lng: 60.0, lat: 10.5 },
    eta: "Oct 24, 2024",
    distance: 21000,
    estimatedDays: 42,
    animatePosition: true,
    waypoints: [
      { lng: 121.47, lat: 31.23, name: "Shanghai Port" },
      { lng: 103.85, lat: 1.29, name: "Port of Singapore" },
      { lng: 80.29, lat: 6.93, name: "Port of Colombo" },
      { lng: 60.0, lat: 10.5, name: "Arabian Sea (Current)" },
      { lng: 45.03, lat: 12.78, name: "Port of Aden" },
      { lng: 32.55, lat: 29.97, name: "Suez Canal" },
      { lng: 5.36, lat: 36.19, name: "Strait of Gibraltar" },
      { lng: 4.47, lat: 51.92, name: "Rotterdam Port" },
    ],
  },
  {
    id: "SHP-093552",
    mode: "air",
    status: "In Transit",
    origin: { name: "Singapore", lng: 103.85, lat: 1.29 },
    destination: { name: "Los Angeles", lng: -118.24, lat: 34.05 },
    currentPosition: { lng: -160.0, lat: 30.0 },
    eta: "Nov 2, 2024",
    distance: 13500,
    estimatedDays: 1,
    animatePosition: true,
    waypoints: [
      { lng: 103.85, lat: 1.29, name: "Changi Airport (SIN)" },
      { lng: 145.0, lat: 15.0, name: "Guam (Pacific)" },
      { lng: 175.0, lat: 25.0, name: "Central Pacific" },
      { lng: -160.0, lat: 30.0, name: "North Pacific (Current)" },
      { lng: -118.24, lat: 34.05, name: "LAX Airport" },
    ],
  },
  {
    id: "SHP-091102",
    mode: "ocean",
    status: "In Transit",
    origin: { name: "Hamburg", lng: 9.99, lat: 53.55 },
    destination: { name: "New York", lng: -74.0, lat: 40.71 },
    currentPosition: { lng: -60.0, lat: 43.0 },
    eta: "Oct 18, 2024",
    distance: 6700,
    estimatedDays: 14,
    animatePosition: true,
    waypoints: [
      { lng: 9.99, lat: 53.55, name: "Hamburg Port" },
      { lng: 1.4, lat: 51.13, name: "Dover Strait" },
      { lng: -5.0, lat: 49.0, name: "English Channel" },
      { lng: -30.0, lat: 45.0, name: "North Atlantic" },
      { lng: -60.0, lat: 43.0, name: "Nova Scotia Offshore (Current)" },
      { lng: -74.0, lat: 40.71, name: "Port of New York" },
    ],
  },
  {
    id: "SHP-094001",
    mode: "ocean",
    status: "In Transit",
    origin: { name: "Busan", lng: 129.04, lat: 35.1 },
    destination: { name: "Santos", lng: -46.33, lat: -23.95 },
    currentPosition: { lng: 18.42, lat: -33.93 },
    eta: "Nov 12, 2024",
    distance: 17000,
    estimatedDays: 35,
    animatePosition: true,
    waypoints: [
      { lng: 129.04, lat: 35.1, name: "Busan Port" },
      { lng: 103.85, lat: 1.29, name: "Port of Singapore" },
      { lng: 80.29, lat: 6.93, name: "Port of Colombo" },
      { lng: 57.5, lat: -20.17, name: "Port Louis (Mauritius)" },
      { lng: 18.42, lat: -33.93, name: "Port of Cape Town (Current)" },
      { lng: -15.0, lat: -25.0, name: "South Atlantic" },
      { lng: -46.33, lat: -23.95, name: "Santos Port (Brazil)" },
    ],
  },
  {
    id: "SHP-094320",
    mode: "road",
    status: "Arriving Soon",
    origin: { name: "Los Angeles", lng: -118.24, lat: 34.05 },
    destination: { name: "Chicago", lng: -87.65, lat: 41.85 },
    currentPosition: { lng: -104.99, lat: 39.74 },
    eta: "Oct 16, 2024",
    distance: 3240,
    estimatedDays: 3,
    animatePosition: true,
    waypoints: [
      { lng: -118.24, lat: 34.05, name: "Los Angeles DC" },
      { lng: -112.07, lat: 33.45, name: "Phoenix, AZ" },
      { lng: -106.48, lat: 35.08, name: "Albuquerque, NM" },
      { lng: -104.99, lat: 39.74, name: "Denver, CO (Current)" },
      { lng: -94.58, lat: 39.1, name: "Kansas City, MO" },
      { lng: -87.65, lat: 41.85, name: "Chicago DC" },
    ],
  },
];

const modeEmojis: Record<string, string> = {
  air: "✈️",
  ocean: "⛵",
  rail: "🚂",
  road: "🚛",
};

const modeColors: Record<string, string> = {
  air: "#60A5FA",
  ocean: "#6BD8CB",
  rail: "#F59E0B",
  road: "#A78BFA",
};

const badgeClasses: Record<string, string> = {
  air: "bg-[#60A5FA]/10 text-[#60A5FA]",
  ocean: "bg-[#6BD8CB]/10 text-[#6BD8CB]",
  rail: "bg-[#F59E0B]/10 text-[#F59E0B]",
  road: "bg-[#A78BFA]/10 text-[#A78BFA]",
};

const btnClasses: Record<string, string> = {
  air: "bg-[#60A5FA]/10 text-[#60A5FA] hover:bg-[#60A5FA]/20",
  ocean: "bg-[#6BD8CB]/10 text-[#6BD8CB] hover:bg-[#6BD8CB]/20",
  rail: "bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20",
  road: "bg-[#A78BFA]/10 text-[#A78BFA] hover:bg-[#A78BFA]/20",
};

function createPopupHTML(route: ShipmentRoute): string {
  const badgeClass = badgeClasses[route.mode] || badgeClasses.ocean;
  const btnClass = btnClasses[route.mode] || btnClasses.ocean;

  return `
    <div class="p-4 rounded-xl bg-surface-container-high/30">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-lg">${modeEmojis[route.mode]}</span>
        <span class="text-xs font-bold px-2.5 py-1 rounded-lg ${badgeClass}">
          ${route.status}
        </span>
      </div>
      <div class="text-sm font-semibold text-on-surface mb-1">
        ${route.id}
      </div>
      <div class="text-xs text-on-surface-variant mb-3">
        ${route.origin.name} → ${route.destination.name}
      </div>
      <div class="border-t border-white/5 pt-3 mt-3"></div>
      <div class="flex items-center justify-between gap-2 mt-3">
        <div>
          <div class="text-xs text-on-surface-variant/60 uppercase tracking-wider">
            ETA
          </div>
          <div class="text-sm font-bold text-on-surface">
            ${route.eta}
          </div>
        </div>
        <a href="/shipments/${route.id}" class="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${btnClass}">
          View Details
        </a>
      </div>
    </div>
  `;
}

function createTransportIconImage(
  mode: string,
  color: string,
  size = 44
): { data: Uint8ClampedArray; width: number; height: number } {
  const emoji = modeEmojis[mode] ?? "📦";
  const dpr = 2;
  const canvas = document.createElement("canvas");
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 2;
  const innerR = size / 2 - 8;

  // Translucent outer ring
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.fillStyle = color + "33";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.stroke();

  // Solid badge
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  // Emoji
  ctx.font = `${Math.round(innerR * 1.1)}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, cx, cy + 1);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return { data: imgData.data, width: canvas.width, height: canvas.height };
}

export function ShipmentMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const mapStyle = {
      version: 8,
      sources: {
        "carto-tiles": {
          type: "raster" as const,
          tiles: [
            "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            "https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
          ],
          tileSize: 256,
          attribution: "© OpenStreetMap contributors, © CARTO",
        },
      },
      layers: [
        {
          id: "carto-background",
          type: "raster" as const,
          source: "carto-tiles",
          minzoom: 0,
          maxzoom: 22,
        },
      ],
      projection: { type: "globe" as const },
    };

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle as any,
      center: [30, 20],
      zoom: 1.5,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
    });

    const mapInstance = map.current;

    mapInstance.on("style.load", () => {
      mapInstance.setProjection({ type: "globe" });
    });

    mapInstance.on("load", () => {
      // Register one icon image per mode (reused across routes of the same mode)
      const registeredModes = new Set<string>();
      mockRoutes.forEach((r) => {
        const modeKey = `transport-${r.mode}`;
        if (registeredModes.has(r.mode)) return;
        if (mapInstance.hasImage(modeKey)) {
          registeredModes.add(r.mode);
          return;
        }
        const color = modeColors[r.mode] || "#6BD8CB";
        const img = createTransportIconImage(r.mode, color);
        mapInstance.addImage(
          modeKey,
          { width: img.width, height: img.height, data: img.data },
          { pixelRatio: 2 }
        );
        registeredModes.add(r.mode);
      });

      mockRoutes.forEach((route) => {
        const color = modeColors[route.mode] || "#6BD8CB";

        const rawCoords: [number, number][] = route.waypoints
          ? route.waypoints.map((w) => [w.lng, w.lat] as [number, number])
          : [
              [route.origin.lng, route.origin.lat],
              [route.destination.lng, route.destination.lat],
            ];

        // Make longitudes continuous across the antimeridian so the line
        // follows the short geodesic path instead of wrapping the wrong way.
        const coordinates: [number, number][] = [rawCoords[0]];
        for (let i = 1; i < rawCoords.length; i++) {
          const [prevLng] = coordinates[i - 1];
          let [lng, lat] = rawCoords[i];
          while (lng - prevLng > 180) lng -= 360;
          while (lng - prevLng < -180) lng += 360;
          coordinates.push([lng, lat]);
        }

        const lineSourceId = `route-line-${route.id}`;
        const lineLayerId = `route-line-layer-${route.id}`;

        mapInstance.addSource(lineSourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
            properties: {},
          },
        });

        mapInstance.addLayer({
          id: lineLayerId,
          type: "line",
          source: lineSourceId,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": color,
            "line-width": 2.5,
            "line-opacity": 0.75,
            "line-dasharray": [8, 6],
          },
        });

        const originSourceId = `origin-${route.id}`;
        const originLayerId = `origin-layer-${route.id}`;
        mapInstance.addSource(originSourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [route.origin.lng, route.origin.lat],
            },
            properties: {},
          },
        });

        mapInstance.addLayer({
          id: originLayerId,
          type: "circle",
          source: originSourceId,
          paint: {
            "circle-radius": 5,
            "circle-color": color,
            "circle-opacity": 0.9,
            "circle-stroke-width": 0,
          },
        });

        const destSourceId = `dest-${route.id}`;
        const destLayerId = `dest-layer-${route.id}`;
        mapInstance.addSource(destSourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [route.destination.lng, route.destination.lat],
            },
            properties: {},
          },
        });

        mapInstance.addLayer({
          id: destLayerId,
          type: "circle",
          source: destSourceId,
          paint: {
            "circle-radius": 5,
            "circle-color": color,
            "circle-opacity": 0.9,
            "circle-stroke-width": 0,
          },
        });

        const currentSourceId = `current-${route.id}`;
        const currentLayerId = `current-layer-${route.id}`;
        mapInstance.addSource(currentSourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [route.currentPosition.lng, route.currentPosition.lat],
            },
            properties: { routeId: route.id },
          },
        });

        mapInstance.addLayer({
          id: currentLayerId,
          type: "symbol",
          source: currentSourceId,
          layout: {
            "icon-image": `transport-${route.mode}`,
            "icon-size": 0.8,
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
            "icon-anchor": "center",
          },
        });

        mapInstance.on("click", currentLayerId, (e) => {
          const feature = e.features?.[0];
          if (!feature) return;
          const popupContent = document.createElement("div");
          popupContent.innerHTML = createPopupHTML(route);
          new maplibregl.Popup({
            maxWidth: "280px",
            closeButton: true,
            closeOnClick: true,
            offset: 20,
          })
            .setLngLat([route.currentPosition.lng, route.currentPosition.lat])
            .setDOMContent(popupContent)
            .addTo(mapInstance);
        });

        mapInstance.on("mouseenter", currentLayerId, () => {
          mapInstance.getCanvas().style.cursor = "pointer";
        });
        mapInstance.on("mouseleave", currentLayerId, () => {
          mapInstance.getCanvas().style.cursor = "";
        });
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <>

      <div
        className="relative w-full rounded-2xl overflow-hidden border border-white/5"
        style={{ height: "60vh", minHeight: "400px" }}
      >
        <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />

        <div className="absolute top-5 left-5 z-10">
          <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-on-surface">
              Live Tracking
            </span>
          </div>
        </div>

        <div className="absolute top-5 right-5 z-10">
          <div className="glass px-4 py-2 rounded-full">
            <span className="text-xs font-bold text-on-surface-variant">
              {mockRoutes.length} Active Routes
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
