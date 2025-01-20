import { FeatureProperties } from '../../types/apis/neighborhood-population';
import styles from './styles/neighborhood-card-title.module.scss';

interface NeighborhoodCardTitleProps {
  properties: FeatureProperties;
}

export const NeighborhoodCardTitle = (props: NeighborhoodCardTitleProps) => {
  const { properties } = props;

  return (
    <header className={styles['neighborhood-card-title']}>
      <div className={styles['neighborhood-card-title__label']}>{properties.name}</div>
    </header>
  );
};
