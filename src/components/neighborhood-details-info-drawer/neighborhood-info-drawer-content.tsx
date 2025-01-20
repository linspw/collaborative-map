import { Box, Divider, Typography } from '@mui/material';
import { NeighborhoodInfoDrawerPopulactionSection } from './neighborhood-info-drawer-population-section';
import { useNeighborhoodInfoDrawerStore } from '@stores/user-neighborhood-info-drawer-store';
import { useNeighborhoodRequests } from '@hooks/use-neighborhood-requests';
import { NeighborhoodInfoDrawerDetailsSection } from './neighborhood-info-drawer-details-section';
import { NeighborhoodInfoDrawerActionsSection } from './neighborhood-info-drawer-actions-section';

export const NeighborhoodInfoDrawerContent = () => {
  const { getNeighborhoodPopulation } = useNeighborhoodRequests();

  const { neighborhoodSelected } = useNeighborhoodInfoDrawerStore((state) => state);

  const { data: neighborhoodPopulationData, isFetching: isGetNeighborhoodPopulationLoading } =
    getNeighborhoodPopulation({ id: neighborhoodSelected?.properties?.id });

  const renderPopulationSection = () => {
    if (isGetNeighborhoodPopulationLoading) return <div>Loadding...</div>;

    return <NeighborhoodInfoDrawerPopulactionSection items={neighborhoodPopulationData} />;
  };

  const renderDetailsSection = () => {
    if (!neighborhoodSelected) return;
    return <NeighborhoodInfoDrawerDetailsSection neighborhood={neighborhoodSelected} />;
  };

  const renderActionsSection = () => {
    if (!neighborhoodSelected) return;

    return <NeighborhoodInfoDrawerActionsSection neighborhood={neighborhoodSelected} />;
  };

  if (!neighborhoodSelected) return;

  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {neighborhoodSelected.properties.name}
        </Typography>
      </Box>

      <Divider sx={{ margin: '4px 0px 24px 0px' }} />

      <Box display="flex" flexDirection="column" gap="8px">
        {renderDetailsSection()}

        <Divider />

        {renderPopulationSection()}

        {renderActionsSection()}
      </Box>
    </Box>
  );
};
