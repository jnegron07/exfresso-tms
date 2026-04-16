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
}

const mockRoutes: ShipmentRoute[] = [
  {
    id: "SHP-092241",
    origin: { name: "Shanghai", lng: 121.47, lat: 31.23 },
    destination: { name: "Rotterdam", lng: 4.47, lat: 51.92 },
    currentPosition: { lng: 72.0, lat: 20.0 },
    eta: "Oct 24, 2024",
    status: "In Transit",
  },
  {
    id: "SHP-093552",
    origin: { name: "Singapore", lng: 103.85, lat: 1.29 },
    destination: { name: "Los Angeles", lng: -118.24, lat: 34.05 },
    currentPosition: { lng: -160.0, lat: 28.0 },
    eta: "Nov 2, 2024",
    status: "In Transit",
  },
  {
    id: "SHP-091102",
    origin: { name: "Hamburg", lng: 9.99, lat: 53.55 },
    destination: { name: "New York", lng: -74.0, lat: 40.71 },
    currentPosition: { lng: -40.0, lat: 48.0 },
    eta: "Oct 18, 2024",
    status: "In Transit",
  },
  {
    id: "SHP-094001",
    origin: { name: "Busan", lng: 129.04, lat: 35.1 },
    destination: { name: "Santos", lng: -46.33, lat: -23.95 },
    currentPosition: { lng: 50.0, lat: -10.0 },
    eta: "Nov 12, 2024",
    status: "In Transit",
  },
  {
    id: "SHP-094320",
    origin: { name: "Dubai", lng: 55.27, lat: 25.2 },
    destination: { name: "Mumbai", lng: 72.88, lat: 19.08 },
    currentPosition: { lng: 64.0, lat: 22.0 },
    eta: "Oct 16, 2024",
    status: "Arriving Soon",
  },
];

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
        // Route arcs
        mockRoutes.forEach((route, idx) => {
          const arcCoords = generateArc(
            [route.origin.lng, route.origin.lat],
            [route.destination.lng, route.destination.lat]
          );

          map.addSource(`route-${idx}`, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: { type: "LineString", coordinates: arcCoords },
            },
          });

          map.addLayer({
            id: `route-line-${idx}`,
            type: "line",
            source: `route-${idx}`,
            layout: { "line-cap": "round", "line-join": "round" },
            paint: {
              "line-color": "#6BD8CB",
              "line-width": 1.5,
              "line-opacity": 0.5,
              "line-dasharray": [4, 3],
            },
          });
        });

        // Shipment markers
        const markerFeatures = mockRoutes.map((route) => ({
          type: "Feature" as const,
          properties: {
            id: route.id,
            originName: route.origin.name,
            destName: route.destination.name,
            eta: route.eta,
            status: route.status,
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
            "circle-radius": 12,
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
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #6BD8CB; margin-bottom: 8px;">${props.status}</div>
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

function MapFallback() {
  const routeArcs = [
    { from: [730, 170], ctrl: [450, 80], to: [180, 155] },
    { from: [650, 260], ctrl: [350, 150], to: [100, 180] },
    { from: [200, 130], ctrl: [100, 100], to: [50, 160] },
    { from: [760, 185], ctrl: [550, 320], to: [280, 350] },
    { from: [370, 220], ctrl: [420, 200], to: [470, 230] },
  ];

  const markers = [
    { cx: 470, cy: 215, label: "SHP-092241", route: "Shanghai → Rotterdam" },
    { cx: 200, cy: 200, label: "SHP-093552", route: "Singapore → Los Angeles" },
    { cx: 120, cy: 140, label: "SHP-091102", route: "Hamburg → New York" },
    { cx: 380, cy: 290, label: "SHP-094001", route: "Busan → Santos" },
    { cx: 430, cy: 218, label: "SHP-094320", route: "Dubai → Mumbai" },
  ];

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-[#0b1326]"
      style={{ height: "60vh", minHeight: "400px" }}
    >
      <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6BD8CB" strokeWidth="0.15" opacity="0.3" />
          </pattern>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6BD8CB" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6BD8CB" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1000" height="500" fill="url(#grid)" />
        <path d="M30 100 L80 80 L140 90 L160 130 L140 180 L100 200 L60 190 L30 160 Z" fill="#1a2a3a" stroke="#6BD8CB" strokeWidth="0.4" opacity="0.6" />
        <path d="M150 260 L200 240 L230 280 L240 340 L210 390 L170 380 L140 330 L130 290 Z" fill="#1a2a3a" stroke="#6BD8CB" strokeWidth="0.4" opacity="0.6" />
        <path d="M380 80 L440 70 L470 90 L460 130 L430 150 L390 140 L370 110 Z" fill="#1a2a3a" stroke="#6BD8CB" strokeWidth="0.4" opacity="0.6" />
        <path d="M400 180 L460 170 L490 220 L480 300 L440 340 L400 320 L380 260 L385 210 Z" fill="#1a2a3a" stroke="#6BD8CB" strokeWidth="0.4" opacity="0.6" />
        <path d="M500 70 L620 60 L720 80 L780 120 L770 180 L700 200 L600 190 L520 160 L490 120 Z" fill="#1a2a3a" stroke="#6BD8CB" strokeWidth="0.4" opacity="0.6" />
        <path d="M560 200 L620 190 L660 220 L640 260 L580 270 L550 240 Z" fill="#1a2a3a" stroke="#6BD8CB" strokeWidth="0.4" opacity="0.6" />
        <path d="M700 320 L780 310 L820 340 L810 380 L760 390 L710 370 L690 350 Z" fill="#1a2a3a" stroke="#6BD8CB" strokeWidth="0.4" opacity="0.6" />
        {routeArcs.map((arc, i) => (
          <path
            key={i}
            d={`M ${arc.from[0]} ${arc.from[1]} Q ${arc.ctrl[0]} ${arc.ctrl[1]} ${arc.to[0]} ${arc.to[1]}`}
            fill="none"
            stroke="#6BD8CB"
            strokeDasharray="8,5"
            strokeWidth="1.2"
            opacity="0.5"
            className="animate-dash"
          />
        ))}
        {markers.map((m, i) => (
          <g key={i}>
            <circle cx={m.cx} cy={m.cy} r="20" fill="url(#glow)" />
            <circle cx={m.cx} cy={m.cy} r="8" fill="none" stroke="#6BD8CB" strokeWidth="0.8" opacity="0.3">
              <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={m.cx} cy={m.cy} r="4" fill="#6BD8CB" opacity="0.9" />
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
            <div className="w-1.5 h-1.5 rounded-full bg-[#6BD8CB]" />
            <div>
              <span className="text-[10px] font-bold text-[#6BD8CB] block">{route.id}</span>
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
