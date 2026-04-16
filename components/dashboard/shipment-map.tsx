"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const MAPBOX_CDN = "https://api.mapbox.com/mapbox-gl-js/v3.21.0/mapbox-gl.js";

interface ShipmentRoute {
  id: string;
  origin: { name: string; lng: number; lat: number };
  destination: { name: string; lng: number; lat: number };
  currentPosition: { lng: number; lat: number };
  eta: string;
  status: string;
  mode: "air" | "ocean" | "rail" | "road";
}

const mockRoutes: ShipmentRoute[] = [
  {
    id: "SHP-092241",
    origin: { name: "Shanghai", lng: 121.47, lat: 31.23 },
    destination: { name: "Rotterdam", lng: 4.47, lat: 51.92 },
    currentPosition: { lng: 72.0, lat: 20.0 },
    eta: "Oct 24, 2024",
    status: "In Transit",
    mode: "ocean",
  },
  {
    id: "SHP-093552",
    origin: { name: "Singapore", lng: 103.85, lat: 1.29 },
    destination: { name: "Los Angeles", lng: -118.24, lat: 34.05 },
    currentPosition: { lng: -160.0, lat: 28.0 },
    eta: "Nov 2, 2024",
    status: "In Transit",
    mode: "air",
  },
  {
    id: "SHP-091102",
    origin: { name: "Hamburg", lng: 9.99, lat: 53.55 },
    destination: { name: "New York", lng: -74.0, lat: 40.71 },
    currentPosition: { lng: -40.0, lat: 48.0 },
    eta: "Oct 18, 2024",
    status: "In Transit",
    mode: "ocean",
  },
  {
    id: "SHP-094001",
    origin: { name: "Busan", lng: 129.04, lat: 35.1 },
    destination: { name: "Santos", lng: -46.33, lat: -23.95 },
    currentPosition: { lng: 50.0, lat: -10.0 },
    eta: "Nov 12, 2024",
    status: "In Transit",
    mode: "ocean",
  },
  {
    id: "SHP-094320",
    origin: { name: "Dubai", lng: 55.27, lat: 25.2 },
    destination: { name: "Mumbai", lng: 72.88, lat: 19.08 },
    currentPosition: { lng: 64.0, lat: 22.0 },
    eta: "Oct 16, 2024",
    status: "Arriving Soon",
    mode: "road",
  },
];

const modeIcons: Record<string, string> = {
  air: "flight",
  ocean: "directions_boat",
  rail: "train",
  road: "local_shipping",
};

const modeColors: Record<string, string> = {
  air: "#60A5FA",
  ocean: "#6BD8CB",
  rail: "#F59E0B",
  road: "#A78BFA",
};

