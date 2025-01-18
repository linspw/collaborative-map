import { NeighborhoodPopulation } from '../../types/apis/neighborhood-population';

interface NeighborhoodCardPopulationItemProps {
  population: NeighborhoodPopulation;
}

export const NeighborhoodCardPopulationItem = (props: NeighborhoodCardPopulationItemProps) => {
  const { population } = props;

  return (
    <div>
      <div>
        <div>
          <span>Year</span>
          {population.ano}
        </div>
        <div>
          <span>Population</span>
          {population.populacao}
        </div>
      </div>
    </div>
  );
};
