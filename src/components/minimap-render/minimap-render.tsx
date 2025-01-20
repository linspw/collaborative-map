/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MapContainer, Rectangle, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { useEventHandlers } from '@react-leaflet/core';
import { LeafletEventHandlerFnMap, LeafletMouseEvent, Map } from 'leaflet';

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

const BOUNDS_STYLE = { weight: 1 };

const MinimapBounds = ({ parentMap, zoomOffset }: { parentMap: Map; zoomOffset: number }) => {
  const minimap = useMap();

  const [bounds, setBounds] = useState(parentMap.getBounds());

  const onClick = useCallback(
    (e: LeafletMouseEvent) => {
      parentMap.setView(e.latlng);
    },
    [parentMap]
  );

  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    minimap.setView(parentMap.getCenter(), parentMap.getZoom() - zoomOffset);
  }, [minimap, parentMap, zoomOffset]);

  const handlers: LeafletEventHandlerFnMap = useMemo(() => ({ move: onChange, zoom: onChange }), [onChange]);

  useMapEvent('click', onClick);
  useEventHandlers({ instance: parentMap } as any, handlers);
  useEffect(onChange, [onChange]);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
};

export const MinimapControl = ({
  position,
  zoomOffset = 0,
  style,
}: {
  position: keyof typeof POSITION_CLASSES;
  zoomOffset: number;
  style: React.CSSProperties;
}) => {
  const parentMap = useMap();

  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoomOffset={zoomOffset} />
      </MapContainer>
    ),
    [zoomOffset, parentMap]
  );

  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass} style={{ ...style, marginTop: 40 }}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
};
