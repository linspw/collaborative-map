import { NeighborhoodCardPopulationItem } from './neighborhood-card-population-item';
import { NeighborhoodPopulations } from '../../types/apis/neighborhood-population';

interface NeighborhoodCardPopulation {
  items: NeighborhoodPopulations;
}

export const NeighborhoodCardPopulation = (props: NeighborhoodCardPopulation) => {
  const { items } = props;

  return items.map((population, index) => {
    return <NeighborhoodCardPopulationItem key={index} population={population} />;
  });
};
