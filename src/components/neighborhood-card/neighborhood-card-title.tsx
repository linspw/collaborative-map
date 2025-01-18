import React from 'react';
import { FeatureProperties } from '../../types/apis/neighborhood-population';
import styles from './styles/neighborhood-card-title.module.scss';

interface NeighborhoodCardTitleProps {
  properties: FeatureProperties;
  onCardClose: (event: React.MouseEvent) => void;
}

export const NeighborhoodCardTitle = (props: NeighborhoodCardTitleProps) => {
  const { properties, onCardClose } = props;
  console.log(styles);

  return (
    <header className={styles['neighborhood-card-title']}>
      <div className={styles['neighborhood-card-title__label']}>{properties.name}</div>

      <button onClick={onCardClose} className={styles['neighborhood-card-title__close-btn']}>
        Close
      </button>
    </header>
  );
};
