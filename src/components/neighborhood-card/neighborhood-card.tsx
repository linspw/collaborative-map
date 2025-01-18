import { NeighborhoodListResult } from '../../types/apis/neighborhood-population';
import { useNeighborhoodRequests } from './use-neighborhood-requests';
import { NeighborhoodCardPopulation } from './neighborhood-card-population';
import { NeighborhoodCardTitle } from './neighborhood-card-title';

interface NeighborhoodPopulationCardProps {
  closeCard: () => void;
  currentNeighborhood: NeighborhoodListResult['features'][number];
}

export const NeighborhoodPopulationCard = (props: NeighborhoodPopulationCardProps) => {
  const { currentNeighborhood, closeCard } = props;

  const { getNeighborhoodPopulation } = useNeighborhoodRequests();

  const { data: neighborhoodPopulationData, isFetching: isGetNeighborhoodPopulationLoading } =
    getNeighborhoodPopulation({ id: currentNeighborhood.properties.id });

  const renderPopulation = () => {
    if (isGetNeighborhoodPopulationLoading) return <div>Loadding...</div>;

    return <NeighborhoodCardPopulation items={neighborhoodPopulationData} />;
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        right: '50%',
        zIndex: 1000,
        backgroundColor: 'white',
      }}
    >
      <NeighborhoodCardTitle properties={currentNeighborhood.properties} onCardClose={closeCard} />

      {renderPopulation()}
    </div>
  );
};
