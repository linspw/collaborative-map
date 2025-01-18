import { useState } from 'react';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import { Popup, useMapEvent } from 'react-leaflet';
import { NeighborhoodPopulationCard } from '../neighborhood-card';
import { NeighborhoodFeature, NeighborhoodListResult } from '../../types/apis/neighborhood-population';
import { MapRenderCollab } from './map-render-collab';

export interface MapRenderProps {
  data?: NeighborhoodListResult;
}

export const MapRender = (props: MapRenderProps) => {
  const { data } = props;
  const [currentNeighborhood, setCurrentNeighborhood] = useState<NeighborhoodFeature>();

  const closeCard = () => {
    setCurrentNeighborhood(undefined);
  };

  const renderNeighborhoodPopulation = () => {
    if (!currentNeighborhood) return null;
    return <NeighborhoodPopulationCard currentNeighborhood={currentNeighborhood} closeCard={closeCard} />;
  };

  const renderAreas = () => {
    if (!data) return;

    return (
      <GeoJSON
        data={data}
        eventHandlers={{
          click: (event) => {
            setCurrentNeighborhood(event.sourceTarget.feature);
          },
        }}
      >
        <Popup>{renderNeighborhoodPopulation()}</Popup>
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
    >
      <TileLayer
        url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=BcCw9iWXRyBExU9XfTBr"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {renderAreas()}

      <MapRenderCollab />
    </MapContainer>
  );
};
