import { Avatar, Box, Menu, MenuItem, Tooltip, Typography, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { useSessionStore } from '@stores/use-user-store';
import { useMemo, useState } from 'react';

export const MapRenderHeader = () => {
  const theme = useTheme();
  const { user, setCurrentUser } = useSessionStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const title = useMemo(() => {
    return user.name;
  }, [user.name]);

  const firstLetter = useMemo(() => {
    const names = user.name.split(' ');
    return names.length > 1 ? `${names.at(0)!.at(0)}${names.at(1)!.at(0)}` : `${names.at(0)!.at(0)}`;
  }, [user.name]);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      color="secondary"
      sx={{
        height: 40,
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
      }}
    >
      <Container sx={{ height: '100%' }}>
        <Box display="flex" alignItems="center" height="100%" gap="4px">
          <Typography fontWeight="200">
            Welcome to GeoMap,{' '}
            <Typography component="span" fontWeight="medium" fontStyle="italic">
              {title}
            </Typography>
            !
          </Typography>

          <Tooltip title={user.name} onClick={handleClickListItem}>
            <Avatar sx={{ width: 28, height: 28, marginLeft: 'auto', backgroundColor: user.color }}>
              {firstLetter}
            </Avatar>
          </Tooltip>

          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            }}
          >
            <MenuItem onClick={() => setCurrentUser({ name: '' })}>Logout</MenuItem>
          </Menu>
        </Box>
      </Container>
    </AppBar>
  );
};
