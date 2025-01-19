/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from 'react';
import { MapContainer, Rectangle, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { useEventHandlers } from '@react-leaflet/core';
import { LeafletMouseEvent, Map } from 'leaflet';

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

const BOUNDS_STYLE = { weight: 1 };

const MinimapBounds = ({ parentMap, zoom }: { parentMap: Map; zoom: number }) => {
  const minimap = useMap();

  const onClick = useCallback(
    (e: LeafletMouseEvent) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );

  useMapEvent('click', onClick);

  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
  useEventHandlers({ instance: parentMap } as any, handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
};

export const MinimapControl = ({
  position,
  zoom,
  style,
}: {
  position: keyof typeof POSITION_CLASSES;
  zoom: number;
  style: React.CSSProperties;
}) => {
  const parentMap = useMap();
  console.log(zoom, parentMap.getZoom());
  const mapZoom = zoom || 0;

  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    []
  );

  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass} style={{ ...style, marginTop: 40 }}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
};
