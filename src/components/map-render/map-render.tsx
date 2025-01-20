import { useState } from 'react';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import { LayerGroup, Popup, ZoomControl } from 'react-leaflet';
import { NeighborhoodPopulationCard } from '../neighborhood-card';
import { NeighborhoodFeature, NeighborhoodListResult } from '../../types/apis/neighborhood-population';
import { MapRenderCollabLayer } from './map-render-collab-layer';
import { MapRenderHeader } from './map-render-header';
import { MinimapControl } from '@components/minimap-render';
import { useNeighborhoodInfoDrawerStore } from '@stores/user-neighborhood-info-drawer-store';
import { LatLng } from 'leaflet';

export interface MapRenderProps {
  data?: NeighborhoodListResult;
}

const getDefaultStyle = (color: string) => ({
  color,
  weight: 2,
  fillOpacity: 0.5,
});

export const MapRender = (props: MapRenderProps) => {
  const { data } = props;
  const [currentNeighborhood, setCurrentNeighborhood] = useState<NeighborhoodFeature>();
  const { setMapRef, mapRef } = useNeighborhoodInfoDrawerStore();

  const renderNeighborhoodPopulation = () => {
    if (!currentNeighborhood) return null;
    return <NeighborhoodPopulationCard currentNeighborhood={currentNeighborhood} />;
  };

  const renderAreas = () => {
    if (!data || !mapRef) return;

    return (
      <GeoJSON
        data={data}
        eventHandlers={{
          click: (event) => {
            setCurrentNeighborhood(event.sourceTarget.feature);
          },
        }}
        style={getDefaultStyle('blue')}
        onEachFeature={(feature, layer) => {
          layer.on({
            popupopen: () => {
              if (!feature?.bbox) return;
              const center = [(feature.bbox[1] + feature.bbox[3]) / 2, (feature.bbox[0] + feature.bbox[2]) / 2];

              mapRef!.setView(new LatLng(center[0], center[1]));
            },
            mouseover: (event) => {
              event.target.setStyle(getDefaultStyle('green'));
            },
            mouseout: (event) => {
              event.target.setStyle(getDefaultStyle('blue'));
            },
          });
        }}
      >
        <Popup maxHeight={200}>{renderNeighborhoodPopulation()}</Popup>
      </GeoJSON>
    );
  };

  return (
    <MapContainer
      style={{ height: '100%' }}
      bounds={[
        [-23.234708, -45.928813],
        [-23.198917, -45.900761],
      ]}
      zoom={15}
      zoomControl={false}
      ref={setMapRef}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=BcCw9iWXRyBExU9XfTBr"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <LayerGroup>
        <MapRenderHeader />

        <ZoomControl position="bottomleft" />

        <MinimapControl zoomOffset={5} style={{ width: 160, height: 160 }} position="topright" />
      </LayerGroup>

      <LayerGroup>
        <MapRenderCollabLayer />
      </LayerGroup>

      <LayerGroup>{renderAreas()}</LayerGroup>
    </MapContainer>
  );
};
