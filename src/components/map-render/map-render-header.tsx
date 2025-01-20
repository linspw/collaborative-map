import { Avatar, Box, Menu, MenuItem, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { useSessionStore } from '@stores/use-user-store';
import { getFirstLetters } from '@utils/names';
import { useMemo, useState } from 'react';

export const MapRenderHeader = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const { user, setCurrentUser } = useSessionStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const title = useMemo(() => {
    return user.name;
  }, [user.name]);

  const firstLetters = useMemo(() => {
    return getFirstLetters(user.name);
  }, [user.name]);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderTitle = () => {
    if (!matches) return <Typography fontWeight="bold">GeoMap</Typography>;

    return (
      <Typography fontWeight="200">
        Welcome to GeoMap,{' '}
        <Typography component="span" fontWeight="medium" fontStyle="italic">
          {title}
        </Typography>
        !
      </Typography>
    );
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
          {renderTitle()}

          <Tooltip title={user.name} onClick={handleClickListItem}>
            <Avatar sx={{ width: 28, height: 28, marginLeft: 'auto', backgroundColor: user.color }}>
              {firstLetters}
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
