import { NeighborhoodFeature } from '@custom-types/apis';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

interface NeighborhoodInfoDrawerDetailsSectionProps {
  neighborhood: NeighborhoodFeature;
}

export const NeighborhoodInfoDrawerDetailsSection = (props: NeighborhoodInfoDrawerDetailsSectionProps) => {
  const { neighborhood } = props;

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h6" fontSize={16} fontWeight="bold" sx={{ marginBottom: '4px' }}>
        Details
      </Typography>

      <List disablePadding>
        <ListItem disableGutters disablePadding>
          <ListItemText primary="Setor" secondary={neighborhood.properties.setor} sx={{ margin: 0 }} />
        </ListItem>

        <ListItem disableGutters disablePadding>
          <ListItemText primary="Zona" secondary={neighborhood.properties.zona} sx={{ margin: 0 }} />
        </ListItem>
      </List>
    </Box>
  );
};
