"use client";

// WorldVisitorsMap.tsx
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";

type CountryData = {
  name: string;
  lat: number;
  lng: number;
  visitors: number;
};

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const data: CountryData[] = [
  { name: "Indonesia", lat: -2, lng: 118, visitors: 1240 },
  { name: "USA", lat: 38, lng: -97, visitors: 980 },
  { name: "Brazil", lat: -14, lng: -51, visitors: 620 }
];

export function WorldVisitorsMap() {
  return (
    <>
      <ComposableMap projectionConfig={{ scale: 150 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#E5EAF2"
                stroke="#FFF"
              />
            ))
          }
        </Geographies>

        {data.map((c) => (
          <Marker key={c.name} coordinates={[c.lng, c.lat]}>
            <circle
              r={Math.sqrt(c.visitors) / 4}
              fill="#4FD1C5"
              data-tooltip-id="map-tooltip"
              data-tooltip-content={`${c.name}: ${c.visitors} visitors`}
            />
          </Marker>
        ))}
      </ComposableMap>

      <Tooltip id="map-tooltip" />
    </>
  );
}

