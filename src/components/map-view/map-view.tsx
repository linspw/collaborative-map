import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapRender } from '@components/map-render';
import { useNeighborhoodRequests } from '@components/neighborhood-card';
import { MapViewToolbar } from './map-view-toolbar';
import styles from './styles/map-view.module.scss';

export const MapView = () => {
  const { getNeighborhoods } = useNeighborhoodRequests();

  const { data: neighborhoodsData, isFetching: isGetNeighborhoodsLoading } = getNeighborhoods();

  useEffect(() => {}, []);

  if (isGetNeighborhoodsLoading) return <div>Loading</div>;

  return (
    <div className={styles['map-view']}>
      <MapViewToolbar />

      <MapRender data={neighborhoodsData} />
    </div>
  );
};
