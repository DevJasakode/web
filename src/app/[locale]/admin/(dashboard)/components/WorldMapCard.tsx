"use client";

// WorldMapCard.tsx
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { Card } from "./Card";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const data = [
  { name: "Indonesia", lat: -2, lng: 118, value: 1240 },
  { name: "USA", lat: 38, lng: -97, value: 980 }
];

export function WorldMapCard() {
  return (
    <Card title="Area per Country">
      <ComposableMap projectionConfig={{ scale: 140 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#E6ECF5"
                stroke="#FFF"
              />
            ))
          }
        </Geographies>

        {data.map((d) => (
          <Marker key={d.name} coordinates={[d.lng, d.lat]}>
            <circle
              r={Math.sqrt(d.value) / 4}
              fill="#4FD1C5"
              data-tooltip-id="map-tooltip"
              data-tooltip-content={`${d.name}: ${d.value}`}
            />
          </Marker>
        ))}
      </ComposableMap>

      <Tooltip id="map-tooltip" />
    </Card>
  );
}
