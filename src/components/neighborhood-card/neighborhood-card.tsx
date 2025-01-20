import { NeighborhoodFeature } from '../../types/apis/neighborhood-population';
import { NeighborhoodCardActions } from './neighborhood-card-actions';
import { NeighborhoodCardContent } from './neighborhood-card-content';
import { NeighborhoodCardTitle } from './neighborhood-card-title';
import styles from './styles/neighborhood-card.module.scss';

interface NeighborhoodPopulationCardProps {
  currentNeighborhood: NeighborhoodFeature;
}

export const NeighborhoodPopulationCard = (props: NeighborhoodPopulationCardProps) => {
  const { currentNeighborhood } = props;

  return (
    <div className={styles['neighborhood-card']}>
      <NeighborhoodCardTitle properties={currentNeighborhood.properties} />

      <NeighborhoodCardContent properties={currentNeighborhood.properties} />

      <NeighborhoodCardActions neighborhood={currentNeighborhood} />
    </div>
  );
};
