import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapRender } from '@components/map-render';
import { useNeighborhoodRequests } from '@hooks';
import styles from './styles/map-view.module.scss';
import { NeighborhoodInfoDrawer } from '@components/neighborhood-details-info-drawer';

export const MapView = () => {
  const { getNeighborhoods } = useNeighborhoodRequests();

  const { data: neighborhoodsData, isFetching: isGetNeighborhoodsLoading } = getNeighborhoods();

  useEffect(() => {}, []);

  if (isGetNeighborhoodsLoading) return <div>Loading</div>;

  return (
    <div className={styles['map-view']}>
      <MapRender data={neighborhoodsData} />

      <NeighborhoodInfoDrawer />
    </div>
  );
};
