"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

// Datos del recorrido de Joseph Ximénez basados en datos_mapa.txt
const journeyData = [
  {
    id: 1,
    title: "Guaro, Málaga (España) – Origen y Juventud",
    date: "1632",
    coordinates: [36.6565, -4.8643] as [number, number],
    hito: "Nacimiento en un pequeño pueblo de la Sierra de Ronda en el seno de una familia de labradores.",
    relevante: "A los 18 años inició su vida militar como soldado de presidio durante tres años antes de buscar nuevos horizontes en Cádiz."
  },
  {
    id: 2,
    title: "Cádiz (España) – La Armada Real",
    date: "1651 – 1660",
    coordinates: [36.5271, -6.2886] as [number, number],
    hito: "Se contrata como soldado de la Armada Real, lo que le permite viajar en los galeones oficiales durante seis años.",
    relevante: "Acumuló 10 años de experiencia militar, demostrando ser un joven inquieto y aventurero antes de su regreso temporal a Guaro."
  },
  {
    id: 3,
    title: "Incidente en Guaro – El Giro del Destino",
    date: "1660",
    coordinates: [36.6575, -4.8653] as [number, number], // Ligeramente desplazado para que no se superponga exactamente con el primero
    hito: "Un altercado violento con su amiga de la infancia, Ana, y un posterior enfrentamiento con los hermanos de ella lo obligan a huir.",
    relevante: "Convertido en fugitivo de la justicia, regresa a Cádiz para embarcarse definitivamente hacia las Indias."
  },
  {
    id: 4,
    title: "Santa Marta y el Río Magdalena – Llegada al Nuevo Mundo",
    date: "Aprox. 1660",
    coordinates: [11.2404, -74.1990] as [number, number],
    hito: "Desembarco en Santa Marta, Nueva Granada, e inicio de una travesía fluvial por el Río Grande de la Magdalena.",
    relevante: "Este viaje lo interna en el corazón del territorio colonial, llevándolo hasta Mariquita."
  },
  {
    id: 5,
    title: "Mariquita y El Caguán – Primeros Oficios",
    date: "Aprox. 1661",
    coordinates: [5.1958, -74.8967] as [number, number],
    hito: "Trabaja un año en una roza de maíz en Mariquita y luego otro año como ayudante del gobernador del Caguán.",
    relevante: "Estos años representan su adaptación a la vida civil y laboral en la Nueva Granada antes de establecerse en el Huila."
  },
  {
    id: 6,
    title: "Timaná y Garzón – El Desengaño Amoroso",
    date: "Aprox. 1662",
    coordinates: [1.9793, -75.9324] as [number, number],
    hito: "Se casa con Juana en Timaná y vive dos años de felicidad en Garzón trabajando la tierra.",
    relevante: "Tras descubrir la infidelidad de su esposa, decide no buscar venganza, sino seguir una \"inspiración de Dios\" para retirarse a buscar la espiritualidad."
  },
  {
    id: 7,
    title: "Desierto de la Candelaria – La Vida Mística",
    date: "1665 – 1676",
    coordinates: [5.6321, -73.6558] as [number, number],
    hito: "Tras orar en Chiquinquirá, llega al desierto donde un pájaro le señala el lugar para construir su choza.",
    relevante: "Vivió 11 años en absoluta pobreza, escribiendo 29 cuadernos místicos sobre la unión con Dios hasta su captura por la Inquisición."
  },
  {
    id: 8,
    title: "Cartagena de Indias – El Juicio y la Hoguera",
    date: "1676 – 1688",
    coordinates: [10.3910, -75.4794] as [number, number],
    hito: "Es apresado y trasladado bajo custodia por Sáchica, Villa de Leyva, Tunja y Santafé hasta las cárceles secretas de Cartagena.",
    relevante: "Tras 12 años de prisión y negarse a retractarse de sus escritos, fue quemado vivo en un Auto de Fe el 30 de mayo de 1688."
  }
];

// Creando un ícono personalizado minimalista
const customIcon = L.divIcon({
  className: "custom-map-marker",
  html: `<div style="width: 16px; height: 16px; background-color: var(--accent); border-radius: 50%; border: 3px solid var(--bg-primary); box-shadow: 0 0 10px var(--accent);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

export default function MapComponent() {
  const pathCoordinates = journeyData.map(point => point.coordinates);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={[20.0, -35.0]} // Un punto intermedio entre España y Colombia
        zoom={3} 
        style={{ height: '100%', width: '100%', background: 'var(--bg-primary)' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <Polyline 
          positions={pathCoordinates} 
          pathOptions={{ color: 'var(--accent)', weight: 2, dashArray: '5, 10', opacity: 0.6 }} 
        />

        {journeyData.map((point) => (
          <Marker 
            key={point.id} 
            position={point.coordinates} 
            icon={customIcon}
          >
            <Popup 
              className="custom-popup"
            >
              <div className="font-sans text-text-primary">
                <h3 className="font-serif text-lg font-bold text-accent mb-1">{point.title}</h3>
                <p className="text-sm italic opacity-85 mb-2">{point.date}</p>
                <p className="text-sm mb-2 text-text-primary"><strong className="text-accent">Hito:</strong> {point.hito}</p>
                <p className="text-xs text-text-primary opacity-90">{point.relevante}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Estilos para sobreescribir el diseño del popup por defecto de Leaflet para que encaje con el tema oscuro */}
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-popup-content-wrapper {
          background-color: var(--bg-card) !important;
          color: var(--text-primary) !important;
          border-radius: 8px !important;
          border: 1px solid var(--accent) !important;
        }
        .leaflet-popup-tip {
          background-color: var(--bg-card) !important;
        }
        .leaflet-container a.leaflet-popup-close-button {
          color: var(--accent) !important;
        }
      `}} />
    </div>
  );
}
