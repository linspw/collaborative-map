import { NeighborhoodFeature } from '@custom-types/apis';
import { Box, Button } from '@mui/material';
import { useNeighborhoodInfoDrawerStore } from '@stores/user-neighborhood-info-drawer-store';

interface NeighborhoodCardActionsProps {
  neighborhood: NeighborhoodFeature;
}

export const NeighborhoodCardActions = (props: NeighborhoodCardActionsProps) => {
  const { neighborhood } = props;
  const { setNeighborhoodSelected } = useNeighborhoodInfoDrawerStore((state) => state);

  const handlOnClick = () => {
    setNeighborhoodSelected(neighborhood);
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button onClick={handlOnClick} variant="contained" disableElevation size="small">
        More Details
      </Button>
    </Box>
  );
};
