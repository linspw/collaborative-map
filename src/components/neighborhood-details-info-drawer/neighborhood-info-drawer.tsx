import { useNeighborhoodInfoDrawerStore } from '@stores/user-neighborhood-info-drawer-store';
import { Drawer } from '@mui/material';
import { NeighborhoodInfoDrawerContent } from './neighborhood-info-drawer-content';

export const NeighborhoodInfoDrawer = () => {
  const { neighborhoodSelected, setNeighborhoodSelected, mapRef } = useNeighborhoodInfoDrawerStore((state) => state);

  return (
    <Drawer
      anchor="right"
      open={!!neighborhoodSelected}
      onClose={() => {
        setNeighborhoodSelected(null);
      }}
      variant="persistent"
      PaperProps={{
        sx: (props) => ({
          width: '270px',
          borderTopLeftRadius: props.shape.borderRadius,
          borderBottomLeftRadius: props.shape.borderRadius,
          padding: '24px',
        }),
        elevation: 4,
      }}
    >
      {neighborhoodSelected && mapRef && <NeighborhoodInfoDrawerContent />}
    </Drawer>
  );
};
