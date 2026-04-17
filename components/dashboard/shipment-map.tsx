"use client";

import { useEffect, useRef } from "react";
import maplibregl, { Map, Marker, Popup } from "maplibre-gl";

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

function createPopupHTML(route: ShipmentRoute): string {
  const modeColor = modeColors[route.mode] || "#6BD8CB";

  return `
    <div style="font-family: var(--font-sans), sans-serif; padding: 4px 0;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="font-size: 14px;">${modeEmojis[route.mode]}</span>
        <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: ${modeColor};">
          ${route.status}
        </div>
      </div>
      <div style="font-size: 15px; font-weight: 800; color: #dae2fd; margin-bottom: 4px;">
        ${route.id}
      </div>
      <div style="font-size: 12px; color: #c5c6cf; margin-bottom: 12px;">
        ${route.origin.name} → ${route.destination.name}
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(69,70,78,0.3); padding-top: 10px;">
        <div>
          <div style="font-size: 10px; color: #8f9098; text-transform: uppercase; letter-spacing: 0.05em;">
            ETA
          </div>
          <div style="font-size: 13px; font-weight: 700; color: #dae2fd;">
            ${route.eta}
          </div>
        </div>
        <a href="/shipments/${route.id}" style="font-size: 11px; font-weight: 700; color: ${modeColor}; text-decoration: none; padding: 6px 14px; border: 1px solid rgba(${
    route.mode === "ocean"
      ? "107,216,203"
      : route.mode === "air"
        ? "96,165,250"
        : route.mode === "road"
          ? "167,139,250"
          : "245,158,11"
  },0.3); border-radius: 8px;">
          View Details
        </a>
      </div>
    </div>
  `;
}

function createHTMLMarker(mode: string, color: string): HTMLElement {
  const emoji = modeEmojis[mode] ?? "📦";
  const div = document.createElement("div");
  div.className = "maplibre-transport-marker";
  div.style.cssText = `
    position: relative;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  div.innerHTML = `
    <div style="
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background-color: ${color}44;
      border: 2px solid ${color};
      animation: maplibre-pulse 2s ease-out infinite;
    "></div>
    <div style="
      position: absolute;
      inset: 6px;
      border-radius: 50%;
      background-color: ${color};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      line-height: 1;
      box-shadow: 0 0 0 4px ${color}33, 0 6px 14px rgba(0,0,0,0.5);
      z-index: 1;
    ">
      ${emoji}
    </div>
  `;

  return div;
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

    mapInstance.on("load", () => {
      mockRoutes.forEach((route) => {
        const color = modeColors[route.mode] || "#6BD8CB";

        const coordinates = route.waypoints
          ? route.waypoints.map((w) => [w.lng, w.lat])
          : [[route.origin.lng, route.origin.lat], [route.destination.lng, route.destination.lat]];

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

        const markerElement = createHTMLMarker(route.mode, color);
        const marker = new maplibregl.Marker({
          element: markerElement,
          anchor: "center",
        })
          .setLngLat([route.currentPosition.lng, route.currentPosition.lat])
          .addTo(mapInstance);

        const popupContent = document.createElement("div");
        popupContent.innerHTML = createPopupHTML(route);

        const popup = new maplibregl.Popup({
          maxWidth: "280px",
          closeButton: true,
          closeOnClick: false,
        })
          .setDOMContent(popupContent);

        marker.setPopup(popup);

        markerElement.addEventListener("click", () => {
          popup.addTo(mapInstance);
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
      <style>{`
        @keyframes maplibre-pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.9;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
      `}</style>

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
