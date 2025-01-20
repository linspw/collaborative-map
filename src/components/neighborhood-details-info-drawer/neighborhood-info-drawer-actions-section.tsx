/* eslint-disable @typescript-eslint/no-unused-vars */
import { NeighborhoodFeature } from '@custom-types/apis';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useNeighborhoodInfoDrawerStore } from '@stores/user-neighborhood-info-drawer-store';
import { LatLng } from 'leaflet';

interface NeighborhoodInfoDrawerActionsSectionProps {
  neighborhood: NeighborhoodFeature;
}

export const NeighborhoodInfoDrawerActionsSection = (props: NeighborhoodInfoDrawerActionsSectionProps) => {
  const { neighborhood } = props;
  const { mapRef, setNeighborhoodSelected } = useNeighborhoodInfoDrawerStore();

  const handleGoToThePlace = () => {
    const center = [
      (neighborhood.bbox[1] + neighborhood.bbox[3]) / 2,
      (neighborhood.bbox[0] + neighborhood.bbox[2]) / 2,
    ];

    mapRef!.setView(new LatLng(center[0], center[1]), mapRef!.getZoom());
  };

  const handleCloseDrawer = () => {
    setNeighborhoodSelected(null);
  };

  const handleSearchOnGoogle = () => {
    const { id, ...data } = neighborhood.properties;

    const dataParsed = Object.values(data).join(', ');
    const url = `https://www.google.com/search?q=${encodeURIComponent(dataParsed)}`;
    window.open(url, '_blank');
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h6" fontSize={16} fontWeight="bold" sx={{ marginBottom: '4px' }}>
        Actions
      </Typography>

      <List disablePadding>
        <ListItem disableGutters disablePadding>
          <ListItemText
            primary={
              <Button variant="outlined" fullWidth onClick={handleGoToThePlace}>
                Go to the Place
              </Button>
            }
          />
        </ListItem>

        <ListItem disableGutters disablePadding>
          <ListItemText
            primary={
              <Button variant="outlined" fullWidth onClick={handleSearchOnGoogle}>
                Search on Google
              </Button>
            }
          />
        </ListItem>

        <ListItem disableGutters disablePadding>
          <ListItemText
            primary={
              <Button variant="outlined" color="error" fullWidth onClick={handleCloseDrawer}>
                Close
              </Button>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};
