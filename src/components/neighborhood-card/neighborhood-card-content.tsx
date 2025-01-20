import { FeatureProperties } from '../../types/apis/neighborhood-population';
import styles from './styles/neighborhood-card-content.module.scss';

interface NeighborhoodCardContentProps {
  properties: FeatureProperties;
}

export const NeighborhoodCardContent = (props: NeighborhoodCardContentProps) => {
  const { properties } = props;

  return (
    <div className={styles['neighborhood-card-content']}>
      <div className={styles['neighborhood-card-content__label']}>
        {properties.setor} - {properties.zona}
      </div>
    </div>
  );
};