function generateArc(
  start: [number, number],
  end: [number, number],
  numPoints = 80
): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lng = start[0] + (end[0] - start[0]) * t;
    const lat = start[1] + (end[1] - start[1]) * t;
    const altitude = Math.sin(Math.PI * t) * 15;
    points.push([lng, lat + altitude]);
  }
  return points;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MapboxGL = any;

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export function ShipmentMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const popupRef = useRef<unknown>(null);
  const [useFallback, setUseFallback] = useState(!MAPBOX_TOKEN);

  const initMap = () => {
    const mapboxgl: MapboxGL = (window as unknown as { mapboxgl: MapboxGL }).mapboxgl;
    if (!mapboxgl || !mapContainer.current || mapRef.current) return;

    if (!supportsWebGL()) {
      setUseFallback(true);
      return;
    }

    const container = mapContainer.current;
    if (container.clientWidth === 0 || container.clientHeight === 0) return;

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      const map = new mapboxgl.Map({
        container,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [30, 20],
        zoom: 1.8,
        attributionControl: false,
        projection: "mercator",
      });

      mapRef.current = map;

      map.on("load", () => {
        // Route arcs with mode-specific colors
        mockRoutes.forEach((route, idx) => {
          const modeColor = modeColors[route.mode] || "#6BD8CB";
          const arcCoords = generateArc(
            [route.origin.lng, route.origin.lat],
            [route.destination.lng, route.destination.lat]
          );

          map.addSource(`route-${idx}`, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: { mode: route.mode },
              geometry: { type: "LineString", coordinates: arcCoords },
            },
          });

          map.addLayer({
            id: `route-line-${idx}`,
            type: "line",
            source: `route-${idx}`,
            layout: { "line-cap": "round", "line-join": "round" },
            paint: {
              "line-color": modeColor,
              "line-width": 2,
              "line-opacity": 0.6,
              "line-dasharray": [4, 3],
            },
          });

          // Add origin marker
          map.addSource(`origin-${idx}`, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: { name: route.origin.name },
              geometry: { type: "Point", coordinates: [route.origin.lng, route.origin.lat] },
            },
          });
          map.addLayer({
            id: `origin-dot-${idx}`,
            type: "circle",
            source: `origin-${idx}`,
            paint: { "circle-radius": 4, "circle-color": modeColor, "circle-opacity": 0.8 },
          });

          // Add destination marker
          map.addSource(`dest-${idx}`, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: { name: route.destination.name },
              geometry: { type: "Point", coordinates: [route.destination.lng, route.destination.lat] },
            },
          });
          map.addLayer({
            id: `dest-dot-${idx}`,
            type: "circle",
            source: `dest-${idx}`,
            paint: { "circle-radius": 4, "circle-color": modeColor, "circle-opacity": 0.8 },
          });
        });

        // Shipment markers with mode-specific colors
        const markerFeatures = mockRoutes.map((route) => ({
          type: "Feature" as const,
          properties: {
            id: route.id,
            originName: route.origin.name,
            destName: route.destination.name,
            eta: route.eta,
            status: route.status,
            mode: route.mode,
            modeIcon: modeIcons[route.mode],
            modeColor: modeColors[route.mode],
          },
          geometry: {
            type: "Point" as const,
            coordinates: [route.currentPosition.lng, route.currentPosition.lat],
          },
        }));

        map.addSource("shipment-markers", {
          type: "geojson",
          data: { type: "FeatureCollection", features: markerFeatures },
        });

        map.addLayer({
          id: "marker-pulse",
          type: "circle",
          source: "shipment-markers",
          paint: {
            "circle-radius": 14,
            "circle-color": "#6BD8CB",
            "circle-opacity": 0.2,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#6BD8CB",
            "circle-stroke-opacity": 0.3,
          },
        });

        map.addLayer({
          id: "marker-dot",
          type: "circle",
          source: "shipment-markers",
          paint: {
            "circle-radius": 5,
            "circle-color": "#6BD8CB",
            "circle-opacity": 0.9,
          },
        });

        // Click popup
        map.on("click", "marker-dot", (e: MapboxGL) => {
          if (!e.features || e.features.length === 0) return;
          const feature = e.features[0];
          const coords = feature.geometry.coordinates.slice() as [number, number];
          const props = feature.properties;

          if (popupRef.current) (popupRef.current as MapboxGL).remove();

          const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true,
            maxWidth: "280px",
            className: "shipment-popup",
          })
            .setLngLat(coords)
            .setHTML(
              `<div style="font-family: var(--font-sans), sans-serif; padding: 4px 0;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 14px;">${props.modeIcon || '📦'}</span>
                  <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: ${props.modeColor || '#6BD8CB'};">${props.status}</div>
                </div>
                <div style="font-size: 15px; font-weight: 800; color: #dae2fd; margin-bottom: 4px;">${props.id}</div>
                <div style="font-size: 12px; color: #c5c6cf; margin-bottom: 12px;">${props.originName} → ${props.destName}</div>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(69,70,78,0.3); padding-top: 10px;">
                  <div>
                    <div style="font-size: 10px; color: #8f9098; text-transform: uppercase; letter-spacing: 0.05em;">ETA</div>
                    <div style="font-size: 13px; font-weight: 700; color: #dae2fd;">${props.eta}</div>
                  </div>
                  <a href="/shipments/${props.id}" style="font-size: 11px; font-weight: 700; color: #6BD8CB; text-decoration: none; padding: 6px 14px; border: 1px solid rgba(107,216,203,0.3); border-radius: 8px;">View Details</a>
                </div>
              </div>`
            )
            .addTo(map);

          popupRef.current = popup;
        });

        map.on("mouseenter", "marker-dot", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "marker-dot", () => {
          map.getCanvas().style.cursor = "";
        });
      });

      map.on("error", () => {
        setUseFallback(true);
      });
    } catch {
      setUseFallback(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }
    };
  }, []);

  if (useFallback) {
    return <MapFallback />;
  }

  return (
    <>
      <Script
        src={MAPBOX_CDN}
        strategy="afterInteractive"
        onLoad={initMap}
        onError={() => setUseFallback(true)}
      />
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-white/5"
        style={{ height: "60vh", minHeight: "400px" }}
      >
        <div ref={mapContainer} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />

        {/* Live badge */}
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

const modeEmojis: Record<string, string> = {
  air: "✈️",
  ocean: "⛵",
  rail: "🚂",
  road: "🚛",
};

function MapFallback() {
  const scaleLng = (lng: number) => (lng + 180) * (1000 / 360);
  const scaleLat = (lat: number) => (90 - lat) * (500 / 180);

  const routeArcs = mockRoutes.map((route) => {
    const fromX = scaleLng(route.origin.lng);
    const fromY = scaleLat(route.origin.lat);
    const toX = scaleLng(route.destination.lng);
    const toY = scaleLat(route.destination.lat);
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2 - 30;
    return {
      from: [fromX, fromY],
      mid: [midX, midY],
      to: [toX, toY],
      mode: route.mode,
      color: modeColors[route.mode],
    };
  });

  const allPoints = mockRoutes.flatMap((route) => [
    {
      cx: scaleLng(route.origin.lng),
      cy: scaleLat(route.origin.lat),
      type: "origin",
      color: modeColors[route.mode],
    },
    {
      cx: scaleLng(route.destination.lng),
      cy: scaleLat(route.destination.lat),
      type: "dest",
      color: modeColors[route.mode],
    },
    {
      cx: scaleLng(route.currentPosition.lng),
      cy: scaleLat(route.currentPosition.lat),
      type: "current",
      mode: route.mode,
      emoji: modeEmojis[route.mode],
      color: modeColors[route.mode],
    },
  ]);

  const toSvgCoord = (lng: number, lat: number) => ({
  x: (lng + 180) * (1000 / 360),
  y: (90 - lat) * (500 / 180),
});

function renderWorldOutline() {
  const paths = [
    [95, 35, 100, 25, 120, 35, 140, 30, 155, 45, 145, 55, 130, 60, 120, 55, 105, 60, 95, 55, 90, 45, 95, 35],
    [145, 70, 155, 70, 160, 80, 145, 85, 140, 75, 145, 70],
    [-130, 50, -120, 55, -105, 50, -100, 40, -115, 35, -120, 45, -130, 50],
    [-85, 50, -75, 55, -60, 50, -55, 35, -70, 30, -75, 45, -85, 50],
    [-55, 40, -35, 40, -20, 50, -15, 60, -25, 70, -45, 65, -55, 55, -55, 40],
    [30, 70, 45, 70, 60, 75, 70, 60, 80, 55, 85, 45, 95, 30, 105, 35, 100, 55, 80, 65, 60, 70, 30, 70],
    [15, 75, 30, 80, 40, 75, 50, 70, 55, 60, 50, 50, 30, 55, 15, 65, 15, 75],
    [-10, 75, 10, 80, 30, 80, 40, 70, 35, 60, 20, 55, 5, 60, -10, 70, -10, 75],
    [-80, 0, -70, -5, -60, 5, -55, 15, -65, 20, -80, 15, -80, 0],
    [-50, 10, -40, 5, -20, 10, -10, 20, -20, 30, -40, 25, -50, 15, -50, 10],
    [50, 10, 60, 5, 80, 15, 90, 25, 85, 40, 60, 45, 50, 35, 50, 10],
    [100, -10, 115, -10, 130, -5, 120, 10, 105, 15, 95, 5, 100, -10],
    [155, -10, 175, -10, 180, 10, 165, 20, 150, 10, 155, -10],
  ];
  return paths.map((coords, i) => {
    let d = "";
    for (let j = 0; j < coords.length; j += 2) {
      const p = toSvgCoord(coords[j], coords[j + 1]);
      d += (j === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`);
    }
    return <path key={i} d={d + " Z"} fill="#1a2a3a" stroke="#4a5a7a" strokeWidth="0.5" opacity="0.7" />;
  });
}

return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-[#0b1326]"
      style={{ height: "60vh", minHeight: "400px" }}
    >
      <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6BD8CB" strokeWidth="0.15" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="1000" height="500" fill="#0b1326" />
        <rect width="1000" height="500" fill="url(#grid)" />
        {renderWorldOutline()}
        {routeArcs.map((arc, i) => (
          <path
            key={i}
            d={`M ${arc.from[0]} ${arc.from[1]} Q ${arc.mid[0]} ${arc.mid[1]} ${arc.to[0]} ${arc.to[1]}`}
            fill="none"
            stroke={arc.color}
            strokeDasharray="8,5"
            strokeWidth="1.5"
            opacity="0.7"
            className="animate-dash"
          />
        ))}
        {allPoints.map((p, i) => (
          <g key={i}>
            {p.type === "current" ? (
              <g>
                <circle cx={p.cx} cy={p.cy} r="18" fill={p.color} opacity="0.1" />
                <circle cx={p.cx} cy={p.cy} r="10" fill="none" stroke={p.color} strokeWidth="2" opacity="0.5">
                  <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx={p.cx} cy={p.cy} r="6" fill={p.color} opacity="0.9" />
              </g>
            ) : (
              <circle
                cx={p.cx}
                cy={p.cy}
                r="5"
                fill={p.color}
                opacity="0.85"
                stroke="#0b1326"
                strokeWidth="1"
              />
            )}
          </g>
        ))}
      </svg>

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

      <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-wrap gap-3">
        {mockRoutes.map((route) => (
          <div
            key={route.id}
            className="glass px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm" style={{ color: modeColors[route.mode] }}>
              {modeIcons[route.mode]}
            </span>
            <div>
              <span className="text-[10px] font-bold" style={{ color: modeColors[route.mode], display: "block" }}>{route.id}</span>
              <span className="text-[9px] text-on-surface-variant/60">
                {route.origin.name} → {route.destination.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
